# Automated Testing Strategies in AL: Going Beyond Unit Tests

Automated testing in Business Central AL has come a long way. With the introduction of test codeunits and the AL Test Toolkit, the platform provides the tools needed to write code that verifies code. Most developers start with unit tests – testing individual procedures or codeunits in isolation.

But to truly build robust, reliable extensions, you need a testing strategy that goes beyond just unit tests. Real-world business processes involve interactions between multiple codeunits, integrations with external systems, and critical data migrations during upgrades. Your testing strategy needs to cover these layers as well.

This post is about elevating your AL testing game. It's about understanding different types of automated tests, knowing when to use them, and building a testing culture that ensures the quality and stability of your Business Central solutions.

## Why Test Beyond Units?

Unit tests are foundational. They are fast, isolated, and excellent for verifying the logic within a single, small piece of code. However, they don't tell you if:
* Two codeunits correctly interact with each other.
* Your code successfully integrates with the base application.
* Your external integration actually sends/receives data correctly.
* Your extension survives a Business Central version upgrade with data intact.

For these scenarios, you need tests that operate at a higher level.

## Integration Tests: Verifying Interactions

Integration tests verify the interaction between different components of your system or between your extension and the base application. They are broader than unit tests and often require a more realistic environment (though still ideally isolated from real external services).

Examples of what integration tests cover:
* Calling a procedure in one codeunit and verifying the outcome in another codeunit.
* Posting a sales order created by your custom logic and verifying the expected entries are created.
* Testing the interaction with base application codeunits or pages.

These tests help uncover issues that only arise when components are wired together. They are slower than unit tests because they involve more setup and execution paths.

// Conceptual Integration Test Codeunit
codeunit 132020 "Sales Line Integration Test"
{
    Subtype := Test;
    // Add test dependencies if needed

    [Test]
    procedure TestCreateSalesLineAndVerifyInventory()
    var
        SalesHeader: Record "Sales Header";
        SalesLine: Record "Sales Line";
        Item: Record Item;
        Inventory: Decimal;
        Assert: Codeunit Assert;
    begin
        // [SCENARIO] Creating a sales line should reserve inventory
        // [GIVEN] An item with available inventory and a sales order header
        LibraryUtility.CreateSalesHeader(SalesHeader); // Helper function from a test library
        LibraryUtility.CreateItem(Item);
        Item.Inventory := 10;
        Item.MODIFY();

        // [WHEN] A sales line is created for the item on the order
        SalesLine.INIT();
        SalesLine."Document Type" := SalesHeader."Document Type";
        SalesLine."Document No." := SalesHeader."No.";
        SalesLine."Line No." := 10000;
        SalesLine.Type := SalesLine.Type::Item;
        SalesLine."No." := Item."No.";
        SalesLine.Quantity := 5;
        SalesLine.INSERT(true); // Insert and run triggers

        // Re-get the item record to see updated inventory
        Item.GET(Item."No.");
        Inventory := Item.Inventory; // Check FlowField or calculated field

        // [THEN] The inventory should be reduced by the quantity on the sales line
        Assert.AreEqual(5, Inventory, 'Inventory was not reserved correctly after sales line creation.');

        // Add more assertions to verify cost, amount, related records, etc.
    end;

    [Test]
    procedure TestPostSalesOrderAndVerifyGOREntries()
    var
        SalesHeader: Record "Sales Header";
        SalesLine: Record "Sales Line";
        Item: Record Item;
        GenJnlLine: Record "Gen. Journal Line";
        Assert: Codeunit Assert;
    begin
        // [SCENARIO] Posting a sales order with an item should create G/L Entries
        // [GIVEN] A posted sales order with a sales line for an item
        LibraryUtility.CreateSalesHeader(SalesHeader);
        LibraryUtility.CreateItem(Item);
        LibraryUtility.CreateSalesLine(SalesLine, SalesHeader, Item."No.", 10);
        LibrarySales.PostSalesDocument(SalesHeader, SalesHeader."Document Type"::Order); // Helper to post the order

        // [WHEN] We check the G/L Entries
        // [THEN] We should find specific G/L entries created by the posting process
        GenJnlLine.SETRANGE("Document Type", GenJnlLine."Document Type"::"Sales Shipment"); // Or other expected document types
        GenJnlLine.SETRANGE("Document No.", SalesHeader."No."); // Or the posted document number
        // Check for specific G/L Account Nos, Amounts, etc. created by the posting logic
        Assert.IsNotEmpty(GenJnlLine, 'No G/L Entries found for the posted sales order.');

        // Add assertions to verify the number and content of expected G/L entries
    end;

    // More integration test procedures can be added here...
}

**The Secret:** Design your code for testability (as discussed with [our post on Interface Thinking in AL](/blog/bc-al-interfaces)). Use interfaces and dependency injection where possible to allow mocking *external* services, keeping your integration tests focused on the logic *within* Business Central, without relying on a live, potentially unstable, external endpoint.

## Upgrade Tests: Ensuring a Smooth Transition

As highlighted in our post on [our post on Navigating the Upgrade Gauntlet](/blog/bc-al-upgrade-gauntlet), Business Central's continuous update cycle means upgrades are a constant factor. Your extension needs to upgrade reliably, especially if it involves data migrations.

Upgrade Test Codeunits are specifically designed for this. They run as part of the upgrade process itself and are used to verify that your data upgrade codeunit executed correctly and that key data or configuration points are valid in the new version.

We touched on this conceptually before, but in practice, these tests are critical for confidence in your release process.

// Conceptual Upgrade Test Codeunit
codeunit 132010 "My Extension Upgrade Tests" // Note: This ID might overlap if you used it in a previous conceptual example. Ensure unique IDs in your project.
{
    Subtype := Test;
    // Add relevant test dependencies

    [Test]
    [Scope('OnPrem')] // Upgrade tests might need specific scope or setup
    procedure VerifySetupDataMigrated()
    var
        MyExtensionSetup: Record "My Extension Setup";
        Assert: Codeunit Assert;
        ExpectedValue: Text;
        ActualValue: Text;
    begin
        // [SCENARIO] Verify setup data is correct after upgrade
        // [GIVEN] The system has been upgraded
        // [WHEN] We read the setup data
        MyExtensionSetup.GET(); // Assuming it's a singleton

        // [THEN] Specific fields should have expected values after the upgrade process
        ExpectedValue := 'New Default Value V2'; // Value expected after upgrade
        ActualValue := MyExtensionSetup."Some Configuration Field";

        Assert.AreEqual(ExpectedValue, ActualValue, 'Setup data was not migrated correctly during upgrade.');

        // Add more assertions for other setup fields, data transformations, etc.
    end;

    [Test]
    [Scope('OnPrem')]
     procedure VerifyKeyFunctionalityPostUpgrade()
     var
        MyCoreProcess: Codeunit "My Core Business Logic";
        Assert: Codeunit Assert;
        InputParameter: Integer;
        ExpectedOutput: Text;
        ActualOutput: Text;
     begin
        // [SCENARIO] Verify a key business process still works post-upgrade
        // [GIVEN] The system has been upgraded
        // [WHEN] We execute a core process
        InputParameter := 10;
        ExpectedOutput := 'Processed: 10 - Lógica V2'; // Expected output based on post-upgrade logic - FIX: This comment should be English

        // Assuming MyCoreProcess might have internal dependencies potentially affected by base app changes
        ActualOutput := MyCoreProcess.ExecuteLogic(InputParameter);

        // [THEN] The output should match the expected result for the new version
        Assert.AreEqual(ExpectedOutput, ActualOutput, 'Core business logic failed post-upgrade.');

        // Add more tests for other critical functions
     end;

    // More upgrade test procedures can be added here...
}

**The Secret:** Don't skip upgrade tests if your extension has data or configuration that persists across versions. They are your safety net for ensuring data integrity during BC updates.

## Automated Testing Pipelines: Your Quality Gateway

Writing tests is one thing; running them consistently is another. Automated testing provides maximum value when integrated into your development workflow, ideally as part of a Continuous Integration/Continuous Delivery (CI/CD) pipeline (e.g., using Azure DevOps, GitHub Actions).

A typical pipeline includes steps to:
1.  Compile your extension.
2.  Deploy your extension to a test environment (a clean sandbox or container).
3.  Run your Automated Test Codeunits (unit, integration).
4.  (For upgrades) Deploy to an environment with the previous version of the base app, install the *new* version of your extension, trigger the upgrade process, and run your Upgrade Test Codeunits.
5.  Report results. Halt the pipeline if tests fail.

**The Secret:** Make failing tests a blocking step in your pipeline. If the automated tests don't pass, the code doesn't get deployed. This ensures that bugs are caught early, before they reach users. Automate the execution of *all* your test types (unit, integration, upgrade) in a consistent environment.

## Building a Testing Culture

Automated testing isn't just a task; it's a mindset and a team culture.

* **Developers Write Tests:** Testing should not be solely the responsibility of a separate QA team. The developer who writes the code is best positioned to write effective unit and initial integration tests.
* **Prioritize Testability:** Design your code with testing in mind. Reduce coupling, use interfaces, keep procedures focused.
* **Refactor Based on Tests:** Tests provide confidence to refactor code, improving its design without fear of breaking existing functionality.
* **Make Tests Visible:** Integrate test results into your DevOps dashboards. Celebrate passing tests and address failures collaboratively.

## Conclusion: The ROI of a Comprehensive Testing Strategy

Investing time in building a comprehensive automated testing strategy in AL pays significant dividends. Unit tests provide confidence in individual components. Integration tests verify how components work together. Upgrade tests ensure smooth transitions across BC versions. Integrating these into an automated pipeline makes quality a continuous, verifiable process.

While it requires initial effort, automated testing reduces manual testing time, catches bugs earlier (when they are cheaper to fix), improves code quality, and provides peace of mind with each Business Central update. Go beyond the F9 and build a testing strategy that sets your extensions apart.

What challenges have you faced implementing automated testing in AL, and what successes have you seen? Share your experiences below!

---
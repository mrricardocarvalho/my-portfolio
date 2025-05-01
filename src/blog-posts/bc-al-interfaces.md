# Interface Thinking in AL: Designing for the Future of Your BC Extensions

Interfaces. They quietly arrived in AL, a new keyword in our language. For many, they might seem like just another syntax feature, perhaps used occasionally when following a specific pattern shown in documentation.

But I'm here to tell you that adopting an *interface-first mindset* is a fundamental shift that can elevate your Business Central extensions from functional code to truly robust, maintainable, and flexible applications designed for the long haul. It's not just about using the syntax; it's about *thinking* differently about your code's structure and dependencies.

Think about it: how often do you have codeunits that are tightly coupled to other concrete codeunits? If you need to swap out logic, add a new variation of a process, or write automated tests for a specific piece of business logic, you often find yourself entangled in a web of dependencies. This is where interfaces shine. They allow you to define a *contract* – what a piece of code *does* – without specifying *how* it does it.

Let's explore why embracing interface thinking is crucial for modern BC development and how it unlocks patterns that make your extensions easier to test, maintain, and evolve.

## Why Interfaces? The SOLID Principles Connection

Interfaces are a direct enabler of key software design principles, most notably from the SOLID acronym:

* **Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). Abstractions should not depend on details. Details should depend on abstractions. This is foundational for decoupling.
* **Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use. Better to have many small, role-specific interfaces than one large, monolithic one.

By depending on interfaces instead of concrete implementations, your code becomes significantly less coupled. A codeunit that needs to perform a certain action depends only on an interface defining that action, not on the specific codeunit that currently implements it.

## Real-World Scenarios for Interface Power

Where can you apply this? Almost anywhere you have variations in logic or need to integrate with external systems.

Imagine needing different validation rules for different types of customers or documents. Without interfaces, you might have a large `IF/ELSEIF` block or a complex `CASE` statement checking types and calling specific validation codeunits directly. With interfaces, you can define an `ICustomerValidator` interface with a `Validate(Customer: Record Customer)` method. You create different validator codeunits (e.g., `StandardCustomerValidator`, `KeyAccountValidator`), all implementing this interface. Your core logic then simply depends on `ICustomerValidator` and receives the *correct* implementation at runtime.

Other prime examples:
* **Pluggable Integrations:** An `IPaymentGateway` interface with methods like `ProcessPayment`, `RefundPayment`. Implementations for different providers (`StripePaymentGateway`, `PayPalPaymentGateway`). Your Sales Order code just uses the interface.
* **Flexible Calculations:** An `ITaxCalculator` interface. Implementations for different tax jurisdictions or complex tax rules.
* **Different Workflow Actions:** An `IWorkflowAction` interface for pluggable steps in a custom workflow.

## Designing Effective Interfaces

Not all interfaces are created equal. To get the most benefit, follow these guidelines:

* **Keep them Small and Focused:** Don't create giant interfaces with dozens of methods. Group related functionality into smaller, role-specific interfaces (ISP!). An interface for "Customer Address Validation" is better than adding address methods to a general "Customer Processing" interface.
* **Define the "What," Not the "How":** Interface methods should describe the action or data retrieval, not expose implementation details.
* **Use Intent-Revealing Names:** Interface names typically start with 'I' (e.g., `ICustomerValidator`) and their methods should clearly state their purpose (`Validate`, `ProcessPayment`).

## Using Interface Variables and Dependency Injection (AL Style)

Once you have interfaces, you need a way for your code to get an instance of the *correct* concrete codeunit that implements the interface. This is where Dependency Injection comes in. While AL doesn't have a built-in DI container like some languages, you can implement a simple form:

Have a central place (e.g., a dedicated codeunit or a setup record) that knows which concrete codeunit implements which interface for the current context. Your code that *needs* the implementation calls this central place to *get* the correct codeunit instance via the interface variable.

// Example of a Simple Interface
interface IMyInterface
{
    /// <summary>
    /// Performs a specific action based on input value.
    /// </summary>
    /// <param name="InputValue">The value to process.</param>
    /// <returns>A result string based on the processing.</returns>
    procedure PerformAction(InputValue: Text): Text;
}

// Example Implementation 1
codeunit 50100 "My Interface Impl A" implements IMyInterface
{
    procedure PerformAction(InputValue: Text): Text
    begin
        exit('Impl A processed: ' + InputValue);
    end;
}

// Example Implementation 2
codeunit 50101 "My Interface Impl B" implements IMyInterface
{
    procedure PerformAction(InputValue: Text): Text
    begin
        exit('Impl B handled: ' + InputValue + ' differently!');
    end;
}

// Codeunit that needs to use the interface (Consumer)
codeunit 50102 "My Codeunit Consumer"
{
    // Method to get the correct implementation (simple Dependency Injection)
    local procedure GetMyInterface(Config: Text): interface IMyInterface
    var
        ImplA: Codeunit "My Interface Impl A";
        ImplB: Codeunit "My Interface Impl B";
    begin
        if Config = 'A' then
            exit(ImplA)
        else if Config = 'B' then
            exit(ImplB)
        else
            error('Invalid configuration %1', Config); // Or use a default
    end;

    // Method that uses the interface without knowing the concrete implementation
    procedure RunAction(Input: Text; Config: Text)
    var
        MyProcessor: interface IMyInterface;
        Result: Text;
    begin
        MyProcessor := GetMyInterface(Config); // Get the implementation via the interface

        Result := MyProcessor.PerformAction(Input); // Use the interface variable

        Message('Action Result: %1', Result);
    end;
}

In this pattern, `MyCodeunit` doesn't care if it's using `ImplementationA` or `ImplementationB`, as long as it gets *an* object that fulfills the `MyInterface` contract. The knowledge of *which* implementation to use is externalized.

## Interfaces and Testability: The Developer's Delight

This is where interface thinking truly pays off for developers. When your code depends on an interface, you can easily create a "mock" or "fake" implementation of that interface specifically for your automated tests.

A mock implementation doesn't perform the real logic (like calling an external API or complex calculations). It's a simple codeunit that implements the interface but whose methods return predefined values or simply record that they were called.

// Example Mock Implementation for Testing
codeunit 50103 "My Interface Mock A" implements IMyInterface
{
    LastInputReceived: Text;
    CallCount: Integer;

    procedure PerformAction(InputValue: Text): Text
    begin
        // Don't do the real logic, just record the call and return a predictable value
        LastInputReceived := InputValue;
        CallCount += 1;
        exit('Mocked Result for: ' + InputValue); // Return a fixed/predictable result for the test
    end;

    // Helper method for tests to inspect what happened
    procedure GetLastInputReceived(): Text
    begin
        exit(LastInputReceived);
    end;

    procedure GetCallCount(): Integer
    begin
        exit(CallCount);
    end;
}

// Example Test Codeunit Using the Mock
codeunit 132000 "My Codeunit Consumer Test"
{
    Subtype := Test;

    [Test]
    procedure TestRunActionWithMockA()
    var
        MyConsumer: Codeunit "My Codeunit Consumer";
        MockA: Codeunit "My Interface Mock A";
        InputText: Text;
        ExpectedResult: Text;
    begin
        // [SCENARIO] Run RunAction method using Mock A
        // [GIVEN] Input text and mock implementation
        InputText := 'TestData123';
        ExpectedResult := 'Mocked Result for: TestData123';

        // Simple AL "Dependency Injection" for testing:
        // Instead of getting the real implementation, assign the mock to the interface variable
        // NOTE: This simple assignment only works if My Codeunit Consumer has a way
        // to receive the interface implementation from the outside, e.g., via a parameter
        // or a dedicated 'SetProcessor' method. The previous example was simplified.
        // A more testable design would pass the IMyInterface variable INTO RunAction.

        // Let's assume MyCodeunitConsumer had a method like:
        // procedure RunAction(Input: Text; MyProcessor: interface IMyInterface)
        // Then the test would be:
        // MyConsumer.RunAction(InputText, MockA); // Pass the mock directly

        // Without refactoring MyCodeunitConsumer, testing is harder.
        // This highlights *why* designing for interfaces aids testability.

        // If MyCodeunitConsumer had a method to *get* the processor that *could be overriden by a test*, even better.
        // Example Test Helper (Conceptual):
        // Codeunit 50104 "Processor Resolver"
        // [Normal] procedure GetMyInterface(Config: Text): interface IMyInterface; ... uses real impls ...
        // [IntegrationEvent] OnGetMyInterface(Config, var ProcessorInterface); // Test subscribes here to return mock

        // Let's assume for this example you have a way to inject the mock.
        // Example check (assuming MockA was successfully used internally)
        // This part depends heavily on how MyCodeunitConsumer is designed to *get* its interface implementation.
        // But the principle is: the test interacts with the MOCK object to verify correct behavior.

        // For demonstration, let's just show interacting with the mock itself after a hypothetical call
        // that used it internally:
        // MyConsumer.RunAction(InputText, 'A'); // If MyConsumer had a way to be told to use MockA when 'A' is requested in a test...
        // Codeunit "Test Management".SetFilterForTestCodeunits(Codeunit::"My Interface Mock A"); // A way to ensure the test version is used? (Conceptual)

        // A better, more direct test pattern using a refactored consumer:
        var
            TestConsumer: Codeunit "My Refactored Testable Consumer"; // Needs to be refactored
            MockProcessor: Codeunit "My Interface Mock A";
            ActualResult: Text;
        begin
            // Assuming TestConsumer.RunAction(Input: Text; Processor: Interface IMyInterface) exists
            // ActualResult := TestConsumer.RunAction(InputText, MockProcessor);

            // Verify the mock received the correct input
            Assert.AreEqual(InputText, MockProcessor.GetLastInputReceived(), 'Mock did not receive expected input.');

            // Verify the mock's method was called
            Assert.AreEqual(1, MockProcessor.GetCallCount(), 'Mock PerformAction was not called exactly once.');

            // If TestConsumer returned the result:
            // Assert.AreEqual(ExpectedResult, ActualResult, 'Consumer did not get expected result from mock.');
        end; // This test structure shows the *benefit* of designing for testability via interfaces.
    end;
}

**The Secret:** By depending on interfaces, you can isolate the code unit you are testing from its dependencies. You provide mock objects via dependency injection (even the simple AL style) during testing, allowing you to test the logic *within* that codeunit without needing a live external service, a full database setup, or complex interconnected data. This leads to faster, more reliable, and truly isolated unit tests.

## Conclusion: Building Resilient Extensions with Interface Thinking

Interfaces in AL are more than just syntax; they are a powerful design tool. By embracing interface thinking, you move away from rigid, tightly coupled code towards flexible, modular extensions. This makes your code easier to read, understand, maintain, and significantly easier to test automatically.

While it requires a shift in how you structure your AL code and manage dependencies, the long-term benefits in terms of code quality, reduced maintenance effort, and resilience to change (both in the base app and your own logic variations) are immense.

Start looking for opportunities to introduce interfaces. Where do you have `CASE` statements based on types? Where do you call specific integration codeunits directly? These are prime candidates for abstraction via interfaces.

What are your thoughts on using interfaces in AL? Have you found them beneficial in your projects? Share your experiences below!

---
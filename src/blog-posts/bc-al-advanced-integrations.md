# AL Integrations: Beyond the Basics - Building Robust External Connections

Connecting Business Central to the outside world is a fundamental requirement for modern ERP systems. Whether it's syncing with a CRM, sending data to a data warehouse, integrating with e-commerce platforms, or using external services for calculations, integrations are everywhere.

AL provides the `HttpClient`, `HttpRequestMessage`, `HttpResponseMessage`, and `Json*` data types to facilitate these connections. Basic GET and POST requests sending simple JSON are relatively straightforward. But real-world integrations are messy. External services go down, APIs change, authentication is complex, data volumes are large, and errors happen.

Building truly *robust* and *reliable* integrations in AL requires moving beyond the basic syntax and adopting patterns that account for these real-world challenges. Let's dive into some advanced aspects of AL integrations.

## Handling External Service Failures and Retries

External APIs are not 100% reliable. Network glitches, service downtime, or transient errors are common. Your integration must anticipate failure. Simply calling an `HttpClient.Send()` and throwing an `ERROR` if the response isn't 200 is insufficient.

A robust integration needs:
1.  **Graceful Error Handling:** Capture the error details (status code, response body) without crashing the entire Business Central process.
2.  **Retry Logic:** For transient errors (like 429 Too Many Requests or 5xx server errors), implement a retry mechanism, often with an exponential backoff delay.
3.  **Logging:** Log failures with enough detail to diagnose the issue later.
4.  **Monitoring & Alerting:** Ideally, have a way to monitor failed integrations and be alerted.

// Conceptual Integration Service with Retry Logic
codeunit 50300 "External Service Connector"
{
    var
        Client: HttpClient;
        Request: HttpRequestMessage;
        Response: HttpResponseMessage;
        Content: HttpContent;
        RequestUrl: Text;
        Attempts: Integer;
        MaxAttempts: Integer;
        BaseDelay: Integer; // milliseconds
        Success: Boolean;
    begin
        MaxAttempts := 5; // Example: Try up to 5 times
        BaseDelay := 200; // Example: Start with 200ms delay

        RequestUrl := 'https://external.service.com/api/data'; // Example URL

        // Prepare the request message (e.g., set Method, Headers, Content)
        Request.Method := 'POST';
        Request.SetRequestUri(RequestUrl);
        Request.Content := CreateRequestContent(); // Helper function to create HttpContent

        Success := false;
        Attempts := 0;
        REPEAT
            Attempts += 1;
            ClearLastError(); // Clear any previous errors before retry

            if Client.Send(Request, Response) then begin
                if Response.IsSuccessStatusCode() then begin
                    // Success!
                    Success := true;
                    // Process Response.Content
                    ProcessResponseContent(Response.Content); // Helper function
                end else begin
                    // Received non-success status code
                    LogIntegrationFailure(RequestUrl, Response.StatusCode, Response.ReasonPhrase, Response.Content); // Log details
                    if CanRetryStatusCode(Response.StatusCode) and (Attempts < MaxAttempts) then begin
                        // Delay before retrying
                        Sleep(BaseDelay * Power(2, Attempts - 1)); // Exponential backoff
                    end else begin
                        // Non-retryable error or max attempts reached
                        ERROR('Integration failed after %1 attempts. Status: %2 %3', Attempts, Response.StatusCode, Response.ReasonPhrase);
                    end;
                end;
            end else begin
                // Network error or other client-side issue
                LogIntegrationFailure(RequestUrl, 0, '', GetLastErrorText()); // Log error details
                if Attempts < MaxAttempts then begin
                     // Delay before retrying
                     Sleep(BaseDelay * Power(2, Attempts - 1)); // Exponential backoff
                end else begin
                    ERROR('Integration failed after %1 attempts due to network error: %2', Attempts, GetLastErrorText());
                end;
            end;

        UNTIL Success OR (Attempts >= MaxAttempts AND NOT CanRetryStatusCode(Response.StatusCode)); // Exit if successful or max attempts reached for a retryable error, OR non-retryable error occurred

        if NOT Success then
             ERROR('Integration ultimately failed after %1 attempts.', MaxAttempts); // Final error if loop exited without success

    end;

    local procedure CreateRequestContent(): HttpContent;
    begin
        // Create and return HttpContent (e.g., JsonContent, TextContent)
        // Example: JsonContent.WriteFrom(MyRecord);
        // exit(JsonContent);
    end;

    local procedure ProcessResponseContent(Content: HttpContent);
    begin
        // Read and process Response.Content
        // Example: Content.ReadAs(MyJsonToken);
        // Use JsonToken.ReadValue() or JsonObject.Get() etc.
    end;

    local procedure LogIntegrationFailure(Url: Text; StatusCode: Integer; Reason: Text; Content: HttpContent);
    begin
        // Implement logging logic here
        // Log Url, StatusCode, Reason, and maybe content for diagnosis
        // Use Error codeunits, custom log tables, or telemetry (SessionSettings.LogMessage)
    end;

    local procedure CanRetryStatusCode(StatusCode: Integer): Boolean;
    begin
        // Define which status codes are considered transient and safe to retry
        case StatusCode of
            429, // Too Many Requests
            500, // Internal Server Error
            502, // Bad Gateway
            503, // Service Unavailable
            504: // Gateway Timeout
                exit(true);
            else
                exit(false);
        end;
    end;
}

As discussed in our post on [Events and Subscribers](/blog/bc-events-subscribers), using a **queuing mechanism** is often the best pattern here. The event or trigger queues the request, and a separate process (like a Job Queue) attempts the external call, handling retries and logging failures without impacting the user or the original transaction.

## Managing Large Data Payloads

Sending or receiving large amounts of data via APIs can strain system resources and hit limitations. You might encounter memory issues, timeouts, or performance problems.

Techniques for large payloads:
* **Pagination:** If the external API supports it, retrieve data in smaller chunks using pagination parameters.
* **Streaming:** For sending large request bodies, consider if the API or `HttpClient` supports streaming the data rather than loading the entire payload into memory at once.
* **Compression:** Use compression (like GZIP) if supported by both ends to reduce the amount of data transferred over the network.
* **Background Processing:** As with other large data operations ([Data Operations and Transactions](/blog/bc-al-data-transactions)), offload the processing of large responses or the sending of large requests to a background session or Job Queue.
* **Process Data Iteratively:** When receiving large responses, process the data within the response body iteratively rather than loading the entire JSON or XML into AL variables if possible. Use `JsonToken` or XML stream readers.

## Navigating Authentication Complexities (OAuth 2.0)

Simple API key or Basic authentication is rare for secure, modern APIs. OAuth 2.0 is the de facto standard, involving multiple steps to obtain an access token. Implementing the OAuth flow from AL requires careful handling of HTTP requests to an identity provider (like Azure AD) to get the token, storing and refreshing the token, and including it correctly in subsequent API calls.

This often involves:
* Sending a POST request to a token endpoint with client credentials (Client ID, Client Secret) and scope.
* Handling the JSON response containing the `access_token` and `refresh_token`.
* Storing the token securely (e.g., in a setup table, possibly encrypted).
* Including the `access_token` in the `Authorization: Bearer <token>` header of API calls.
* Implementing logic to check token expiry and use the `refresh_token` to obtain a new access token without re-authenticating the user.

// Conceptual OAuth 2.0 Token Management Codeunit
codeunit 50310 "OAuth Token Manager"
{
    // Store these securely (Setup table, possibly encrypted)
    var
        ClientId: Text;
        ClientSecret: Text;
        TokenEndpointUrl: Text;
        Scope: Text;

        // Store the obtained token and refresh token
        AccessToken: Text;
        RefreshToken: Text;
        TokenExpiryDateTime: DateTime; // Track expiry

        Client: HttpClient; // Re-using HttpClient

    procedure GetAccessToken(): Text
    begin
        // Check if token is expired or needs refreshing
        if AccessToken = '' or (TokenExpiryDateTime < CurrentDateTime + 10S) then begin // Refresh if expired or expiring soon (10 seconds buffer)
            if RefreshToken <> '' then begin
                // Try to refresh using the refresh token
                if TryRefreshToken() then
                    exit(AccessToken) // Refresh successful
                else begin
                    // Refresh failed, need to get a new token using credentials
                    if TryGetNewTokenWithCredentials() then
                         exit(AccessToken) // New token successful
                    else
                         error('Failed to get or refresh OAuth token.'); // Both methods failed
                end;
            end else begin
                 // No refresh token, need to get a new token using credentials
                 if TryGetNewTokenWithCredentials() then
                    exit(AccessToken) // New token successful
                 else
                    error('Failed to get OAuth token with credentials.'); // Failed to get new token
            end;
        end else begin
            // Token is still valid
            exit(AccessToken);
        end;
    end;

    local procedure TryGetNewTokenWithCredentials(): Boolean
    var
        Request: HttpRequestMessage;
        Response: HttpResponseMessage;
        Content: HttpContent;
        JsonObj: JsonObject;
        IsSuccessful: Boolean;
    begin
        // Prepare request to token endpoint using client credentials (Grant Type: client_credentials or password flow, etc.)
        Request.Method := 'POST';
        Request.SetRequestUri(TokenEndpointUrl);
        Request.GetHeaders().Add('Content-Type', 'application/x-www-form-urlencoded'); // Or application/json depending on endpoint

        // Example body for client_credentials flow
        Content.WriteString(StrSubstNo('grant_type=client_credentials&client_id=%1&client_secret=%2&scope=%3',
                                     ClientId, ClientSecret, Scope));
        Request.Content := Content;

        IsSuccessful := false;
        if Client.Send(Request, Response) then begin
            if Response.IsSuccessStatusCode() then begin
                if Response.Content.ReadAs(JsonObj) then begin
                    // Parse the response
                    if JsonObj.Get('access_token', AccessToken) and JsonObj.Get('refresh_token', RefreshToken) then begin
                        // Assume 'expires_in' is in seconds
                        if JsonObj.Get('expires_in', JsonToken.Integer) then
                             TokenExpiryDateTime := CurrentDateTime + JsonToken.Integer * 1000; // Calculate expiry
                        else
                             TokenExpiryDateTime := CurrentDateTime + 3600 * 1000; // Default if no expiry (e.g., 1 hour)

                        IsSuccessful := true;
                    end;
                end;
            end;
        end;

        if NOT IsSuccessful then
            LogOAuthError('GetNewToken', Response.StatusCode, Response.ReasonPhrase, GetLastErrorText());

        exit(IsSuccessful);
    end;

    local procedure TryRefreshToken(): Boolean
    var
        Request: HttpRequestMessage;
        Response: HttpResponseMessage;
        Content: HttpContent;
        JsonObj: JsonObject;
        IsSuccessful: Boolean;
    begin
        // Prepare request to token endpoint using refresh token (Grant Type: refresh_token)
        Request.Method := 'POST';
        Request.SetRequestUri(TokenEndpointUrl);
        Request.GetHeaders().Add('Content-Type', 'application/x-www-form-urlencoded');

        Content.WriteString(StrSubstNo('grant_type=refresh_token&refresh_token=%1&client_id=%2&client_secret=%3',
                                     RefreshToken, ClientId, ClientSecret)); // Client secret often required for refresh
        Request.Content := Content;

        IsSuccessful := false;
        if Client.Send(Request, Response) then begin
            if Response.IsSuccessStatusCode() then begin
                if Response.Content.ReadAs(JsonObj) then begin
                     // Parse the response - should get new access_token and refresh_token
                     if JsonObj.Get('access_token', AccessToken) and JsonObj.Get('refresh_token', RefreshToken) then begin
                         if JsonObj.Get('expires_in', JsonToken.Integer) then
                             TokenExpiryDateTime := CurrentDateTime + JsonToken.Integer * 1000
                         else
                             TokenExpiryDateTime := CurrentDateTime + 3600 * 1000; // Default

                         IsSuccessful := true;
                     end;
                end;
            end;
        end;

         if NOT IsSuccessful then
            LogOAuthError('RefreshToken', Response.StatusCode, Response.ReasonPhrase, GetLastErrorText());

        exit(IsSuccessful);
    end;

    local procedure LogOAuthError(Step: Text; StatusCode: Integer; Reason: Text; ErrorText: Text);
    begin
         // Implement logging for OAuth failures
         // Use SessionSettings.LogMessage or custom log table
    end;

    // This codeunit would be used by your integration codeunits:
    // var
    //    OAuthManager: Codeunit "OAuth Token Manager";
    //    AccessToken: Text;
    //    Request: HttpRequestMessage;
    // begin
    //    AccessToken := OAuthManager.GetAccessToken(); // Get a valid token
    //    Request.GetHeaders().Add('Authorization', StrSubstNo('Bearer %1', AccessToken)); // Add token to request header
    //    // ... then send the request ...
    // end;
}

**The Secret:** Don't hardcode credentials in your code. Use setup tables. Abstract the OAuth flow into a dedicated codeunit or service that handles obtaining, storing, refreshing, and providing access tokens on demand. This keeps your core integration logic clean and secure.

## API Versioning and Change Management

External APIs evolve. New versions are released, endpoints change, or data structures are modified. How does your AL integration adapt?

* **Specify API Version:** Always specify the API version you are targeting in your requests (often in the URL or headers). This prevents unexpected breaks when the external service releases a new version you're not ready for.
* **Defensive Data Handling:** When processing JSON or XML responses, handle potential missing fields or unexpected data types gracefully. Check if elements exist before trying to access their values. Use `JsonToken.ReadValue()` with type checking or `JsonValue.IsType()` to validate data.
* **Wrapper Codeunits:** As discussed with base app interactions ([our post on Interface Thinking in AL](/blog/bc-al-interfaces)), wrap external API calls in your own service codeunits or interfaces. If the external API changes, you update only your wrapper codeunit, not every place that called the API.

**The Secret:** Treat external APIs like external contracts. Pin to specific versions, validate data received, and use wrapper codeunits to insulate your core logic from external changes.

## Conclusion: Master the Art of Connection

Building robust external integrations in Business Central AL is a critical skill that extends far beyond basic HTTP requests. It requires planning for failure with retry logic, managing data volumes, securely handling complex authentication like OAuth, and designing for change via API versioning and wrapper codeunits.

By implementing these advanced patterns, you can build integrations that are not only functional but also resilient, maintainable, and trustworthy under real-world conditions. Don't let the complexities of the outside world break your Business Central solution.

What's your toughest integration challenge in AL, and what patterns have you found most effective? Share your insights below!

---
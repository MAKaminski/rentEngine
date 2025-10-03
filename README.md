# RentEngine API Tester

A comprehensive testing framework for the RentEngine careers application API endpoint.

## Overview

This project provides tools to test and understand the RentEngine careers API endpoint (`app.rentengine.io/api/public/v1/careers/apply`) with various payload combinations and response validation.

## Features

- ✅ **TypeScript API Client** - Fully typed client for the RentEngine API
- 🧪 **Comprehensive Test Suite** - Multiple payload combinations and edge cases
- 🔧 **Mock Server** - Local testing without hitting production API
- 📊 **Response Analysis** - Detailed reporting on API responses
- 🛡️ **Validation** - Zod schema validation for requests and responses
- 🚀 **Jest Tests** - Unit tests with mocked responses

## Quick Start

```bash
# Install dependencies
npm install

# Run comprehensive API test suite
npm run api:test

# Test live API with minimal payload
npm run api:test -- live

# Start mock server for local testing
npm run api:test -- mock

# Run unit tests
npm test
```

## API Endpoint Details

**URL:** `https://app.rentengine.io/api/public/v1/careers/apply`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Required Fields
- `name` (string) - Applicant's full name
- `email` (string) - Valid email address
- `phoneNumber` (string) - Phone number
- `githubUrl` (string) OR `githubUsername` (string) - GitHub information

### Optional Fields
- `cvUrl` (string) - URL to CV document
- `resumeUrl` (string) - URL to resume document
- `desiredSalary` (string) - Salary expectations
- `desiredStartDate` (string) - Preferred start date
- `additionalInfo` (string) - Additional information
- `portfolioUrl` (string) - Portfolio website URL
- `linkedinUrl` (string) - LinkedIn profile URL
- `experience` (string) - Work experience description
- `skills` (string) - Skills and technologies
- `coverLetter` (string) - Cover letter content

## Example Usage

### Basic API Client Usage

```typescript
import { RentEngineApiClient } from './src/api/client';

const client = new RentEngineApiClient();

const application = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phoneNumber: '+1-555-123-4567',
  githubUrl: 'https://github.com/janedoe',
  additionalInfo: 'Passionate about React development'
};

const response = await client.submitApplication(application);
console.log(response);
```

### Testing with cURL

```bash
curl https://app.rentengine.io/api/public/v1/careers/apply \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phoneNumber": "+1-555-123-4567",
    "githubUrl": "https://github.com/janedoe"
  }'
```

### Testing with Python

```python
import requests

payload = {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phoneNumber": "+1-555-123-4567",
    "githubUrl": "https://github.com/janedoe"
}

response = requests.post(
    "https://app.rentengine.io/api/public/v1/careers/apply",
    json=payload,
    timeout=10
)

print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
```

## Test Payloads

The framework includes several test payloads:

- **minimal** - Required fields only
- **withUsername** - Using githubUsername instead of githubUrl
- **full** - All optional fields included
- **invalidEmail** - Invalid email format for error testing
- **missingGithub** - Missing GitHub information for validation testing
- **emptyFields** - Empty required fields
- **edge_cases** - Special characters, unicode names, long strings

## Response Format

Expected response structure:

```typescript
interface ApplicationResponse {
  success: boolean;
  message?: string;
  applicationId?: string;
  status?: string;
  errors?: string[];
  timestamp?: string;
  // Additional fields may be present
}
```

## Mock Server

For local testing without hitting the production API:

```typescript
import { SimpleMockServer } from './src/mock-server';

const server = new SimpleMockServer();
await server.start(3001); // Starts on port 3001

// Use mock API for testing
const mockApi = server.getMockApi();
const response = await mockApi.handleApplication(testPayload);
```

## Development

### Project Structure

```
src/
├── api/
│   └── client.ts           # API client implementation
├── types/
│   └── api.ts             # TypeScript types and schemas
├── __tests__/
│   └── api.test.ts        # Jest unit tests
├── test-payloads.ts       # Test data and edge cases
├── api-tester.ts          # Comprehensive test runner
├── mock-server.ts         # Local mock server
└── main.ts               # Main entry point
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript
- `npm run dev` - Run with ts-node for development
- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run api:test` - Run comprehensive API tests

### Configuration

The API client can be configured with custom settings:

```typescript
const client = new RentEngineApiClient({
  baseUrl: 'https://custom.api.com',
  timeout: 5000,
  retries: 3
});
```

## Testing Strategy

1. **Live API Testing** - Test actual endpoint with real requests
2. **Mock Testing** - Use local mock server for development
3. **Unit Testing** - Jest tests with mocked HTTP responses
4. **Validation Testing** - Test various payload combinations and edge cases
5. **Error Handling** - Test network errors, validation errors, and server errors

## Error Handling

The client handles various error scenarios:

- **Network Errors** - Connection timeouts, DNS failures
- **HTTP Errors** - 4xx and 5xx status codes
- **Validation Errors** - Invalid payload structure
- **Server Errors** - Internal server errors (500+)

## Contributing

1. Add new test cases to `test-payloads.ts`
2. Update response schemas in `types/api.ts` based on actual API responses
3. Add unit tests in `__tests__/api.test.ts`
4. Update documentation as needed

## License

MIT License

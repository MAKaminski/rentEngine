#!/usr/bin/env node

import { RentEngineApiClient } from './api/client';
import { TEST_PAYLOADS } from './test-payloads';
import { SimpleMockServer } from './mock-server';

async function runLiveApiTest(): Promise<void> {
  console.log('🌐 Testing Live RentEngine API...\n');
  
  const client = new RentEngineApiClient();
  
  // Test with minimal payload first
  const testPayload = TEST_PAYLOADS.minimal;
  console.log('📤 Sending test application:', JSON.stringify(testPayload, null, 2));
  
  try {
    const response = await client.submitApplication(testPayload);
    console.log('📥 Response received:');
    console.log(JSON.stringify(response, null, 2));
    
    if (response.success) {
      console.log('\n✅ Test successful! API is responding correctly.');
    } else {
      console.log('\n⚠️  Test completed but API returned error response.');
    }
  } catch (error) {
    console.log('\n❌ Test failed with error:', error);
  }
}

async function runComprehensiveTest(): Promise<void> {
  console.log('🧪 Running comprehensive API test suite...\n');
  
  const { ApiTester } = await import('./api-tester');
  const tester = new ApiTester();
  
  // Test endpoint info first
  await tester.testEndpointInfo();
  
  // Run all tests
  const results = await tester.runAllTests();
  
  // Generate report
  tester.generateReport(results);
}

async function runMockServer(): Promise<void> {
  console.log('🔧 Starting mock server for local testing...\n');
  
  const server = new SimpleMockServer();
  await server.start();
  
  // Demonstrate mock server usage
  const mockApi = server.getMockApi();
  
  console.log('\n📝 Testing mock server with sample payload...');
  const mockResponse = await mockApi.handleApplication(TEST_PAYLOADS.minimal);
  console.log('Mock response:', JSON.stringify(mockResponse, null, 2));
}

function showUsage(): void {
  console.log(`
🚀 RentEngine API Tester

Usage:
  npm run api:test              # Run comprehensive API test suite
  npm run api:test -- live      # Test live API with minimal payload
  npm run api:test -- mock      # Start mock server for local testing
  npm test                      # Run unit tests with Jest

Available commands:
  - live: Test the actual RentEngine API endpoint
  - mock: Start local mock server for testing
  - (default): Run comprehensive test suite

Examples:
  npm run api:test
  npm run api:test -- live
  npm run api:test -- mock
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'live':
      await runLiveApiTest();
      break;
    case 'mock':
      await runMockServer();
      break;
    case 'help':
    case '--help':
    case '-h':
      showUsage();
      break;
    default:
      await runComprehensiveTest();
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { RentEngineApiClient, TEST_PAYLOADS, SimpleMockServer };

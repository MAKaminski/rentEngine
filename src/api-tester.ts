import { RentEngineApiClient } from './api/client';
import { TEST_PAYLOADS, EDGE_CASES } from './test-payloads';
import { ApplicationRequestSchema } from './types/api';

interface TestResult {
  payloadName: string;
  payload: any;
  response: any;
  validationErrors?: string[];
  success: boolean;
  duration: number;
}

class ApiTester {
  private client: RentEngineApiClient;

  constructor(baseUrl?: string) {
    this.client = new RentEngineApiClient(
      baseUrl ? { baseUrl } : undefined
    );
  }

  async runSingleTest(payloadName: string, payload: any): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // Validate payload before sending
      const validationResult = ApplicationRequestSchema.safeParse(payload);
      
      if (!validationResult.success) {
        return {
          payloadName,
          payload,
          response: null,
          validationErrors: validationResult.error.errors.map(e => e.message),
          success: false,
          duration: Date.now() - startTime,
        };
      }

      const response = await this.client.submitApplication(validationResult.data);
      
      return {
        payloadName,
        payload,
        response,
        success: response.success || false,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      return {
        payloadName,
        payload,
        response: { error: error instanceof Error ? error.message : 'Unknown error' },
        success: false,
        duration: Date.now() - startTime,
      };
    }
  }

  async runAllTests(): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    console.log('🧪 Starting API tests...\n');
    
    // Test basic payloads
    for (const [name, payload] of Object.entries(TEST_PAYLOADS)) {
      console.log(`Testing ${name}...`);
      const result = await this.runSingleTest(name, payload);
      results.push(result);
      this.logResult(result);
    }
    
    // Test edge cases
    for (const [name, payload] of Object.entries(EDGE_CASES)) {
      console.log(`Testing edge case: ${name}...`);
      const result = await this.runSingleTest(`edge_${name}`, payload);
      results.push(result);
      this.logResult(result);
    }
    
    return results;
  }

  async testEndpointInfo(): Promise<void> {
    console.log('🔍 Testing endpoint information...\n');
    
    try {
      const info = await this.client.testEndpoint();
      console.log('Endpoint Response:');
      console.log(`Status: ${info.status}`);
      console.log('Headers:', JSON.stringify(info.headers, null, 2));
      console.log('Body:', JSON.stringify(info.body, null, 2));
    } catch (error) {
      console.log('Endpoint test failed:', error);
    }
  }

  private logResult(result: TestResult): void {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.payloadName} (${result.duration}ms)`);
    
    if (result.validationErrors) {
      console.log(`   Validation errors: ${result.validationErrors.join(', ')}`);
    }
    
    if (result.response) {
      console.log(`   Response:`, JSON.stringify(result.response, null, 2));
    }
    console.log('');
  }

  generateReport(results: TestResult[]): void {
    console.log('\n📊 Test Report Summary');
    console.log('====================');
    
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    
    console.log(`Total tests: ${total}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${total - successful}`);
    console.log(`Success rate: ${((successful / total) * 100).toFixed(1)}%`);
    
    const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / total;
    console.log(`Average duration: ${avgDuration.toFixed(0)}ms`);
    
    console.log('\nFailed tests:');
    results
      .filter(r => !r.success)
      .forEach(r => console.log(`- ${r.payloadName}: ${r.validationErrors?.join(', ') || 'API error'}`));
  }
}

async function main() {
  const tester = new ApiTester();
  
  // Test endpoint info first
  await tester.testEndpointInfo();
  
  // Run all tests
  const results = await tester.runAllTests();
  
  // Generate report
  tester.generateReport(results);
}

if (require.main === module) {
  main().catch(console.error);
}

export { ApiTester };

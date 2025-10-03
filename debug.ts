import { RentEngineApiClient } from './src/api/client';
import { createMinimalApplication } from './src/generate-application';

async function main() {
  console.log('🚀 RentEngine Debug - Testing API');
  
  const client = new RentEngineApiClient();
  
  // Create minimal application
  const app = createMinimalApplication();
  console.log('📋 Application:', JSON.stringify(app, null, 2));
  
  // Test API
  try {
    const response = await client.submitApplication(app);
    console.log('📥 Response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.log('❌ Error:', error);
  }
}

main();
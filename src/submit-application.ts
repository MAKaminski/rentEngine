#!/usr/bin/env node

import { RentEngineApiClient } from './api/client';
import { 
  createMichaelKaminskiApplication, 
  createMinimalApplication, 
  createApplicationWithPlaceholders 
} from './generate-application';
import { ApplicationRequestSchema } from './types/api';

async function validateAndSubmit(application: any, client: RentEngineApiClient, label: string): Promise<void> {
  console.log(`\n🧪 Testing ${label} application...`);
  console.log('📤 Payload:', JSON.stringify(application, null, 2));
  
  try {
    // Validate payload
    const validationResult = ApplicationRequestSchema.safeParse(application);
    if (!validationResult.success) {
      console.log('❌ Validation failed:');
      validationResult.error.errors.forEach(error => {
        console.log(`   - ${error.path.join('.')}: ${error.message}`);
      });
      return;
    }
    
    console.log('✅ Payload validation passed');
    
    // Submit application
    const response = await client.submitApplication(validationResult.data);
    
    console.log('📥 Response:');
    console.log(JSON.stringify(response, null, 2));
    
    if (response.success) {
      console.log('🎉 Application submitted successfully!');
    } else {
      console.log('⚠️  Application submission failed');
    }
    
  } catch (error) {
    console.log('❌ Error:', error);
  }
}

async function main(): Promise<void> {
  const client = new RentEngineApiClient();
  
  console.log('🚀 RentEngine Application Submission Tool');
  console.log('==========================================');
  
  // Test 1: Minimal application (just required fields)
  const minimalApp = createMinimalApplication();
  await validateAndSubmit(minimalApp, client, 'Minimal');
  
  // Test 2: Full application with placeholders
  const fullApp = createApplicationWithPlaceholders();
  await validateAndSubmit(fullApp, client, 'Full with Placeholders');
  
  // Test 3: Generated application (if you want to test the actual submission)
  const generatedApp = createMichaelKaminskiApplication();
  console.log('\n📋 Generated Application Preview:');
  console.log('================================');
  console.log(`Name: ${generatedApp.name}`);
  console.log(`Email: ${generatedApp.email}`);
  console.log(`Phone: ${generatedApp.phoneNumber}`);
  console.log(`Desired Salary: ${generatedApp.desiredSalary}`);
  console.log(`Start Date: ${generatedApp.desiredStartDate}`);
  console.log(`Cover Letter Length: ${generatedApp.coverLetter?.length || 0} characters`);
  console.log(`Experience Length: ${generatedApp.experience?.length || 0} characters`);
  console.log(`Skills: ${generatedApp.skills?.split('\n').length || 0} lines`);
  
  // Uncomment the line below to actually submit the generated application
  // await validateAndSubmit(generatedApp, client, 'Generated Full Application');
  
  console.log('\n📝 Next Steps:');
  console.log('==============');
  console.log('1. Update githubUrl, portfolioUrl, and linkedinUrl from your resume');
  console.log('2. Generate Google Drive URLs for CV and Resume');
  console.log('3. Uncomment the submission line in the code to submit the actual application');
  console.log('4. Review the generated cover letter and modify if needed');
}

if (require.main === module) {
  main().catch(console.error);
}

export { main as submitApplication };

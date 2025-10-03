import { ApplicationRequestSchema } from './src/types/api';

const payload = {
  "name": "Michael Kaminski",
  "email": "michael@michael-kaminski.io",
  "phoneNumber": "4045419010",
  "githubUrl": "https://github.com/MAKaminski",
  "linkedinUrl": "https://www.linkedin.com/in/makaminski",
  "portfolioUrl": "https://michael-kaminski.io",
  "resumeUrl": "https://docs.google.com/document/d/1Cp4sREvlL69ExgCFA1NBUAljyD_JeI7c/edit?usp=sharing&ouid=111688004260369651305&rtpof=true&sd=true",
  "cvUrl": "https://docs.google.com/document/d/1OqvshPDnGfQE-zPrrpYppN0tDk413Xwu8_GylwPynEU/edit?usp=sharing",
  "desiredSalary": "180000",
  "desiredStartDate": "2025-11-01",
  "coverLetter": "Dear Hiring Team at RentEngine,\n\nI am excited to apply for the Senior Software Engineer role. My background combines deep finance and SaaS leadership with full-stack coding expertise, making me uniquely positioned to deliver at the intersection of product and engineering. Over 15 years, I've built and scaled financial technology systems (GreenSky, Momnt, Superior Contracting) while also coding full-stack in modern frameworks like React, NextJS, Python, Node, and Postgres/Supabase. \n\nWhat draws me to RentEngine is the mission of transforming leasing teams' workflows with a smart CRM and seamless automation. Having built systems that handle mission-critical financial data, I understand the importance of building A-grade products on A+ timelines, then iterating them to excellence. I thrive in ambiguous, high-intensity environments where ownership and accountability drive outcomes. \n\nI would welcome the opportunity to bring my engineering expertise, finance background, and customer-first mindset to RentEngine.\n\nBest regards,\nMichael Kaminski",
  "additionalInfo": "Full-stack engineer with SaaS, fintech, and services experience. Skilled in React, NextJS, Supabase, Python, and AWS. Passionate about product reliability and user experience."
};

console.log('🔍 Validating RentEngine Application Payload');
console.log('==========================================');

// Validate with Zod schema
const validationResult = ApplicationRequestSchema.safeParse(payload);

if (validationResult.success) {
  console.log('✅ VALIDATION PASSED - All fields are correct!');
  console.log('\n📋 Validated Application Summary:');
  console.log('================================');
  console.log(`Name: ${payload.name}`);
  console.log(`Email: ${payload.email}`);
  console.log(`Phone: ${payload.phoneNumber}`);
  console.log(`GitHub: ${payload.githubUrl}`);
  console.log(`LinkedIn: ${payload.linkedinUrl}`);
  console.log(`Portfolio: ${payload.portfolioUrl}`);
  console.log(`Resume: ${payload.resumeUrl}`);
  console.log(`CV: ${payload.cvUrl}`);
  console.log(`Desired Salary: $${parseInt(payload.desiredSalary).toLocaleString()}`);
  console.log(`Start Date: ${payload.desiredStartDate}`);
  console.log(`Cover Letter Length: ${payload.coverLetter.length} characters`);
  console.log(`Additional Info Length: ${payload.additionalInfo.length} characters`);
  
  console.log('\n🎯 Content Analysis:');
  console.log('===================');
  
  // Check if cover letter mentions RentEngine
  if (payload.coverLetter.toLowerCase().includes('rentengine')) {
    console.log('✅ Cover letter mentions RentEngine');
  } else {
    console.log('⚠️  Cover letter does not mention RentEngine');
  }
  
  // Check tech stack alignment
  const techStack = ['react', 'nextjs', 'supabase', 'postgres', 'aws', 'python', 'node'];
  const mentionedTech = techStack.filter(tech => 
    payload.coverLetter.toLowerCase().includes(tech) || 
    payload.additionalInfo.toLowerCase().includes(tech)
  );
  console.log(`✅ Mentions ${mentionedTech.length}/${techStack.length} relevant technologies: ${mentionedTech.join(', ')}`);
  
  // Check URL formats
  console.log('\n🔗 URL Validation:');
  const urls = [
    { name: 'GitHub', url: payload.githubUrl },
    { name: 'LinkedIn', url: payload.linkedinUrl },
    { name: 'Portfolio', url: payload.portfolioUrl },
    { name: 'Resume', url: payload.resumeUrl },
    { name: 'CV', url: payload.cvUrl }
  ];
  
  urls.forEach(({ name, url }) => {
    if (url && url.startsWith('http')) {
      console.log(`✅ ${name}: Valid URL`);
    } else {
      console.log(`❌ ${name}: Invalid URL format`);
    }
  });
  
  // Check date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(payload.desiredStartDate)) {
    console.log('✅ Start date format is correct (YYYY-MM-DD)');
  } else {
    console.log('❌ Start date format should be YYYY-MM-DD');
  }
  
  // Check salary format
  if (/^\d+$/.test(payload.desiredSalary)) {
    console.log('✅ Salary format is numeric');
  } else {
    console.log('❌ Salary should be numeric only');
  }
  
  console.log('\n🚀 Ready to submit this application!');
  
} else {
  console.log('❌ VALIDATION FAILED:');
  console.log('====================');
  validationResult.error.errors.forEach(error => {
    console.log(`❌ ${error.path.join('.')}: ${error.message}`);
  });
}
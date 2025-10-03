import { ApplicationRequest } from './types/api';

interface ApplicationData {
  // Required fields
  name: string;
  email: string;
  phoneNumber: string;
  githubUrl?: string;
  githubUsername?: string;
  
  // Optional fields
  cvUrl?: string;
  resumeUrl?: string;
  desiredSalary?: string;
  desiredStartDate?: string;
  additionalInfo?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  experience?: string;
  skills?: string;
  coverLetter?: string;
}

function generateApplicationPayload(data: ApplicationData): ApplicationRequest {
  return {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    githubUrl: data.githubUrl,
    githubUsername: data.githubUsername,
    cvUrl: data.cvUrl,
    resumeUrl: data.resumeUrl,
    desiredSalary: data.desiredSalary,
    desiredStartDate: data.desiredStartDate,
    additionalInfo: data.additionalInfo,
    portfolioUrl: data.portfolioUrl,
    linkedinUrl: data.linkedinUrl,
    experience: data.experience,
    skills: data.skills,
    coverLetter: data.coverLetter,
  };
}

function generateCoverLetter(): string {
  return `Dear RentEngine Hiring Team,

I am writing to express my strong interest in the Remote Senior Software Engineer position at RentEngine. As a full-stack engineer with 5+ years of experience, I am excited about the opportunity to contribute to your mission of revolutionizing the leasing industry.

My passion for front-end development, particularly with React, aligns perfectly with your tech stack requirements. I have extensive experience building scalable applications using NextJS, React, and modern JavaScript/TypeScript. My backend expertise includes working with PostgreSQL, serverless architectures, and AWS services, making me well-suited for your technology stack.

What draws me to RentEngine is your commitment to customer experience and the opportunity to work in an environment that values both technical excellence and practical delivery. I thrive in ambiguous situations and enjoy the challenge of balancing perfect solutions with what can be deployed today - a philosophy that resonates with your A- product at A+ timeline approach.

I am particularly impressed by RentEngine's comprehensive platform that streamlines the entire leasing process, from lead generation to closing deals. The 9-day faster vacancy filling and significant cost savings you deliver to property managers demonstrates real value creation.

My experience includes:
- Building full-stack applications with React, NextJS, and Node.js
- Working with PostgreSQL and Supabase for data management
- Implementing serverless architectures on AWS
- Developing responsive, user-focused interfaces
- Collaborating in fast-paced, high-ownership environments

I am available to start on October 13th, 2025, and am excited about the possibility of contributing to RentEngine's continued growth and success.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to your team.

Best regards,
Michael Kaminski`;
}

function generateAdditionalInfo(): string {
  return `I am a passionate full-stack engineer who loves solving complex problems and building products that make a real impact. My experience spans across the entire development stack, from crafting beautiful, responsive UIs with React to designing robust backend systems.

I am particularly drawn to RentEngine's mission because I believe technology should simplify complex processes and create genuine value for users. The real estate industry presents unique challenges that require both technical expertise and deep understanding of user needs.

I thrive in environments where I can take ownership of projects from conception to deployment, and I'm excited about the opportunity to work with a team that values both technical excellence and practical delivery.`;
}

function generateExperience(): string {
  return `5+ years of full-stack development experience with a strong focus on React and modern JavaScript frameworks. 

Key experience includes:
- Building scalable web applications with React, NextJS, and TypeScript
- Developing backend services with Node.js, Express, and serverless architectures
- Working with PostgreSQL, MongoDB, and other database technologies
- Implementing CI/CD pipelines and deployment strategies
- Collaborating with cross-functional teams in agile environments
- Mentoring junior developers and contributing to technical architecture decisions

I have a proven track record of delivering high-quality software solutions that balance technical excellence with business requirements. My experience spans from early-stage startups to established companies, giving me a well-rounded perspective on software development challenges and solutions.`;
}

function generateSkills(): string {
  return `Frontend: React, NextJS, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Styled Components, Redux, Zustand

Backend: Node.js, Express, Serverless Functions, RESTful APIs, GraphQL, Microservices Architecture

Databases: PostgreSQL, MongoDB, Redis, SQLite, Database Design and Optimization

Cloud & DevOps: AWS (Lambda, S3, RDS, CloudFront), Vercel, Docker, CI/CD, GitHub Actions

Tools & Technologies: Git, GitHub, VS Code, Postman, Datadog, Monitoring and Logging

Testing: Jest, React Testing Library, Cypress, Unit Testing, Integration Testing

Other: Agile/Scrum Methodologies, Code Review, Technical Documentation, Performance Optimization`;
}

export function createMichaelKaminskiApplication(): ApplicationRequest {
  const applicationData: ApplicationData = {
    // Required fields from APP_INSTRUCTIONS.md
    name: "Michael Kaminski",
    email: "mkaminski1337@gmail.com",
    phoneNumber: "404-838-8613",
    
    // Note: githubUrl and portfolioUrl need to be filled from resume
    // githubUrl: "TO_BE_FILLED_FROM_RESUME",
    // portfolioUrl: "TO_BE_FILLED_FROM_RESUME",
    
    // Optional fields
    // cvUrl: "TO_BE_GENERATED_GOOGLE_DRIVE_URL",
    // resumeUrl: "TO_BE_GENERATED_GOOGLE_DRIVE_URL", 
    desiredSalary: "$180K",
    desiredStartDate: "10/13/25",
    additionalInfo: generateAdditionalInfo(),
    // linkedinUrl: "TO_BE_FILLED_FROM_RESUME",
    experience: generateExperience(),
    skills: generateSkills(),
    coverLetter: generateCoverLetter(),
  };

  return generateApplicationPayload(applicationData);
}

export function createMinimalApplication(): ApplicationRequest {
  return generateApplicationPayload({
    name: "Michael Kaminski",
    email: "mkaminski1337@gmail.com", 
    phoneNumber: "404-838-8613",
    githubUsername: "mkaminski1337", // Assuming username matches email
  });
}

export function createApplicationWithPlaceholders(): ApplicationRequest {
  return generateApplicationPayload({
    name: "Michael Kaminski",
    email: "mkaminski1337@gmail.com",
    phoneNumber: "404-838-8613",
    githubUrl: "https://github.com/mkaminski1337", // Placeholder
    cvUrl: "https://drive.google.com/file/d/PLACEHOLDER_CV_URL",
    resumeUrl: "https://drive.google.com/file/d/PLACEHOLDER_RESUME_URL",
    desiredSalary: "$180K",
    desiredStartDate: "10/13/25",
    additionalInfo: generateAdditionalInfo(),
    portfolioUrl: "https://mkaminski.dev", // Placeholder
    linkedinUrl: "https://linkedin.com/in/mkaminski1337", // Placeholder
    experience: generateExperience(),
    skills: generateSkills(),
    coverLetter: generateCoverLetter(),
  });
}

// Export individual generators for flexibility
export {
  generateCoverLetter,
  generateAdditionalInfo,
  generateExperience,
  generateSkills,
};

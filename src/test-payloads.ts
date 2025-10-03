import { ApplicationRequest } from './types/api';

export const TEST_PAYLOADS = {
  minimal: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phoneNumber: '+1-555-123-4567',
    githubUrl: 'https://github.com/janedoe',
  } as ApplicationRequest,

  withUsername: {
    name: 'John Smith',
    email: 'john@example.com',
    phoneNumber: '+1-555-987-6543',
    githubUsername: 'johnsmith',
  } as ApplicationRequest,

  full: {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phoneNumber: '+1-555-456-7890',
    githubUrl: 'https://github.com/alicejohnson',
    cvUrl: 'https://example.com/cv.pdf',
    resumeUrl: 'https://example.com/resume.pdf',
    desiredSalary: '$120,000 - $150,000',
    desiredStartDate: '2024-02-01',
    additionalInfo: 'Passionate about React and full-stack development',
    portfolioUrl: 'https://alicejohnson.dev',
    linkedinUrl: 'https://linkedin.com/in/alicejohnson',
    experience: '5+ years full-stack development',
    skills: 'React, TypeScript, Node.js, PostgreSQL',
    coverLetter: 'I am excited about the opportunity...',
  } as ApplicationRequest,

  invalidEmail: {
    name: 'Bob Wilson',
    email: 'invalid-email',
    phoneNumber: '+1-555-111-2222',
    githubUrl: 'https://github.com/bobwilson',
  } as ApplicationRequest,

  missingGithub: {
    name: 'Carol Brown',
    email: 'carol@example.com',
    phoneNumber: '+1-555-333-4444',
  } as Partial<ApplicationRequest>,

  emptyFields: {
    name: '',
    email: '',
    phoneNumber: '',
    githubUrl: '',
  } as ApplicationRequest,
};

export const EDGE_CASES = {
  longName: {
    name: 'A'.repeat(100),
    email: 'longname@example.com',
    phoneNumber: '+1-555-555-5555',
    githubUrl: 'https://github.com/longname',
  } as ApplicationRequest,

  specialCharacters: {
    name: "O'Connor-Smith",
    email: 'test+tag@example.com',
    phoneNumber: '+1 (555) 123-4567',
    githubUrl: 'https://github.com/oconnor-smith',
  } as ApplicationRequest,

  unicodeName: {
    name: 'José María',
    email: 'jose@example.com',
    phoneNumber: '+1-555-777-8888',
    githubUrl: 'https://github.com/josemaria',
  } as ApplicationRequest,
};

import { z } from 'zod';

// Request schemas
export const ApplicationRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  githubUrl: z.string().url().optional(),
  githubUsername: z.string().min(1).optional(),
  cvUrl: z.string().url().optional(),
  resumeUrl: z.string().url().optional(),
  desiredSalary: z.string().optional(),
  desiredStartDate: z.string().optional(),
  additionalInfo: z.string().optional(),
  portfolioUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  experience: z.string().optional(),
  skills: z.string().optional(),
  coverLetter: z.string().optional(),
}).refine(
  (data) => data.githubUrl || data.githubUsername,
  {
    message: "Either githubUrl or githubUsername is required",
    path: ["githubUrl", "githubUsername"],
  }
);

export type ApplicationRequest = z.infer<typeof ApplicationRequestSchema>;

// Response schemas (to be updated based on actual API response)
export const ApplicationResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  applicationId: z.string().optional(),
  status: z.string().optional(),
  errors: z.array(z.string()).optional(),
  timestamp: z.string().optional(),
}).passthrough(); // Allow additional fields

export type ApplicationResponse = z.infer<typeof ApplicationResponseSchema>;

// API configuration
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: 'https://app.rentengine.io/api/public/v1',
  timeout: 10000,
  retries: 3,
};

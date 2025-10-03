import { ApplicationRequest, ApplicationResponse } from './types/api';

export class MockRentEngineServer {
  private applications: Array<ApplicationRequest & { id: string; timestamp: string }> = [];
  private shouldFail = false;
  private failureMode: 'validation' | 'server' | 'network' = 'validation';

  setFailureMode(mode: 'validation' | 'server' | 'network' | null): void {
    this.shouldFail = mode !== null;
    this.failureMode = mode || 'validation';
  }

  async handleApplication(request: ApplicationRequest): Promise<ApplicationResponse> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

    if (this.shouldFail) {
      return this.generateFailureResponse();
    }

    // Validate required fields
    if (!request.name || !request.email || !request.phoneNumber) {
      return {
        success: false,
        message: 'Missing required fields',
        errors: ['name, email, and phoneNumber are required'],
        status: 'validation_error',
        timestamp: new Date().toISOString(),
      };
    }

    if (!request.githubUrl && !request.githubUsername) {
      return {
        success: false,
        message: 'GitHub information required',
        errors: ['Either githubUrl or githubUsername is required'],
        status: 'validation_error',
        timestamp: new Date().toISOString(),
      };
    }

    // Store application
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.applications.push({
      ...request,
      id: applicationId,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Application submitted successfully',
      applicationId,
      status: 'submitted',
      timestamp: new Date().toISOString(),
    };
  }

  async getEndpointInfo(): Promise<any> {
    return {
      message: 'Careers application endpoint',
      methods: ['POST'],
      requiredFields: ['name', 'email', 'phoneNumber', 'githubUrl|githubUsername'],
      optionalFields: [
        'cvUrl', 'resumeUrl', 'desiredSalary', 'desiredStartDate',
        'additionalInfo', 'portfolioUrl', 'linkedinUrl', 'experience',
        'skills', 'coverLetter'
      ],
      timestamp: new Date().toISOString(),
    };
  }

  getApplications(): Array<ApplicationRequest & { id: string; timestamp: string }> {
    return [...this.applications];
  }

  clearApplications(): void {
    this.applications = [];
  }

  private generateFailureResponse(): ApplicationResponse {
    switch (this.failureMode) {
      case 'validation':
        return {
          success: false,
          message: 'Validation failed',
          errors: ['Simulated validation error'],
          status: 'validation_error',
          timestamp: new Date().toISOString(),
        };
      
      case 'server':
        return {
          success: false,
          message: 'Internal server error',
          errors: ['Simulated server error'],
          status: 'server_error',
          timestamp: new Date().toISOString(),
        };
      
      case 'network':
        throw new Error('Simulated network error');
      
      default:
        return {
          success: false,
          message: 'Unknown error',
          errors: ['Unknown error'],
          status: 'unknown_error',
          timestamp: new Date().toISOString(),
        };
    }
  }
}

// Simple HTTP server simulation
export class SimpleMockServer {
  private mockApi: MockRentEngineServer;

  constructor() {
    this.mockApi = new MockRentEngineServer();
  }

  async start(port: number = 3001): Promise<void> {
    console.log(`🚀 Mock server would start on port ${port}`);
    console.log('📝 Available endpoints:');
    console.log(`   POST http://localhost:${port}/api/public/v1/careers/apply`);
    console.log(`   GET  http://localhost:${port}/api/public/v1/careers/apply`);
    console.log('\n💡 Use this for local testing instead of hitting production API');
  }

  getMockApi(): MockRentEngineServer {
    return this.mockApi;
  }
}

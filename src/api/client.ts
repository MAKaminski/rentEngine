import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApplicationRequest, ApplicationResponse, ApiConfig, DEFAULT_API_CONFIG } from '../types/api';

export class RentEngineApiClient {
  private client: AxiosInstance;
  private config: ApiConfig;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...DEFAULT_API_CONFIG, ...config };
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async submitApplication(application: ApplicationRequest): Promise<ApplicationResponse> {
    try {
      const response: AxiosResponse = await this.client.post('/careers/apply', application);
      
      return {
        success: response.status >= 200 && response.status < 300,
        status: response.status.toString(),
        timestamp: new Date().toISOString(),
        ...response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          status: error.response?.status?.toString() || '0',
          message: error.message,
          errors: error.response?.data?.errors || [error.message],
          timestamp: new Date().toISOString(),
        };
      }
      
      return {
        success: false,
        status: '0',
        message: 'Unknown error occurred',
        errors: ['Unknown error occurred'],
        timestamp: new Date().toISOString(),
      };
    }
  }

  async testEndpoint(): Promise<{ status: number; headers: Record<string, string>; body: any }> {
    try {
      const response = await this.client.get('/careers/apply');
      return {
        status: response.status,
        headers: Object.fromEntries(
          Object.entries(response.headers).map(([key, value]) => [key, String(value)])
        ),
        body: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.response?.status || 0,
          headers: error.response?.headers ? 
            Object.fromEntries(
              Object.entries(error.response.headers).map(([key, value]) => [key, String(value)])
            ) : {},
          body: error.response?.data || null,
        };
      }
      throw error;
    }
  }

  getConfig(): ApiConfig {
    return { ...this.config };
  }
}

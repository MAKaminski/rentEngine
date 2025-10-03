import nock from 'nock';
import { RentEngineApiClient } from '../api/client';
import { TEST_PAYLOADS } from '../test-payloads';
import { ApplicationResponse } from '../types/api';

describe('RentEngine API Client', () => {
  let client: RentEngineApiClient;
  const baseUrl = 'https://app.rentengine.io';

  beforeEach(() => {
    client = new RentEngineApiClient({ baseUrl });
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('submitApplication', () => {
    it('should submit minimal application successfully', async () => {
      const mockResponse: ApplicationResponse = {
        success: true,
        message: 'Application submitted successfully',
        applicationId: 'app_123',
        status: 'submitted',
        timestamp: new Date().toISOString(),
      };

      nock(baseUrl)
        .post('/api/public/v1/careers/apply')
        .reply(200, mockResponse);

      const result = await client.submitApplication(TEST_PAYLOADS.minimal);

      expect(result.success).toBe(true);
      expect(result.applicationId).toBe('app_123');
      expect(result.message).toBe('Application submitted successfully');
    });

    it('should handle validation errors', async () => {
      const mockResponse = {
        success: false,
        message: 'Validation failed',
        errors: ['Email format is invalid'],
        status: 'validation_error',
      };

      nock(baseUrl)
        .post('/api/public/v1/careers/apply')
        .reply(400, mockResponse);

      const result = await client.submitApplication(TEST_PAYLOADS.invalidEmail);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Email format is invalid');
    });

    it('should handle server errors', async () => {
      nock(baseUrl)
        .post('/api/public/v1/careers/apply')
        .reply(500, { message: 'Internal server error' });

      const result = await client.submitApplication(TEST_PAYLOADS.minimal);

      expect(result.success).toBe(false);
      expect(result.status).toBe('500');
      expect(result.message).toContain('Internal server error');
    });

    it('should handle network errors', async () => {
      nock(baseUrl)
        .post('/api/public/v1/careers/apply')
        .replyWithError('Network error');

      const result = await client.submitApplication(TEST_PAYLOADS.minimal);

      expect(result.success).toBe(false);
      expect(result.status).toBe('0');
      expect(result.message).toBe('Network error');
    });

    it('should submit full application with all fields', async () => {
      const mockResponse: ApplicationResponse = {
        success: true,
        message: 'Application submitted successfully',
        applicationId: 'app_456',
        status: 'submitted',
        timestamp: new Date().toISOString(),
      };

      nock(baseUrl)
        .post('/api/public/v1/careers/apply')
        .reply(200, mockResponse);

      const result = await client.submitApplication(TEST_PAYLOADS.full);

      expect(result.success).toBe(true);
      expect(result.applicationId).toBe('app_456');
    });
  });

  describe('testEndpoint', () => {
    it('should return endpoint information', async () => {
      const mockResponse = {
        message: 'Careers application endpoint',
        methods: ['POST'],
        requiredFields: ['name', 'email', 'phoneNumber', 'githubUrl|githubUsername'],
      };

      nock(baseUrl)
        .get('/api/public/v1/careers/apply')
        .reply(200, mockResponse);

      const result = await client.testEndpoint();

      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockResponse);
    });
  });

  describe('configuration', () => {
    it('should use custom configuration', () => {
      const customClient = new RentEngineApiClient({
        baseUrl: 'https://custom.api.com',
        timeout: 5000,
      });

      const config = customClient.getConfig();
      expect(config.baseUrl).toBe('https://custom.api.com');
      expect(config.timeout).toBe(5000);
    });
  });
});

import { supabase } from "@/integrations/supabase/client";

// External API Configuration
const GCP_FUNCTION_URL = 'https://asia-south1-healthpay-434611.cloudfunctions.net/swasthx';

export interface ProcessedMedicalData {
  data: {
    reportInfo: {
      patientName?: string;
      date?: string;
      type?: string;
    };
    results: Array<{
      parameterCode: string;
      value: number;
      unit?: string;
    }>;
  };
  url?: string;
}

export interface UploadResponse {
  success: boolean;
  data?: ProcessedMedicalData;
  error?: string;
}

/**
 * External API Service for processing medical reports
 * Handles communication with GCP Cloud Functions for OCR and AI processing
 */
export class ExternalApiService {
  /**
   * Process a medical report PDF using external GCP function
   * @param file - PDF file to process
   * @param onProgress - Progress callback function
   * @returns Promise<UploadResponse>
   */
  static async processMedicalReport(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> {
    try {
      // Validate file type
      if (file.type !== 'application/pdf') {
        throw new Error('Invalid file type. Please upload a PDF file.');
      }

      // Get authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress updates
      if (onProgress) {
        const progressInterval = setInterval(() => {
          onProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 500);
      }

      // Call external GCP function
      const response = await fetch(GCP_FUNCTION_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`External processing failed: ${response.status} - ${errorText}`);
      }

      const data: ProcessedMedicalData = await response.json();
      console.log('External API Response:', data);

      if (onProgress) {
        onProgress(100);
      }

      return {
        success: true,
        data,
      };

    } catch (error) {
      console.error('External API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Validate processed medical data structure
   * @param data - Processed data from external API
   * @returns boolean
   */
  static validateProcessedData(data: any): data is ProcessedMedicalData {
    return (
      data &&
      typeof data === 'object' &&
      data.data &&
      typeof data.data === 'object' &&
      data.data.reportInfo &&
      typeof data.data.reportInfo === 'object' &&
      Array.isArray(data.data.results)
    );
  }

  /**
   * Get external service status
   * @returns Promise<boolean>
   */
  static async checkServiceHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${GCP_FUNCTION_URL}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.warn('External service health check failed:', error);
      return false;
    }
  }
}




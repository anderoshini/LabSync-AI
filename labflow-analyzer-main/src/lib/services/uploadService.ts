
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { getParameterId } from "./parameterService";

type TestType = Database["public"]["Enums"]["test_type"];

export const processAndStoreResults = async (
  data: any,
  userId: string,
  filePath: string,
  onError: (message: string) => void
) => {
  const reportType = data.data.reportInfo.type?.toLowerCase() || 'unknown';
  const testType = reportType as TestType;

  // Store the report reference in Supabase
  const { error: dbError } = await supabase
    .from('reports')
    .insert({
      user_id: userId,
      file_path: filePath,
      file_url: data.url || '',
      status: 'processed',
      patient_name: data.data.reportInfo.patientName || 'Unknown',
      report_type: reportType,
      report_date: data.data.reportInfo.date || new Date().toISOString().split('T')[0],
      processed_data: data.data
    });

  if (dbError) throw dbError;

  // Store test results with proper parameter mapping
  if (data.data.results && Array.isArray(data.data.results)) {
    for (const result of data.data.results) {
      const parameterData = await getParameterId(result.parameterCode, testType);
      
      if (parameterData?.id) {
        const { error: testResultError } = await supabase
          .from('test_results')
          .insert({
            user_id: userId,
            test_date: data.data.reportInfo.date || new Date().toISOString().split('T')[0],
            value: result.value,
            parameter_id: parameterData.id,
            test_type: parameterData.test_type
          });

        if (testResultError) {
          console.error('Error storing test result:', testResultError);
          onError(`Some test results could not be stored: ${result.parameterCode}`);
        }
      } else {
        console.warn(`No matching parameter found for test code: ${result.parameterCode} and type: ${testType}`);
        onError(`Parameter not found: ${result.parameterCode}`);
      }
    }
  }
};

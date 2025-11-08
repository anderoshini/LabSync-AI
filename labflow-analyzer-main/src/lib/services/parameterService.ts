
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { normalizeTestCode } from "../utils/testCodeUtils";

type TestType = Database["public"]["Enums"]["test_type"];

export const getParameterId = async (testCode: string, testType: string) => {
  console.log('Fetching parameter for code:', testCode, 'and type:', testType);
  const normalizedCode = normalizeTestCode(testCode);
  const normalizedType = testType.toLowerCase().replace(/\s+/g, '_') as TestType;
  
  const { data, error } = await supabase
    .from('parameters')
    .select('id, test_type')
    .eq('code', normalizedCode)
    .eq('test_type', normalizedType)
    .maybeSingle();

  if (error) {
    console.error('Error fetching parameter:', error);
    return null;
  }

  console.log('Found parameter:', data);
  return data;
};

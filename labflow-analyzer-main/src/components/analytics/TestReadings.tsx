import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { categoryToTestType } from "@/lib/constants/testCategories";

export type Reading = {
  date: string;
  [key: string]: any;
};

export const useTestReadings = (dateRange?: DateRange, limit: number = 50) => {
  const [user, setUser] = useState<any>(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('user');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: testResults, isLoading } = useQuery({
    queryKey: ['test-results', user?.id, dateRange, limit],
    queryFn: async () => {
      if (!user) {
        console.log('No authenticated user found');
        return [];
      }

      console.log('Fetching test results for user:', user.id);
      console.log('Date range:', dateRange);
      
      let query = supabase
        .from('test_results')
        .select(`
          id,
          test_date,
          value,
          test_type,
          parameter:parameter_id (
            id,
            code,
            name,
            unit,
            test_type
          )
        `)
        .eq('user_id', user.id)
        .order('test_date', { ascending: true });

      // Apply date range filter if provided
      if (dateRange?.from) {
        query = query.gte('test_date', dateRange.from.toISOString());
      }
      if (dateRange?.to) {
        query = query.lte('test_date', dateRange.to.toISOString());
      }

      // Apply limit if specified
      if (limit > 0) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching test results:', error);
        toast.error("Failed to fetch test results");
        throw error;
      }

      console.log('Fetched test results:', data);
      return data || [];
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  const getReadingsForMetric = (metric: string, selectedCategory: string): Reading[] => {
    if (!testResults) return [];
    
    const testType = categoryToTestType[selectedCategory];
    console.log('Getting readings for metric:', metric, 'category:', selectedCategory, 'testType:', testType);
    
    // Filter results based on parameter code and test_type
    const filteredResults = testResults.filter(result => {
      const matchesCode = result.parameter?.code?.toLowerCase() === metric.toLowerCase();
      const matchesType = result.test_type === testType;
      console.log('Result:', result, 'Matches code:', matchesCode, 'Matches type:', matchesType);
      return matchesCode && matchesType;
    });

    console.log('Filtered results:', filteredResults);

    return filteredResults.map(result => ({
      date: new Date(result.test_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      [metric]: result.value
    }));
  };

  const getLatestReading = (metric: string, selectedCategory: string): number => {
    const readings = getReadingsForMetric(metric, selectedCategory);
    if (readings.length === 0) return 0;
    
    const lastReading = readings[readings.length - 1]?.[metric];
    return typeof lastReading === 'number' ? Number(lastReading.toFixed(2)) : 0;
  };

  const calculateAverage = (metric: string, selectedCategory: string): string => {
    const readings = getReadingsForMetric(metric, selectedCategory);
    if (readings.length === 0) return "0";
    
    const sum = readings.reduce((acc, curr) => acc + (curr[metric] as number), 0);
    return (sum / readings.length).toFixed(2);
  };

  const getAllReadings = () => {
    if (!testResults) return [];
    return testResults;
  };

  return {
    testResults,
    isLoading,
    getReadingsForMetric,
    getLatestReading,
    calculateAverage,
    getAllReadings,
    user
  };
};

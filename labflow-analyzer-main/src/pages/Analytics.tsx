
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { CategorySelector } from "@/components/analytics/CategorySelector";
import { MetricSelector } from "@/components/analytics/MetricSelector";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestReadings } from "@/components/analytics/TestReadings";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { testCategories } from "@/lib/constants/testCategories";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { AnalyticsContent } from "@/components/analytics/AnalyticsContent";

const Analytics = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || 'Complete Blood Count';
  });
  const [selectedMetric, setSelectedMetric] = useState(() => {
    return localStorage.getItem('selectedMetric') || 'hemoglobin';
  });
  const [showOverview, setShowOverview] = useState(() => {
    return localStorage.getItem('showOverview') === 'true';
  });
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const savedRange = localStorage.getItem('dateRange');
    if (savedRange) {
      const parsed = JSON.parse(savedRange);
      return {
        from: parsed.from ? new Date(parsed.from) : undefined,
        to: parsed.to ? new Date(parsed.to) : undefined,
      };
    }
    return {
      from: addDays(new Date(), -30),
      to: new Date(),
    };
  });
  const [reportLimit, setReportLimit] = useState(() => {
    return localStorage.getItem('reportLimit') || "50";
  });
  const [showAllTime, setShowAllTime] = useState(() => {
    return localStorage.getItem('showAllTime') === 'true';
  });

  const {
    isLoading,
    getLatestReading,
    getReadingsForMetric,
    calculateAverage,
    user,
  } = useTestReadings(showAllTime ? undefined : dateRange, parseInt(reportLimit));

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/login", { replace: true });
      }
      setIsAuthChecked(true);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
    localStorage.setItem('selectedMetric', selectedMetric);
    localStorage.setItem('showOverview', showOverview.toString());
    localStorage.setItem('showAllTime', showAllTime.toString());
    localStorage.setItem('reportLimit', reportLimit);
    localStorage.setItem('dateRange', JSON.stringify({
      from: dateRange?.from?.toISOString(),
      to: dateRange?.to?.toISOString(),
    }));
  }, [selectedCategory, selectedMetric, showOverview, showAllTime, reportLimit, dateRange]);

  useEffect(() => {
    if (!user && isAuthChecked) {
      toast.error("Please login to view analytics", {
        id: 'auth-check',
      });
    }
  }, [user, isAuthChecked]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const defaultMetric = Object.keys(testCategories[category].metrics)[0];
    setSelectedMetric(defaultMetric);
    setShowOverview(true);
  };

  const handleMetricSelect = (metric: string) => {
    setSelectedMetric(metric);
    setShowOverview(false);
  };

  const CategoryIcon = testCategories[selectedCategory].icon;

  if (isLoading || !isAuthChecked) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto pt-8 space-y-8 px-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pt-8 space-y-8 px-4">
        <div className="flex flex-col space-y-4">
          <AnalyticsHeader
            CategoryIcon={CategoryIcon}
            selectedCategory={selectedCategory}
            showOverview={showOverview}
            setShowOverview={setShowOverview}
          />

          <AnalyticsFilters
            showAllTime={showAllTime}
            setShowAllTime={setShowAllTime}
            dateRange={dateRange}
            setDateRange={setDateRange}
            reportLimit={reportLimit}
            setReportLimit={setReportLimit}
          />
          
          <CategorySelector
            testCategories={testCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          {!showOverview && (
            <MetricSelector
              metrics={Object.keys(testCategories[selectedCategory].metrics)}
              selectedMetric={selectedMetric}
              onMetricSelect={setSelectedMetric}
            />
          )}
        </div>

        <AnalyticsContent
          showOverview={showOverview}
          selectedCategory={selectedCategory}
          testCategories={testCategories}
          selectedMetric={selectedMetric}
          getLatestReading={(metric) => getLatestReading(metric, selectedCategory)}
          getReadingsForMetric={getReadingsForMetric}
          calculateAverage={(metric) => calculateAverage(metric, selectedCategory)}
          handleMetricSelect={handleMetricSelect}
        />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

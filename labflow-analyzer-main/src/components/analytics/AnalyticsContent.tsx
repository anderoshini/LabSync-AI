
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricDetails } from "./MetricDetails";
import { OverviewTable } from "./OverviewTable";
import { generateInsight } from "./TestInsights";
import { testCategories } from "@/lib/constants/testCategories";

interface AnalyticsContentProps {
  showOverview: boolean;
  selectedCategory: string;
  testCategories: typeof testCategories;
  selectedMetric: string;
  getLatestReading: (metric: string) => number;
  getReadingsForMetric: (metric: string, category: string) => any[];
  calculateAverage: (metric: string) => string;
  handleMetricSelect: (metric: string) => void;
}

export const AnalyticsContent = ({
  showOverview,
  selectedCategory,
  testCategories,
  selectedMetric,
  getLatestReading,
  getReadingsForMetric,
  calculateAverage,
  handleMetricSelect,
}: AnalyticsContentProps) => {
  return showOverview ? (
    <Card>
      <CardHeader>
        <CardTitle>Complete Overview</CardTitle>
        <CardDescription>Current readings for all metrics in {selectedCategory}</CardDescription>
      </CardHeader>
      <CardContent>
        <OverviewTable
          category={selectedCategory}
          testCategory={testCategories[selectedCategory]}
          getLatestReading={(metric) => getLatestReading(metric)}
          onMetricSelect={handleMetricSelect}
          generateInsight={(metric) => generateInsight(metric, getLatestReading(metric), selectedCategory)}
        />
      </CardContent>
    </Card>
  ) : (
    <MetricDetails
      selectedMetric={selectedMetric}
      selectedCategory={selectedCategory}
      metricRange={testCategories[selectedCategory].metrics[selectedMetric]}
      trends={getReadingsForMetric(selectedMetric, selectedCategory)}
      getLatestReading={(metric) => getLatestReading(metric)}
      calculateAverage={(metric) => calculateAverage(metric)}
      generateInsight={(metric) => generateInsight(metric, getLatestReading(metric), selectedCategory)}
    />
  );
};

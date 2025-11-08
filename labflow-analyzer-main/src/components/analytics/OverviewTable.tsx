
import { useState } from "react";
import { ViewToggle } from "./overview/ViewToggle";
import { MetricsTable } from "./overview/MetricsTable";
import { OverviewGraph } from "./overview/OverviewGraph";
import { InsightResult } from "./TestInsights";

type MetricRange = {
  min: number;
  max: number;
  unit: string;
};

type TestCategory = {
  metrics: {
    [key: string]: MetricRange;
  };
};

interface OverviewTableProps {
  category: string;
  testCategory: TestCategory;
  getLatestReading: (metric: string) => number;
  onMetricSelect: (metric: string) => void;
  generateInsight: (metric: string) => InsightResult;
}

export const OverviewTable = ({
  category,
  testCategory,
  getLatestReading,
  onMetricSelect,
  generateInsight,
}: OverviewTableProps) => {
  const [showGraph, setShowGraph] = useState(false);
  const metrics = Object.entries(testCategory.metrics);
  
  const chartData = metrics
    .map(([metric, range]) => {
      const value = getLatestReading(metric);
      if (value === 0) return null;
      
      const normalizedValue = ((value - range.min) / (range.max - range.min)) * 100;
      const deviation = Math.abs(50 - normalizedValue);
      
      return {
        name: metric.toUpperCase(),
        actualValue: value,
        normalizedValue: Number(normalizedValue.toFixed(2)),
        deviation: Number(deviation.toFixed(2)),
        min: range.min,
        max: range.max,
        unit: range.unit,
        context: `${normalizedValue < 50 ? 'Below' : 'Above'} midpoint by ${deviation.toFixed(1)}%`
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Test Results Overview</h3>
        <ViewToggle showGraph={showGraph} onToggle={setShowGraph} />
      </div>

      {showGraph ? (
        <OverviewGraph chartData={chartData} onMetricSelect={onMetricSelect} />
      ) : (
        <MetricsTable
          metrics={metrics}
          getLatestReading={getLatestReading}
          onMetricSelect={onMetricSelect}
          generateInsight={generateInsight}
        />
      )}
    </div>
  );
};

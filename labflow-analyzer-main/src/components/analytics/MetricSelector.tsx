
interface MetricSelectorProps {
  metrics: string[];
  selectedMetric: string;
  onMetricSelect: (metric: string) => void;
}

export const MetricSelector = ({
  metrics,
  selectedMetric,
  onMetricSelect,
}: MetricSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {metrics.map((metric) => (
        <button
          key={metric}
          onClick={() => onMetricSelect(metric)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedMetric === metric
              ? "bg-primary/10 text-primary border border-primary"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {metric.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

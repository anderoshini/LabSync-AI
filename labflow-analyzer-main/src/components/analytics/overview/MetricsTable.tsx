
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InsightResult } from "../TestInsights";

interface MetricsTableProps {
  metrics: [string, { min: number; max: number; unit: string }][];
  getLatestReading: (metric: string) => number;
  onMetricSelect: (metric: string) => void;
  generateInsight: (metric: string) => InsightResult;
}

export const MetricsTable = ({
  metrics,
  getLatestReading,
  onMetricSelect,
  generateInsight,
}: MetricsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="font-semibold text-gray-900">Parameter</TableHead>
          <TableHead className="font-semibold text-gray-900">Latest Reading</TableHead>
          <TableHead className="font-semibold text-gray-900">Reference Range</TableHead>
          <TableHead className="font-semibold text-gray-900">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map(([metric, range]) => {
          const value = getLatestReading(metric);
          const normalizedValue = ((value - range.min) / (range.max - range.min)) * 100;
          const deviation = Math.abs(50 - normalizedValue);
          const context = value !== 0 ? 
            `${normalizedValue < 50 ? 'Below' : 'Above'} midpoint by ${deviation.toFixed(1)}%` :
            '';
          const insight = generateInsight(metric.toLowerCase());
          const Icon = insight.icon;
          return (
            <TableRow
              key={metric}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => onMetricSelect(metric.toLowerCase())}
            >
              <TableCell className="font-medium text-gray-900">{metric.toUpperCase()}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">
                    {value !== 0 ? value : 'No data'} {value !== 0 ? range.unit : ''}
                  </div>
                  <div className="text-xs text-gray-500">{context}</div>
                </div>
              </TableCell>
              <TableCell className="text-gray-600">
                {range.min} - {range.max} {range.unit}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${insight.color}`} />
                  <span className={`${insight.color} font-medium`}>{insight.status}</span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

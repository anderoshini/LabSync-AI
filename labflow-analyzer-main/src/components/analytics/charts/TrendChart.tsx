
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface TrendChartProps {
  data: any[];
  metricName: string;
  minValue: number;
  maxValue: number;
}

export const TrendChart = ({ data, metricName, minValue, maxValue }: TrendChartProps) => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [value.toFixed(2), metricName]}
          />
          <ReferenceLine
            y={maxValue}
            label="Max"
            stroke="#f87171"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={minValue}
            label="Min"
            stroke="#60a5fa"
            strokeDasharray="3 3"
          />
          <Line
            type="monotone"
            dataKey={metricName}
            stroke="#2DD4BF"
            strokeWidth={2}
            dot={{ fill: "#2DD4BF", r: 4 }}
            activeDot={{ r: 6, fill: "#0F766E" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

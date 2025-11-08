
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { TooltipContent } from "./TooltipContent";

interface OverviewGraphProps {
  chartData: {
    name: string;
    actualValue: number;
    normalizedValue: number;
    deviation: number;
    min: number;
    max: number;
    unit: string;
    context: string;
  }[];
  onMetricSelect: (metric: string) => void;
}

export const OverviewGraph = ({ chartData, onMetricSelect }: OverviewGraphProps) => {
  return (
    <div className="h-[600px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={100}
            interval={0}
            tick={{ fill: '#4B5563', fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            label={{ 
              value: 'Normalized Value (%)', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10,
              style: { fill: '#4B5563', fontSize: 12 }
            }}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fill: '#4B5563', fontSize: 12 }}
          />
          <Tooltip content={TooltipContent} />
          <Legend />
          <ReferenceLine
            y={50}
            label={{ value: "Optimal", position: "right", fill: "#2DD4BF" }}
            stroke="#2DD4BF"
            strokeDasharray="3 3"
          />
          <ReferenceLine y={25} stroke="#94A3B8" strokeDasharray="3 3" />
          <ReferenceLine y={75} stroke="#94A3B8" strokeDasharray="3 3" />
          <Bar
            dataKey="normalizedValue"
            fill="#2DD4BF"
            radius={[6, 6, 0, 0]}
            onClick={(data) => onMetricSelect(data.name.toLowerCase())}
            cursor="pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

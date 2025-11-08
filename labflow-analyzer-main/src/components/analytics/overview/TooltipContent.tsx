
import { TooltipProps } from "recharts";

export const TooltipContent = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-bold text-gray-900">{data.name}</p>
        <div className="space-y-2 mt-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Actual Value:</span> {data.actualValue} {data.unit}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Normalized Value:</span> {data.normalizedValue}%
          </p>
          <p className="text-sm text-primary">{data.context}</p>
          <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
            Reference Range: {data.min} - {data.max} {data.unit}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

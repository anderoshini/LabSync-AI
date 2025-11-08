
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface AnalyticsFiltersProps {
  showAllTime: boolean;
  setShowAllTime: (value: boolean) => void;
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;
  reportLimit: string;
  setReportLimit: (value: string) => void;
}

export const AnalyticsFilters = ({
  showAllTime,
  setShowAllTime,
  dateRange,
  setDateRange,
  reportLimit,
  setReportLimit,
}: AnalyticsFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
      <div className="flex-1 min-w-[300px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
        <div className="flex gap-4 items-center">
          <Button
            variant={showAllTime ? "default" : "outline"}
            onClick={() => setShowAllTime(true)}
            className="w-32"
          >
            All Time
          </Button>
          <Button
            variant={!showAllTime ? "default" : "outline"}
            onClick={() => setShowAllTime(false)}
            className="w-32"
          >
            Custom Range
          </Button>
        </div>
        {!showAllTime && (
          <div className="mt-4">
            <DateRangePicker
              value={dateRange}
              onValueChange={setDateRange}
              align="start"
            />
          </div>
        )}
      </div>
      <div className="w-[150px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Report Limit</label>
        <Select
          value={reportLimit}
          onValueChange={setReportLimit}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">Last 5</SelectItem>
            <SelectItem value="10">Last 10</SelectItem>
            <SelectItem value="20">Last 20</SelectItem>
            <SelectItem value="50">Last 50</SelectItem>
            <SelectItem value="100">Last 100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};


import { LucideIcon } from "lucide-react";

interface AnalyticsHeaderProps {
  CategoryIcon: LucideIcon;
  selectedCategory: string;
  showOverview: boolean;
  setShowOverview: (value: boolean) => void;
}

export const AnalyticsHeader = ({
  CategoryIcon,
  selectedCategory,
  showOverview,
  setShowOverview
}: AnalyticsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <CategoryIcon className="w-8 h-8 text-primary" />
        {selectedCategory}
      </h1>
      <button
        onClick={() => setShowOverview(!showOverview)}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        {showOverview ? "Show Individual Metric" : "Show Overview"}
      </button>
    </div>
  );
};

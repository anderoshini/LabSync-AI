
import { TrendingDown, TrendingUp, Info, LucideIcon } from "lucide-react";
import { testCategories } from "@/lib/constants/testCategories";

export interface InsightResult {
  status: string;
  message: string;
  icon: LucideIcon;
  color: string;
}

export const generateInsight = (metric: string, latest: number, category: string): InsightResult => {
  const range = testCategories[category].metrics[metric];
  
  if (latest === 0) {
    return {
      status: "no data",
      message: `No data available for ${metric}.`,
      icon: Info,
      color: "text-gray-400",
    };
  }
  
  if (latest > range.max) {
    return {
      status: "high",
      message: `Your ${metric} is above the recommended range. Consider consulting with your healthcare provider.`,
      icon: TrendingUp,
      color: "text-destructive",
    };
  } else if (latest < range.min) {
    return {
      status: "low",
      message: `Your ${metric} is below the recommended range. Monitor your levels closely.`,
      icon: TrendingDown,
      color: "text-yellow-500",
    };
  }
  return {
    status: "normal",
    message: `Your ${metric} is within the normal range. Keep up the good work!`,
    icon: Info,
    color: "text-primary",
  };
};


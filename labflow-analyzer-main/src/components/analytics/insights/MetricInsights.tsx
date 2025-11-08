
import { AlertCircle, LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InsightSectionProps {
  title: string;
  content: string;
  icon: LucideIcon;
  iconColor: string;
}

const InsightSection = ({ title, content, icon: Icon, iconColor }: InsightSectionProps) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex items-start gap-3">
      <Icon className={`w-5 h-5 mt-0.5 ${iconColor}`} />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  </div>
);

interface MetricInsightsProps {
  metricName: string;
  isLoading: boolean;
  insight: {
    icon: LucideIcon;
    color: string;
  };
  parameterInsight: {
    description: string;
    deficiency_reason: string;
    improvement: string;
    fun_fact: string;
  } | null;
}

export const MetricInsights = ({
  metricName,
  isLoading,
  insight,
  parameterInsight,
}: MetricInsightsProps) => {
  const Icon = insight.icon;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Health Insights
        </CardTitle>
        <CardDescription>Understanding your {metricName} levels</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : parameterInsight ? (
          <div className="space-y-6">
            <InsightSection
              title={`What is ${metricName}?`}
              content={parameterInsight.description}
              icon={Icon}
              iconColor={insight.color}
            />
            <InsightSection
              title="Common Causes of Abnormal Levels"
              content={parameterInsight.deficiency_reason}
              icon={AlertCircle}
              iconColor="text-yellow-500"
            />
            <InsightSection
              title="How to Improve"
              content={parameterInsight.improvement}
              icon={AlertCircle}
              iconColor="text-emerald-500"
            />
            <InsightSection
              title="Fun Fact"
              content={parameterInsight.fun_fact}
              icon={AlertCircle}
              iconColor="text-blue-500"
            />
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No insights available for this parameter.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

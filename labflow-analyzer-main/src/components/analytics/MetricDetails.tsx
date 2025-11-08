import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "./cards/MetricCard";
import { TrendChart } from "./charts/TrendChart";
import { MetricInsights } from "./insights/MetricInsights";
import { normalizeTestCode } from "@/lib/utils/testCodeUtils";
import { LucideIcon } from "lucide-react";

type MetricRange = {
  min: number;
  max: number;
  unit: string;
};

interface MetricDetailsProps {
  selectedMetric: string;
  selectedCategory: string;
  metricRange: MetricRange;
  trends: any[];
  getLatestReading: (metric: string) => number;
  calculateAverage: (metric: string) => string;
  generateInsight: (metric: string) => {
    status: string;
    message: string;
    icon: LucideIcon;
    color: string;
  };
}

const normalizeParameterCode = (metric: string): string => {
  const codeMap: { [key: string]: string } = {
    'WBC': 'wbc',
    'RBC': 'rbc',
    'Hemoglobin': 'hemoglobin',
    'HCT': 'hct',
    'MCV': 'mcv',
    'MCH': 'mch',
    'MCHC': 'mchc',
    'Platelets': 'platelets',
    'Neutrophils': 'neutrophils',
    'Lymphocytes': 'lymphocytes',
    'Monocytes': 'monocytes',
    'Eosinophils': 'eosinophils',
    'Basophils': 'basophils',
    'ALT': 'alt',
    'AST': 'ast',
    'ALP': 'alp',
    'GGT': 'ggt',
    'Total Bilirubin': 'total_bilirubin',
    'Direct Bilirubin': 'direct_bilirubin',
    'Indirect Bilirubin': 'indirect_bilirubin',
    'Total Protein': 'total_protein',
    'Albumin': 'albumin',
    'Globulin': 'globulin',
    'AG Ratio': 'ag_ratio',
    'Cholesterol': 'cholesterol',
    'HDL': 'hdl',
    'LDL': 'ldl',
    'Triglycerides': 'triglycerides',
    'Glucose': 'glucose',
    'HbA1c': 'hba1c'
  };
  
  return codeMap[metric] || metric.toLowerCase();
};

export const MetricDetails = ({
  selectedMetric,
  selectedCategory,
  metricRange,
  trends,
  getLatestReading,
  calculateAverage,
  generateInsight,
}: MetricDetailsProps) => {
  const insight = generateInsight(selectedMetric);
  const Icon = insight.icon;

  const normalizedParameterCode = normalizeParameterCode(selectedMetric);
  console.log('Fetching insights for parameter:', selectedMetric);
  console.log('Normalized parameter code:', normalizedParameterCode);

  const { data: parameterInsight, isLoading: isLoadingInsight } = useQuery({
    queryKey: ['parameterInsight', normalizedParameterCode],
    queryFn: async () => {
      console.log('Looking up parameter code:', normalizedParameterCode);
      
      const { data, error } = await supabase
        .from('parameter_insights')
        .select('*')
        .eq('parameter_code', normalizedParameterCode)
        .maybeSingle();

      if (error) {
        console.error('Error fetching parameter insight:', error);
        return null;
      }

      console.log('Found parameter insight:', data);
      return data;
    },
  });

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <MetricCard
          title="Latest Reading"
          description="Most recent measurement"
          value={getLatestReading(selectedMetric)}
          unit={metricRange.unit}
          icon={Icon}
          iconColor={insight.color}
        />
        <MetricCard
          title="Average"
          description="6-month average"
          value={calculateAverage(selectedMetric)}
          unit={metricRange.unit}
        />
        <MetricCard
          title="Reference Range"
          description="Recommended levels"
          value={`${metricRange.min} - ${metricRange.max}`}
          unit={metricRange.unit}
        />
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
          <CardDescription>6-month overview of {selectedMetric}</CardDescription>
        </CardHeader>
        <CardContent>
          <TrendChart
            data={trends}
            metricName={selectedMetric}
            minValue={metricRange.min}
            maxValue={metricRange.max}
          />
        </CardContent>
      </Card>

      <MetricInsights
        metricName={selectedMetric}
        isLoading={isLoadingInsight}
        insight={insight}
        parameterInsight={parameterInsight}
      />
    </>
  );
};

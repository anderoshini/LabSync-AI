import { supabase } from "@/integrations/supabase/client";
import { testCategories } from "@/lib/constants/testCategories";

export interface HealthInsight {
  status: "normal" | "high" | "low" | "no data";
  message: string;
  severity: "info" | "warning" | "critical";
  recommendations: string[];
  icon: string;
  color: string;
}

export interface TrendAnalysis {
  trend: "increasing" | "decreasing" | "stable" | "insufficient_data";
  changePercentage: number;
  period: string;
  significance: "low" | "moderate" | "high";
}

export interface ComprehensiveHealthReport {
  overallHealthScore: number;
  criticalAlerts: HealthInsight[];
  warnings: HealthInsight[];
  recommendations: string[];
  trendAnalysis: Record<string, TrendAnalysis>;
  lastUpdated: string;
}

/**
 * Health Insights Service
 * Generates comprehensive health insights from medical data
 */
export class HealthInsightsService {
  /**
   * Generate insight for a specific metric
   * @param metric - Medical parameter name
   * @param value - Current value
   * @param category - Test category
   * @param historicalValues - Historical values for trend analysis
   * @returns HealthInsight
   */
  static generateMetricInsight(
    metric: string,
    value: number,
    category: string,
    historicalValues: number[] = []
  ): HealthInsight {
    const range = testCategories[category]?.metrics[metric];
    
    if (!range) {
      return {
        status: "no data",
        message: `No reference range available for ${metric}`,
        severity: "info",
        recommendations: ["Consult with healthcare provider for proper assessment"],
        icon: "info",
        color: "text-gray-400",
      };
    }

    if (value === 0 || isNaN(value)) {
      return {
        status: "no data",
        message: `No data available for ${metric}`,
        severity: "info",
        recommendations: ["Ensure proper test completion"],
        icon: "info",
        color: "text-gray-400",
      };
    }

    // Determine status based on reference range
    let status: HealthInsight["status"];
    let severity: HealthInsight["severity"];
    let message: string;
    let recommendations: string[];

    if (value > range.max) {
      status = "high";
      severity = this.getSeverityLevel(value, range.max, range.min, true);
      message = `Your ${metric} (${value} ${range.unit}) is above the recommended range (${range.min}-${range.max} ${range.unit})`;
      recommendations = this.getHighValueRecommendations(metric);
    } else if (value < range.min) {
      status = "low";
      severity = this.getSeverityLevel(value, range.min, range.max, false);
      message = `Your ${metric} (${value} ${range.unit}) is below the recommended range (${range.min}-${range.max} ${range.unit})`;
      recommendations = this.getLowValueRecommendations(metric);
    } else {
      status = "normal";
      severity = "info";
      message = `Your ${metric} (${value} ${range.unit}) is within the normal range`;
      recommendations = this.getMaintenanceRecommendations(metric);
    }

    return {
      status,
      message,
      severity,
      recommendations,
      icon: this.getIconForStatus(status),
      color: this.getColorForSeverity(severity),
    };
  }

  /**
   * Analyze trends for a metric
   * @param values - Historical values
   * @param dates - Corresponding dates
   * @returns TrendAnalysis
   */
  static analyzeTrends(values: number[], dates: string[]): TrendAnalysis {
    if (values.length < 2) {
      return {
        trend: "insufficient_data",
        changePercentage: 0,
        period: "Insufficient data",
        significance: "low",
      };
    }

    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const changePercentage = ((lastValue - firstValue) / firstValue) * 100;

    let trend: TrendAnalysis["trend"];
    let significance: TrendAnalysis["significance"];

    if (Math.abs(changePercentage) < 5) {
      trend = "stable";
      significance = "low";
    } else if (changePercentage > 0) {
      trend = "increasing";
      significance = Math.abs(changePercentage) > 20 ? "high" : "moderate";
    } else {
      trend = "decreasing";
      significance = Math.abs(changePercentage) > 20 ? "high" : "moderate";
    }

    const period = dates.length > 1 ? 
      `${new Date(dates[0]).toLocaleDateString()} to ${new Date(dates[dates.length - 1]).toLocaleDateString()}` :
      "Single reading";

    return {
      trend,
      changePercentage: Math.round(changePercentage * 100) / 100,
      period,
      significance,
    };
  }

  /**
   * Generate comprehensive health report for a user
   * @param userId - User ID
   * @param dateRange - Optional date range filter
   * @returns Promise<ComprehensiveHealthReport>
   */
  static async generateComprehensiveReport(
    userId: string,
    dateRange?: { from: Date; to: Date }
  ): Promise<ComprehensiveHealthReport> {
    try {
      // Fetch user's test results
      const { data: testResults, error } = await supabase
        .from('test_results')
        .select(`
          *,
          parameters (
            name,
            code,
            unit
          )
        `)
        .eq('user_id', userId)
        .order('test_date', { ascending: false });

      if (error) throw error;

      // Group results by parameter
      const groupedResults = this.groupResultsByParameter(testResults || []);

      const criticalAlerts: HealthInsight[] = [];
      const warnings: HealthInsight[] = [];
      const recommendations: string[] = [];
      const trendAnalysis: Record<string, TrendAnalysis> = {};

      // Analyze each parameter
      for (const [parameterCode, results] of Object.entries(groupedResults)) {
        const latestResult = results[0];
        const parameter = latestResult.parameters;
        
        if (!parameter) continue;

        const values = results.map(r => r.value);
        const dates = results.map(r => r.test_date);

        // Generate insight
        const insight = this.generateMetricInsight(
          parameter.name,
          latestResult.value,
          this.getCategoryForTestType(latestResult.test_type),
          values
        );

        // Categorize insights
        if (insight.severity === "critical") {
          criticalAlerts.push(insight);
        } else if (insight.severity === "warning") {
          warnings.push(insight);
        }

        recommendations.push(...insight.recommendations);

        // Analyze trends
        trendAnalysis[parameterCode] = this.analyzeTrends(values, dates);
      }

      // Calculate overall health score
      const overallHealthScore = this.calculateHealthScore(
        criticalAlerts.length,
        warnings.length,
        Object.keys(groupedResults).length
      );

      return {
        overallHealthScore,
        criticalAlerts,
        warnings,
        recommendations: [...new Set(recommendations)], // Remove duplicates
        trendAnalysis,
        lastUpdated: new Date().toISOString(),
      };

    } catch (error) {
      console.error('Error generating comprehensive report:', error);
      throw error;
    }
  }

  // Private helper methods
  private static getSeverityLevel(
    value: number,
    threshold: number,
    oppositeThreshold: number,
    isHigh: boolean
  ): HealthInsight["severity"] {
    const range = threshold - oppositeThreshold;
    const deviation = Math.abs(value - threshold);
    const deviationPercentage = (deviation / range) * 100;

    if (deviationPercentage > 50) return "critical";
    if (deviationPercentage > 25) return "warning";
    return "info";
  }

  private static getHighValueRecommendations(metric: string): string[] {
    const recommendations: Record<string, string[]> = {
      hemoglobin: [
        "Stay hydrated and maintain balanced diet",
        "Consider iron supplements if deficient",
        "Consult healthcare provider for persistent high levels"
      ],
      cholesterol: [
        "Reduce saturated and trans fats in diet",
        "Increase fiber intake",
        "Regular exercise and weight management",
        "Consider statin therapy with doctor's guidance"
      ],
      glucose: [
        "Monitor carbohydrate intake",
        "Regular physical activity",
        "Maintain healthy weight",
        "Consult endocrinologist if consistently high"
      ],
    };

    return recommendations[metric.toLowerCase()] || [
      "Consult with healthcare provider",
      "Monitor levels regularly",
      "Follow medical recommendations"
    ];
  }

  private static getLowValueRecommendations(metric: string): string[] {
    const recommendations: Record<string, string[]> = {
      hemoglobin: [
        "Increase iron-rich foods (red meat, leafy greens)",
        "Take vitamin C to enhance iron absorption",
        "Consider iron supplements under medical supervision"
      ],
      platelets: [
        "Avoid activities that may cause bleeding",
        "Eat foods rich in vitamin K",
        "Consult hematologist for evaluation"
      ],
    };

    return recommendations[metric.toLowerCase()] || [
      "Consult with healthcare provider",
      "Monitor levels regularly",
      "Follow medical recommendations"
    ];
  }

  private static getMaintenanceRecommendations(metric: string): string[] {
    return [
      "Continue current healthy lifestyle",
      "Maintain regular monitoring",
      "Keep up with preventive healthcare"
    ];
  }

  private static getIconForStatus(status: HealthInsight["status"]): string {
    const icons = {
      normal: "check-circle",
      high: "trending-up",
      low: "trending-down",
      "no data": "info",
    };
    return icons[status];
  }

  private static getColorForSeverity(severity: HealthInsight["severity"]): string {
    const colors = {
      info: "text-blue-500",
      warning: "text-yellow-500",
      critical: "text-red-500",
    };
    return colors[severity];
  }

  private static groupResultsByParameter(results: any[]): Record<string, any[]> {
    return results.reduce((acc, result) => {
      const code = result.parameters?.code;
      if (code) {
        if (!acc[code]) acc[code] = [];
        acc[code].push(result);
      }
      return acc;
    }, {});
  }

  private static getCategoryForTestType(testType: string): string {
    const categoryMap: Record<string, string> = {
      cbc: "Complete Blood Count",
      lft: "Liver Function",
      lipid_profile: "Lipid Profile",
      diabetes: "Diabetes",
    };
    return categoryMap[testType] || "Unknown";
  }

  private static calculateHealthScore(
    criticalCount: number,
    warningCount: number,
    totalParameters: number
  ): number {
    if (totalParameters === 0) return 0;
    
    const baseScore = 100;
    const criticalPenalty = criticalCount * 30;
    const warningPenalty = warningCount * 10;
    
    return Math.max(0, baseScore - criticalPenalty - warningPenalty);
  }
}




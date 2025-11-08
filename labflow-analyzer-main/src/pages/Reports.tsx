
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReportListTable } from "@/components/reports/ReportListTable";
import { ReportDetailsDialog } from "@/components/reports/ReportDetailsDialog";
import { useIsMobile } from "@/hooks/use-mobile";

const Reports = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const isMobile = useIsMobile();

  const { data: reports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      console.log('Fetching reports...');
      const { data, error } = await supabase
        .from("reports")
        .select(`
          *,
          test_results (
            id,
            value,
            parameters (
              name,
              unit,
              code
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }

      console.log('Fetched reports:', data);
      return data;
    },
  });

  const handleDownload = async (fileUrl: string) => {
    try {
      window.open(fileUrl, '_blank');
      toast({
        title: "Download started",
        description: "Your report is being downloaded...",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Failed to download the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reports")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["reports"] });

      toast({
        title: "Report deleted",
        description: "The report has been successfully deleted.",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewTrend = (report: any) => {
    const dateStr = new Date(report.test_date).toISOString().split('T')[0];
    navigate(`/analytics?date=${dateStr}&reportId=${report.id}`);
  };

  return (
    <DashboardLayout>
      <div className={`mx-auto pt-8 space-y-8 ${isMobile ? 'px-4' : 'max-w-6xl px-6'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lab Reports</h1>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/"} 
            className="w-full sm:w-auto"
          >
            Upload New Report
          </Button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ReportListTable
            reports={reports || []}
            isLoading={isLoading}
            onDownload={handleDownload}
            onDelete={handleDelete}
            onViewTrend={handleViewTrend}
            onViewDetails={setSelectedReport}
          />
        </div>

        <ReportDetailsDialog
          report={selectedReport}
          open={!!selectedReport}
          onOpenChange={(open) => !open && setSelectedReport(null)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Reports;

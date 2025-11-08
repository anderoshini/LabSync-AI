
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ReportListTableProps {
  reports: any[];
  isLoading: boolean;
  onDownload: (fileUrl: string) => void;
  onDelete: (id: string) => void;
  onViewTrend: (report: any) => void;
  onViewDetails: (report: any) => void;
}

export const ReportListTable = ({
  reports,
  isLoading,
  onDownload,
  onDelete,
  onViewTrend,
  onViewDetails,
}: ReportListTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            </TableRow>
          ))
        ) : reports && reports.length > 0 ? (
          reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onViewDetails(report)}
              >
                <FileText className="w-4 h-4 text-primary" />
                {report.patient_name || 'Unnamed Report'}
              </TableCell>
              <TableCell>{report.report_type || 'Unknown'}</TableCell>
              <TableCell>
                {new Date(report.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === "processed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {report.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload(report.file_url)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewTrend(report)}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(report.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              No reports found. Upload a report to get started.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

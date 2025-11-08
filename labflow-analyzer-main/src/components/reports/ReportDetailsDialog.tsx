
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { parameterInsights } from "@/lib/constants/parameterInsights";

interface ReportDetailsDialogProps {
  report: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReportDetailsDialog = ({
  report,
  open,
  onOpenChange,
}: ReportDetailsDialogProps) => {
  const isMobile = useIsMobile();
  
  if (!report) return null;

  const testResults = report.processed_data?.results || [];
  console.log('Test results in dialog:', testResults);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-h-[90vh]' : 'max-w-6xl max-h-[80vh]'} overflow-y-auto bg-white p-6 rounded-lg shadow-xl`}>
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Detailed Report View
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Report date: {report.report_date ? new Date(report.report_date).toLocaleDateString() : new Date(report.created_at).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {report.patient_name && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Patient Name</h3>
              <p className="text-lg text-gray-900">{report.patient_name}</p>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Test Name</TableHead>
                  <TableHead className="font-semibold text-right">Value</TableHead>
                  <TableHead className="font-semibold text-right">Unit</TableHead>
                  <TableHead className="font-semibold">Reference Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.length > 0 ? (
                  testResults.map((result: any, index: number) => (
                    <>
                      <TableRow key={`${index}-result`} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">
                          {result.parameterCode}
                        </TableCell>
                        <TableCell className="text-right">{result.value || '-'}</TableCell>
                        <TableCell className="text-right">{result.unit || '-'}</TableCell>
                        <TableCell>
                          {result.referenceRange ? (
                            `${result.referenceRange.min || ''} - ${result.referenceRange.max || ''} ${result.unit || ''}`
                          ) : '-'}
                        </TableCell>
                      </TableRow>
                      {parameterInsights[result.parameterCode] && (
                        <TableRow key={`${index}-insight`} className="bg-gray-50/50">
                          <TableCell colSpan={4} className="p-4">
                            <div className="space-y-2">
                              <div>
                                <span className="font-semibold text-primary">What is it? </span>
                                <span>{parameterInsights[result.parameterCode].description}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-yellow-500">Why might it be low? </span>
                                <span>{parameterInsights[result.parameterCode].deficiencyReason}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-green-500">How to improve? </span>
                                <span>{parameterInsights[result.parameterCode].improvement}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-purple-500">Fun Fact! </span>
                                <span>{parameterInsights[result.parameterCode].funFact}</span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                      No test results available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

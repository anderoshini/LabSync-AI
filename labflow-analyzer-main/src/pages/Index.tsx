
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileUploadForm } from "@/components/reports/FileUploadForm";
import { FeatureCards } from "@/components/reports/FeatureCards";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pt-8 space-y-8">
        <div className="text-center space-y-4 animate-slide-in">
          <h1 className="text-4xl font-bold text-gray-900">Lab Report Analyzer</h1>
          <p className="text-lg text-gray-600">
            Upload your lab reports for instant analysis and insights
          </p>
        </div>

        <FileUploadForm />
        <FeatureCards />
      </div>
    </DashboardLayout>
  );
};

export default Index;

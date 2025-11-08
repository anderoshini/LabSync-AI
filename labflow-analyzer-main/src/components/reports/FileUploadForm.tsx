
import { Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UploadProgress } from "./UploadProgress";
import { processAndStoreResults } from "@/lib/services/uploadService";
import { ExternalApiService } from "@/lib/services/externalApiService";

export const FileUploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Use external API service for processing
      const result = await ExternalApiService.processMedicalReport(
        file,
        setUploadProgress
      );

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Processing failed');
      }

      // Validate processed data
      if (!ExternalApiService.validateProcessedData(result.data)) {
        throw new Error('Invalid data received from processing service');
      }

      // Generate file path and get user ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const filePath = `${user.id}/${Date.now()}_${file.name}`;

      // Store results in database
      await processAndStoreResults(result.data, user.id, filePath, (errorMessage) => {
        toast({
          title: "Warning",
          description: errorMessage,
          variant: "destructive",
        });
      });

      toast({
        title: "Upload successful",
        description: "Your lab report has been uploaded and processed",
      });

      event.target.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return (
    <div className="mt-12">
      <div className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        isUploading ? 'border-primary' : 'border-gray-300 hover:border-primary'
      }`}>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer space-y-4 block ${isUploading ? 'pointer-events-none' : ''}`}
        >
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              {isUploading ? 'Uploading...' : 'Drop your PDF report here'}
            </p>
            <p className="text-sm text-gray-500">
              {isUploading ? 'Please wait while we upload your file' : 'or click to browse from your computer'}
            </p>
          </div>
        </label>
        {isUploading && <UploadProgress progress={uploadProgress} />}
      </div>
    </div>
  );
};

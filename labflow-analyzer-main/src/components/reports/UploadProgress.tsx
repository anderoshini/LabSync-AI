
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
}

export const UploadProgress = ({ progress }: UploadProgressProps) => {
  return (
    <div className="mt-6 space-y-2">
      <Progress value={progress} className="w-full h-2" />
      <p className="text-sm text-gray-600">{progress}% uploaded</p>
    </div>
  );
};

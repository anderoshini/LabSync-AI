
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ViewToggleProps {
  showGraph: boolean;
  onToggle: (checked: boolean) => void;
}

export const ViewToggle = ({ showGraph, onToggle }: ViewToggleProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Label htmlFor="view-toggle" className="text-sm font-medium text-gray-600">
        Graph View
      </Label>
      <Switch
        id="view-toggle"
        checked={showGraph}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
};

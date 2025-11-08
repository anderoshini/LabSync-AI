
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  description: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  iconColor?: string;
}

export const MetricCard = ({
  title,
  description,
  value,
  unit,
  icon: Icon,
  iconColor,
}: MetricCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            {value}
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </p>
          {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
        </div>
      </CardContent>
    </Card>
  );
};

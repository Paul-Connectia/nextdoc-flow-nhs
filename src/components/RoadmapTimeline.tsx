import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface RoadmapTimelineProps {
  roadmapData: any;
}

const RoadmapTimeline = ({ roadmapData }: RoadmapTimelineProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "pending": return <Clock className="h-6 w-6 text-orange-600" />;
      case "not-started": return <AlertCircle className="h-6 w-6 text-gray-400" />;
      default: return <AlertCircle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "pending": return "text-orange-600";
      case "not-started": return "text-gray-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      {roadmapData.steps.map((step: any, index: number) => (
        <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0">
            {getStatusIcon(step.status)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${getStatusColor(step.status)}`}>
                {step.title}
              </h4>
              <Badge 
                variant={step.status === "completed" ? "default" : 
                       step.status === "pending" ? "secondary" : "outline"}
              >
                {step.status === "completed" ? "Completed" :
                 step.status === "pending" ? "In Progress" : "Not Started"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapTimeline;
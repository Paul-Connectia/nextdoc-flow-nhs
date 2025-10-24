import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeDisplayProps {
  level: 'associate' | 'senior' | 'principal';
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const badgeConfig = {
  associate: {
    label: "Associate Mentor",
    className: "border-2 border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-300",
    icon: "🩵"
  },
  senior: {
    label: "Senior Mentor",
    className: "bg-teal-600 text-white border-0 hover:bg-teal-700",
    icon: "💙"
  },
  principal: {
    label: "Principal Mentor",
    className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 hover:from-amber-600 hover:to-amber-700 shadow-md",
    icon: "🟡"
  }
};

export const BadgeDisplay = ({ level, showTooltip = true, size = 'md' }: BadgeDisplayProps) => {
  const config = badgeConfig[level];
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5"
  };

  const badgeContent = (
    <Badge className={cn(config.className, sizeClasses[size], "font-semibold")}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );

  if (!showTooltip) {
    return badgeContent;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1.5">
            {badgeContent}
            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">
            Badge levels reflect NHS experience, mentorship record, and CPD contribution within the NextDoc Global Network.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

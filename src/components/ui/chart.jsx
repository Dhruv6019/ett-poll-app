import React from "react";
import { cn } from "@/lib/utils";

export const ChartContainer = ({ config, className, children, ...props }) => {
  return (
    <div
      className={cn(
        "w-full h-full [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-grid_line]:stroke-border/50",
        "[&_.recharts-tooltip-cursor]:stroke-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const ChartTooltip = ({ content, ...props }) => {
  return content;
};

export const ChartTooltipContent = ({ label, indicator, ...props }) => {
  return (
    <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      {label && (
        <div className="font-medium text-muted-foreground">{label}</div>
      )}
      <div className="grid gap-1.5">
        {React.Children.map(props.children, (child) => (
          <div className="flex items-center gap-2 [&>span]:h-2.5 [&>span]:w-2.5 [&>span]:rounded-full [&>span]:bg-current">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
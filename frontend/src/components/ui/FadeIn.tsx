import React from "react";
import { cn } from "../../lib/utils";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: "none" | "150" | "300" | "500" | "1000";
  duration?: "500" | "700" | "1000";
}

export function FadeIn({ 
  children, 
  className, 
  delay = "none", 
  duration = "500", 
  ...props 
}: FadeInProps) {
  const delayClasses = {
    "none": "",
    "150": "delay-150 fill-mode-both",
    "300": "delay-300 fill-mode-both",
    "500": "delay-500 fill-mode-both",
    "1000": "delay-1000 fill-mode-both",
  };

  const durationClasses = {
    "500": "duration-500",
    "700": "duration-700",
    "1000": "duration-1000",
  };

  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4",
        durationClasses[duration],
        delayClasses[delay],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
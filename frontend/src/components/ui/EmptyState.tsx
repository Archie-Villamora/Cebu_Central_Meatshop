import * as React from "react"
import { cn } from "../../lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div 
      className={cn("flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50", className)} 
      {...props}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="mb-1 text-lg font-medium">{title}</h3>
      {description && <p className="mb-4 text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}

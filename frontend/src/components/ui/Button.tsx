import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden text-ellipsis md:whitespace-nowrap max-w-full text-center leading-tight whitespace-normal break-words",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground border border-border/50 hover:bg-secondary/80",
        outline: "border border-border bg-transparent hover:bg-secondary text-foreground",
        ghost: "hover:bg-secondary hover:text-secondary-foreground shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 rounded-md",
        lg: "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, isLoading, children, disabled, ...props }, ref) => {
    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
      if (isExternal) {
        return (
          <a
            href={href}
            className={cn(buttonVariants({ variant, size, className }))}
            target="_blank"
            rel="noopener noreferrer"
            {...(props as any)}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          to={href}
          className={cn(buttonVariants({ variant, size, className }))}
          {...(props as any)}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

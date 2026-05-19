import React, { useId } from "react"
import { AlertCircle, Check, Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { Label } from "./Label"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  success?: boolean;
  isLoading?: boolean;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, success, isLoading, label, helperText, id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    
    // Derived states
    const isDisabled = disabled || isLoading;
    const isError = !!error && !isDisabled;
    
    return (
      <div className={cn("w-full flex flex-col space-y-2", className)}>
        {/* State 1: Default (Label above) */}
        {label && (
          <Label 
            htmlFor={inputId} 
            className={cn(isError && "text-destructive", isDisabled && "text-muted-foreground")}
          >
            {label}
          </Label>
        )}
        
        <div className="relative flex items-center">
          <input
            id={inputId}
            type={type}
            disabled={isDisabled}
            aria-invalid={isError ? "true" : "false"}
            aria-disabled={isDisabled ? "true" : "false"}
            className={cn(
              "flex h-11 w-full rounded-md border px-4 py-2 text-base transition-colors",
              "placeholder:text-muted-foreground",
              /* State 2: Focus (Sharp contrast ring, no soft glow) */
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
              "focus-visible:ring-ring focus-visible:border-primary",
              /* State 5: Disabled (Grayscale bg instead of opacity reduction) */
              "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground/30",
              /* State 3: Error coloring */
              isError ? "border-destructive focus-visible:ring-destructive focus-visible:border-destructive" : "border-input bg-transparent",
              /* Padding adjustment for icons */
              (isError || success || isLoading) && "pr-10",
            )}
            ref={ref}
            {...props}
          />
          
          {/* Adornments container */}
          <div className="absolute right-3 flex items-center justify-center pointer-events-none">
            {/* State 6: Loading (Spinner) */}
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />}
            
            {/* State 3: Error (Inline icon) */}
            {!isLoading && isError && <AlertCircle className="h-4 w-4 text-destructive" aria-hidden="true" />}
            
            {/* State 4: Success (Green checkmark) */}
            {!isLoading && !isError && success && <Check className="h-4 w-4 text-green-500" aria-hidden="true" />}
          </div>
        </div>

        {/* State 3: Error (Explicit explicit text below) */}
        {typeof error === "string" && (
          <p className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        )}

        {/* State 1: Default (Helper text below) */}
        {!error && helperText && (
          <p className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

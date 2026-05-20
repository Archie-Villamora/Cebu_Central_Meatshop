import React, { useEffect, useState } from "react"
import { Toaster as Sonner, toast as sonnerToast } from "sonner"
import { Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>
        {`
          /* Mobile Override below navbar (safe-area aware to prevent notch cropping) */
          @media (max-width: 640px) {
            [data-sonner-toaster] {
              top: calc(72px + max(8px, env(safe-area-inset-top))) !important;
              z-index: 9999 !important;
            }
          }
          /* Rule 3: Stacking Behavior Spring Physics 
             (approx stiffness 180, damping 20) */
          [data-sonner-toast] {
            transition: transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.1), 
                        opacity 400ms ease, 
                        height 400ms ease !important;
          }
        `}
      </style>
      <Sonner
        className="toaster group"
        position={isMobile ? "top-center" : "bottom-right"}
        visibleToasts={3}
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "group toast bg-popover text-popover-foreground border-border shadow-lg rounded-md font-sans w-full max-w-sm flex items-start px-4 py-3 relative overflow-hidden border-l-4",
            description: "text-muted-foreground text-sm",
            actionButton:
              "bg-primary text-primary-foreground rounded-md px-3 py-1.5 font-medium transition-transform active:scale-95",
            cancelButton:
              "bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 font-medium transition-transform active:scale-95",
            /* Rule 5: Solid Left borders */
            success: "border-l-green-500",
            error: "border-l-red-500",
            warning: "border-l-amber-500",
            info: "border-l-blue-500",
            /* Style close button */
            closeButton: "opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 !bg-transparent !border-none !text-muted-foreground hover:!text-foreground !w-6 !h-6 flex items-center justify-center p-0 m-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm",
          },
        }}
        icons={{
          success: <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />,
          error: <XCircle className="h-5 w-5 text-red-500 mr-2" />,
          warning: <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />,
          info: <Info className="h-5 w-5 text-blue-500 mr-2" />,
        }}
        {...props}
      />
    </>
  )
}

/* Rule 2: Enforce Strict Timeouts & Infinity errors */
type ToastOptions = Parameters<typeof sonnerToast.success>[1];

const toast = Object.assign(
  (msg: string | React.ReactNode, data?: any) => sonnerToast(msg, data),
  {
    success: (msg: string | React.ReactNode, data?: ToastOptions) => 
      sonnerToast.success(msg, { duration: 4000, ...data }),
    info: (msg: string | React.ReactNode, data?: ToastOptions) => 
      sonnerToast.info(msg, { duration: 4000, ...data }),
    warning: (msg: string | React.ReactNode, data?: ToastOptions) => 
      sonnerToast.warning(msg, { duration: 7000, ...data }),
    error: (msg: string | React.ReactNode, data?: ToastOptions) => 
      sonnerToast.error(msg, { duration: Number.POSITIVE_INFINITY, ...data }),
    promise: sonnerToast.promise,
    custom: sonnerToast.custom,
    dismiss: sonnerToast.dismiss,
  }
);

export { Toaster, toast }

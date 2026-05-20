import { useState } from "react";
import { toast } from "@/components/ui/Toaster";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";

export function Playground() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState<number[]>([]);

  // 1. Toast & Promise Simulation
  const handleSaveAction = () => {
    setIsSubmitting(true);
    
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.3 ? resolve({ name: 'User' }) : reject(new Error('Random failure!'));
        setIsSubmitting(false);
      }, 2000);
    });

    toast.promise(promise, {
      loading: "Saving your changes (simulated query)...",
      success: "Changes saved successfully! 🎉",
      error: "Failed to save changes. Try again.",
    });
  };

  // 2. Heavy Data Load Simulation (Skeletons)
  const handleLoadData = () => {
    setIsLoadingData(true);
    setData([]);
    setTimeout(() => {
      setData([1, 2, 3]); // Load 3 fake cards
      setIsLoadingData(false);
    }, 2500);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl space-y-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight mb-2">UI Playground</h1>
        <p className="text-muted-foreground">Test area for loading patterns, toasts, and interactions.</p>
      </div>

      {/* Section 1: Toasts */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">1. Toasts & Optimistic Feedback</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={() => toast("This is a standard informational toast.")}>
            Info Toast
          </Button>
          <Button variant="secondary" onClick={() => toast.success("Operation was a success!")}>
            Success Toast
          </Button>
          <Button variant="default" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => toast.error("Destructive action failed!")}>
            Error Toast
          </Button>
        </div>
      </section>

      {/* Section 2: Spinners & Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">2. Inline Interactions (Spinners)</h2>
        <p className="text-sm text-muted-foreground mb-4">For delays between 300ms - 3s (form submissions).</p>
        <div className="flex items-center gap-6">
          <Button onClick={handleSaveAction} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner size="sm" className="mr-2 text-primary-foreground" />
                Saving...
              </>
            ) : (
              "Save Settings (Trigger Promise)"
            )}
          </Button>
          
          <div className="flex items-center gap-4 text-muted-foreground">
            <Spinner size="sm" /> 
            <Spinner size="md" /> 
            <Spinner size="lg" />
          </div>
        </div>
      </section>

      {/* Section 3: Skeletons */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">3. Predictive Layouts (Skeletons)</h2>
          <Button variant="outline" size="sm" onClick={handleLoadData} disabled={isLoadingData}>
            Reload Data
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Used for initial layout painting or large view transitions (1s - 5s).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoadingData ? (
            // Skeleton State
            <>
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="rounded-xl border border-border p-5 space-y-4 shadow-sm bg-card">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-[100px] w-full rounded-md" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </>
          ) : data.length > 0 ? (
            // Loaded State
            <>
              {data.map((item) => (
                <div key={item} className="rounded-xl border border-border p-5 space-y-4 shadow-sm bg-card animate-in zoom-in-95 duration-300">
                  <h3 className="font-semibold text-foreground">Fetched Layout {item}</h3>
                  <div className="h-[100px] w-full rounded-md bg-secondary/50 flex items-center justify-center text-muted-foreground">
                    Real Content Image
                  </div>
                  <p className="text-sm text-muted-foreground">Data successfully fetched from server.</p>
                </div>
              ))}
            </>
          ) : (
            // Empty State
            <div className="col-span-3 text-center py-12 border rounded-xl border-dashed">
              <p className="text-muted-foreground">Click "Reload Data" to witness the skeletons.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

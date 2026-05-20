import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function Home() {
  return (
    <FadeIn duration="700" className="flex flex-col items-center justify-center space-y-8 py-32 text-center max-w-4xl mx-auto">
      <h1 className="text-5xl font-display font-extrabold tracking-tight lg:text-7xl text-foreground">
        Welcome to the <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground to-muted-foreground">Minimal App</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
        React frontend + Express backend scaffold is ready to go. Designed with a clean 60-30-10 color philosophy, excellent typography, and generous spacing.
      </p>
      
      <div className="pt-8 flex space-x-4">
        <Button href="/dashboard" size="lg">
          Go to Dashboard
        </Button>
        <Button href="#" variant="secondary" size="lg">
          Read Documentation
        </Button>
      </div>
    </FadeIn>
  );
}

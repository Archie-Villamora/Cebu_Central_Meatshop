import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { RootLayout } from "@/layouts/RootLayout";
import { Toaster } from "@/components/ui/Toaster";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const Home = lazy(() => import("@/pages/Home").then((module) => ({ default: module.Home })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then((module) => ({ default: module.Dashboard })));
const Playground = lazy(() => import("@/pages/Playground").then((module) => ({ default: module.Playground })));

// A full-page centering wrapper for the loader
const PageLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center text-muted-foreground">
    Loading...
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const queryClient = new QueryClient();

// ClerkProvider needs access to React Router's useNavigate for custom routing,
// so we split it into a sub-component
function ClerkWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to: string) => navigate(to)}
      routerReplace={(to: string) => navigate(to, { replace: true })}
    >
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/playground" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Playground />
              </Suspense>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </ClerkProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ClerkWithRoutes />
        <Toaster />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { RootLayout } from "@/layouts/RootLayout";
import { Toaster } from "@/components/ui/Toaster";
import logo from "@/assets/CCM_logo.png";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const Home = lazy(() => import("@/pages/Home").then((module) => ({ default: module.Home })));
const Shop = lazy(() => import("@/pages/shop/Shop").then((module) => ({ default: module.Shop })));
const Category = lazy(() => import("@/pages/shop/Category").then((module) => ({ default: module.Category })));
const Bundles = lazy(() => import("@/pages/shop/Bundles").then((module) => ({ default: module.Bundles })));
const ProductDetail = lazy(() => import("@/pages/shop/ProductDetail").then((module) => ({ default: module.ProductDetail })));

const OurStory = lazy(() => import("@/pages/about/OurStory").then((module) => ({ default: module.OurStory })));
const Sourcing = lazy(() => import("@/pages/about/Sourcing").then((module) => ({ default: module.Sourcing })));

const Wholesale = lazy(() => import("@/pages/services/Wholesale").then((module) => ({ default: module.Wholesale })));
const Subscription = lazy(() => import("@/pages/services/Subscription").then((module) => ({ default: module.Subscription })));

const Shipping = lazy(() => import("@/pages/support/Shipping").then((module) => ({ default: module.Shipping })));
const Guarantee = lazy(() => import("@/pages/support/Guarantee").then((module) => ({ default: module.Guarantee })));
const FAQ = lazy(() => import("@/pages/support/FAQ").then((module) => ({ default: module.FAQ })));

const Terms = lazy(() => import("@/pages/legal/Terms").then((module) => ({ default: module.Terms })));
const Privacy = lazy(() => import("@/pages/legal/Privacy").then((module) => ({ default: module.Privacy })));

const CustomerHub = lazy(() => import("@/pages/account/CustomerHub").then((module) => ({ default: module.CustomerHub })));

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
      appearance={{
        layout: {
          logoImageUrl: logo
        }
      }}
    >
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          
          <Route path="/shop" element={<Suspense fallback={<PageLoader />}><Shop /></Suspense>} />
          <Route path="/shop/:category" element={<Suspense fallback={<PageLoader />}><Category /></Suspense>} />
          <Route path="/shop/product/:id" element={<Suspense fallback={<PageLoader />}><ProductDetail /></Suspense>} />
          <Route path="/bundles" element={<Suspense fallback={<PageLoader />}><Bundles /></Suspense>} />
          
          <Route path="/our-story" element={<Suspense fallback={<PageLoader />}><OurStory /></Suspense>} />
          <Route path="/sourcing" element={<Suspense fallback={<PageLoader />}><Sourcing /></Suspense>} />
          <Route path="/wholesale" element={<Suspense fallback={<PageLoader />}><Wholesale /></Suspense>} />
          <Route path="/subscription" element={<Suspense fallback={<PageLoader />}><Subscription /></Suspense>} />
          
          <Route path="/shipping" element={<Suspense fallback={<PageLoader />}><Shipping /></Suspense>} />
          <Route path="/guarantee" element={<Suspense fallback={<PageLoader />}><Guarantee /></Suspense>} />
          <Route path="/faq" element={<Suspense fallback={<PageLoader />}><FAQ /></Suspense>} />
          
          <Route path="/terms" element={<Suspense fallback={<PageLoader />}><Terms /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><Privacy /></Suspense>} />
          
          <Route path="/account" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <CustomerHub />
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

import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Home as HomeIcon, Settings, Menu, Beaker } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { UserDropdown } from "@/components/layout/UserDropdown";
import logo from "@/assets/CCM_logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/Sheet";
import { Footer } from "@/components/layout/Footer";

export function RootLayout() {
  const location = useLocation();
  const { user } = useUser();

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Shop", href: "/shop", icon: LayoutDashboard },
    { name: "Bundles", href: "/bundles", icon: Beaker },
    { name: "Subscription Club", href: "/subscription", icon: Settings },
    { name: "Customer Hub", href: "/account", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30 text-foreground font-sans antialiased flex flex-col selection:bg-primary selection:text-primary-foreground">
      
      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6 h-24 flex items-center justify-between gap-4">
          
          {/* Left section: Mobile Menu & Logo */}
          <div className="flex items-center gap-3 xl:gap-8">
            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center justify-center h-10 w-10 rounded-md border border-border bg-background hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 flex flex-col overflow-visible">
                
                  {/* Middle close strip hanging outside */}
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                    <SheetClose asChild>
                      <button className="flex flex-col items-center justify-center bg-background hover:bg-muted text-xs font-semibold uppercase tracking-widest text-muted-foreground w-8 py-10 rounded-r-xl transition-all border border-l-0 border-border focus:outline-none shadow-md shadow-black/5">
                        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                          Close
                        </span>
                      </button>
                    </SheetClose>
                  </div>

                  {/* Edge-to-edge Header */}
                  <SheetHeader className="bg-white border-b border-border p-6 pt-10 flex flex-col items-center justify-center shrink-0">
                    <div className="h-20 w-20 flex items-center justify-center p-2 mb-3">
                      <img src={logo} alt="Cebu Central Meatshop Logo" className="h-full w-full object-contain" />
                    </div>
                    <SheetTitle className="text-foreground font-display font-bold text-center">
                      Cebu Central Meatshop
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Navigation Links with Dividers */}
                  <div className="flex flex-col flex-1 overflow-y-auto w-full px-4 py-6">
                    <div className="flex flex-col divide-y divide-border">
                      {navItems.map((item) => {
                        const isActive = location.pathname === item.href || (location.pathname === '/' && item.href === '/');
                        return (
                          <SheetTrigger asChild key={item.name}>
                            <Link 
                              to={item.href} 
                              className={`relative flex items-center gap-3 px-3 py-4 text-lg font-medium transition-colors ${
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              }`}
                            >
                              <item.icon className="h-5 w-5 z-10" />
                              <span className="z-10">{item.name}</span>
                              {isActive && (
                                <motion.div
                                  layoutId="activeMobileTabIndicator"
                                  className="absolute inset-x-0 inset-y-1 bg-primary/10 rounded-md"
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </Link>
                          </SheetTrigger>
                        );
                      })}
                    </div>
                  </div>

                  {/* Auth / Profile Area at Bottom */}
                  <div className="mt-auto border-t border-border bg-muted/10 p-4 shrink-0">
                    <SignedIn>
                      <div className="flex items-center gap-3 w-full px-3 py-2">
                        <UserDropdown />
                        <span className="text-sm font-medium text-foreground truncate flex-1">
                          {user?.fullName || "User Account"}
                        </span>
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="w-full flex justify-center items-center py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm transition-colors hover:bg-primary/90">
                          Sign In
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 shrink-0">
              <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center shrink-0">
                <img src={logo} alt="Cebu Central Meatshop Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-display font-bold text-lg md:text-xl tracking-tight leading-tight hidden sm:block max-w-37.5 md:max-w-none">
                Cebu Central <br className="hidden md:block" /> Meatshop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || (location.pathname === '/' && item.href === '/');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative py-1 text-[15px] font-semibold transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 right-0 -bottom-2 h-[2.5px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Right section: Auth & Actions (Desktop only) */}
          <div className="hidden md:flex items-center justify-end shrink-0 gap-4">
            {/* Search/Cart placeholders could go here */}
            
            <SignedIn>
              <UserDropdown />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}

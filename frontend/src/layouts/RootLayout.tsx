import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Home as HomeIcon, Settings, Menu, Beaker } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logo from "@/assets/CCM_logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export function RootLayout() {
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Playground", href: "/playground", icon: Beaker },
    { name: "Settings", href: "/settings", icon: Settings },
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center h-10 w-10 rounded-md border border-border bg-background hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Menu className="h-6 w-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="w-full flex items-center cursor-pointer">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 shrink-0">
              <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center shrink-0">
                <img src={logo} alt="Cebu Central Meatshop Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-display font-bold text-lg md:text-xl tracking-tight leading-tight hidden sm:block max-w-[150px] md:max-w-none">
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
                  className={`text-[15px] font-semibold transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Right section: Auth & Actions */}
          <div className="flex items-center justify-end shrink-0 gap-4">
            {/* Search/Cart placeholders could go here */}
            
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
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
      <main className="flex-1 w-full relative h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="container mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

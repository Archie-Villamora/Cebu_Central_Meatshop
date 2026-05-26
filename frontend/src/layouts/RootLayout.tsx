import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, Search, Heart, ShoppingCart, User, X, ChevronDown } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { UserDropdown } from "@/components/layout/UserDropdown";
import { MegaNav } from "@/components/layout/MegaNav";
import { navigationConfig } from "@/config/navigation";
import logo from "@/assets/CCM_logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { Footer } from "@/components/layout/Footer";
import { toast } from "@/components/ui/Toaster";

function Tooltip({ children, content, className = "" }: { children: React.ReactNode; content: string; className?: string }) {
  return (
    <div className={`relative group flex items-center justify-center ${className}`}>
      {children}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded bg-zinc-900 text-white text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 delay-150 z-50 hidden md:block">
        {content}
      </div>
    </div>
  );
}

function MobileDropdownLink({ 
  to, 
  icon: Icon, 
  title, 
  desc, 
  onClick, 
  isActive 
}: { 
  to: string; 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  desc: string; 
  onClick: () => void; 
  isActive: boolean; 
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group flex items-start gap-3 p-2.5 rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-primary/5 text-primary font-semibold" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
      }`}
    >
      <div className={`p-1.5 rounded-md ${isActive ? "bg-primary/10" : "bg-muted"} shrink-0 transition-colors`}>
        <Icon className={`h-4.5 w-4.5 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} shrink-0 transition-colors`} />
      </div>
      <div className="flex flex-col min-w-0">
        <h4 className={`text-[13px] font-bold tracking-wide leading-tight ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"} transition-colors`}>
          {title}
        </h4>
        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed mt-0.5 group-hover:text-foreground/70 transition-colors line-clamp-2">
          {desc}
        </p>
      </div>
    </Link>
  );
}

export function RootLayout() {
  const location = useLocation();
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const { user } = useUser();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(() => {
    const saved = localStorage.getItem("wishlistCount");
    return saved !== null ? parseInt(saved, 10) : 2;
  });
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem("cartCount");
    return saved !== null ? parseInt(saved, 10) : 3;
  });

  useEffect(() => {
    localStorage.setItem("wishlistCount", wishlistCount.toString());
  }, [wishlistCount]);

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartCount]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleWishlistClick = () => {
    const nextCount = wishlistCount === 0 ? 2 : wishlistCount - 1;
    setWishlistCount(nextCount);
    toast.success(`Wishlist count set to ${nextCount}`);
  };

  const handleCartClick = () => {
    const nextCount = cartCount === 0 ? 3 : cartCount - 1;
    setCartCount(nextCount);
    toast.success(`Cart count set to ${nextCount}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"...`);
    }
  };

  // navItems removed as mobile drawer now uses mobileGroups

  return (
    <div className="min-h-screen bg-muted/30 text-foreground font-sans antialiased flex flex-col selection:bg-primary selection:text-primary-foreground">
      
      {/* Mobile Menu Trigger (Outer Button) */}
      <div 
        className={`md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[60] ${
          isMenuOpen 
            ? "opacity-0 pointer-events-none transition-opacity duration-75 ease-out" 
            : "opacity-100 transition-opacity duration-200 ease-in delay-[250ms]"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center justify-center bg-background hover:bg-muted text-xs font-semibold uppercase tracking-widest text-muted-foreground w-8 py-10 rounded-r-xl transition-all focus:outline-none shadow-md shadow-black/5 relative after:absolute after:inset-y-0 after:left-0 after:w-11"
        >
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Menu
          </span>
        </button>
      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left" className="w-64 p-0 flex flex-col overflow-visible">
          {/* Mobile Menu Close Tab (attached to SheetContent) */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex flex-col items-center justify-center bg-background hover:bg-muted text-xs font-semibold uppercase tracking-widest text-muted-foreground w-8 py-10 rounded-r-xl transition-all focus:outline-none shadow-md shadow-black/5 absolute left-[calc(100%-1px)] top-1/2 -translate-y-1/2 z-[60] after:absolute after:inset-y-0 after:left-0 after:w-11"
          >
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Close
            </span>
          </button>

            {/* Edge-to-edge Header */}
            <SheetHeader className="bg-white border-b border-border p-6 pt-10 flex flex-col items-center justify-center shrink-0">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center group">
                <div className="h-20 w-20 flex items-center justify-center p-2 mb-3">
                  <img src={logo} alt="Cebu Central Meatshop Logo" className="h-full w-full object-contain" />
                </div>
                <SheetTitle className="text-foreground font-display font-bold text-center group-hover:text-primary transition-colors">
                  Cebu Central Meatshop
                </SheetTitle>
              </Link>
            </SheetHeader>
            
            {/* Navigation Links with Dividers */}
            <div className="flex flex-col flex-1 overflow-y-auto w-full px-4 py-6">
              <div className="flex flex-col space-y-2">
                {/* Home Direct Link */}
                <Link
                  to="/"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setOpenMobileSection(null);
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                    location.pathname === "/" ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <HomeIcon className="h-4.5 w-4.5" />
                  <span>Home</span>
                </Link>

                {/* Grouped Accordions */}
                {navigationConfig.map((group) => {
                  const isOpen = openMobileSection === group.id;
                  const allLinks = group.columns.flatMap((c) => c.links);
                  const groupActive = allLinks.some((l) => location.pathname === l.href);
                  return (
                    <div key={group.id} className="flex flex-col">
                      <button
                        onClick={() => setOpenMobileSection(isOpen ? null : group.id)}
                        className={`flex items-center justify-between w-full px-3 py-3 rounded-md text-base font-semibold transition-colors cursor-pointer select-none ${
                          groupActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <group.icon className="h-4.5 w-4.5 shrink-0" />
                          <span>{group.title}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 0.99 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="overflow-hidden pl-4 pr-1 mt-1 border-l border-border/60 ml-5 flex flex-col space-y-1.5 py-1"
                          >
                            {allLinks.map((link) => {
                              const isLinkActive = location.pathname === link.href;
                              return (
                                <MobileDropdownLink
                                  key={link.name}
                                  to={link.href}
                                  icon={link.icon}
                                  title={link.name}
                                  desc={link.desc}
                                  onClick={() => setIsMenuOpen(false)}
                                  isActive={isLinkActive}
                                />
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Customer Hub Direct Link */}
                <SignedIn>
                  <Link
                    to="/account"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setOpenMobileSection(null);
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                      location.pathname === "/account" ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <User className="h-4.5 w-4.5" />
                    <span>Customer Hub</span>
                  </Link>
                </SignedIn>
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

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6 h-24 flex items-center justify-between gap-4 relative">
          
          {/* Mobile Search Bar below the header */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 w-full bg-background border-b border-border px-4 py-3 flex items-center gap-3 z-30 md:hidden animate-in slide-in-from-top-4 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search premium meats..."
                  className="w-full h-11 pl-11 pr-10 rounded-full border border-border bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors shrink-0 focus:outline-none"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}



          {/* Left section: Logo */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-8 shrink min-w-0 pl-0 md:pl-0">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 shrink min-w-0">
              <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 flex items-center justify-center shrink">
                <img src={logo} alt="Cebu Central Meatshop Logo" className="h-full w-full object-contain shrink" />
              </div>
              <span className="font-display font-bold text-[13px] sm:text-lg md:text-xl tracking-tight leading-tight block max-w-[110px] sm:max-w-[200px] md:max-w-none truncate sm:whitespace-normal">
                Cebu Central <br className="sm:hidden" /> Meatshop
              </span>
            </Link>
          </div>

          {/* Center Section: Desktop Mega Navigation Links */}
          <nav className="hidden md:flex items-center flex-1 justify-center h-full">
            <MegaNav />
          </nav>
          
          {/* Right section: Icons (Search, Wishlist, Cart, Profile) */}
          <div className="flex items-center shrink-0 gap-0.5 sm:gap-2">
            
            {/* Desktop Inline Search Bar (Visible only on md+) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative md:w-36 lg:w-48 xl:w-64 mr-1 lg:mr-2">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search premium meats..."
                  className="w-full h-10 pl-9 pr-8 rounded-full border border-border bg-muted/40 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                    aria-label="Clear search query"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </form>

            {/* Mobile Search Toggle (Hidden on md+) */}
            <Tooltip content="Search">
              <button 
                onClick={toggleSearch}
                className={`h-11 w-11 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors shrink-0 focus:outline-none md:hidden ${isSearchOpen ? 'bg-muted' : ''}`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </Tooltip>

            {/* Wishlist */}
            <Tooltip content="Wishlist">
              <button 
                onClick={handleWishlistClick}
                className="relative h-11 w-11 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors shrink-0 focus:outline-none"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm select-none pointer-events-none">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </Tooltip>

            {/* Cart */}
            <Tooltip content="Cart">
              <button 
                onClick={handleCartClick}
                className="relative h-11 w-11 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors shrink-0 focus:outline-none"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm select-none pointer-events-none">
                    {cartCount}
                  </span>
                )}
              </button>
            </Tooltip>

            {/* Profile */}
            <Tooltip content="Account" className="hidden md:flex">
              <div className="h-11 w-11 flex items-center justify-center shrink-0">
                <SignedIn>
                  <UserDropdown />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button 
                      className="h-11 w-11 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors focus:outline-none"
                      aria-label="Sign In"
                    >
                      <User className="h-5 w-5" />
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </Tooltip>
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

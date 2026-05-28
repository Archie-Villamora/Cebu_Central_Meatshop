import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Scale, FileText } from "lucide-react";
import { navigationConfig } from "@/config/navigation";

interface Point {
  x: number;
  y: number;
}

// Function to calculate if a point is inside a triangle
const isPointInTriangle = (p: Point, a: Point, b: Point, c: Point): boolean => {
  const d1 = (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y);
  const d2 = (p.x - c.x) * (b.y - c.y) - (b.x - c.x) * (p.y - c.y);
  const d3 = (p.x - a.x) * (c.y - a.y) - (c.x - a.x) * (p.y - a.y);

  const has_neg = d1 < 0 || d2 < 0 || d3 < 0;
  const has_pos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(has_neg && has_pos);
};

export function MegaNav() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [hoveredTrigger, setHoveredTrigger] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hoveredTriggerRef = useRef<string | null>(null);
  const isHoveringDropdownRef = useRef<boolean>(false);
  const exitPosRef = useRef<Point | null>(null);
  const currentMouseRef = useRef<Point>({ x: 0, y: 0 });
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Mouse move handler to manage directional hover safe triangle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      currentMouseRef.current = { x: e.clientX, y: e.clientY };

      if (!activeTab || !exitPosRef.current || !dropdownRef.current) return;

      const rect = dropdownRef.current.getBoundingClientRect();
      const p = currentMouseRef.current;
      const a = exitPosRef.current; // apex of the triangle (where cursor exited the trigger)
      const buffer = 15; // horizontal buffer

      const b = { x: rect.left - buffer, y: rect.top };
      const c = { x: rect.right + buffer, y: rect.top };

      // Check if mouse entered the dropdown itself
      if (p.y >= rect.top) {
        const isInsideDropdown =
          p.x >= rect.left &&
          p.x <= rect.right &&
          p.y >= rect.top &&
          p.y <= rect.bottom;

        if (isInsideDropdown) {
          isHoveringDropdownRef.current = true;
          if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          return;
        }
      }

      // Check if mouse is inside the safe triangle
      const inTriangle = isPointInTriangle(p, a, b, c);

      if (!inTriangle) {
        // If outside triangle, evaluate if we should switch to another tab or close
        if (hoveredTriggerRef.current && hoveredTriggerRef.current !== activeTab) {
          // Switch tab immediately
          setActiveTab(hoveredTriggerRef.current);
          exitPosRef.current = null;
        } else if (!hoveredTriggerRef.current && !isHoveringDropdownRef.current) {
          // Start close timeout if we're not hovering anything
          if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = setTimeout(() => {
            if (!hoveredTriggerRef.current && !isHoveringDropdownRef.current) {
              setActiveTab(null);
              exitPosRef.current = null;
            }
          }, 100);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeTab]);

  // Tab trigger handlers
  const handleMouseEnter = (tab: string) => {
    hoveredTriggerRef.current = tab;
    setHoveredTrigger(tab);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    if (!activeTab) {
      setActiveTab(tab);
      exitPosRef.current = null;
    } else if (activeTab !== tab) {
      let inTriangle = false;
      if (exitPosRef.current && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const p = currentMouseRef.current;
        const a = exitPosRef.current;
        const buffer = 15;
        const b = { x: rect.left - buffer, y: rect.top };
        const c = { x: rect.right + buffer, y: rect.top };
        inTriangle = isPointInTriangle(p, a, b, c);
      }

      if (!inTriangle) {
        setActiveTab(tab);
        exitPosRef.current = null;
      }
    }
  };

  const handleMouseLeave = (tab: string) => {
    if (hoveredTriggerRef.current === tab) {
      hoveredTriggerRef.current = null;
      setHoveredTrigger(null);
    }

    exitPosRef.current = currentMouseRef.current;

    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      if (!hoveredTriggerRef.current && !isHoveringDropdownRef.current) {
        setActiveTab(null);
        exitPosRef.current = null;
      }
    }, 200);
  };

  // Dropdown panel handlers
  const handleDropdownMouseEnter = () => {
    isHoveringDropdownRef.current = true;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleDropdownMouseLeave = () => {
    isHoveringDropdownRef.current = false;

    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      if (!hoveredTriggerRef.current) {
        setActiveTab(null);
        exitPosRef.current = null;
      }
    }, 200);
  };

  // Close everything on page navigation
  useEffect(() => {
    setActiveTab(null);
    exitPosRef.current = null;
    isHoveringDropdownRef.current = false;
    hoveredTriggerRef.current = null;
    setHoveredTrigger(null);
  }, [location.pathname]);

  // Determine the single active route tab to prevent double highlighting
  const activeRouteTabId = (() => {
    const canonicalPaths: Record<string, string> = {
      "/subscription": "services",
      "/guarantee": "support"
    };
    if (canonicalPaths[location.pathname]) {
      return canonicalPaths[location.pathname];
    }
    return navigationConfig.find(tab => 
      tab.columns.some(col => 
        col.links.some(l => location.pathname === l.href.split('#')[0])
      )
    )?.id;
  })();

  // Extract groupings from shared config
  const shopGroup = navigationConfig.find((g) => g.id === "shop")!;
  const servicesGroup = navigationConfig.find((g) => g.id === "services")!;
  const aboutGroup = navigationConfig.find((g) => g.id === "about")!;
  const supportGroup = navigationConfig.find((g) => g.id === "support")!;

  return (
    <div
      className="flex items-center space-x-3 lg:space-x-5 h-full"
      onMouseEnter={() => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      }}
      onMouseLeave={() => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => {
          if (!hoveredTriggerRef.current && !isHoveringDropdownRef.current) {
            setActiveTab(null);
            exitPosRef.current = null;
          }
        }, 200);
      }}
    >
      {/* Navigation Triggers */}
      {navigationConfig.map((tab) => {
        const isOpen = activeTab === tab.id;
        const isHovered = hoveredTrigger === tab.id;
        const isActiveRoute = tab.id === activeRouteTabId;

        return (
          <div
            key={tab.id}
            onMouseEnter={() => handleMouseEnter(tab.id)}
            onMouseLeave={() => handleMouseLeave(tab.id)}
            className="h-full flex items-center"
          >
            <button
              className={`relative py-2 px-3 flex items-center gap-1.5 text-[14px] lg:text-[15px] font-bold tracking-wide transition-colors duration-200 cursor-pointer rounded-md select-none ${isOpen || isActiveRoute ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {/* Per-item background highlight — no layoutId to avoid layout shift */}
              <span
                className={`absolute inset-0 rounded-md bg-muted/65 transition-opacity duration-200 ease-out -z-10 ${isHovered ? "opacity-100" : "opacity-0"
                  }`}
                aria-hidden="true"
              />

              {tab.title}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground/60"}`}
              />
              {isActiveRoute && (
                <motion.div
                  layoutId="activeMegaTabIndicator"
                  className="absolute left-3 right-3 bottom-0 h-[3px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          </div>
        );
      })}

      {/* Mega Menus Dropdown Panel Wrapper (Portaled to document.body to prevent layout shifting) */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeTab && (
            <div
              className="fixed top-[88px] left-1/2 -translate-x-1/2 z-50 pointer-events-none max-w-[calc(100vw-2rem)]"
              style={{
                width: activeTab === "shop" ? "960px" : "640px",
                transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                className="w-full bg-white/95 backdrop-blur-md border border-border shadow-xl rounded-xl p-7 overflow-hidden pointer-events-auto"
              >
                {/* Cross-fading absolute/relative panels for jitter-free resizing */}
                <div className="relative w-full">

                  {/* 1. Shop Mega Menu Panel */}
                  <div
                    className={`w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTab === "shop"
                      ? "opacity-100 translate-y-0 pointer-events-auto relative"
                      : "opacity-0 -translate-y-2 pointer-events-none absolute inset-x-0 top-0"
                      }`}
                  >
                    <div className="grid grid-cols-12 gap-8 text-foreground">
                      {shopGroup.columns.map((col, colIdx) => (
                        <div key={colIdx} className="col-span-3 flex flex-col space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
                            {col.title}
                          </h3>
                          <div className="flex flex-col space-y-1">
                            {col.links.map((link) => (
                              <DropdownLink
                                key={link.name}
                                to={link.href}
                                icon={link.icon}
                                title={link.name}
                                desc={link.desc}
                              />
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Promotional Visual Card */}
                      {shopGroup.promo && (
                        <div className="col-span-3 bg-secondary rounded-lg overflow-hidden border border-border p-4 text-white flex flex-col justify-between relative group">
                          <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-500 pointer-events-none" style={{ backgroundImage: `url('${shopGroup.promo.image}')` }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                          <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                              <span className="inline-block px-2 py-0.5 bg-primary text-white text-[9px] font-extrabold uppercase tracking-wider rounded-sm mb-2 shadow-sm">
                                {shopGroup.promo.tag}
                              </span>
                              <h4 className="text-base font-bold tracking-tight mb-1 leading-snug drop-shadow-md text-white">
                                {shopGroup.promo.title}
                              </h4>
                              <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-3">
                                {shopGroup.promo.desc}
                              </p>
                            </div>

                            <Link
                              to={shopGroup.promo.href}
                              className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary/90 transition-colors uppercase tracking-wider"
                            >
                              {shopGroup.promo.cta} <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Services Dropdown Panel */}
                  <div
                    className={`w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTab === "services"
                      ? "opacity-100 translate-y-0 pointer-events-auto relative"
                      : "opacity-0 -translate-y-2 pointer-events-none absolute inset-x-0 top-0"
                      }`}
                  >
                    <div className="flex flex-col space-y-4 text-foreground">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
                        {servicesGroup.columns[0].title}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {servicesGroup.columns[0].links.map((link) => (
                          <DropdownLink
                            key={link.name}
                            to={link.href}
                            icon={link.icon}
                            title={link.name}
                            desc={link.desc}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. About Us Dropdown Panel */}
                  <div
                    className={`w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTab === "about"
                      ? "opacity-100 translate-y-0 pointer-events-auto relative"
                      : "opacity-0 -translate-y-2 pointer-events-none absolute inset-x-0 top-0"
                      }`}
                  >
                    <div className="flex flex-col space-y-4 text-foreground">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
                        {aboutGroup.columns[0].title}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {aboutGroup.columns[0].links.map((link) => (
                          <DropdownLink
                            key={link.name}
                            to={link.href}
                            icon={link.icon}
                            title={link.name}
                            desc={link.desc}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Support Dropdown Panel */}
                  <div
                    className={`w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTab === "support"
                      ? "opacity-100 translate-y-0 pointer-events-auto relative"
                      : "opacity-0 -translate-y-2 pointer-events-none absolute inset-x-0 top-0"
                      }`}
                  >
                    <div className="flex flex-col space-y-4 text-foreground">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
                        {supportGroup.columns[0].title}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          {supportGroup.columns[0].links.slice(0, 2).map((link) => (
                            <DropdownLink
                              key={link.name}
                              to={link.href}
                              icon={link.icon}
                              title={link.name}
                              desc={link.desc}
                            />
                          ))}
                        </div>
                        <div className="flex flex-col space-y-1">
                          {supportGroup.columns[0].links.slice(2).map((link) => (
                            <DropdownLink
                              key={link.name}
                              to={link.href}
                              icon={link.icon}
                              title={link.name}
                              desc={link.desc}
                            />
                          ))}
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border mt-1">
                            <Link to="/terms" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                              <Scale className="h-3 w-3" /> Terms of Service
                            </Link>
                            <Link to="/privacy" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                              <FileText className="h-3 w-3" /> Privacy Policy
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

interface DropdownLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

function DropdownLink({ to, icon: Icon, title, desc }: DropdownLinkProps) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
    >
      <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
        <Icon className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>
      <div>
        <h4 className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed mt-0.5 group-hover:text-foreground/70 transition-colors">
          {desc}
        </p>
      </div>
    </Link>
  );
}

import { useState, useEffect } from "react";
import { 
  Shield, 
  Printer, 
  ArrowRight, 
  Database, 
  Eye, 
  Users, 
  Cookie, 
  ShieldCheck, 
  Mail,
  ChevronDown,
  Lock,
  BookOpen
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "@/components/ui/Toaster";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { getCookiePreferences, setCookiePreferences, COOKIE_PREFS_EVENT } from "@/lib/cookies";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  summary: string;
}

const SECTIONS: Section[] = [
  { 
    id: "collection", 
    title: "1. Information We Collect", 
    icon: Database,
    summary: "We collect basic profile details when you sign up using Clerk, alongside shipping addresses and delivery coordinates to map courier drop-offs."
  },
  { 
    id: "usage", 
    title: "2. How We Use Information", 
    icon: Eye,
    summary: "Your data is used to process butchery custom cuts, orchestrate delivery routes, send dispatch alerts, and ensure cold chain integrity."
  },
  { 
    id: "sharing", 
    title: "3. Sharing of Information", 
    icon: Users,
    summary: "We share delivery addresses with local Cebu riders and secure payment coordinates with our checkout gateway partners. We never sell your data."
  },
  { 
    id: "security", 
    title: "4. Data Security Standards", 
    icon: ShieldCheck,
    summary: "We employ end-to-end HTTPS encryption, tokenized billing gateways (PCI-DSS), and secure user registry panels hosted by Clerk."
  },
  { 
    id: "dpa", 
    title: "5. Philippine DPA Compliance", 
    icon: Shield,
    summary: "Under Republic Act 10173 (DPA 2012), you have complete rights to access, modify, correct, or delete your personal information."
  },
  { 
    id: "cookies", 
    title: "6. Cookies & Preferences", 
    icon: Cookie,
    summary: "We use cookies to maintain your shopping cart, authenticate sessions, and track cooling speed statistics. Manage your preferences below."
  },
  { 
    id: "contact", 
    title: "7. Policy Updates & Contact", 
    icon: Mail,
    summary: "We update this policy as legal and shipping structures evolve. If you have questions, reach our compliance team in Cebu City."
  }
];

export const Privacy = () => {
  const [activeSection, setActiveSection] = useState<string>("collection");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [cookiePrefs, setCookiePrefs] = useState(() => getCookiePreferences());

  useEffect(() => {
    document.title = "Privacy Policy | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read the official Privacy Policy for Cebu Central Meatshop. Learn how we collect user details, process cold-chain transaction logs, and comply with the Philippine Data Privacy Act of 2012."
      );
    }
  }, []);

  // Sync state if preferences change from outside this component
  useEffect(() => {
    const handlePreferencesUpdate = () => {
      setCookiePrefs(getCookiePreferences());
    };

    window.addEventListener(COOKIE_PREFS_EVENT, handlePreferencesUpdate);
    return () => window.removeEventListener(COOKIE_PREFS_EVENT, handlePreferencesUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const triggerOffset = 240; // Offset taking into account sticky header + margin

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerOffset && rect.bottom > triggerOffset) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 180;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSavePreferences = () => {
    setIsSaving(true);
    setTimeout(() => {
      setCookiePreferences(cookiePrefs);
      setIsSaving(false);
      toast.success("Privacy preferences updated successfully!");
    }, 800);
  };

  const activeSectionData = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          header, footer, nav, aside, button, .no-print, .mobile-toc-bar, .cookie-dashboard-card {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print-content-wrapper {
            grid-template-columns: 1fr !important;
          }
          .print-legal-section {
            page-break-inside: avoid;
            margin-bottom: 2rem !important;
          }
          .print-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}} />

      {/* 1. Header Section */}
      <section className="relative bg-zinc-950 text-white py-12 md:py-16 border-b border-border/10 no-print">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.1),transparent_70%)]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn duration="500" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-6xl mx-auto">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Shield className="h-3.5 w-3.5" /> Privacy & Trust
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                Privacy Policy
              </h1>
              <p className="text-sm md:text-base text-zinc-400 mt-3 max-w-2xl leading-relaxed">
                Last Updated: May 28, 2026 • We value your trust. Learn how we handle your personal data, customer transactions, cooling log tracking data, and fully satisfy the Philippine Data Privacy Act.
              </p>
            </div>
            
             <Button 
              variant="outline" 
              onClick={() => window.print()} 
              className="text-white border-zinc-700 hover:bg-zinc-900 shrink-0 flex items-center gap-2 self-start md:self-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* 2. Mobile Table of Contents Bar */}
      <div className="sticky top-[72px] z-30 w-full bg-card border-b border-border md:hidden no-print mobile-toc-bar">
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Document Sections</span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-haspopup="listbox"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle sections list"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm font-semibold hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="text-primary font-bold">{activeSectionData.title.split(".")[1].trim()}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div 
            role="listbox" 
            aria-label="Privacy Policy Sections"
            className="absolute top-full left-0 w-full bg-card border-b border-border shadow-lg py-2 max-h-60 overflow-y-auto"
          >
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isCurrent = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  role="option"
                  aria-selected={isCurrent}
                  className={`w-full flex items-center gap-3 px-6 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:bg-primary/5 focus-visible:text-primary ${isCurrent ? "bg-primary/5 text-primary font-bold" : "hover:bg-muted/50 text-foreground"}`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                  {sec.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Main Privacy Layout */}
      <section className="py-12 md:py-16 container mx-auto px-4 md:px-6 max-w-6xl print-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start print-content-wrapper">
          
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-28 no-print self-start">
            <div className="border border-border/80 rounded-xl bg-card p-5 shadow-sm">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-zinc-400 mb-4 px-2">Table of Contents</h3>
              <nav aria-label="Privacy Policy Sections" className="space-y-1.5">
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left text-xs font-semibold tracking-wide transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isActive ? "bg-primary/5 border-primary/20 text-primary scale-[1.02]" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                    >
                      <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Privacy Text Panel */}
          <div className="lg:col-span-3 space-y-12 md:space-y-16 print-content">
            
            {/* Section: Collection */}
            <article id="collection" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Database className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">1. Information We Collect</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[0].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  We collect personal details that you provide directly to us or that we accumulate dynamically during your use of our platform.
                </p>
                <div className="space-y-3">
                  <p>
                    <strong>Identity & Account Details:</strong> Since we leverage <strong>Clerk</strong> for account management, we collect your name, email address, password token parameters, and contact phone numbers directly through their secure identity portal.
                  </p>
                  <p>
                    <strong>Delivery Coordinates & Billing Info:</strong> To fulfill fresh meat deliveries in Mandaue, Cebu City, and surrounding municipalities, we collect delivery addresses, landmarks, and drop-off coordinates. We do not store full credit card details on our servers; they are processed securely through accredited local payment merchants.
                  </p>
                  <p>
                    <strong>Log Files & Technical Data:</strong> When you access the website, we record your IP address, browser type, operating system version, and duration spent looking at cuts or bundles.
                  </p>
                </div>
              </div>
            </article>

            {/* Section: Usage */}
            <article id="usage" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Eye className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">2. How We Use Your Information</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[1].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  Cebu Central Meatshop limits data utilization strictly to core e-commerce, customer support, and cold-chain compliance tasks:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Order Processing & Custom Butchery:</strong> Compiling order sheets, portioning ribeyes, chops, or poultry, and preparing curated BBQ or family boxes.</li>
                  <li><strong>Logistics Execution:</strong> Directing our local delivery riders, sending shipment updates, and routing delivery vans efficiently through Cebu traffic.</li>
                  <li><strong>Cold-Chain Tracking:</strong> Logging ambient temperature sensor records associated with deliveries, confirming that raw meats were delivered below 4°C for complete microbiological safety.</li>
                  <li><strong>Account Communications:</strong> Providing automated system updates via Clerk, password recoveries, order receipts, and responses to quality guarantee claims.</li>
                </ul>
              </div>
            </article>

            {/* Section: Sharing */}
            <article id="sharing" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Users className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">3. Disclosure & Sharing of Information</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[2].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  We do not sell, rent, or trade your personal information to third parties. We share your data only with select partners essential to our operations:
                </p>
                <div className="space-y-3">
                  <p>
                    <strong>Logistics Partners & Riders:</strong> We share your delivery address, name, and phone number with our internal riders and local third-party dispatch companies (e.g. Lalamove or Grab for express same-day orders) so they can successfully locate and hand over your thermal meat bags.
                  </p>
                  <p>
                    <strong>Payment Merchants:</strong> Transaction details are routed directly to licensed credit card gateways and e-wallets (GCash, Maya) to authenticate billing and prevent double charges.
                  </p>
                  <p>
                    <strong>Legal & Safety Mandates:</strong> We may disclose data if subpoenaed by regulatory bodies such as the National Meat Inspection Service (NMIS) or local Cebu health departments to track meat batch traceability or cold chain failure incidents.
                  </p>
                </div>
              </div>
            </article>

            {/* Section: Security */}
            <article id="security" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Lock className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">4. Data Security Standards</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[3].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  We implement robust technical security protocols to safeguard your personal data:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Authentication Protection:</strong> User login panels are managed on Clerk&apos;s secured, multi-tenant databases which utilize industry-leading hash algorithms and multi-factor authentication (MFA) protocols.</li>
                  <li><strong>HTTPS & Transit Security:</strong> All API communications between our React SPA frontend and Express backend are encrypted in transit using Transport Layer Security (TLS/HTTPS).</li>
                  <li><strong>Access Controls:</strong> Database credentials and backend environment properties are strictly controlled. Only senior compliance technicians have database accessibility.</li>
                </ul>
              </div>
            </article>

            {/* Section: DPA Compliance */}
            <article id="dpa" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Shield className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">5. Philippine Data Privacy Act (DPA) of 2012</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[4].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  We fully comply with Republic Act No. 10173, also known as the <strong>Data Privacy Act of 2012 (DPA)</strong>, governed by the National Privacy Commission of the Philippines. As our valued customer, you hold the following rights:
                </p>
                <div className="grid gap-4 md:grid-cols-2 mt-4 no-print">
                  <Card className="border-muted/80">
                    <CardHeader className="pb-1 pt-4 px-4">
                      <CardTitle className="text-sm font-bold font-display">Right to Access & Rectify</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed px-4 pb-4">
                      You can request a copy of the records we hold and request corrections if your email, contact details, or billing addresses are outdated.
                    </CardContent>
                  </Card>
                  
                  <Card className="border-muted/80">
                    <CardHeader className="pb-1 pt-4 px-4">
                      <CardTitle className="text-sm font-bold font-display">Right to Erasure & Block</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed px-4 pb-4">
                      You have the right to request the complete deletion of your customer profile and transaction history from our active directories.
                    </CardContent>
                  </Card>
                </div>
                <p className="mt-4">
                  To exercise any of these rights, please email our Data Protection Officer at <a href="mailto:privacy@cebucentralmeatshop.com" className="text-primary hover:underline font-semibold">privacy@cebucentralmeatshop.com</a>. We will respond to and address your verification request within 15 working days.
                </p>
              </div>
            </article>

            {/* Section: Cookies & Dashboard */}
            <article id="cookies" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Cookie className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">6. Cookies & Tracking Technologies</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[5].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  We utilize cookies and local cache storage key indexes to remember items placed in your shopping cart drawer, preserve active Clerk authentication sessions across refreshes, and track server optimization logs.
                </p>
                <p>
                  You can modify your specific cookie tolerances using our interactive dashboard below. Disabling analytics or marketing cookies will not block your ability to complete orders, but may limit product recommendations.
                </p>

                {/* Cookie Preference Card */}
                <Card className="mt-6 border-border shadow-md no-print cookie-dashboard-card overflow-hidden">
                  <CardHeader className="bg-muted/40 border-b border-border pb-4">
                    <CardTitle className="text-base font-display flex items-center gap-2">
                      <Cookie className="h-5 w-5 text-primary" /> Cookie Preferences Dashboard
                    </CardTitle>
                    <CardDescription>
                      Control which trackers and scripts are authorized to initialize on your browser.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    
                    {/* Cookie Item 1 */}
                    <div className="flex items-start gap-4">
                      <div className="pt-0.5">
                        <Checkbox 
                          id="cookie-necessary" 
                          checked={cookiePrefs.necessary} 
                          disabled 
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label htmlFor="cookie-necessary" className="text-sm font-bold text-foreground cursor-not-allowed flex items-center gap-1.5">
                          Strictly Necessary Cookies <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono uppercase tracking-wider font-bold">Required</span>
                        </label>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Enables secure sign-in via Clerk, local shopping cart caching, and security checks. Cannot be disabled.
                        </p>
                      </div>
                    </div>

                    {/* Cookie Item 2 */}
                    <div className="flex items-start gap-4">
                      <div className="pt-0.5">
                        <Checkbox 
                          id="cookie-analytics" 
                          checked={cookiePrefs.analytics} 
                          onChange={(e) => setCookiePrefs({ ...cookiePrefs, analytics: e.target.checked })} 
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label htmlFor="cookie-analytics" className="text-sm font-bold text-foreground cursor-pointer hover:text-primary transition-colors">
                          Analytics & Optimization Cookies
                        </label>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Allows us to study page performance, load times, and analyze raw meat delivery telemetry data to improve services.
                        </p>
                      </div>
                    </div>

                    {/* Cookie Item 3 */}
                    <div className="flex items-start gap-4">
                      <div className="pt-0.5">
                        <Checkbox 
                          id="cookie-marketing" 
                          checked={cookiePrefs.marketing} 
                          onChange={(e) => setCookiePrefs({ ...cookiePrefs, marketing: e.target.checked })} 
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label htmlFor="cookie-marketing" className="text-sm font-bold text-foreground cursor-pointer hover:text-primary transition-colors">
                          Personalized Marketing Cookies
                        </label>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Used to suggest specific bundles (e.g. BBQ value box vs. family steak box) based on your past search actions.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex justify-end">
                      <Button 
                        onClick={handleSavePreferences} 
                        disabled={isSaving}
                        className="min-w-36 font-semibold flex items-center justify-center gap-2"
                      >
                        {isSaving ? (
                          <>
                            <Spinner size="sm" className="text-white" /> Saving...
                          </>
                        ) : (
                          "Save Preferences"
                        )}
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              </div>
            </article>

            {/* Section: Contact */}
            <article id="contact" className="print-legal-section pb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Mail className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">7. Policy Updates & Contact Details</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[6].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  We reserve the right to amend this Privacy Policy at any time. When modifications are finalized, we will update the &quot;Last Updated&quot; marker at the top of this document. Continued usage of our meatshop platforms following policy edits signifies your acknowledgment of the changes.
                </p>
                <p>
                  If you have complaints, security reports, or inquiries regarding your data under the Philippine DPA, please address them to:
                </p>
                <div className="p-5 bg-card border border-border rounded-xl space-y-2 text-sm text-muted-foreground max-w-md">
                  <p className="font-bold text-foreground font-display text-base">Cebu Central Meatshop Compliance Team</p>
                  <p><strong>Address:</strong> H. Abellana Street, Jagobiao, Mandaue City, Cebu, Philippines, 6014</p>
                  <p><strong>Hotline:</strong> +63 (32) 489-3281</p>
                  <p><strong>Email:</strong> <a href="mailto:privacy@cebucentralmeatshop.com" className="text-primary hover:underline font-semibold">privacy@cebucentralmeatshop.com</a></p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* 4. Footer Help Widget */}
      <section className="py-12 bg-muted/30 border-t border-border no-print">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h3 className="text-xl font-display font-bold">Privacy Concerns?</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Read our standard Terms of Service to learn more about client verification and checkout rules.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button href="/terms" variant="outline" size="sm">
              Read Terms of Service
            </Button>
            <Button href="/faq" variant="default" size="sm">
              View FAQ Help Center <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

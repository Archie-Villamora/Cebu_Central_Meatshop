import { useState, useEffect } from "react";
import { 
  Scale, 
  Printer, 
  ArrowRight, 
  BookOpen, 
  Lock, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  ShieldAlert, 
  Globe, 
  FileText,
  ChevronDown
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  summary: string;
}

const SECTIONS: Section[] = [
  { 
    id: "acceptance", 
    title: "1. Acceptance of Terms", 
    icon: Scale,
    summary: "By using our website to browse or order meats, you agree to follow these rules. If you do not agree, please do not use our service."
  },
  { 
    id: "accounts", 
    title: "2. Account Registration", 
    icon: Lock,
    summary: "Accounts are managed via Clerk. Keep your password safe. You are responsible for all orders placed through your account."
  },
  { 
    id: "products", 
    title: "3. Products & Pricing", 
    icon: BookOpen,
    summary: "Meat is a natural product—weights might vary slightly (+/- 10%). Prices are listed in Philippine Pesos (₱) and are subject to change."
  },
  { 
    id: "payments", 
    title: "4. Payments & Billing", 
    icon: CreditCard,
    summary: "We accept Credit Cards, GCash, Maya, and Cash on Delivery (COD). Payments must clear before we hand over or ship the cuts."
  },
  { 
    id: "delivery", 
    title: "5. Cold-Chain Delivery", 
    icon: Truck,
    summary: "We deliver in Metro Cebu under strict cold-chain safety (< 4°C). If you aren't home, let us know where to safely leave your order."
  },
  { 
    id: "guarantee", 
    title: "6. Returns & Guarantee", 
    icon: RotateCcw,
    summary: "We stand by our meat. If there's an issue with freshness, file a claim on our Guarantee page within 24 hours of delivery for a replacement."
  },
  { 
    id: "liability", 
    title: "7. Limitation of Liability", 
    icon: ShieldAlert,
    summary: "Our liability is limited to the amount you paid for your order. We are not liable for indirect damages or delivery delays due to weather."
  },
  { 
    id: "governing", 
    title: "8. Governing Law", 
    icon: Globe,
    summary: "These terms are governed by the laws of the Philippines. Any legal issues will be handled exclusively in courts located in Cebu City."
  }
];

export const Terms = () => {
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Terms & Conditions | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read the official Terms of Service for Cebu Central Meatshop. Understand account requirements, fresh meat delivery schedules, and purchase conditions in Metro Cebu."
      );
    }
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
      const offset = 180; // offset height to account for sticky navbar and title buffers
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

  const activeSectionData = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          header, footer, nav, aside, button, .no-print, .mobile-toc-bar {
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
                <FileText className="h-3.5 w-3.5" /> Legal Standards
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                Terms of Service
              </h1>
              <p className="text-sm md:text-base text-zinc-400 mt-3 max-w-2xl leading-relaxed">
                Last Updated: May 28, 2026 • Please review the guidelines governing account usage, raw food safety, delivery coordinates, and purchase structures.
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
            aria-label="Terms of Service Sections"
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

      {/* 3. Main Legal Layout */}
      <section className="py-12 md:py-16 container mx-auto px-4 md:px-6 max-w-6xl print-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start print-content-wrapper">
          
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-28 no-print self-start">
            <div className="border border-border/80 rounded-xl bg-card p-5 shadow-sm">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-zinc-400 mb-4 px-2">Table of Contents</h3>
              <nav aria-label="Terms of Service Sections" className="space-y-1.5">
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

          {/* Legal Text Panel */}
          <div className="lg:col-span-3 space-y-12 md:space-y-16 print-content">
            
            {/* Section: Introduction */}
            <article id="acceptance" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Scale className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">1. Acceptance of Terms & Conditions</h2>
              </div>
              
              {/* Plain English summary */}
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
                  Welcome to Cebu Central Meatshop (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Cebu Central Meatshop, concerning your access to and use of our website (<a href="https://cebucentralmeatshop.com" className="text-primary hover:underline font-semibold no-print">cebucentralmeatshop.com</a>) and our specialized fresh meat order processing services.
                </p>
                <p>
                  By accessing the website, you confirm that you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the site and you must discontinue use immediately.
                </p>
                <p>
                  We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the &quot;Last Updated&quot; date of these Terms of Service, and you waive any right to receive specific notice of each such change.
                </p>
              </div>
            </article>

            {/* Section: Accounts & Registration */}
            <article id="accounts" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Lock className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">2. Account Registration & Security</h2>
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
                  To complete purchases or utilize specialized customer panels (such as subscription scheduling and wholesale accounts), you will be required to register an account with us. We utilize <strong>Clerk</strong> as our authentication and user registry provider.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You agree to provide accurate, current, and complete information during registration.</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials, and we cannot be held liable for unauthorized access stemming from password leakage on your end.</li>
                  <li>You must immediately notify us if you suspect any security breaches or unauthorized use of your credentials.</li>
                  <li>We reserve the right to suspend or terminate accounts that provide fraudulent information or violate standard transaction limits.</li>
                </ul>
              </div>
            </article>

            {/* Section: Products & Pricing */}
            <article id="products" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <BookOpen className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">3. Product Specifications & Pricing</h2>
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
                  As an artisan meatshop handling raw agricultural products, we enforce specific product guidelines:
                </p>
                <div className="space-y-3 pl-2 border-l-2 border-muted-foreground/30">
                  <p>
                    <strong>Weight Deviations:</strong> All meat cuts are hand-carved by our master butchers. While we endeavor to match target sizes, final portions may vary by up to <strong>10% plus or minus</strong>. For billing, the price charged is locked at checkout based on the standard weight threshold.
                  </p>
                  <p>
                    <strong>Pricing:</strong> All prices are displayed in Philippine Pesos (PHP, ₱) and include local sales tax. We reserve the right to alter pricing catalogs without notice due to fluctuations in livestock commodity markets.
                  </p>
                  <p>
                    <strong>Availability:</strong> Raw fresh cuts are subject to farm stock cycles. If a specific cut is sold out after order placement, we will contact you to arrange a substitution of equal value or issue a refund.
                  </p>
                </div>
              </div>
            </article>

            {/* Section: Payments */}
            <article id="payments" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <CreditCard className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">4. Payments, Billing & Taxes</h2>
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
                  We offer multiple checkout mechanisms for convenience:
                </p>
                <p>
                  <strong>Accepted Gateways:</strong> Standard online payments (Visa, MasterCard, JCB) are processed securely through certified payment gateways. We also support regional e-wallets (GCash, Maya, GrabPay) and Cash on Delivery (COD) for qualified residential delivery addresses.
                </p>
                <p>
                  <strong>Billing Verification:</strong> You agree to provide current, complete, and accurate purchase and account information for all purchases. For credit and online transactions, we authenticate billing details before packing cuts.
                </p>
                <p>
                  <strong>Default/Non-Payment:</strong> If an online payment fails, we will place the order on hold and contact you. We reserve the right to refuse or cancel orders if fraud or an unauthorized transaction is suspected.
                </p>
              </div>
            </article>

            {/* Section: Delivery */}
            <article id="delivery" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Truck className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">5. Cold-Chain Delivery & Shipping Schedules</h2>
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
                  Due to the highly perishable nature of raw meats, shipping is governed by strict rules (refer to <a href="/shipping" className="text-primary hover:underline font-semibold no-print">Shipping & Delivery</a> for details):
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Scope:</strong> Delivery services are restricted to Metro Cebu zones listed in our area indexes. For food safety, we do not ship raw fresh meats via standard courier parcel networks outside Metro Cebu.</li>
                  <li><strong>Receipt of Cargo:</strong> You must ensure someone is present to receive the order at your specified time window. Since products are packaged with food-grade gel ice packs, they can only sit in our thermal envelopes for up to 6 hours.</li>
                  <li><strong>Risk Transfer:</strong> Title and risk of loss pass to you upon delivery to your specified location. If you ask our rider to leave the box at your doorstep or guardhouse, we are not liable for subsequent spoilage, contamination, or theft.</li>
                </ul>
              </div>
            </article>

            {/* Section: Guarantee */}
            <article id="guarantee" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <RotateCcw className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">6. Return Policy & Satisfaction Guarantee</h2>
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
                  We strive for perfection but understand issues can occur with fresh agriculture:
                </p>
                <p>
                  <strong>Freshness Guarantee:</strong> We offer a 100% Satisfaction Guarantee. If you receive meat that has compromised packaging, improper trimming, severe color anomalies, or off-odors, please file a replacement claim on our <a href="/guarantee" className="text-primary hover:underline font-semibold no-print">Guarantee Page</a> within <strong>24 hours</strong> of delivery.
                </p>
                <p>
                  <strong>Verification Requirements:</strong> Because meat is perishable, we require digital photograph evidence of the issue and the packaging labels. Do not discard the product until our customer care team reviews your claim.
                </p>
                <p>
                  <strong>Resolutions:</strong> Approved claims will receive a direct product replacement on our next delivery run or store credits towards your next order. Cash refunds are evaluated on a case-by-case basis.
                </p>
              </div>
            </article>

            {/* Section: Liability */}
            <article id="liability" className="print-legal-section border-b border-border/40 pb-10 md:pb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <ShieldAlert className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">7. Limitation of Liability & Indemnification</h2>
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
                  In no event will Cebu Central Meatshop, our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our delivery services.
                </p>
                <p>
                  Our total liability to you for any cause whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us for product orders during the prior 1-month period.
                </p>
                <p>
                  You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of your breach of these Terms of Service.
                </p>
              </div>
            </article>

            {/* Section: Governing Law */}
            <article id="governing" className="print-legal-section pb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                  <Globe className="h-5.5 w-5.5" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold">8. Governing Law & Dispute Resolution</h2>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm mb-6 no-print">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-0.5">Plain English Summary</span>
                  <span className="text-muted-foreground">
                    {SECTIONS[7].summary}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 font-sans text-sm md:text-base">
                <p>
                  These Terms of Service and your use of the website are governed by and construed in accordance with the laws of the <strong>Republic of the Philippines</strong>, without regard to its conflict of law principles.
                </p>
                <p>
                  Any legal action or administrative proceeding of whatever nature arising out of or relating to these Terms of Service shall be filed exclusively in the courts of proper jurisdiction located in <strong>Cebu City, Philippines</strong>, and the parties hereby consent to the personal jurisdiction and venue of such courts.
                </p>
                <p>
                  If any provision of these Terms of Service is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Service and does not affect the validity and enforceability of any remaining provisions.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* 4. Footer Help Widget */}
      <section className="py-12 bg-muted/30 border-t border-border no-print">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h3 className="text-xl font-display font-bold">Have Questions About Our Terms?</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Our legal compliance team is happy to help clarify any details surrounding wholesale contracts or cold chain procedures.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button href="/faq" variant="outline" size="sm">
              Read FAQs
            </Button>
            <Button href="/wholesale" variant="default" size="sm">
              Contact Wholesale B2B <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  Mail, 
  MessageCircle,
  X,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CreditCard
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

interface FAQItem {
  id: string;
  category: "ordering" | "sourcing" | "delivery" | "payments";
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "ordering",
    question: "How do I place an order online?",
    answer: "Simply add your selected meat cuts or curated boxes to the cart, click on the shopping cart drawer, and hit 'Proceed to Checkout'. Follow the prompts to input your delivery address, schedule a delivery time slot, select your payment method, and complete the order."
  },
  {
    id: "faq-2",
    category: "ordering",
    question: "Can I modify or cancel my order after it has been placed?",
    answer: "Because we process fresh cuts quickly, order modifications or cancellations are only permitted within 2 hours of placing the order, or before 3:00 PM on the day prior to scheduled delivery. Please call or WhatsApp our support line immediately with your Order ID to request changes."
  },
  {
    id: "faq-3",
    category: "ordering",
    question: "Do you have a physical butcher shop I can visit?",
    answer: "Yes, we do! You can visit our flagship Cebu Central showroom and butchery shop located in Mandaue City. Here, you can consult with our master butchers, select custom cuts directly from the dry-aging cabinet, and purchase products on the spot."
  },
  {
    id: "faq-4",
    category: "sourcing",
    question: "Is your meat fresh or frozen?",
    answer: "Our local pork and poultry are processed fresh daily at our local certified facilities and kept chilled under 4°C. Our imported beef (Australian Wagyu, US Black Angus) is shipped to us under vacuum-sealed sub-zero conditions and held in our specialized aging chambers, allowing us to portion it into fresh cuts on order."
  },
  {
    id: "faq-5",
    category: "sourcing",
    question: "Can I request custom trimming, thickness, or weight parameters?",
    answer: "Absolutely. We are custom butchers at heart. When viewing any steak cut on our shop page, you can select standard thicknesses, or add specific cutting instructions in the notes box (e.g., 'slice pork belly exactly 0.5 inches thick' or 'trim all fat off the ribeye'). Our butcher staff will prep it to your exact specs."
  },
  {
    id: "faq-6",
    category: "sourcing",
    question: "Are your local meats certified by health inspectors?",
    answer: "Yes, 100% of our local meat products are certified by the National Meat Inspection Service (NMIS) and processed in double-A sanitary grade facilities. All imported items come with formal clearance documents from the Bureau of Animal Industry (BAI)."
  },
  {
    id: "faq-7",
    category: "delivery",
    question: "How do you ensure the meat doesn't spoil during delivery?",
    answer: "We run a strict cold-chain process. Freshly butchered portions are vacuum-sealed, portion-labeled, and packed into our specialized insulated foil thermal sleeves filled with solid gel ice blocks. They are shipped via our proprietary temperature-monitored refrigerated van fleet."
  },
  {
    id: "faq-8",
    category: "delivery",
    question: "Can I track my delivery rider in real time?",
    answer: "Yes. Once your order is dispatched from our Mandaue hub, you will receive an SMS containing a tracking link. This link opens a live map showing the driver's location, contact details, and estimated time of arrival."
  },
  {
    id: "faq-9",
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "We support a wide variety of convenient payment methods, including GCash, Maya, major Credit/Debit Cards (Visa, Mastercard), Bank Transfer (BDO, BPI), and Cash on Delivery (COD)."
  },
  {
    id: "faq-10",
    category: "payments",
    question: "Is it safe to pay online with credit cards on your site?",
    answer: "Yes, fully safe. We do not store any card numbers on our servers. All card payments are processed via our secure, PCI-DSS compliant payment gateway partner (PayMongo), utilizing bank-grade 256-bit SSL encryption to secure your transactions."
  }
];

const CATEGORIES = [
  { id: "all", name: "All Topics", icon: HelpCircle },
  { id: "ordering", name: "Ordering & Accounts", icon: ShoppingBag },
  { id: "sourcing", name: "Meat & Butchery", icon: ShieldCheck },
  { id: "delivery", name: "Cold-Chain & Shipping", icon: Truck },
  { id: "payments", name: "Payments & Billing", icon: CreditCard }
] as const;

type CategoryFilter = typeof CATEGORIES[number]["id"];

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    document.title = "FAQ Help Center | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Got questions about custom meat cuts, storage guidelines, ordering cut-offs, or delivery schedules? Search our complete FAQ Help Center."
      );
    }
  }, []);

  // Filter FAQs based on category AND search input
  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex-1 bg-background text-foreground">
      {/* 1. Hero Section with Search bar */}
      <section className="relative h-[340px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80" 
            alt="Butcher preparing premium cuts" 
            className="w-full h-full object-cover opacity-25 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-zinc-950/80" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <FadeIn duration="500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <HelpCircle className="h-3.5 w-3.5" /> Support Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              How Can We <span className="text-primary">Help You?</span>
            </h1>
            
            {/* Search Input Box */}
            <div className="relative mt-8 max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search queries (e.g. 'custom cuts', 'GCash', 'cutoff')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-12 w-full rounded-md border border-border bg-white dark:bg-zinc-900 pl-12 pr-10 py-2 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary placeholder:text-muted-foreground shadow-lg text-foreground"
              />
              {searchQuery && (
                <button 
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Categories Navigation */}
      <section className="py-8 border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 overflow-x-auto flex justify-start md:justify-center items-center gap-2 pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenFaq(null); // Close active faq when switching category
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive 
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/10" 
                    : "bg-card border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <IconComp className="h-4.5 w-4.5" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Main FAQ Accordion Container */}
      <section className="py-16 container mx-auto px-4 md:px-6 max-w-4xl min-h-[400px]">
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              const delayValues = ["none", "150", "300", "500", "1000"] as const;
              return (
                <FadeIn key={faq.id} delay={delayValues[index % delayValues.length]} duration="500">
                  <div className="border border-border rounded-lg bg-card overflow-hidden shadow-sm hover:shadow transition-shadow">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground hover:bg-muted/10 transition-colors focus:outline-none"
                    >
                      <span className="font-display text-base md:text-lg leading-tight tracking-wide">
                        {faq.question}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/40">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        ) : (
          <FadeIn duration="500">
            <EmptyState 
              icon={<Search className="h-8 w-8" />}
              title="No Matching FAQ Topics Found"
              description={`We couldn't find any questions matching "${searchQuery}" under this category. Try searching another keyword or browsing all topics.`}
              action={
                <Button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} variant="outline" size="sm">
                  Reset Filters
                </Button>
              }
              className="py-16"
            />
          </FadeIn>
        )}
      </section>

      {/* 4. Need More Help Call-Out Cards */}
      <section className="bg-muted/40 py-16 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Still Have Questions?</h2>
            <p className="text-muted-foreground mt-3">
              If your question isn't answered here, feel free to contact our customer support team directly. We are always ready to help.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Call Support */}
            <Card className="text-center p-6 border-border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Direct Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Speak directly with our Mandaue hub customer relations manager.
              </p>
              <a href="tel:+63321234567" className="text-primary font-bold text-sm hover:underline flex items-center justify-center gap-1">
                +63 (32) 123-4567
              </a>
            </Card>

            {/* Live WhatsApp */}
            <Card className="text-center p-6 border-border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">WhatsApp Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Send cutting requests or modify schedules instantly over WhatsApp.
              </p>
              <a href="https://wa.me/639171234567" target="_blank" rel="noreferrer" className="text-primary font-bold text-sm hover:underline flex items-center justify-center gap-1">
                Chat on WhatsApp
              </a>
            </Card>

            {/* Email Support */}
            <Card className="text-center p-6 border-border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Email Help Desk</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Send custom requests, receipts, or billing inquiries.
              </p>
              <a href="mailto:support@cebucentralmeatshop.ph" className="text-primary font-bold text-sm hover:underline flex items-center justify-center gap-1">
                support@cebucentralmeatshop.ph
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

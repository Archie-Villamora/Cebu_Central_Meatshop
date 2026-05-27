import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { BUNDLES } from "@/config/products";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Truck, 
  RefreshCw, 
  Gift, 
  Check, 
  ChevronDown, 
  ArrowRight,
  ShieldAlert,
  Percent
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { toast } from "@/components/ui/Toaster";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do billing cycles and payments work?",
    answer: "Your subscription is billed automatically before each delivery. The payment is processed on the same day of the week or month as your initial sign-up, depending on your selected frequency. We support credit card, debit card, GCash, and Maya recurring payments."
  },
  {
    question: "Can I pause, skip, or cancel my subscription?",
    answer: "Absolutely. You have 100% control over your subscription. You can skip a delivery, pause your plan, or cancel entirely at any time directly from the 'Customer Hub' page in your account dashboard. There are no fees or lock-in contracts. Just make sure to make adjustments 48 hours before your next scheduled delivery."
  },
  {
    question: "Are there delivery fees for subscription club members?",
    answer: "No, all Cebu Central Meat Club members receive free delivery within our Metro Cebu coverage zones. This is a complimentary benefit of subscribing."
  },
  {
    question: "Can I swap items or customize the contents of a box?",
    answer: "Yes. In the Customer Hub, you can customize the contents of your recurring boxes by swapping out specific cuts (e.g., swapping chicken wings for pork chops) or adding extra à la carte steaks to your upcoming delivery. Customizations must be locked in 48 hours before delivery."
  },
  {
    question: "How is the meat packaged to maintain freshness?",
    answer: "All products are individually vacuum-sealed in heavy-duty food-grade packaging. For subscription boxes, we pack them in insulation envelopes inside reusable cooler boxes with gel ice packs, ensuring they remain completely frozen or chilled during transit in our refrigerated trucks."
  }
];

export const Subscription = () => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Track selected frequency per box id
  const [frequencies, setFrequencies] = useState<Record<string, "Weekly" | "Bi-weekly" | "Monthly">>({
    "family-staples": "Monthly",
    "bbq-grill-master": "Bi-weekly",
    "butchers-choice": "Monthly"
  });

  const boxesRef = useRef<HTMLDivElement>(null);

  // Scroll to the boxes section if hash exists on load & set SEO tags
  useEffect(() => {
    document.title = "Cebu Central Meat Club | Meat Box Subscriptions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Subscribe to curated meat boxes from Cebu Central Meatshop. Save 10%, enjoy free priority delivery in Metro Cebu, and cancel or skip deliveries anytime.");
    }

    const hash = window.location.hash;
    if (hash && (hash.includes("weekly") || hash.includes("monthly") || hash.includes("subscription"))) {
      setTimeout(() => {
        boxesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, []);

  const handleFrequencyChange = (boxId: string, freq: "Weekly" | "Bi-weekly" | "Monthly") => {
    setFrequencies((prev) => ({
      ...prev,
      [boxId]: freq
    }));
  };

  const handleSubscribe = (bundle: typeof BUNDLES[0]) => {
    const freq = frequencies[bundle.id];
    
    // Apply an additional 10% subscription discount on top of the bundle price
    const subPrice = Math.round(bundle.price * 0.9);
    
    addToCart({
      id: `${bundle.id}-sub-${freq.toLowerCase()}`,
      name: `${bundle.name} (${freq})`,
      price: subPrice,
      weight: bundle.badge || "1 Box",
      image: bundle.image,
      type: "subscription",
      frequency: freq
    }, 1);

    toast.success(`Subscribed to ${bundle.name} on a ${freq} basis!`);
  };

  return (
    <div className="flex-1 bg-background text-foreground">
      {/* 1. Hero Section */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80" 
            alt="Premium Steaks" 
            className="w-full h-full object-cover opacity-35 object-center animate-pulse"
            style={{ animationDuration: "12s" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-zinc-950/80" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <FadeIn duration="500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Calendar className="h-3.5 w-3.5" /> Recurring Deliveries
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Cebu Central <span className="text-primary">Meat Club</span>
            </h1>
            <p className="text-base md:text-xl text-zinc-300 mt-6 leading-relaxed max-w-2xl mx-auto">
              Never run out of premium protein. Subscribe to our masterfully portioned boxes, enjoy a permanent 10% discount, and receive free scheduled delivery.
            </p>
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => boxesRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-bold text-base transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
              >
                Choose Subscription Box <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Value Propositions Grid */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn duration="500">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Why Join The Meat Club?</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Unlock maximum savings, convenience, and priority cut selections with our subscription club.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FadeIn delay="none" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Percent className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Save 10% Extra</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Receive an additional 10% discount on every subscription box delivery compared to standard list prices.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="150" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Free Delivery</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Enjoy free cold-van shipping on all subscription deliveries within our Metro Cebu coverage zones.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="300" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Easily pause, skip a week, change delivery frequencies, or swap cuts in your Account Hub. No cancellation fees.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="500" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Gift className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Exclusive Reserve Cuts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Get priority access to limited seasonal runs, highly marbled cuts, and members-only butcher cuts.
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* 3. Onboarding Steps */}
      <section className="bg-muted/30 py-20 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn duration="500">
              <h2 className="text-3xl font-display font-bold">How It Works</h2>
              <p className="text-muted-foreground mt-4">
                Subscribing is simple, and managing your orders is completely hassle-free.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose Your Box",
                desc: "Select a curated box that matches your dining habits and household size."
              },
              {
                step: "02",
                title: "Set Your Schedule",
                desc: "Pick your preferred frequency: Weekly, Bi-weekly, or Monthly deliveries."
              },
              {
                step: "03",
                title: "Cold-Chain Shipping",
                desc: "We deliver the box fresh in our temperature-controlled trucks on your scheduled day."
              },
              {
                step: "04",
                title: "Manage in Hub",
                desc: "Skip dates, edit items, swap boxes, or cancel anytime inside your Customer Hub."
              }
            ].map((item, idx) => {
              const delayMap = ["none", "150", "300", "500"] as const;
              return (
                <FadeIn key={idx} delay={delayMap[idx] || "none"} duration="700" className="relative flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-display font-extrabold text-primary/20 tracking-wider">
                      {item.step}
                    </span>
                    <div className="h-px bg-border flex-1 hidden md:block" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Curated Subscription Boxes */}
      <section ref={boxesRef} className="py-20 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn duration="500">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Select Your Club Box</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Each box is vacuum-packed and shipped in insulation envelopes with reusable ice packs.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {BUNDLES.map((bundle, idx) => {
            const currentFreq = frequencies[bundle.id] || "Monthly";
            const discountedPrice = Math.round(bundle.price * 0.9);
            
              const delayMap = ["none", "150", "300"] as const;
              return (
                <FadeIn key={bundle.id} delay={delayMap[idx % delayMap.length]} duration="700" className="flex">
                  <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col w-full border-border/80 overflow-hidden">
                    <div className="h-48 relative overflow-hidden bg-muted">
                      <img src={bundle.image} alt={bundle.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                      {bundle.badge && (
                        <Badge className="absolute top-4 left-4 font-bold shadow" variant="default">
                          {bundle.badge}
                        </Badge>
                      )}
                      <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                        10% Club Discount
                      </div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-display leading-tight">{bundle.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2 mt-1">{bundle.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 flex-1 flex flex-col">
                      {/* Contents Checklist */}
                      <div className="space-y-2.5 flex-1">
                        <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-2">Box Contents:</p>
                        {bundle.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground">
                            <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Frequency Selector */}
                      <div className="space-y-2 border-t border-border pt-4">
                        <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider block mb-2">
                          Delivery Schedule:
                        </label>
                        <div className="grid grid-cols-3 gap-1.5 bg-muted/40 p-1 rounded-md">
                          {(["Weekly", "Bi-weekly", "Monthly"] as const).map((f) => {
                            const isSelected = currentFreq === f;
                            return (
                              <button
                                key={f}
                                onClick={() => handleFrequencyChange(bundle.id, f)}
                                className={`py-1.5 text-[10px] md:text-xs font-bold rounded transition-colors focus:outline-none cursor-pointer ${
                                  isSelected 
                                    ? "bg-white text-primary shadow" 
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {f}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>

                    <div className="bg-muted/15 border-t border-border p-6 flex flex-col gap-4 mt-auto">
                      <div className="flex justify-between items-baseline w-full">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through font-sans">
                            ₱{bundle.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                            One-time: ₱{bundle.price.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-green-600 font-bold block mt-0.5">
                            Save ₱{(bundle.originalPrice - discountedPrice).toLocaleString()} ({(Math.round(((bundle.originalPrice - discountedPrice) / bundle.originalPrice) * 100))}% off retail)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-display font-extrabold text-primary">
                            ₱{discountedPrice.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-muted-foreground block font-semibold">
                            per delivery
                          </span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleSubscribe(bundle)}
                        className="w-full font-bold cursor-pointer"
                      >
                        <Calendar className="h-4.5 w-4.5 mr-2" />
                        Subscribe Now
                      </Button>
                    </div>
                  </Card>
                </FadeIn>
              );
          })}
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <FadeIn duration="500">
              <h2 className="text-3xl font-display font-bold">Meat Club FAQs</h2>
              <p className="text-muted-foreground mt-4">
                Answers to common questions regarding box deliveries, swaps, and billing.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              const faqDelayMap = ["none", "150", "300", "500", "1000"] as const;
              return (
                <FadeIn key={index} delay={faqDelayMap[index % faqDelayMap.length]} duration="500">
                  <div className="border border-border rounded-lg bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground hover:bg-muted/10 transition-colors focus:outline-none"
                    >
                      <span className="font-display text-base md:text-lg leading-tight tracking-wide">
                        {item.question}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/40">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Assurance Footer Banner */}
      <section className="bg-zinc-950 text-white py-16 border-t border-border">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <FadeIn duration="700">
            <ShieldAlert className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4">No Commitment. Cancel Anytime.</h3>
            <p className="text-zinc-400 mb-6 text-sm md:text-base leading-relaxed">
              We stand by our quality. If you are going out of town, your freezer is full, or you wish to discontinue, you can skip a week, pause your plan, or cancel your subscription instantly with zero penalties.
            </p>
            <Button href="/support" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
              Visit Customer Support
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

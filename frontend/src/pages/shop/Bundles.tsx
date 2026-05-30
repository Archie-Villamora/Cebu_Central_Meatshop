import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ShoppingBag, 
  Flame, 
  Users, 
  Sparkles, 
  ChevronRight 
} from "lucide-react";
import { BUNDLES, Bundle } from "@/config/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

export function Bundles() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"all" | "bbq" | "family" | "value">("all");
  const [addingBundleId, setAddingBundleId] = useState<string | null>(null);

  const filteredBundles = useMemo(() => {
    if (activeTab === "bbq") {
      return BUNDLES.filter(b => b.tag === "BBQ Specialties");
    }
    if (activeTab === "family") {
      return BUNDLES.filter(b => b.tag === "Family Packs");
    }
    if (activeTab === "value") {
      return BUNDLES.filter(b => b.tag === "Value Bundles");
    }
    return BUNDLES;
  }, [activeTab]);

  const handleAddBundle = (bundle: Bundle) => {
    setAddingBundleId(bundle.id);
    addToCart({
      id: bundle.id,
      name: bundle.name,
      price: bundle.price,
      weight: "Bundle Pack",
      image: bundle.image,
      type: "bundle"
    }, 1);

    setTimeout(() => {
      setAddingBundleId(null);
    }, 1500);
  };

  const getTabIcon = (tab: string) => {
    if (tab === "bbq") return Flame;
    if (tab === "family") return Users;
    if (tab === "value") return Sparkles;
    return ShoppingBag;
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      
      {/* 1. Page Header */}
      <section className="bg-foreground text-background py-16 md:py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 via-foreground to-foreground opacity-95" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl flex flex-col items-start">
            <span className="text-xs bg-primary text-primary-foreground font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-3">
              Stock & Save
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white leading-tight">
              Curated Meat Boxes
            </h1>
            <p className="text-base md:text-lg text-zinc-300 max-w-xl leading-relaxed">
              Curated meat boxes designed for family dining, weekend BBQ cookouts, and bulk freezer stock. Buy combined cuts and save up to 20% compared to individual retail orders.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main content area */}
      <div className="container mx-auto px-4 md:px-6 mt-10">
        
        {/* Category Tabs */}
        <div className="flex border-b border-border mb-10 overflow-x-auto gap-4 md:gap-8 pb-px">
          {[
            { id: "all", name: "All Packs" },
            { id: "bbq", name: "BBQ Specialties" },
            { id: "family", name: "Family Staples" },
            { id: "value", name: "Prime Value" }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = getTabIcon(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs md:text-sm font-bold tracking-wide uppercase flex items-center gap-2 relative shrink-0 transition-colors cursor-pointer select-none ${
                  isSelected ? "text-primary font-extrabold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
                {isSelected && (
                  <motion.div
                    layoutId="activeBundleTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBundles.map((bundle) => {
              const savings = bundle.originalPrice - bundle.price;
              const percentSavings = Math.round((savings / bundle.originalPrice) * 100);
              const isAdding = addingBundleId === bundle.id;

              return (
                <motion.div
                  layout
                  key={bundle.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group flex flex-col h-full bg-white border border-border hover:shadow-xl hover:shadow-black/5 transition-all duration-300 overflow-hidden rounded-2xl relative">
                    {/* Visual Banner */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted border-b border-border shrink-0">
                      <img
                        src={bundle.image}
                        alt={bundle.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                        {bundle.badge && (
                          <Badge variant="default" className="text-[10px] px-2.5 py-1 tracking-wider uppercase font-extrabold shadow-md">
                            {bundle.badge}
                          </Badge>
                        )}
                        <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-sm shadow-md select-none">
                          {percentSavings}% Off Retail
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {/* Header Group */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                          {bundle.tag}
                        </span>
                        <h2 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-tight">
                          {bundle.name}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                        {bundle.description}
                      </p>

                      {/* Contents List */}
                      <div className="bg-muted/30 border border-border/80 rounded-xl p-4 mb-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/80 mb-2.5">
                          Package Contents:
                        </h4>
                        <ul className="space-y-2">
                          {bundle.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground font-medium">
                              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing / Buy Row */}
                      <div className="pt-4 border-t border-border mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground line-through decoration-primary decoration-1 font-medium font-sans">
                              ₱{bundle.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">
                              Save ₱{savings.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-foreground font-sans mt-0.5 leading-none">
                            ₱{bundle.price.toLocaleString()}
                          </span>
                        </div>

                        <Button
                          onClick={() => handleAddBundle(bundle)}
                          variant={isAdding ? "secondary" : "default"}
                          className={`w-full sm:w-auto font-bold px-5 h-12 text-xs cursor-pointer ${
                            isAdding ? "bg-emerald-600 text-white hover:bg-emerald-600" : ""
                          }`}
                        >
                          {isAdding ? (
                            <>
                              <Check className="h-4 w-4 mr-1.5" />
                              Added Box
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-4 w-4 mr-1.5" />
                              Add Box to Cart
                            </>
                          )}
                        </Button>
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Free Shipping Promo banner */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-10 text-center max-w-4xl mx-auto mt-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left max-w-xl">
            <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-1.5">
              Subscribe to regular Delivery Boxes?
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Join the Cebu Central Weekly Meat Club. Get curated packs delivered to your kitchen every Saturday, customized to your preferences. Plus get <strong>10% off</strong> and <strong>free Metro Cebu delivery</strong>.
            </p>
          </div>
          <Button href="/subscription" className="font-bold shrink-0 shadow-md cursor-pointer" size="lg">
            Join Club <ChevronRight className="h-4 w-4 ml-1.5" />
          </Button>
        </section>

      </div>
    </div>
  );
}

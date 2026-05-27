import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  MapPin, 
  Thermometer, 
  ShieldCheck, 
  ChevronRight
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface Farm {
  id: string;
  name: string;
  location: string;
  province: string;
  type: string;
  grassFedRatio: number;
  welfareScore: number;
  transitHours: number;
  description: string;
  feedingRegime: string;
  image: string;
}

const PARTNER_FARMS: Farm[] = [
  {
    id: "farm-1",
    name: "Carcar Valley Pastures",
    location: "Carcar City",
    province: "Cebu",
    type: "Heritage Pork",
    grassFedRatio: 75,
    welfareScore: 98,
    transitHours: 1.5,
    description: "Nestled in the rolling hills of Carcar, this pasture farm specializes in free-roaming heritage pigs. The animals have access to natural mud wallows, shaded tree groves, and clean spring water, promoting active lifestyles that develop robust muscle marbling.",
    feedingRegime: "Native grasses, local sweet potato vines, and organic rice bran feed mix.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "farm-2",
    name: "Bantayan Free-Range Co-op",
    location: "Bantayan Island",
    province: "Cebu",
    type: "Free-Range Poultry",
    grassFedRatio: 90,
    welfareScore: 95,
    transitHours: 4.0,
    description: "A community of smallholder poultry farmers on Bantayan Island raising chickens in open, sunny coconut orchards. Operating with zero cages and zero antibiotics, these chickens forage naturally, resulting in leaner meat and rich, golden yolks.",
    feedingRegime: "Natural insects, grass seeds, cracked corn, and local herbal supplements.",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "farm-3",
    name: "Negros Highlands Ranch",
    location: "Canlaon Foothills",
    province: "Negros Oriental",
    type: "Pasture Lamb & Beef",
    grassFedRatio: 100,
    welfareScore: 97,
    transitHours: 5.5,
    description: "Situated at an altitude of 800 meters, Negros Highlands Ranch benefits from cool mountain breezes and year-round volcanic soil grass growth. Cattle and lamb are strictly pasture-rotated weekly to maintain grass health and ensure diverse nutrient intake.",
    feedingRegime: "100% natural highland grazing grasses, legumes, and volcanic mineral water.",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "farm-4",
    name: "Barili Agro-Farms",
    location: "Barili",
    province: "Cebu",
    type: "Grass-Fed Beef",
    grassFedRatio: 85,
    welfareScore: 92,
    transitHours: 2.0,
    description: "A collective of Barili family farmers utilizing cooperative grazing land. By supplying us directly, these farmers receive stable, premium pricing. The cattle roam freely under coconut palms, keeping stress low and ensuring clean, high-quality beef.",
    feedingRegime: "Native cogon grass, Napier grass, and local brewers grains.",
    image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&auto=format&fit=crop&q=80"
  }
];

const COLD_CHAIN_STEPS = [
  {
    step: "01",
    title: "Sanitary Slaughter",
    temp: "Under 10°C",
    action: "Harvesting takes place at double-A standard NMIS certified facilities under rigid veterinary supervision. Carcasses are immediately washed and prepared for chilling."
  },
  {
    step: "02",
    title: "Blast Chilling",
    temp: "0°C to 2°C",
    action: "Carcasses undergo rapid blast chilling within 4 hours of slaughter. This locks in the moisture, halts bacterial multiplication, and tenderizes the muscle fibers."
  },
  {
    step: "03",
    title: "Sterile Butchery",
    temp: "Strictly 12°C",
    action: "Meat is portioned, trimmed, and custom cut inside our Mandaue cleanroom. Our air is HEPA-filtered, and staff adhere to full sanitization and protective suit protocols."
  },
  {
    step: "04",
    title: "Insulated Packaging",
    temp: "Below 4°C",
    action: "Cuts are vacuum-sealed in thick, BPA-free polymer sleeves. Packed in thermal foil sleeves with reusable gel ice packs to keep external ambient heat away."
  },
  {
    step: "05",
    title: "Active Cold Fleet",
    temp: "2°C to 4°C",
    action: "Dispatched in our own GPS and temperature-monitored refrigerated vans. Drivers are audited daily to ensure transit times never exceed safety parameters."
  }
];

export const Sourcing = () => {
  const [selectedFarm, setSelectedFarm] = useState<string>(PARTNER_FARMS[0].id);

  useEffect(() => {
    document.title = "Sourcing & Quality Standards | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover our rigorous sourcing standards, pasture-raised local farms partnership, and double-A NMIS certified facility that guarantees fresh meats in Cebu."
      );
    }
  }, []);

  const activeFarm = PARTNER_FARMS.find(f => f.id === selectedFarm) || PARTNER_FARMS[0];

  return (
    <div className="flex-1 bg-background text-foreground pb-20">
      {/* 1. Hero Section */}
      <section className="relative h-[380px] flex items-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=1600&auto=format&fit=crop&q=80" 
            alt="Lush green pasture lands" 
            className="w-full h-full object-cover opacity-20 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-zinc-950/80" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn duration="500" className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Leaf className="h-3.5 w-3.5" /> 100% Traceable
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Sourcing & <span className="text-primary">Quality Standards</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl font-medium leading-relaxed">
              Partnering with smallholder Visayan farms to supply high-welfare, pasture-raised, and hormone-free meats.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Sourcing Philosophy */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn duration="700" className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Why Local Sourcing Matters To Us
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We believe the best tasting meat starts with how the animal is reared. Factory farming practices prioritize speed and yield, often compromising animal welfare and nutritional value. By partnering directly with Visayas-based family cooperatives, we focus on sustainable practices that respect the animals and the soil.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Our partner farms raise heritage breeds of pork, free-range poultry, and pasture-fed cattle. They are allowed to grow at their natural pace, grazing on native grasslands, which results in meats with clean flavor, healthier fat profiles, and superior tenderness.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-3xl font-display font-extrabold text-primary">0%</span>
                <span className="text-sm font-bold text-foreground mt-1">Growth Hormones</span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-3xl font-display font-extrabold text-primary">100%</span>
                <span className="text-sm font-bold text-foreground mt-1">Visayan Traceable</span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-3xl font-display font-extrabold text-primary">AA</span>
                <span className="text-sm font-bold text-foreground mt-1">NMIS Sanitary Grade</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn duration="700" delay="150" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-primary/30 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity blur-lg" />
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted shadow-xl border border-border">
              <img 
                src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop&q=80" 
                alt="Fresh cuts prepared on butcher block" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/90">Traceable Cut Quality</p>
                <h3 className="text-xl font-bold font-display mt-1">Butcher-fresh under sub-zero checks</h3>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Interactive Partner Farms Map Selector */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1.5 mb-3">
              <MapPin className="h-4 w-4" /> Local Partner Farms
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Trace Your Cut's Origins</h2>
            <p className="text-muted-foreground mt-3">
              Select one of our partner farms below to explore where our local meats are sourced, their feeding regimes, and transit footprints.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Sidebar list of Farms */}
            <div 
              role="tablist"
              aria-label="Visayan Partner Farms"
              className="space-y-4 lg:col-span-1 flex flex-col justify-center"
            >
              {PARTNER_FARMS.map((farm, index) => {
                const isSelected = farm.id === selectedFarm;
                return (
                  <button
                    key={farm.id}
                    onClick={() => setSelectedFarm(farm.id)}
                    onKeyDown={(e) => {
                      let newIndex = index;
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                        newIndex = (index + 1) % PARTNER_FARMS.length;
                      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                        newIndex = (index - 1 + PARTNER_FARMS.length) % PARTNER_FARMS.length;
                      } else {
                        return;
                      }
                      e.preventDefault();
                      setSelectedFarm(PARTNER_FARMS[newIndex].id);
                      const buttons = document.querySelectorAll<HTMLButtonElement>('[role="tab"][data-farm-button]');
                      if (buttons[newIndex]) {
                        buttons[newIndex].focus();
                      }
                    }}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`farm-panel-${farm.id}`}
                    id={`farm-tab-${farm.id}`}
                    data-farm-button
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                      isSelected 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/10" 
                        : "bg-card border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${isSelected ? "text-primary-foreground/90" : "text-primary"}`}>
                        {farm.type}
                      </span>
                      <h3 className="font-display font-bold text-base md:text-lg">
                        {farm.name}
                      </h3>
                      <span className="text-xs flex items-center gap-1 mt-1 font-medium opacity-90">
                        <MapPin className="h-3 w-3" /> {farm.location}, {farm.province}
                      </span>
                    </div>
                    <ChevronRight className={`h-5 w-5 shrink-0 transition-transform ${isSelected ? "translate-x-1" : "group-hover:translate-x-1"}`} />
                  </button>
                );
              })}
            </div>

            {/* Detail Showcase Panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFarm}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  role="tabpanel"
                  id={`farm-panel-${activeFarm.id}`}
                  aria-labelledby={`farm-tab-${activeFarm.id}`}
                  className="h-full"
                >
                  <Card className="border-border bg-card overflow-hidden shadow-md h-full flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-12 flex-1 items-stretch">
                      {/* Left: Farm image */}
                      <div className="md:col-span-5 relative min-h-[220px] md:min-h-0 bg-muted overflow-hidden">
                        <img 
                          src={activeFarm.image} 
                          alt={activeFarm.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-5 left-5 text-white">
                          <span className="px-2 py-0.5 rounded-sm bg-primary text-[10px] font-bold uppercase tracking-wider">
                            Verified Farm
                          </span>
                          <h4 className="text-lg font-bold font-display mt-1.5">{activeFarm.name}</h4>
                        </div>
                      </div>

                      {/* Right: Farm Stats & narrative */}
                      <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div>
                            <span className="text-primary font-bold text-xs uppercase tracking-wider block mb-1">Farm Profile & Story</span>
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                              {activeFarm.description}
                            </p>
                          </div>

                          <div className="border-t border-border/60 pt-4 space-y-2">
                            <span className="text-foreground font-bold text-xs uppercase tracking-wider block">Feeding Standards & Regime</span>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {activeFarm.feedingRegime}
                            </p>
                          </div>
                        </div>

                        {/* Gauges/Stats Row */}
                        <div className="border-t border-border/60 pt-6 mt-6 grid grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider block leading-none">
                              {activeFarm.type.toLowerCase().includes("beef") || activeFarm.type.toLowerCase().includes("lamb") ? "Grass-Fed" : "Forage/Org"}
                            </span>
                            <div className="flex items-end gap-1">
                              <span className="text-xl md:text-2xl font-display font-extrabold text-foreground">{activeFarm.grassFedRatio}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: `${activeFarm.grassFedRatio}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider block leading-none">Animal Welfare</span>
                            <div className="flex items-end gap-1">
                              <span className="text-xl md:text-2xl font-display font-extrabold text-foreground">{activeFarm.welfareScore}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: `${activeFarm.welfareScore}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider block leading-none">Hub Transit</span>
                            <div className="flex items-end gap-0.5">
                              <span className="text-xl md:text-2xl font-display font-extrabold text-foreground">{activeFarm.transitHours}h</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: `${Math.max(15, 100 - (activeFarm.transitHours * 15))}%` }} />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Cold Chain Temperature Flow */}
      <section className="py-20 container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1.5 mb-3">
            <Thermometer className="h-4 w-4" /> Cold Chain Logistics
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Our Unbroken Cold Chain</h2>
          <p className="text-muted-foreground mt-3">
            Bacteria multiplies rapidly in warm environments. We track and log temperatures at all five critical steps to guarantee that your cuts remain fresh and safe.
          </p>
        </div>

        {/* Cold Chain Process Stepper Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch relative">
          {COLD_CHAIN_STEPS.map((stepData, index) => {
            return (
              <Card 
                key={index} 
                className="border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-4 font-display font-extrabold text-3xl text-muted/30 group-hover:text-primary/10 transition-colors">
                  {stepData.step}
                </div>
                <CardContent className="p-6 pt-8 flex flex-col flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/5 text-primary text-xs font-bold tracking-wide w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Thermometer className="h-3.5 w-3.5 transition-transform group-hover:scale-110" /> {stepData.temp}
                  </div>
                  <h3 className="font-display font-bold text-base md:text-lg mb-2 leading-tight">
                    {stepData.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed flex-1">
                    {stepData.action}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5. Quality Compliance / Certifications Section */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1.5 mb-3">
              <ShieldCheck className="h-4 w-4" /> Certification & Safety
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">100% Regulated & Safe</h2>
            <p className="text-muted-foreground text-sm md:text-base mt-2">
              We adhere to strict sanitation and regulatory standards to guarantee meat safety across Metro Cebu.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "NMIS AA Certified",
                desc: "All local beef and pork are harvested in Double-A (AA) category sanitary abattoirs certified by the National Meat Inspection Service.",
                badge: "NMIS-AA-0941"
              },
              {
                title: "BAI Clearance Compliance",
                desc: "Our imported beef (Australian Wagyu, US Black Angus) is fully cleared by the Bureau of Animal Industry and comes with cold-store certifications.",
                badge: "BAI-IMP-2026"
              },
              {
                title: "HACCP Sanitary Practices",
                desc: "Our portioning and packing facilities in Mandaue operate under strict Hazard Analysis Critical Control Point guidelines for optimal hygiene.",
                badge: "GMP & HACCP Compliant"
              }
            ].map((cert, index) => (
              <Card key={index} className="border-border bg-card p-6 flex flex-col justify-between items-center text-center">
                <div className="space-y-3">
                  <div className="h-10 w-10 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-base md:text-lg">{cert.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{cert.desc}</p>
                </div>
                <div className="mt-6 border border-primary/20 bg-primary/5 px-3 py-1 rounded text-primary text-[10px] font-extrabold uppercase tracking-widest select-none">
                  {cert.badge}
                </div>
              </Card>
            ))}
          </div>

          {/* Quick links to Guarantee or Support */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Want to know what happens if your order fails to meet these strict standards? Read our{" "}
              <Button href="/guarantee" variant="ghost" size="sm" className="p-0 text-primary hover:text-primary/80 font-bold hover:bg-transparent shadow-none inline flex-inline h-auto border-0">
                Freshness & Satisfaction Guarantee
              </Button>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

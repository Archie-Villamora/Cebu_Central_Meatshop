import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Leaf, 
  ShieldCheck, 
  Heart, 
  Calendar, 
  ChevronRight, 
  Quote 
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2018",
    title: "Founding Vision",
    subtitle: "Bridging the gap between pasture and plate",
    description: "Cebu Central Meatshop started as a small wholesale distributor in Cebu City. Our goal was simple yet ambitious: to establish a direct connection between Visayan livestock farmers rearing grass-fed animals and Metro Cebu's families looking for cleaner, butcher-grade meats.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
  },
  {
    year: "2020",
    title: "Mandaue Flagship Hub",
    subtitle: "Our first retail storefront & dry-aging cabinets",
    description: "To cater to growing custom requests, we opened our flagship showroom and state-of-the-art portioning facility in Mandaue City. This allowed customers to meet our master butchers in person, consult on custom cut sizes, and watch our dual-climate dry-aging cabinets in action.",
    image: "https://images.unsplash.com/photo-1607116176195-b81b1f41f536?w=800&auto=format&fit=crop&q=80"
  },
  {
    year: "2022",
    title: "Proprietary Cold Chain",
    subtitle: "A fleet of temperature-regulated delivery vans",
    description: "Understanding that fresh meat quality relies heavily on continuous temperature logs, we retired third-party delivery dispatchers. We invested in our own proprietary fleet of insulated refrigerated vans, ensuring every shipment stays strictly under 4°C until delivery.",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop&q=80"
  },
  {
    year: "2024",
    title: "Digital Butchery Platform",
    subtitle: "Custom cuts and portioning, ordered online",
    description: "We launched our online storefront and advanced butcher customizer. For the first time, Cebuano cooking enthusiasts could purchase premium cuts online and specify exact weights, portion sizes, fat trim levels, and vacuum-sealing preferences.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
  },
  {
    year: "2026",
    title: "Regional Visayas Expansion",
    subtitle: "Supporting local farms across neighboring islands",
    description: "Today, we supply not only Metro Cebu but also local hospitality and dining partners in Negros, Bohol, and Leyte. We partner with over 40 smallholder farming groups, helping Visayan communities sustain ethical and pasture-raised agricultural practices.",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80"
  }
];

const CORE_VALUES = [
  {
    icon: Award,
    title: "Master Butchery",
    description: "Every cut is prepped by certified, local butchers who understand muscle structures, fat ratios, and dry-aging timings. Custom thicknesses and trims are standard."
  },
  {
    icon: Leaf,
    title: "Ethical Sourcing",
    description: "We believe in animal welfare. We partner only with local Visayan farms that prioritize stress-free rearing, pasture access, and natural grain feeding regimes."
  },
  {
    icon: ShieldCheck,
    title: "Cold-Chain Integrity",
    description: "From blast chilling below 4°C immediately after slaughter to shipping in temperature-logged vans, our cold-chain process guarantees zero compromise on freshness."
  },
  {
    icon: Heart,
    title: "Cebuano Community",
    description: "By sourcing locally from Barili, Carcar, and Bantayan, we inject vital capital back into the Visayan agriculture sector, backing local livelihoods and feed mills."
  }
];

export const OurStory = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);

  useEffect(() => {
    document.title = "Our Story | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover the journey of Cebu Central Meatshop. Founded in 2018, we connect Visayan pasture farms with Cebuano families through premium custom butchery and cold-chain delivery."
      );
    }
  }, []);

  return (
    <div className="flex-1 bg-background text-foreground pb-20">
      {/* 1. Hero Section */}
      <section className="relative h-[380px] flex items-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80" 
            alt="Master butcher preparing premium cuts" 
            className="w-full h-full object-cover opacity-20 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-zinc-950/80" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn duration="500" className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Award className="h-3.5 w-3.5" /> Crafting Traditions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Our Journey to <span className="text-primary">Master Butchery</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl font-medium leading-relaxed">
              From a local distributor in Cebu to the region's trusted name in premium, pasture-raised meats.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Narrative Section */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn duration="700" className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Honoring the Craft, Supporting the Community
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              At Cebu Central Meatshop, we don't believe in factory-line meat processing. We believe in butchery as an artisan craft. For generations, the Visayas region has produced some of the country’s finest livestock, yet local communities struggled to access consistent, fresh portions prepared to exact culinary standards.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Founded in 2018, we set out to change that by standardizing the logistics and dry-aging techniques, raising sanitation levels, and offering personalized butcher customization. By removing intermediaries, we ensure that local farms receive fair pricing, and our customers receive cuts that meet international benchmarks.
            </p>

            <div className="border-l-4 border-primary pl-6 py-2 my-8 bg-muted/30 rounded-r-lg">
              <Quote className="h-8 w-8 text-primary/40 mb-2" />
              <p className="italic text-foreground font-medium text-lg leading-relaxed">
                "Our mission is to combine the warmth of traditional neighborhood butcher service with state-of-the-art cold chain safety and online customization."
              </p>
              <p className="text-sm font-bold text-muted-foreground mt-2">— Archie Villamora, Founder</p>
            </div>
          </FadeIn>

          <FadeIn duration="700" delay="150" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-primary/30 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity blur-lg" />
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted shadow-xl border border-border">
              <img 
                src="https://images.unsplash.com/photo-1607116176195-b81b1f41f536?w=800&auto=format&fit=crop&q=80" 
                alt="Meat drying cabinet in shop showroom" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/90">Flagship Showroom</p>
                <h3 className="text-xl font-bold font-display mt-1">Our Mandaue City Aging Chambers</h3>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Interactive Milestone Timeline */}
      <section className="py-20 bg-muted/30 border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1.5 mb-3">
              <Calendar className="h-4 w-4" /> Timeline Milestones
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">How We Grew Over the Years</h2>
            <p className="text-muted-foreground mt-3">
              Click on each milestone below to view the key moments that shaped our commitment to fresh quality.
            </p>
          </div>

          {/* Stepper Timeline Navigation */}
          <div className="max-w-4xl mx-auto mb-12 relative px-4">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0 hidden md:block" />
            <div 
              role="tablist"
              aria-label="Story Milestones"
              className="flex flex-row md:justify-between justify-start gap-4 md:gap-0 overflow-x-auto pb-4 md:pb-0 scrollbar-none relative z-10"
            >
              {MILESTONES.map((milestone, index) => {
                const isActive = activeMilestone === index;
                return (
                  <button
                    key={milestone.year}
                    onClick={() => setActiveMilestone(index)}
                    onKeyDown={(e) => {
                      let newIndex = index;
                      if (e.key === "ArrowRight") {
                        newIndex = (index + 1) % MILESTONES.length;
                      } else if (e.key === "ArrowLeft") {
                        newIndex = (index - 1 + MILESTONES.length) % MILESTONES.length;
                      } else {
                        return;
                      }
                      e.preventDefault();
                      setActiveMilestone(newIndex);
                      const buttons = document.querySelectorAll<HTMLButtonElement>('[role="tab"][data-timeline-button]');
                      if (buttons[newIndex]) {
                        buttons[newIndex].focus();
                      }
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`milestone-panel-${milestone.year}`}
                    id={`milestone-tab-${milestone.year}`}
                    data-timeline-button
                    className="flex flex-col items-center group shrink-0 focus:outline-none"
                  >
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                      isActive 
                        ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20 animate-pulse-subtle" 
                        : "bg-card border-border text-muted-foreground hover:border-foreground/40 group-hover:scale-105"
                    }`}>
                      {milestone.year}
                    </div>
                    <span className={`text-xs font-bold mt-2 transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {milestone.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Content Box */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id={`milestone-panel-${MILESTONES[activeMilestone].year}`}
                aria-labelledby={`milestone-tab-${MILESTONES[activeMilestone].year}`}
              >
                <Card className="border-border bg-card overflow-hidden shadow-md">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-6 md:p-10 flex flex-col justify-center">
                        <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2">
                          Milestone Year — {MILESTONES[activeMilestone].year}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-2">
                          {MILESTONES[activeMilestone].title}
                        </h3>
                        <p className="text-foreground font-semibold text-sm md:text-base italic mb-4">
                          "{MILESTONES[activeMilestone].subtitle}"
                        </p>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {MILESTONES[activeMilestone].description}
                        </p>
                      </div>
                      <div className="aspect-[4/3] md:aspect-auto h-64 md:h-full relative overflow-hidden bg-muted">
                        <img 
                          src={MILESTONES[activeMilestone].image} 
                          alt={MILESTONES[activeMilestone].title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-card/30 via-transparent to-transparent hidden md:block" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1.5 mb-3">
            <Heart className="h-4 w-4" /> Core Values
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">The Pillars We Stand By</h2>
          <p className="text-muted-foreground mt-3">
            Every order we fulfill, every cut we trim, and every farm we support is guided by our four core values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {CORE_VALUES.map((value, idx) => {
            const IconComponent = value.icon;
            return (
              <Card 
                key={idx} 
                className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 flex flex-col h-full group"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="h-12 w-12 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3 tracking-wide group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5. Sleek CTA Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-5xl mt-10">
        <div className="relative rounded-2xl overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1557007727-448c973ea94e?auto=format&fit=crop&w=2000&q=80" 
              alt="Premium raw beef cuts layout" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 px-8 py-16 md:py-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Taste the Custom Butchery Difference
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore our range of pasture-raised meats, artisan BBQ bundles, and subscription boxes prepped exactly the way you want them.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/shop" size="lg" className="w-full sm:w-auto h-12 text-base px-8 bg-primary hover:bg-primary/95 text-white font-bold">
                Shop Premium Cuts <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
              <Button href="/sourcing" size="lg" variant="outline" className="w-full sm:w-auto h-12 text-base px-8 border-white/30 text-white hover:bg-white hover:text-foreground font-bold">
                Learn Sourcing Standards
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

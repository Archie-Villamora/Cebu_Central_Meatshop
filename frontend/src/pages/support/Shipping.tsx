import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Snowflake, 
  Info, 
  Check, 
  ChevronDown, 
  ArrowRight
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";

interface DeliveryZone {
  name: string;
  rate: number;
  freeThreshold: number;
  days: string;
  cutoff: string;
  transitTime: string;
}

const DELIVERY_ZONES: DeliveryZone[] = [
  { name: "Cebu City", rate: 100, freeThreshold: 2500, days: "Daily (Mon - Sun)", cutoff: "2:00 PM", transitTime: "Next Day / Same Day Express" },
  { name: "Mandaue City", rate: 80, freeThreshold: 2000, days: "Daily (Mon - Sun)", cutoff: "2:00 PM", transitTime: "Next Day / Same Day Express" },
  { name: "Talisay City", rate: 120, freeThreshold: 2500, days: "Daily (Mon - Sat)", cutoff: "2:00 PM", transitTime: "Next Day" },
  { name: "Lapu-Lapu City", rate: 180, freeThreshold: 3000, days: "Mon, Wed, Fri, Sat", cutoff: "1:00 PM", transitTime: "Next-Day Delivery" },
  { name: "Consolacion", rate: 150, freeThreshold: 3000, days: "Tue, Thu, Sat", cutoff: "12:00 PM", transitTime: "Next-Day Delivery" },
  { name: "Liloan", rate: 200, freeThreshold: 3500, days: "Tue, Thu, Sat", cutoff: "12:00 PM", transitTime: "Next-Day Delivery" },
  { name: "Minglanilla", rate: 180, freeThreshold: 3000, days: "Mon, Wed, Fri", cutoff: "12:00 PM", transitTime: "Next-Day Delivery" },
  { name: "Cordova", rate: 220, freeThreshold: 3500, days: "Mon, Wed, Fri", cutoff: "12:00 PM", transitTime: "Next-Day Delivery" }
];

const SHIPPING_FAQS = [
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, we offer same-day express delivery within Cebu City and Mandaue City for orders placed before 10:00 AM. Same-day delivery is subject to slot availability and carries a flat surcharge of ₱100 in addition to standard delivery rates. Contact our hotline directly to request express dispatch."
  },
  {
    question: "How is my meat packaged during transit?",
    answer: "Your cuts are vacuum-sealed, portion-labeled, and packed inside our customized thermal insulation sleeves alongside premium food-grade gel ice packs. This thermal envelope is designed to maintain temperatures below 4°C for up to 6 hours, ensuring complete safety even if you are not home immediately."
  },
  {
    question: "What if I am not home to receive my delivery?",
    answer: "If you are unavailable, our rider will contact you to coordinate drop-off at your village gatehouse, reception desk, or with a designated neighbor. Since fresh meat is highly perishable, we strongly advise leaving an insulated cooler box outside your door if no one is available to receive the delivery directly."
  },
  {
    question: "Can I pick up my order in person?",
    answer: "Absolutely. You can choose 'Local Pickup' during checkout. Pickups are free of charge and can be claimed at our central cold storage facility in Mandaue City, Monday through Saturday from 9:00 AM to 6:00 PM. Please wait for the SMS confirmation that your order is butchered and packed before coming."
  },
  {
    question: "Do you ship to other provinces outside Metro Cebu?",
    answer: "For food safety and cold-chain maintenance, we do not ship raw fresh or chilled meats outside of Metro Cebu. However, we can ship frozen bulk orders to select areas in greater Cebu Province and neighboring islands via specialized cargo forwarding with temperature-controlled air freight. Please contact our wholesale team to arrange provincial logistics."
  }
];

export const Shipping = () => {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState<number>(0);
  const [orderValue, setOrderValue] = useState<number>(1500);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Shipping & Delivery Info | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "View Metro Cebu meat delivery zones, shipping rates, and delivery schedules. Learn about our strict cold-chain shipping protocols that guarantee freshness."
      );
    }
  }, []);

  const selectedZone = DELIVERY_ZONES[selectedZoneIndex] || DELIVERY_ZONES[0];
  const isFreeDelivery = orderValue >= selectedZone.freeThreshold;
  const remainingForFree = selectedZone.freeThreshold - orderValue;
  const progressPercent = Math.min((orderValue / selectedZone.freeThreshold) * 100, 100);

  return (
    <div className="flex-1 bg-background text-foreground">
      {/* 1. Hero Section */}
      <section className="relative h-[380px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=80" 
            alt="Cold chain logistics delivery truck" 
            className="w-full h-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-zinc-950/80" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <FadeIn duration="500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Truck className="h-3.5 w-3.5" /> Metro Cebu Shipping
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Cold-Chain Guaranteed <br/>
              <span className="text-primary">Freshness at Your Doorstep</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-300 mt-6 leading-relaxed max-w-2xl mx-auto">
              We operate a temperature-monitored distribution system to deliver premium cuts directly from our butchery facility to your kitchen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Cold Chain Core Values */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <FadeIn delay="none" duration="700" className="flex">
            <Card className="hover:shadow-md transition-all duration-300 flex flex-col w-full border-muted/80">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-3">
                  <Snowflake className="h-5.5 w-5.5" />
                </div>
                <CardTitle className="text-lg">Sub-4°C Control</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                We monitor ambient and surface temperature indexes at every node. Cuts remain chilled under 4°C, preventing bacterial growth and maintaining color.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="150" duration="700" className="flex">
            <Card className="hover:shadow-md transition-all duration-300 flex flex-col w-full border-muted/80">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-3">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <CardTitle className="text-lg">Insulated Packaging</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Cuts are vacuum-sealed, portion labeled, and placed in heavy-duty foil insulation envelopes with reusable dry-ice gel blocks.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="300" duration="700" className="flex">
            <Card className="hover:shadow-md transition-all duration-300 flex flex-col w-full border-muted/80">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-3">
                  <Clock className="h-5.5 w-5.5" />
                </div>
                <CardTitle className="text-lg">Predictive Routing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Our drivers use smart routing systems to bypass heavy Cebu traffic, ensuring minimal time in transit and meeting your selected delivery windows.
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* 3. Interactive Rates Checker & Calculator */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn duration="500">
              <h2 className="text-3xl font-display font-bold">Delivery Rates Checker</h2>
              <p className="text-muted-foreground mt-3">
                Select your area and simulate your order amount to see shipping costs and free shipping status.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-12 items-start">
            {/* Input card */}
            <div className="md:col-span-7">
              <FadeIn duration="700">
                <Card className="shadow-lg border-border/60">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Calculate Shipping & Fees</CardTitle>
                    <CardDescription>
                      Check custom delivery parameters based on your basket content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="municipality" className="font-bold">Select Delivery Area *</Label>
                      <div className="relative">
                        <select
                          id="municipality"
                          value={selectedZoneIndex}
                          onChange={(e) => setSelectedZoneIndex(Number(e.target.value))}
                          className="flex h-11 w-full rounded-md border border-input bg-transparent pl-4 pr-10 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-primary focus-visible:border-primary appearance-none cursor-pointer"
                        >
                          {DELIVERY_ZONES.map((zone, idx) => (
                            <option key={idx} value={idx} className="bg-background text-foreground">
                              {zone.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="orderAmountSlider" className="font-bold">Simulate Order Value (₱)</Label>
                        <span className="text-primary font-bold font-display text-lg">₱{orderValue.toLocaleString()}</span>
                      </div>
                      <input
                        id="orderAmountSlider"
                        type="range"
                        min="200"
                        max="5000"
                        step="100"
                        value={orderValue}
                        onChange={(e) => setOrderValue(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₱200</span>
                        <span>₱2,500</span>
                        <span>₱5,000+</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Free Delivery Progress</span>
                        <span>
                          {isFreeDelivery 
                            ? "Qualified!" 
                            : `₱${remainingForFree.toLocaleString()} away`}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all duration-300 ease-out" 
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isFreeDelivery 
                          ? "Congratulations! Your order qualifies for free cold-chain shipping." 
                          : `Add ₱${remainingForFree.toLocaleString()} worth of premium cuts to get free shipping to ${selectedZone.name}.`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Results details panel */}
            <div className="md:col-span-5">
              <FadeIn delay="150" duration="700">
                <Card className="bg-zinc-950 text-white shadow-xl border-none">
                  <CardHeader className="border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                      <MapPin className="h-4 w-4" /> Destination Summary
                    </div>
                    <CardTitle className="text-white text-2xl font-display">{selectedZone.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Shipping Rate</span>
                      <span className="font-bold text-lg font-display text-white">
                        {isFreeDelivery ? (
                          <span className="text-green-400 flex items-center gap-1">
                            <Check className="h-4 w-4" /> Free
                          </span>
                        ) : (
                          `₱${selectedZone.rate}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Free Delivery Threshold</span>
                      <span className="font-bold font-display text-white">₱{selectedZone.freeThreshold.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Delivery Frequency</span>
                      <span className="font-semibold text-white">{selectedZone.days}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Same-Day Cutoff</span>
                      <span className="font-semibold text-white">{selectedZone.cutoff}</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                      <span className="text-zinc-400 text-sm">Transit Duration</span>
                      <span className="text-primary font-bold text-sm tracking-wide uppercase">{selectedZone.transitTime}</span>
                    </div>
                    
                    <div className="pt-2">
                      <Button href="/shop" className="w-full font-bold shadow-lg shadow-primary/10">
                        Go to Shop Catalog <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Zones Table */}
      <section className="py-20 container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FadeIn duration="500">
            <h2 className="text-3xl font-display font-bold">Standard Delivery Area Index</h2>
            <p className="text-muted-foreground mt-3">
              Full overview of all active delivery boundaries and operational schedules in Cebu.
            </p>
          </FadeIn>
        </div>

        <FadeIn duration="700">
          <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-muted text-foreground font-semibold">
                <tr>
                  <th className="p-4 border-b border-border">Destination Area</th>
                  <th className="p-4 border-b border-border">Standard Shipping Fee</th>
                  <th className="p-4 border-b border-border">Free Shipping Threshold</th>
                  <th className="p-4 border-b border-border">Active Delivery Days</th>
                  <th className="p-4 border-b border-border">Daily Order Cutoff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {DELIVERY_ZONES.map((zone, idx) => (
                  <tr key={idx} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 font-bold text-foreground">{zone.name}</td>
                    <td className="p-4 text-primary font-semibold">₱{zone.rate}</td>
                    <td className="p-4 text-muted-foreground">₱{zone.freeThreshold.toLocaleString()}+</td>
                    <td className="p-4 text-foreground">{zone.days}</td>
                    <td className="p-4 text-muted-foreground">{zone.cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Note info box */}
        <div className="mt-6 flex gap-3 p-4 bg-muted/40 rounded-lg border border-border/80 text-sm text-muted-foreground leading-relaxed max-w-4xl mx-auto">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-foreground">Important Surcharge Information:</span> Delivery rates listed are for our standard schedule blocks. Same-day express dispatch or delivery on national holidays is subject to a ₱100 logistics surcharge. Free shipping eligibility applies only to orders meeting the threshold net of discounts.
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <FadeIn duration="500">
              <h2 className="text-3xl font-display font-bold">Delivery & Cold-Chain FAQs</h2>
              <p className="text-muted-foreground mt-4">
                Answers to logistics details, packaging setups, and safety procedures.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {SHIPPING_FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              const delayValues = ["none", "150", "300", "500", "1000"] as const;
              return (
                <FadeIn key={index} delay={delayValues[index % delayValues.length]} duration="500">
                  <div className="border border-border rounded-lg bg-card overflow-hidden shadow-sm">
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
                          transition={{ duration: 0.2, ease: "easeInOut" }}
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
    </div>
  );
};

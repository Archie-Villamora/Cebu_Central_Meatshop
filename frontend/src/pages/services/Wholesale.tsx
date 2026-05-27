import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  ShieldCheck, 
  Scale, 
  DollarSign, 
  ArrowRight, 
  Building2, 
  Phone, 
  Mail, 
  ChevronDown, 
  FileText, 
  Sparkles,
  UserCheck
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { toast } from "@/components/ui/Toaster";

// Zod Schema for B2B Inquiry Form
const wholesaleFormSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact person name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid business email." }),
  phone: z.string().min(7, { message: "Please enter a valid contact phone number." }),
  businessType: z.string().min(1, { message: "Please select your business type." }),
  estimatedVolume: z.string().min(1, { message: "Please select an estimated monthly volume." }),
  notes: z.string().min(10, { message: "Please tell us a bit more about your requirements (at least 10 characters)." }),
});

type WholesaleFormValues = z.infer<typeof wholesaleFormSchema>;

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is your Minimum Order Quantity (MOQ) for wholesale delivery?",
    answer: "Our standard MOQ for wholesale delivery within Metro Cebu is 15kg total weight or a minimum order value of ₱5,000. For orders below this threshold, partners can arrange for pickup at our central processing hub in Mandaue City."
  },
  {
    question: "Do you offer customized portion cuts and packaging?",
    answer: "Yes, customization is one of our primary services. We can portion cuts (e.g., precise 200g ribeye steaks, skin-on pork belly slabs cut to custom widths) and vacuum-pack or batch-pack according to your kitchen's operating standards. Custom portioning is subject to a nominal processing fee depending on complexity."
  },
  {
    question: "What are your delivery schedules and coverage areas?",
    answer: "We deliver Monday through Saturday across Metro Cebu, including Cebu City, Mandaue City, Lapu-Lapu City, Talisay City, and consolidation hubs. Deliveries are made via our own fleet of temperature-controlled refrigerated vans to guarantee cold-chain integrity from our warehouse to your walk-in chiller."
  },
  {
    question: "What are your credit terms for corporate clients?",
    answer: "New wholesale accounts start on Cash on Delivery (COD) or Pre-payment terms. After a consistent 3-month purchasing history, corporate clients may apply for 15-day or 30-day credit terms, subject to credit evaluation, reference checks, and business volume analysis."
  },
  {
    question: "Are your meat products fully certified and traceable?",
    answer: "Absolutely. All local meat is sourced from NMIS-certified (National Meat Inspection Service) farms, and our imported primal cuts come with complete veterinary clearance and sanitary permits. We run a fully traceable supply chain, matching batch codes on delivery invoices to specific source farms."
  }
];

export const Wholesale = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Wholesale Premium Meats Sourcing | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Supply your restaurant, hotel, caterer, or retail store in Metro Cebu with custom-trimmed primal cuts, fully audited cold-chain logistics, and corporate volume pricing.");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WholesaleFormValues>({
    resolver: zodResolver(wholesaleFormSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      estimatedVolume: "",
      notes: "",
    },
  });

  const onSubmit = async (data: WholesaleFormValues) => {
    setIsSubmitting(true);
    // Simulate API request latency
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setFormSubmitted(true);
    toast.success("Wholesale inquiry submitted successfully!");
    console.log("Submitted wholesale inquiry:", data);
  };

  const handleResetForm = () => {
    reset();
    setFormSubmitted(false);
  };

  return (
    <div className="flex-1 bg-background text-foreground">
      {/* 1. Hero Section */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80" 
            alt="Professional Kitchen Prep" 
            className="w-full h-full object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-zinc-950/80" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <FadeIn duration="500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="h-3.5 w-3.5" /> B2B Commercial Partnering
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Sustain Your Kitchen With <br/>
              <span className="text-primary">Premium Grade Cuts</span>
            </h1>
            <p className="text-base md:text-xl text-zinc-300 mt-6 leading-relaxed max-w-2xl mx-auto">
              Supply your restaurant, hotel, caterer, or retail store with custom-trimmed primal cuts, fully audited logistics, and highly competitive volume pricing.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="#inquiry-form" size="lg" className="shadow-lg shadow-primary/20 font-bold">
                Apply for Wholesale Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Key Advantages Grid */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn duration="500">
            <h2 className="text-3xl md:text-4xl font-display font-bold">The Cebu Central Advantage</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              We design our business around the operational needs of executive chefs and procurement managers.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FadeIn delay="none" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Cold-Chain Security</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Our refrigerated delivery vans operate at strict sub-zero temperatures, ensuring the meat arrives in optimal state without micro-thawing.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="150" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Scale className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Bespoke Portioning</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Specify exact weights, trim margins, and thickness. Our master butchers process cuts to your kitchen’s precise yield specifications.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="300" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Audited Traceability</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                NMIS certified local pork/poultry and fully documented imported beef. Every batch is traceable back to certified source farms.
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay="500" duration="700" className="flex">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col w-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-4">
                  <DollarSign className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Volume Index Pricing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed flex-1">
                Secure stable, tiered pricing indexes tied to your contract volumes, shielding your business margins from retail fluctuations.
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
              <h2 className="text-3xl font-display font-bold">Onboarding Process</h2>
              <p className="text-muted-foreground mt-4">
                Setting up a commercial account with us is structured and transparent.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Apply Online",
                desc: "Fill in our partnership form below with your estimate volume and culinary needs."
              },
              {
                step: "02",
                title: "Sample Validation",
                desc: "We arrange custom-trimmed sample cuts for your culinary team to inspect and test grill."
              },
              {
                step: "03",
                title: "Price & Contracts",
                desc: "Establish customized price indexes, credit terms, and weekly delivery schedules."
              },
              {
                step: "04",
                title: "Fresh Fulfillment",
                desc: "Receive regular deliveries direct to your kitchen with consistent quality and cuts."
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

      {/* 4. Inquiry Form Section */}
      <section id="inquiry-form" className="py-20 container mx-auto px-4 md:px-6 max-w-3xl">
        <FadeIn duration="700">
          <Card className="shadow-2xl border-border/80">
            <CardHeader className="bg-zinc-950 text-white p-8 rounded-t-lg">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-xs uppercase font-bold tracking-wider text-primary">Partner Application</span>
              </div>
              <CardTitle className="text-2xl font-display text-white">Wholesale Inquiry Form</CardTitle>
              <CardDescription className="text-zinc-400 mt-2">
                Submit details below. Our corporate relations team will respond within 1 business day.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <UserCheck className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2 text-foreground">Inquiry Received</h3>
                  <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
                    Thank you for applying. A Cebu Central Meatshop commercial manager will reach out via email or phone to arrange cut specifications and samples.
                  </p>
                  <Button type="button" variant="outline" onClick={handleResetForm}>
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Business Name */}
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className={errors.businessName ? "text-destructive" : ""}>
                        Registered Business Name *
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="e.g., Cebu Gourmet Grill Corp."
                        error={errors.businessName?.message}
                        {...register("businessName")}
                      />
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className={errors.contactName ? "text-destructive" : ""}>
                        Contact Person Name *
                      </Label>
                      <Input
                        id="contactName"
                        placeholder="e.g., Chef Jane Doe"
                        error={errors.contactName?.message}
                        {...register("contactName")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Business Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                        Business Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g., procurement@gourmetgrill.ph"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className={errors.phone ? "text-destructive" : ""}>
                        Mobile or Landline Number *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="e.g., +63 917 123 4567"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Business Type */}
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="businessType" className={errors.businessType ? "text-destructive" : ""}>
                        Business Type *
                      </Label>
                      <div className="relative">
                        <select
                          id="businessType"
                          className={`flex h-11 w-full rounded-md border border-input bg-transparent pl-4 pr-10 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-primary focus-visible:border-primary appearance-none cursor-pointer ${
                            errors.businessType ? "border-destructive focus-visible:ring-destructive" : ""
                          }`}
                          {...register("businessType")}
                        >
                          <option value="" className="bg-background text-foreground">Select Option</option>
                          <option value="restaurant" className="bg-background text-foreground">Restaurant / Bistro</option>
                          <option value="hotel" className="bg-background text-foreground">Hotel / Resort</option>
                          <option value="catering" className="bg-background text-foreground">Catering Service</option>
                          <option value="retail" className="bg-background text-foreground">Supermarket / Retailer</option>
                          <option value="reseller" className="bg-background text-foreground">Meat Reseller / Vendor</option>
                          <option value="other" className="bg-background text-foreground">Other Business Entity</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.businessType && (
                        <p className="text-sm font-medium text-destructive">{errors.businessType.message}</p>
                      )}
                    </div>

                    {/* Estimated Monthly Volume */}
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="estimatedVolume" className={errors.estimatedVolume ? "text-destructive" : ""}>
                        Est. Monthly Volume Requirement *
                      </Label>
                      <div className="relative">
                        <select
                          id="estimatedVolume"
                          className={`flex h-11 w-full rounded-md border border-input bg-transparent pl-4 pr-10 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-primary focus-visible:border-primary appearance-none cursor-pointer ${
                            errors.estimatedVolume ? "border-destructive focus-visible:ring-destructive" : ""
                          }`}
                          {...register("estimatedVolume")}
                        >
                          <option value="" className="bg-background text-foreground">Select Range</option>
                          <option value="under-50kg" className="bg-background text-foreground">Under 50kg</option>
                          <option value="50-200kg" className="bg-background text-foreground">50kg – 200kg</option>
                          <option value="200-500kg" className="bg-background text-foreground">200kg – 500kg</option>
                          <option value="500-1000kg" className="bg-background text-foreground">500kg – 1,000kg</option>
                          <option value="over-1000kg" className="bg-background text-foreground">Over 1,000kg</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.estimatedVolume && (
                        <p className="text-sm font-medium text-destructive">{errors.estimatedVolume.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Requirements Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className={errors.notes ? "text-destructive" : ""}>
                      Describe Your Meat Specs & Custom Cuts *
                    </Label>
                    <Textarea
                      id="notes"
                      rows={5}
                      placeholder="e.g., We require custom center-cut, 250g portions of Australian Beef Ribeye, vacuum-sealed individually, delivered bi-weekly."
                      className={errors.notes ? "border-destructive focus-visible:ring-destructive" : ""}
                      {...register("notes")}
                    />
                    {errors.notes && (
                      <p className="text-sm font-medium text-destructive">{errors.notes.message}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full font-bold" isLoading={isSubmitting}>
                      {!isSubmitting && <FileText className="h-5 w-5 mr-2" />}
                      Submit Application Request
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <FadeIn duration="500">
              <h2 className="text-3xl font-display font-bold">Wholesale Partnerships FAQs</h2>
              <p className="text-muted-foreground mt-4">
                Got questions about logs, delivery boundaries, or credit terms? We've got answers.
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

      {/* 6. Footer Call-to-Action */}
      <section className="bg-zinc-950 text-white py-16 text-center border-t border-border">
        <div className="container mx-auto px-4 max-w-xl">
          <FadeIn duration="700">
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4">Prefer speaking directly?</h3>
            <p className="text-zinc-400 mb-6 text-sm md:text-base">
              Call our commercial desk to discuss logistics, customize cuts, or request pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:+63321234567" className="flex items-center gap-2 text-primary font-bold hover:underline">
                <Phone className="h-4 w-4" /> +63 (32) 123-4567
              </a>
              <a href="mailto:wholesale@cebucentralmeatshop.ph" className="flex items-center gap-2 text-primary font-bold hover:underline">
                <Mail className="h-4 w-4" /> wholesale@cebucentralmeatshop.ph
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

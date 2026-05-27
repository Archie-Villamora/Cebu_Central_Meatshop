import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Award, 
  Camera, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Trash2,
  Lock,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { toast } from "@/components/ui/Toaster";

// Mock Product List for Claim Dropdown
const MOCK_CLAIM_PRODUCTS = [
  "Wagyu Ribeye Steak MS5+",
  "Premium Angus Tenderloin",
  "Heritage Pork Belly Slab",
  "Free-Range Whole Chicken",
  "Butcher's Choice BBQ Box",
  "Family Dinner Staples Bundle",
  "Pasture-Fed Lamb Chops"
];

// Mock Issue Categories
const MOCK_CLAIM_ISSUES = [
  { value: "seal", label: "Punctured Vacuum Seal / Loss of Seal" },
  { value: "color", label: "Excessive Discoloration / Off-odor on opening" },
  { value: "weight", label: "Significant Underweight (Greater than 5% deviance)" },
  { value: "wrong", label: "Incorrect Cut Type / Incorrect Portion Sizing" },
  { value: "other", label: "Other Quality/Freshness Concern" }
];

export const Guarantee = () => {
  // Claim Simulator Form States
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimTicketId, setClaimTicketId] = useState("");

  useEffect(() => {
    document.title = "Satisfaction & Freshness Guarantee | Cebu Central Meatshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read our 100% freshness guarantee. Learn how to claim a replacement or refund for any cut that does not meet our strict culinary standards."
      );
    }
  }, []);

  // Handler for simulated photo upload
  const handlePhotoUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedFileName("CCM_claim_photo_01.jpg (2.8 MB)");
      toast.success("Photo uploaded successfully.");
    }, 1200);
  };

  const handleRemovePhoto = () => {
    setUploadedFileName(null);
    toast.info("Photo removed.");
  };

  // Submit Claim handler
  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingClaim(true);
    // Simulate server response delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmittingClaim(false);
    
    // Generate a random ticket ID
    const randomTicket = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setClaimTicketId(randomTicket);
    setClaimSuccess(true);
    toast.success("Quality claim submitted successfully!");
  };

  const handleResetWizard = () => {
    setCurrentStep(1);
    setOrderId("");
    setDeliveryDate("");
    setCustomerName("");
    setCustomerEmail("");
    setSelectedProduct("");
    setSelectedIssue("");
    setIssueDescription("");
    setUploadedFileName(null);
    setClaimSuccess(false);
    setClaimTicketId("");
  };

  // Validation checkers for each step
  const isStep1Valid = orderId.trim().length >= 4 && deliveryDate !== "" && customerName.trim().length >= 2 && customerEmail.includes("@");
  const isStep2Valid = selectedProduct !== "" && selectedIssue !== "" && issueDescription.trim().length >= 10;
  const isStep3Valid = uploadedFileName !== null;

  return (
    <div className="flex-1 bg-background text-foreground">
      {/* 1. Hero Section */}
      <section className="relative h-[380px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=1600&auto=format&fit=crop&q=80" 
            alt="Chef selecting high quality steaks" 
            className="w-full h-full object-cover opacity-25 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-zinc-950/80" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <FadeIn duration="500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Award className="h-3.5 w-3.5" /> Our Culinary Pledge
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Our Freshness & <br/>
              <span className="text-primary">Satisfaction Guarantee</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-300 mt-6 leading-relaxed max-w-2xl mx-auto">
              If any meat cut we deliver does not meet your quality standards or arrives compromised, we will replace the cut or refund your purchase. No hassles, no arguments.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Core Pillars of Guarantee */}
      <section className="py-16 container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <FadeIn duration="500">
            <h2 className="text-2xl md:text-3xl font-display font-bold">The Triple Freshness Standard</h2>
            <p className="text-muted-foreground mt-3">
              We design our supply chain checkpoints to eliminate quality errors before they reach your cutting board.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-display">1. Cold-Chain Audit</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Every steak, chop, and loin is logged at temperature checks from slaughter to vacuum sealing, and finally into dry-ice chilled delivery boxes.
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-3">
                <Award className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-display">2. Master Butcher Inspection</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Our lead butchers manually inspect marbling scores, fat caps, bone trimmings, and vacuum seals of every single packet prior to dispatch.
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-3">
                <RefreshCw className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-display">3. 12-Hour Claim Turnaround</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              If an error slips past, submit your ticket. We resolve, credit, or redeliver replacements within 12 hours of receiving your claim.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Steps to Claim refund */}
      <section className="bg-muted/30 py-16 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold">How to Make a Claim</h2>
            <p className="text-muted-foreground mt-3">
              Follow these simple steps within 12 hours of order delivery to process a quality concern.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                icon: FileText,
                title: "Locate Order ID",
                desc: "Find the CCM order number on your delivery email, text message, or paper invoice receipts."
              },
              {
                num: "02",
                icon: Camera,
                title: "Take a Photo",
                desc: "Capture a clear photo showing the specific quality concern (e.g. seal leak, fat ratio, cut type)."
              },
              {
                num: "03",
                icon: Award,
                title: "Submit Details",
                desc: "Use our interactive claim wizard below or WhatsApp our support line with your photo and order details."
              },
              {
                num: "04",
                icon: CheckCircle2,
                title: "Fast Resolution",
                desc: "Our quality team will review and approve a credit voucher, refund, or schedule a fresh replacement."
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col relative bg-card p-5 rounded-lg border border-border/80 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-display font-extrabold text-primary/20">{step.num}</span>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Claim Simulator Form */}
      <section className="py-20 container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Interactive Tool
          </span>
          <h2 className="text-3xl font-display font-bold">Freshness Claim Portal</h2>
          <p className="text-muted-foreground mt-2">
            Simulate filing a quality claim and experience our automated processing system.
          </p>
        </div>

        <FadeIn duration="700">
          <Card className="shadow-2xl border-border/80 overflow-hidden">
            {/* Header progress tracker */}
            <div className="bg-zinc-950 text-white p-6 border-b border-zinc-800">
              <div className="flex justify-between items-center mb-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                <span>Quality Claim request</span>
                <span>Step {claimSuccess ? "Complete" : `${currentStep} of 4`}</span>
              </div>
              
              {!claimSuccess && (
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300 ease-out" 
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              )}
            </div>

            <CardContent className="p-8">
              {claimSuccess ? (
                /* Success View */
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2">Claim Ticket Raised</h3>
                  <p className="text-primary font-mono font-bold tracking-wider text-lg bg-primary/5 px-4 py-1.5 rounded border border-primary/10 mb-4">
                    {claimTicketId}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
                    Thank you, {customerName}. Your concern regarding the <strong>{selectedProduct}</strong> has been logged in our quality assurance system. Our head butcher will inspect logs for your batch and reach out to you at <strong>{customerEmail}</strong> within 12 hours.
                  </p>
                  <div className="flex gap-4">
                    <Button onClick={handleResetWizard}>
                      File Another Claim
                    </Button>
                    <Button href="/shop" variant="outline">
                      Back to Shop
                    </Button>
                  </div>
                </div>
              ) : (
                /* Wizard Steps View */
                <form onSubmit={handleSubmitClaim} className="space-y-6">
                  
                  {/* STEP 1: Order Details */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold font-display border-b border-border pb-2 text-foreground">Step 1: Contact & Delivery Info</h3>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="orderId">CCM Order ID *</Label>
                          <Input 
                            id="orderId" 
                            placeholder="e.g., CCM-98214"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                          />
                          <p className="text-[11px] text-muted-foreground">Order ID must be at least 4 characters.</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="deliveryDate">Delivery Date *</Label>
                          <Input 
                            id="deliveryDate" 
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Your Full Name *</Label>
                          <Input 
                            id="customerName" 
                            placeholder="e.g., John Doe"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customerEmail">Contact Email *</Label>
                          <Input 
                            id="customerEmail" 
                            type="email"
                            placeholder="e.g., john@example.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Issue Details */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold font-display border-b border-border pb-2 text-foreground">Step 2: Product & Quality Issue</h3>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="claimProduct">Affected Meat Cut *</Label>
                          <div className="relative">
                            <select
                              id="claimProduct"
                              value={selectedProduct}
                              onChange={(e) => setSelectedProduct(e.target.value)}
                              className="flex h-11 w-full rounded-md border border-input bg-transparent pl-4 pr-10 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-primary focus-visible:border-primary appearance-none cursor-pointer"
                            >
                              <option value="" className="bg-background text-foreground">Select affected item</option>
                              {MOCK_CLAIM_PRODUCTS.map((prod, idx) => (
                                <option key={idx} value={prod} className="bg-background text-foreground">{prod}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="claimIssue">Primary Quality Issue *</Label>
                          <div className="relative">
                            <select
                              id="claimIssue"
                              value={selectedIssue}
                              onChange={(e) => setSelectedIssue(e.target.value)}
                              className="flex h-11 w-full rounded-md border border-input bg-transparent pl-4 pr-10 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-primary focus-visible:border-primary appearance-none cursor-pointer"
                            >
                              <option value="" className="bg-background text-foreground">Select quality concern</option>
                              {MOCK_CLAIM_ISSUES.map((issue, idx) => (
                                <option key={idx} value={issue.value} className="bg-background text-foreground">{issue.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issueDescription">Detail Concerns & Storage History *</Label>
                        <Textarea 
                          id="issueDescription"
                          rows={4}
                          placeholder="Please provide details. E.g., The vacuum seal of the ribeye package was punctured upon delivery, and the meat exhibits a greyish hue. Placed in chiller immediately."
                          value={issueDescription}
                          onChange={(e) => setIssueDescription(e.target.value)}
                        />
                        <p className="text-[11px] text-muted-foreground">Describe in at least 10 characters.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Photo Verification */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold font-display border-b border-border pb-2 text-foreground">Step 3: Verification Photo</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        To validate freshness issues and track warehouse packaging batches, we require a photo of the cut showing the concern and its label.
                      </p>

                      <div className="pt-2">
                        {uploadedFileName ? (
                          <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50/50 rounded-lg text-green-800 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                              <span className="font-semibold truncate max-w-xs md:max-w-md">{uploadedFileName}</span>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={handlePhotoUpload}
                            className="border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40 rounded-lg p-10 text-center cursor-pointer transition-colors flex flex-col items-center justify-center"
                          >
                            {isUploading ? (
                              <div className="flex flex-col items-center gap-2">
                                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                                <span className="text-sm font-semibold text-muted-foreground">Uploading sample image...</span>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                                <h4 className="font-bold text-sm mb-1 text-foreground">Click to upload photo</h4>
                                <p className="text-xs text-muted-foreground max-w-xs">
                                  PNG, JPG, or JPEG formats. Mock upload simulates validation process.
                                </p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 rounded-lg border border-amber-200/50 text-xs leading-relaxed">
                        <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                        <div>
                          <strong>Privacy note:</strong> Uploaded images are strictly kept in secure cold-storage audits and viewed solely by our safety team.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Summary & Submit */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold font-display border-b border-border pb-2 text-foreground">Step 4: Review Claim Details</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2 text-sm">
                        <div className="space-y-2.5 bg-muted/40 p-4 rounded-lg border border-border/80">
                          <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">Contact & Delivery</h4>
                          <p className="text-muted-foreground"><strong>Name:</strong> {customerName}</p>
                          <p className="text-muted-foreground"><strong>Email:</strong> {customerEmail}</p>
                          <p className="text-muted-foreground"><strong>Order ID:</strong> {orderId}</p>
                          <p className="text-muted-foreground"><strong>Delivery Date:</strong> {deliveryDate}</p>
                        </div>

                        <div className="space-y-2.5 bg-muted/40 p-4 rounded-lg border border-border/80">
                          <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">Concern details</h4>
                          <p className="text-muted-foreground"><strong>Affected Item:</strong> {selectedProduct}</p>
                          <p className="text-muted-foreground">
                            <strong>Issue:</strong> {MOCK_CLAIM_ISSUES.find((i) => i.value === selectedIssue)?.label}
                          </p>
                          <p className="text-muted-foreground truncate"><strong>Photo:</strong> {uploadedFileName}</p>
                        </div>
                      </div>

                      <div className="bg-muted/40 p-4 rounded-lg border border-border/80 text-sm">
                        <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-1.5">Description</h4>
                        <p className="text-muted-foreground italic leading-relaxed">"{issueDescription}"</p>
                      </div>

                      <div className="flex gap-2 items-center text-xs text-muted-foreground justify-center pt-2">
                        <Lock className="h-3.5 w-3.5 text-green-500" />
                        SSL Secured submission. Claims trigger immediate quality logs reviews.
                      </div>
                    </motion.div>
                  )}

                  {/* Form Actions Footer */}
                  <div className="flex justify-between border-t border-border pt-6 mt-6">
                    {currentStep > 1 ? (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep((c) => c - 1)}
                        disabled={isSubmittingClaim}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep((c) => c + 1)}
                        disabled={
                          (currentStep === 1 && !isStep1Valid) ||
                          (currentStep === 2 && !isStep2Valid) ||
                          (currentStep === 3 && !isStep3Valid)
                        }
                      >
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        isLoading={isSubmittingClaim}
                        disabled={isSubmittingClaim}
                      >
                        Submit Quality Claim
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      {/* 5. Certifications & Badging Footer */}
      <section className="bg-zinc-950 text-white py-16 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <FadeIn duration="500">
            <h3 className="text-xl font-display font-bold mb-4">Certified Meat Processing Standards</h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Our facilities and partner farms comply fully with local and international food health requirements to deliver premium fresh meats.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              <div className="flex flex-col items-center gap-1">
                <span className="font-display font-extrabold text-xl tracking-wider text-white">NMIS Double-A</span>
                <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest">National Meat Inspection</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-display font-extrabold text-xl tracking-wider text-white">HACCP COMPLIANT</span>
                <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest">Hazard analysis safety</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-display font-extrabold text-xl tracking-wider text-white">BAI CERTIFIED</span>
                <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest">Bureau of Animal Industry</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

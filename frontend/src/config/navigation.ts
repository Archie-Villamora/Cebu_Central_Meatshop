import { 
  ShoppingBag, 
  Beef, 
  Utensils, 
  Sparkles, 
  Award, 
  Flame, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  Truck, 
  Users
} from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

export interface NavGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  columns: NavColumn[];
  promo?: {
    tag: string;
    title: string;
    desc: string;
    image: string;
    href: string;
    cta: string;
  };
}

export const navigationConfig: NavGroup[] = [
  {
    id: "shop",
    title: "Shop",
    icon: ShoppingBag,
    columns: [
      {
        title: "Browse Categories",
        links: [
          { name: "All Products", href: "/shop", icon: ShoppingBag, desc: "Explore our full collection" },
          { name: "Premium Beef", href: "/shop/beef", icon: Beef, desc: "Wagyu, Ribeye, Tomahawk cuts" },
          { name: "Heritage Pork", href: "/shop/pork", icon: Utensils, desc: "Belly, chops, tenderloin" },
          { name: "Free-Range Poultry", href: "/shop/poultry", icon: Sparkles, desc: "Whole organic chicken, breasts" },
          { name: "Pasture Lamb", href: "/shop/lamb", icon: Award, desc: "Specialty racks, shanks & chops" }
        ]
      },
      {
        title: "Meat Packs",
        links: [
          { name: "Value Bundles", href: "/bundles", icon: Flame, desc: "Bulk savings on curated boxes" },
          { name: "Family Packs", href: "/bundles#family", icon: Users, desc: "Perfect sizing for household dinners" },
          { name: "BBQ Specialties", href: "/bundles#bbq", icon: Flame, desc: "Grill-ready seasoned meats" }
        ]
      },
      {
        title: "Weekly Box Club",
        links: [
          { name: "Subscription Club", href: "/subscription", icon: Calendar, desc: "Get regular meat deliveries & save" },
          { name: "Weekly Delivery Box", href: "/subscription#weekly", icon: Calendar, desc: "Fresh cuts sent every week" },
          { name: "Monthly Reserve Box", href: "/subscription#monthly", icon: Calendar, desc: "Curated prime cuts every month" }
        ]
      }
    ],
    promo: {
      tag: "Chef's Choice",
      title: "Premium A5 Wagyu",
      desc: "Experience melting tenderness and world-class marbling. Subscribe to save 15% on this luxury cut.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      href: "/shop",
      cta: "Shop Now"
    }
  },
  {
    id: "services",
    title: "Services",
    icon: TrendingUp,
    columns: [
      {
        title: "Our Culinary Services",
        links: [
          { name: "Wholesale Sourcing", href: "/wholesale", icon: TrendingUp, desc: "Supply your restaurant, caterer, or hotel with customized primal cuts and commercial bulk pricing." },
          { name: "Meat Subscription Club", href: "/subscription", icon: Calendar, desc: "Schedule recurring deliveries, customize your basket, and receive 10% off plus free Metro Cebu delivery." }
        ]
      }
    ]
  },
  {
    id: "about",
    title: "About",
    icon: BookOpen,
    columns: [
      {
        title: "Learn About Cebu Central",
        links: [
          { name: "Our Story", href: "/our-story", icon: BookOpen, desc: "Crafted in Cebu: our dedication to authentic, traditional butcher values." },
          { name: "Sourcing & Safety", href: "/sourcing", icon: Sparkles, desc: "Ethical partnership with local farms prioritizing grass-fed husbandry." },
          { name: "Freshness Promise", href: "/guarantee", icon: ShieldCheck, desc: "Cold-chain validation ensuring meat never loses premium color or quality." }
        ]
      }
    ]
  },
  {
    id: "support",
    title: "Support",
    icon: HelpCircle,
    columns: [
      {
        title: "Customer Assistance",
        links: [
          { name: "Shipping & Delivery", href: "/shipping", icon: Truck, desc: "Metro Cebu schedules, order cut-offs, and cold delivery box rules." },
          { name: "FAQ Help Center", href: "/faq", icon: HelpCircle, desc: "Clear answers to ordering, storage, payment, and cut requests." },
          { name: "Satisfaction Guarantee", href: "/guarantee", icon: ShieldCheck, desc: "Our refund and return policy if a cut does not meet standards." }
        ]
      }
    ]
  }
];

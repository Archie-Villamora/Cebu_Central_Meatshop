export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  category: "beef" | "pork" | "poultry" | "lamb";
  image: string;
  rating: number;
  reviewsCount: number;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  features: string[];
  longDescription: string;
  sourcing: string;
  prep: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  tag: "BBQ Specialties" | "Family Packs" | "Value Bundles";
  items: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wagyu Ribeye Steak",
    description: "Premium A5 Grade Japanese Wagyu Ribeye with magnificent marbling and melting texture.",
    price: 2450,
    weight: "500g",
    category: "beef",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 124,
    stockStatus: "in-stock",
    features: [
      "Authentic Japanese Wagyu (A5 Grade)",
      "High marbling score (BMS 8-12)",
      "Hand-selected and wet-aged for 28 days",
      "Individually vacuum sealed"
    ],
    longDescription: "Sourced from the Kagoshima prefecture, our A5 Wagyu Ribeye represents the pinnacle of beef quality. The intense marbling melts at body temperature, creating an incredibly rich, buttery texture and sweet, savory aroma. Best cooked on a hot cast-iron skillet with minimal seasoning.",
    sourcing: "Imported directly from certified farms in Kagoshima, Japan. Ethically raised under strict quality controls with high-quality grain feeds.",
    prep: "Thaw in the refrigerator for 24 hours. Keep at room temperature for 30 minutes before cooking. Sear in a hot skillet for 1-2 minutes per side. Let rest for 5 minutes. Season with sea salt after slicing."
  },
  {
    id: 2,
    name: "Grass-Fed Tomahawk",
    description: "Extraordinary bone-in ribeye cut, grass-fed and dry-aged for rich flavor.",
    price: 4200,
    weight: "1.2kg",
    category: "beef",
    image: "https://images.unsplash.com/photo-1594046243098-0fceea9d451e?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 88,
    stockStatus: "low-stock",
    features: [
      "Premium bone-in ribeye cut",
      "100% pasture-raised, grass-fed",
      "Dry-aged for 21 days for concentrated flavor",
      "Perfect for reverse-searing or grilling"
    ],
    longDescription: "The Tomahawk is a ribeye steak cut with at least five inches of rib bone left intact. The extra-long, french-trimmed bone utilizes the culinary art of presentation, while the surrounding fat cap bastes the meat as it cooks, keeping it exceptionally tender and flavorful.",
    sourcing: "Pasture-raised on local sustainable farms in Bukidnon, Mindanao. Hormones and antibiotic-free.",
    prep: "Reverse-sear method recommended. Bake at 110°C (225°F) until internal temp reaches 48°C (118°F) for medium-rare. Finish by searing in a smoking hot cast iron pan with butter, garlic, and rosemary for 1 minute per side."
  },
  {
    id: 3,
    name: "Beef Tenderloin (Prime Cut)",
    description: "The most tender cut of beef, lean yet succulent, expertly trimmed by our butcher.",
    price: 1150,
    weight: "300g",
    category: "beef",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 52,
    stockStatus: "in-stock",
    features: [
      "Center-cut Chateaubriand style",
      "Virtually fat-free, extremely tender",
      "Hand-trimmed by master butchers",
      "Chilled delivery, ready to cook"
    ],
    longDescription: "Cut from the heart of the tenderloin, this roast is incredibly tender with a delicate flavor profile. Its consistent thickness makes it easy to cook evenly, resulting in a beautiful edge-to-edge pink center.",
    sourcing: "Premium grain-fed Australian beef, pasture-finished and sustainably raised.",
    prep: "Pan-fry with butter and herbs or roast in the oven. Season generously with salt and black pepper. Ideal cooked to medium-rare."
  },
  {
    id: 4,
    name: "Ground Beef Prime Blend",
    description: "Perfect 80/20 lean-to-fat ratio ground beef, ideal for gourmet burgers and meatballs.",
    price: 480,
    weight: "1kg",
    category: "beef",
    image: "https://images.unsplash.com/photo-1588168333986-5078647a52d8?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviewsCount: 165,
    stockStatus: "in-stock",
    features: [
      "80% lean, 20% fat ideal ratio",
      "Freshly ground daily",
      "No added preservatives or fillers",
      "Triple-checked cold chain delivery"
    ],
    longDescription: "Our custom ground beef blend is minced from fresh chuck and brisket cuts to provide the ultimate balance of flavor and juiciness. Whether you are pressing thin smash burgers or rolling Italian meatballs, this blend holds its shape and delivers rich flavor.",
    sourcing: "Locally sourced beef from certified Visayan farms, processed in our clean Cebu butcher shop.",
    prep: "Keep chilled until ready to shape. Cook to an internal temperature of 71°C (160°F) for safety. Do not over-work the meat when shaping patties."
  },
  {
    id: 5,
    name: "Premium Pork Belly (Liampo)",
    description: "Slab of thick-cut pork belly, perfect for crispy Lechon Liampo or classic Adobo.",
    price: 680,
    weight: "1kg",
    category: "pork",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 210,
    stockStatus: "in-stock",
    features: [
      "Triple-layered fat-to-meat ratio",
      "Skin-on for maximum crispiness",
      "Heritage breed pork for richer taste",
      "Perfect for slow roasting or braising"
    ],
    longDescription: "Our premium Liampo cut is highly sought after for its perfectly balanced layers of fat and lean meat. The skin is left intact and cleaned meticulously, ensuring a crackling, bubbly crust when roasted or deep-fried.",
    sourcing: "Sourced from high-standard bio-secure family farms in Cebu, fed on clean, natural grain.",
    prep: "For crispy skin, score the skin and rub with salt, vinegar, and baking soda. Let dry uncovered in the fridge overnight before slow-roasting at 150°C and finishing at 220°C."
  },
  {
    id: 6,
    name: "Heritage Pork Chops (Bone-In)",
    description: "Thick-cut pork chops with bone intact to seal in juices, tender and juicy.",
    price: 450,
    weight: "500g",
    category: "pork",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 94,
    stockStatus: "in-stock",
    features: [
      "1.5-inch thick cut",
      "Bone-in for enhanced flavor and moisture",
      "Heritage Berkshire-cross genetics",
      "Richly marbled compared to commodity pork"
    ],
    longDescription: "Forget the dry, white pork chops of the past. Our heritage breed bone-in chops are beautifully marbled with a darker pink hue, ensuring a juicy bite and rich flavor that stands up well to simple pan-searing or grilling.",
    sourcing: "Raised free-range in shaded pastures on our partner farms in Negros Occidental.",
    prep: "Brine in salt-water for 1-2 hours for maximum juiciness. Pan-sear in a hot skillet with butter, garlic, and thyme for 4-5 minutes per side until internal temp is 63°C (145°F). Let rest."
  },
  {
    id: 7,
    name: "Premium Bacon Strips",
    description: "Naturally hickory-smoked, thick-cut bacon strips with perfect fat-meat balance.",
    price: 320,
    weight: "300g",
    category: "pork",
    image: "https://images.unsplash.com/photo-1606851094055-351833c89911?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 145,
    stockStatus: "in-stock",
    features: [
      "Thick-cut strips",
      "Naturally wood-smoked (no liquid smoke)",
      "Cured with sea salt and brown sugar",
      "Minimal shrinkage during cooking"
    ],
    longDescription: "Made from our premium pork belly slabs, this bacon is dry-cured for a week, then smoked slowly over hickory wood. The result is a rich, savory bacon with a touch of sweetness that crisps up beautifully without curling excessively.",
    sourcing: "Handcrafted in our specialty Cebu processing facility using local heritage pork.",
    prep: "Lay flat on a baking sheet and bake at 200°C (400°F) for 15-20 minutes for perfectly even, crispy results with less mess."
  },
  {
    id: 8,
    name: "Pork Tenderloin",
    description: "The leanest and most tender cut of pork, perfect for quick roasting or medallions.",
    price: 390,
    weight: "500g",
    category: "pork",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    rating: 4.5,
    reviewsCount: 38,
    stockStatus: "in-stock",
    features: [
      "Extremely lean and tender",
      "Quick cooking time",
      "Mild flavor that absorbs marinades well",
      "Silver skin removed"
    ],
    longDescription: "Our pork tenderloin is the pork equivalent of filet mignon. It is incredibly tender, low in fat, and takes on seasonings and marinades beautifully. Best seared first and then roasted briefly in the oven.",
    sourcing: "Sourced from high-quality local farms in Mandaue, Cebu, adhering to strict hygiene standards.",
    prep: "Marinade in soy sauce, garlic, and citrus for 1 hour. Sear all sides in a hot pan, then roast at 200°C (400°F) for 12-15 minutes until internal temp reaches 63°C (145°F)."
  },
  {
    id: 9,
    name: "Organic Whole Chicken",
    description: "Free-range, organically raised whole chicken, flavorful and nutritious.",
    price: 850,
    weight: "1.5kg",
    category: "poultry",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 119,
    stockStatus: "in-stock",
    features: [
      "100% Organic, certified free-range",
      "Raised without antibiotics or growth hormones",
      "Pasture-fed on natural seeds, grass, and insects",
      "Air-chilled for better skin crispiness"
    ],
    longDescription: "Our organic whole chickens are allowed to roam freely under the sun, resulting in superior muscle tone and deep flavor. Air-chilled processing means the chicken doesn't absorb excess water, giving you crispier skin and richer juices.",
    sourcing: "Partner farms in the foothills of Balamban, Cebu. Processed humanely in clean facilities.",
    prep: "Roast whole at 200°C (400°F) for 1 hour and 15 minutes, or spatchcock for faster cooking. Rub skin with olive oil, butter, herbs, and lemon."
  },
  {
    id: 10,
    name: "Free-Range Chicken Breast",
    description: "Boneless, skinless chicken breasts, lean and high in protein, fresh daily.",
    price: 280,
    weight: "500g",
    category: "poultry",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviewsCount: 77,
    stockStatus: "in-stock",
    features: [
      "Boneless, skinless fillets",
      "Naturally lean and high protein",
      "Never frozen, delivered chilled",
      "Antibiotic-free guarantee"
    ],
    longDescription: "These free-range chicken breasts are tender, plump, and clean. Free from water injection, they retain their size and moisture when cooked. Excellent for grilling, baking, or slicing into stir-fries.",
    sourcing: "Visayan poultry partners raised in stress-free pasture environments.",
    prep: "Pound to even thickness before cooking. Sear in a hot pan for 5-6 minutes per side. Avoid overcooking to maintain juiciness (cook to 74°C / 165°F)."
  },
  {
    id: 11,
    name: "Free-Range Chicken Wings",
    description: "Plump chicken wings, perfect for buffalo wing nights or crispy baking.",
    price: 380,
    weight: "1kg",
    category: "poultry",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 108,
    stockStatus: "in-stock",
    features: [
      "Mid-joints and drummettes included",
      "Meaty, high skin-to-meat ratio for crispiness",
      "Freshly prepared and chilled",
      "Perfect for frying or baking"
    ],
    longDescription: "Our free-range chicken wings are meaty and fresh. Because our chickens are active, the meat has a richer flavor and firmer texture that absorbs glaze and sauces wonderfully.",
    sourcing: "Sourced from organic certified farms in San Fernando, Cebu.",
    prep: "Pat completely dry. Toss with a small amount of baking powder and salt, then bake at 220°C (425°F) for 40 minutes, flipping halfway, for oven-fried crispiness. Toss in hot sauce."
  },
  {
    id: 12,
    name: "Free-Range Chicken Drumsticks",
    description: "Succulent, dark meat chicken drumsticks, excellent for frying, stewing or braising.",
    price: 350,
    weight: "1kg",
    category: "poultry",
    image: "https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 65,
    stockStatus: "in-stock",
    features: [
      "Juicy dark meat cuts",
      "Holds moisture well during slow cooking",
      "Local, free-range sourcing",
      "Value pack sizing"
    ],
    longDescription: "Full-flavored chicken drumsticks from pasture-raised birds. This dark meat cut remains exceptionally juicy even during long braises or high-heat frying, making it a household staple.",
    sourcing: "Raised on natural feeds in rural Cebu poultry cooperatives.",
    prep: "Great for Filipino Chicken Adobo, deep-frying, or baking with a soy-honey glaze. Cook until juices run clear."
  },
  {
    id: 13,
    name: "Pasture Lamb Rack",
    description: "Premium French-trimmed rack of lamb, tender and delicate, pasture-raised.",
    price: 2950,
    weight: "800g",
    category: "lamb",
    image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 46,
    stockStatus: "in-stock",
    features: [
      "French-trimmed bones for elegant display",
      "100% pasture-raised, grass-fed",
      "Delicate, mild herbal flavor",
      "Superb fat cap for moisture"
    ],
    longDescription: "Our French-trimmed Lamb Rack is the ultimate showstopper. Pasture-raised on clover and wild grasses, the meat has a clean, subtle lamb flavor that is far less gamey than grain-fed varieties. Incredibly tender and succulent.",
    sourcing: "Imported fresh from free-roaming sheep farms in Canterbury, New Zealand.",
    prep: "Score the fat cap and sear it down first in a pan to render. Rub with garlic, rosemary, and olive oil. Roast at 200°C (400°F) for 15-18 minutes until medium-rare. Let rest before slicing."
  },
  {
    id: 14,
    name: "Pasture Lamb Shanks",
    description: "Meaty shanks, perfect for slow braising until they fall off the bone.",
    price: 1650,
    weight: "1kg",
    category: "lamb",
    image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 33,
    stockStatus: "in-stock",
    features: [
      "High collagen content for rich gravy",
      "Pasture-raised, grass-fed",
      "Bone-in for full marrow richness",
      "Individually vacuum packed"
    ],
    longDescription: "Lamb shanks are a classic butcher's cut that rewards slow cooking. As it braises, the marrow and connective tissue melt into the liquid, creating a thick, rich sauce and meat that literally slides off the bone with a spoon.",
    sourcing: "Sourced from grass-fed New Zealand lamb, hormone-free.",
    prep: "Dredge in flour and brown deeply on all sides. Braise in red wine, beef stock, carrots, celery, garlic, and rosemary at 150°C (300°F) for 3 to 3.5 hours until fork-tender."
  },
  {
    id: 15,
    name: "Gourmet Lamb Chops",
    description: "Thick-cut loin lamb chops, tender like steak, quick and easy to cook.",
    price: 1450,
    weight: "500g",
    category: "lamb",
    image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 29,
    stockStatus: "out-of-stock",
    features: [
      "Loin cut chops (mini T-bones)",
      "Incredibly tender and meaty",
      "Mild pasture-raised flavor",
      "Fast cooking time"
    ],
    longDescription: "Loin chops look like miniature T-bone steaks. They are thick, meaty, and contain the tenderloin and strip loin muscles. They are ideal for quick pan-searing or grilling and require very little prep.",
    sourcing: "Imported from sustainable pastures in Victoria, Australia.",
    prep: "Season with salt, pepper, and dried oregano. Sear in a hot pan with olive oil for 3-4 minutes per side. Splash with fresh lemon juice before serving."
  }
];

export const BUNDLES: Bundle[] = [
  {
    id: "bbq-grill-master",
    name: "BBQ Grill Master Bundle",
    description: "The ultimate selection for weekend grillers. A premium combination of steak, pork belly, wings, and bacon.",
    price: 5200,
    originalPrice: 5900,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
    tag: "BBQ Specialties",
    items: [
      "1x Grass-Fed Tomahawk (1.2kg)",
      "1x Premium Pork Belly Liampo (1kg)",
      "1x Free-Range Chicken Wings (1kg)",
      "1x Premium Bacon Strips (300g)"
    ],
    badge: "Grill Ready"
  },
  {
    id: "family-staples",
    name: "Weekday Family Staples Box",
    description: "Designed for families. High-quality daily cuts to make nutritious, delicious household meals.",
    price: 2100,
    originalPrice: 2470,
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80",
    tag: "Family Packs",
    items: [
      "1x Ground Beef Prime Blend (1kg)",
      "1x Premium Pork Belly Liampo (1kg)",
      "1x Free-Range Chicken Drumsticks (1kg)",
      "1x Free-Range Chicken Breast (500g)"
    ],
    badge: "Best Value"
  },
  {
    id: "butchers-choice",
    name: "Butcher's Choice Premium Box",
    description: "A luxury curation of our finest signature cuts. Experience Wagyu, beef tenderloin, heritage pork, and pasture lamb.",
    price: 5800,
    originalPrice: 6550,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    tag: "Value Bundles",
    items: [
      "1x Wagyu Ribeye Steak (500g)",
      "1x Beef Tenderloin Prime Cut (300g)",
      "1x Heritage Pork Chops Bone-In (500g)",
      "1x Pasture Lamb Rack French-Trimmed (800g)"
    ],
    badge: "Chef Preferred"
  }
];

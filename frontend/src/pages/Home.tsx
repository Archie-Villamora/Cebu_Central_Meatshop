import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ArrowRight, ShieldCheck, Truck, Leaf, Award } from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { useCart } from "@/context/CartContext";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2000&q=80",
    title: "Premium Grade Cuts",
    subtitle: "Farm-to-table freshness, expertly butchered for your table.",
    cta: "Shop Beef",
    link: "/shop/beef"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=80",
    title: "Artisan BBQ Bundles",
    subtitle: "Everything you need for the perfect weekend grill.",
    cta: "View Bundles",
    link: "/bundles"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=2000&q=80",
    title: "Sustainably Sourced",
    subtitle: "Partnering with local farms for ethical, pasture-raised meats.",
    cta: "Our Story",
    link: "/our-story"
  }
];

const CATEGORIES = [
  { name: "Premium Beef", image: "https://images.unsplash.com/photo-1607116176195-b81b1f41f536?w=800&auto=format&fit=crop", link: "/shop/beef" },
  { name: "Heritage Pork", image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop", link: "/shop/pork" },
  { name: "Free-Range Poultry", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop", link: "/shop/poultry" },
  { name: "Pasture Lamb", image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&auto=format&fit=crop", link: "/shop/lamb" },
];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();

  const featuredProducts = useMemo(() => {
    const ids = [1, 5, 9, 2];
    return ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as typeof PRODUCTS;
  }, []);

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col pb-20">

      {/* 1. Hero Carousel (Edge to Edge) */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-secondary overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt="Meat background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 md:px-12 text-white">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl ml-auto text-right flex flex-col items-end"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-4 drop-shadow-lg text-white">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <p className="text-lg md:text-2xl text-white mb-8 font-medium drop-shadow-md">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
              <Button href={HERO_SLIDES[currentSlide].link} size="lg" className="text-lg px-8 h-14 bg-primary hover:bg-primary/90 text-white">
                {HERO_SLIDES[currentSlide].cta} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-10 bg-primary" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Trust Badges */}
      <section className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x-0 lg:divide-x divide-border">
            {[
              { icon: Leaf, title: "Farm to Table", desc: "Locally Sourced" },
              { icon: ShieldCheck, title: "100% Quality", desc: "Freshness Guaranteed" },
              { icon: Award, title: "Master Butchers", desc: "Expertly cut daily" },
              { icon: Truck, title: "Cold Delivery", desc: "Arrives fresh & chilled" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <feature.icon className="h-8 w-8 text-primary mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold text-foreground tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Explore Categories</h2>
            <p className="text-muted-foreground mt-2">Find exactly what you need for your next meal.</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center text-primary font-medium hover:underline">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link key={idx} to={cat.link} className="group relative rounded-xl overflow-hidden aspect-[4/5] block bg-muted">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                <span className="text-white/70 text-sm font-medium flex items-center">
                  Shop Now <ChevronRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="bg-muted/30 py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Butcher's Choice</h2>
            <p className="text-muted-foreground">Hand-selected premium cuts, guaranteed to impress at your dining table.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col h-full">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-background text-foreground text-xs font-bold px-2.5 py-1 rounded-sm shadow-sm select-none">
                      {product.weight}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Link to={`/shop/product/${product.id}`} className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1 mb-1 leading-snug">
                    {product.name}
                  </Link>
                  <p className="text-primary font-bold text-xl mb-4 font-sans">₱{product.price.toLocaleString()}</p>
                  <Button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      weight: product.weight,
                      image: product.image,
                      type: "product"
                    }, 1)}
                    className="w-full font-semibold mt-auto cursor-pointer" 
                    variant="outline"
                  >
                    Quick Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bundle / Promo Banner */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative rounded-2xl overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1557007727-448c973ea94e?auto=format&fit=crop&w=2000&q=80"
              alt="BBQ Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 px-6 py-16 md:py-24 md:px-16 lg:w-2/3">
            <span className="inline-block py-1 px-3 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-wider uppercase mb-4">
              Save up to 20%
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Stock the Freezer Bundles</h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Curated meat boxes designed for families, meal-preppers, and BBQ enthusiasts. Get more premium cuts for less.
            </p>
            <Button href="/bundles" size="lg" className="bg-white text-foreground hover:bg-white/90 border-0 h-12 px-8 text-base">
              Shop Curated Bundles
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

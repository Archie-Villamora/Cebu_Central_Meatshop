import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  ChevronRight, 
  ShoppingBag, 
  Grid, 
  Check, 
  X,
  Plus
} from "lucide-react";
import { PRODUCTS, Product } from "@/config/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";

// Category definitions
const CATEGORIES_METADATA: Record<string, { title: string; desc: string; image: string }> = {
  beef: {
    title: "Premium Beef Cuts",
    desc: "Experience unmatched marbling and tenderness. Our collection features premium A5 Japanese Wagyu, grass-fed dry-aged Tomahawk cuts, center-cut tenderloins, and fresh house-ground chuck blends.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80"
  },
  pork: {
    title: "Heritage Breed Pork",
    desc: "Richly marbled, juicy, and packed with traditional flavor. From skin-on pork belly slabs (Liampo) for a bubbly crackling crust to naturally hickory-smoked bacon and double-cut bone-in chops.",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=1600&auto=format&fit=crop&q=80"
  },
  poultry: {
    title: "Free-Range Organic Poultry",
    desc: "Raised naturally under the sun without growth hormones or antibiotics. Clean air-chilled whole chickens, plump protein-rich breast fillets, drumsticks, and meaty wings that absorb glazes perfectly.",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=1600&auto=format&fit=crop&q=80"
  },
  lamb: {
    title: "Pasture-Raised Lamb",
    desc: "Imported fresh from the pristine grasslands of New Zealand and Victoria, Australia. French-trimmed racks, bone-in slow-braising shanks, and loin chops with a delicate, clean, grass-fed flavor.",
    image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=1600&auto=format&fit=crop&q=80"
  }
};

export function Category() {
  const { category } = useParams<{ category: string }>();
  const activeCategory = category?.toLowerCase() || "";
  const isValidCategory = activeCategory in CATEGORIES_METADATA;

  const { addToCart } = useCart();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Track adding animation states
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  // Filter products for this specific category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Unique weights for this category
  const availableWeights = useMemo(() => {
    const weights = categoryProducts.map(p => p.weight);
    return Array.from(new Set(weights)).sort();
  }, [categoryProducts]);

  const handleWeightToggle = (weight: string) => {
    setSelectedWeights(prev => 
      prev.includes(weight) 
        ? prev.filter(w => w !== weight) 
        : [...prev, weight]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setMaxPrice(5000);
    setSelectedWeights([]);
    setInStockOnly(false);
    setSortBy("featured");
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter(p => p.price <= maxPrice);

    // Weight filter
    if (selectedWeights.length > 0) {
      result = result.filter(p => selectedWeights.includes(p.weight));
    }

    // Stock filter
    if (inStockOnly) {
      result = result.filter(p => p.stockStatus !== "out-of-stock");
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryProducts, searchQuery, maxPrice, selectedWeights, inStockOnly, sortBy]);

  const handleQuickAdd = (product: Product) => {
    setAddingProductId(product.id);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
      type: "product"
    }, 1);

    setTimeout(() => {
      setAddingProductId(null);
    }, 1500);
  };

  if (!isValidCategory) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-muted/20">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">Category Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          The meat category you are looking for does not exist in our catalog.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/95 transition-colors shadow-md"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const metadata = CATEGORIES_METADATA[activeCategory];

  // Shared Filter Sidebar Component
  const FilterSidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Search {metadata.title}</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within cuts..."
            className="w-full h-10 pl-9 pr-8 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Price Range</h3>
          <span className="text-xs font-bold text-primary font-sans">Under ₱{maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={200}
          max={5000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />
        <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold mt-1">
          <span>₱200</span>
          <span>₱5,000</span>
        </div>
      </div>

      {availableWeights.length > 0 && (
        <div className="border-t border-border pt-5">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Weight</h3>
          <div className="flex flex-wrap gap-2">
            {availableWeights.map((w) => {
              const isSelected = selectedWeights.includes(w);
              return (
                <button
                  key={w}
                  onClick={() => handleWeightToggle(w)}
                  className={`px-2.5 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer border ${
                    isSelected 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white border-border text-muted-foreground hover:text-foreground hover:border-foreground/55"
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="border-t border-border pt-5">
        <label className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      <button
        onClick={resetFilters}
        className="w-full py-2 border border-border text-muted-foreground hover:text-foreground hover:bg-muted text-xs font-bold rounded-lg transition-colors cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      
      {/* 1. Category Header with visual banner overlay */}
      <section className="relative h-64 md:h-80 bg-secondary overflow-hidden flex items-center border-b border-border">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src={metadata.image}
          alt={metadata.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-white">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-white/60 mb-2">
              <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary">{metadata.title}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-3 text-white leading-tight">
              {metadata.title}
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-xl">
              {metadata.desc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Area */}
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="flex gap-8 items-start relative">
          
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block w-64 bg-white border border-border p-6 rounded-xl shadow-sm shrink-0 sticky top-28 self-start">
            {FilterSidebarContent()}
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white border border-border p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <Grid className="h-4.5 w-4.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-semibold">
                  Showing <strong className="text-foreground">{filteredProducts.length}</strong> of {categoryProducts.length} cuts
                </span>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filters
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-semibold hidden md:inline">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-white border border-border rounded-lg text-xs font-bold select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
                  >
                    <option value="featured">Featured Choice</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-border rounded-xl p-8">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
                  <ShoppingBag className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">No items found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  We couldn't find any products in this category matching your filters. Try widening your price filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/95 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => {
                    const isOutOfStock = product.stockStatus === "out-of-stock";
                    const isLowStock = product.stockStatus === "low-stock";
                    const isAdding = addingProductId === product.id;

                    return (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="group flex flex-col h-full bg-white border border-border hover:shadow-lg hover:shadow-black/5 transition-all duration-300 overflow-hidden relative">
                          <div className="relative aspect-square overflow-hidden bg-muted border-b border-border shrink-0">
                            <Link to={`/shop/product/${product.id}`} className="block h-full w-full">
                              <img
                                src={product.image}
                                alt={product.name}
                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                                  isOutOfStock ? "grayscale opacity-60" : ""
                                }`}
                              />
                            </Link>
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                              <span className="bg-background/95 backdrop-blur text-foreground text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm select-none border border-border">
                                {product.weight}
                              </span>
                              {isOutOfStock && (
                                <Badge variant="destructive" className="text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-extrabold">
                                  Sold Out
                                </Badge>
                              )}
                              {isLowStock && (
                                <Badge variant="destructive" className="bg-amber-600 text-white border-amber-600 text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-extrabold">
                                  Low Stock
                                </Badge>
                              )}
                            </div>
                          </div>

                          <CardContent className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {product.category}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-[11px] font-bold text-foreground">{product.rating}</span>
                                <span className="text-[10px] text-muted-foreground font-medium">({product.reviewsCount})</span>
                              </div>
                            </div>

                            <Link
                              to={`/shop/product/${product.id}`}
                              className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1 leading-snug"
                            >
                              {product.name}
                            </Link>

                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">
                              {product.description}
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-border mt-auto shrink-0">
                              <span className="text-lg font-bold text-primary font-sans">
                                ₱{product.price.toLocaleString()}
                              </span>

                              <Button
                                size="sm"
                                variant={isOutOfStock ? "outline" : isAdding ? "secondary" : "default"}
                                disabled={isOutOfStock}
                                onClick={() => handleQuickAdd(product)}
                                className={`text-xs font-bold transition-all px-3 cursor-pointer ${
                                  isAdding ? "bg-emerald-600 text-white hover:bg-emerald-600" : ""
                                }`}
                              >
                                {isAdding ? (
                                  <>
                                    <Check className="h-3 w-3 mr-1" />
                                    Added
                                  </>
                                ) : isOutOfStock ? (
                                  "Sold Out"
                                ) : (
                                  <>
                                    <Plus className="h-3 w-3 mr-1" />
                                    Quick Add
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Sheet open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
        <SheetContent side="left" className="w-80 p-0 flex flex-col h-full bg-background overflow-hidden border-r border-border">
          <SheetHeader className="p-6 border-b border-border flex flex-row items-center justify-between bg-white shrink-0">
            <SheetTitle className="text-base font-display font-bold text-foreground">Filter Cuts</SheetTitle>
            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
            {FilterSidebarContent()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

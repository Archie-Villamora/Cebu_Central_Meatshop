import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  ShoppingBag, 
  Grid, 
  X
} from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";

export function Shop() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Sync searchQuery with URL query parameter changes
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  // Available unique weights in products
  const availableWeights = useMemo(() => {
    const weights = PRODUCTS.map(p => p.weight);
    return Array.from(new Set(weights)).sort();
  }, []);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleWeightToggle = (weight: string) => {
    setSelectedWeights(prev => 
      prev.includes(weight) 
        ? prev.filter(w => w !== weight) 
        : [...prev, weight]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setMaxPrice(5000);
    setSelectedWeights([]);
    setInStockOnly(false);
    setSortBy("featured");
    setSearchParams({});
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
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
  }, [searchQuery, selectedCategories, maxPrice, selectedWeights, inStockOnly, sortBy]);



  // Shared Filter Sidebar Component
  const FilterSidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Search</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search catalog..."
            className="w-full h-10 pl-9 pr-8 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-2.5">
          {["beef", "pork", "poultry", "lamb"].map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Price Range</h3>
          <span className="text-xs font-bold text-primary font-sans">Under ₱{maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={300}
          max={5000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />
        <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold mt-1">
          <span>₱300</span>
          <span>₱5,000</span>
        </div>
      </div>

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
      {/* 1. Page Header */}
      <section className="bg-foreground text-background py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl flex flex-col items-start">
            <span className="text-xs bg-primary text-primary-foreground font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-3">
              Premium Meat Collection
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3 text-white leading-tight">
              Cebu Central Butcher Shop
            </h1>
            <p className="text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed">
              Explore our range of premium, master-butchered cuts. Farm-to-table freshness guaranteed, delivered cold straight to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Shop Area */}
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="flex gap-8 items-start relative">
          
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block w-64 bg-white border border-border p-6 rounded-xl shadow-sm shrink-0">
            {FilterSidebarContent()}
          </aside>

          {/* Right Page Content */}
          <div className="flex-1 min-w-0">
            
            {/* Top Toolbar (Sort / Mobile filter toggle) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white border border-border p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <Grid className="h-4.5 w-4.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-semibold">
                  Showing <strong className="text-foreground">{filteredProducts.length}</strong> of {PRODUCTS.length} products
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
                <h3 className="font-display font-bold text-xl text-foreground mb-2">No cuts found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  We couldn't find any products matching your filters. Try widening your price range or adjusting search keywords.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/95 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Filters Sheet */}
      <Sheet open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
        <SheetContent side="left" className="w-80 p-0 flex flex-col h-full bg-background overflow-hidden border-r border-border">
          <SheetHeader className="p-6 border-b border-border flex flex-row items-center justify-between bg-white shrink-0">
            <SheetTitle className="text-base font-display font-bold text-foreground">Filter Catalog</SheetTitle>
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

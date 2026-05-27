import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ChevronRight, 
  ShoppingBag, 
  Check, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Leaf, 
  Award, 
  ArrowLeft
} from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(() => {
    return PRODUCTS.find(p => p.id === Number(id));
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "source" | "prep">("desc");
  const [isAdding, setIsAdding] = useState(false);

  // Filter 4 related products in same category (excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
      type: "product"
    }, quantity);

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-muted/20">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">Product Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          The meat cut you are looking for does not exist in our inventory.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/95 transition-colors shadow-md"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stockStatus === "out-of-stock";
  const isLowStock = product.stockStatus === "low-stock";

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/shop/${product.category}`} className="hover:text-foreground transition-colors capitalize">{product.category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary truncate max-w-[120px] md:max-w-none">{product.name}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
            
            {/* Left: Product Image Section (5 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-background/95 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-sm shadow-sm select-none border border-border">
                    {product.weight}
                  </span>
                  {isOutOfStock && (
                    <Badge variant="destructive" className="text-[10px] px-2.5 py-1 tracking-wider uppercase font-extrabold shadow-md">
                      Sold Out
                    </Badge>
                  )}
                  {isLowStock && (
                    <Badge variant="destructive" className="bg-amber-600 text-white border-amber-600 text-[10px] px-2.5 py-1 tracking-wider uppercase font-extrabold shadow-md">
                      Low Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Quality Guarantee Mini row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Leaf, title: "100% Organic" },
                  { icon: ShieldCheck, title: "Chilled Delivery" },
                  { icon: Award, title: "Expert Butcher" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 rounded-lg border border-border bg-muted/20 text-center">
                    <item.icon className="h-4.5 w-4.5 text-primary mb-1.5" />
                    <span className="text-[9px] font-bold text-foreground leading-none">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details Section (6 cols) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="border-b border-border pb-6">
                {/* Category tag */}
                <Link
                  to={`/shop/${product.category}`}
                  className="text-xs font-bold uppercase tracking-widest text-primary hover:underline mb-2.5 block"
                >
                  {product.category}
                </Link>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-display font-extrabold text-foreground mb-3 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-border fill-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-foreground ml-1.5">{product.rating}</span>
                  <span className="text-xs text-muted-foreground font-medium">({product.reviewsCount} verified reviews)</span>
                </div>

                {/* Price & Weight */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary font-sans">
                    ₱{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground font-semibold">
                    per {product.weight}
                  </span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="py-6 border-b border-border">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-foreground font-medium">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Section */}
              <div className="py-6 space-y-5">
                {/* Quantity select */}
                {!isOutOfStock && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">Quantity:</span>
                    <div className="flex items-center border border-border rounded-lg bg-muted/40 overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3.5 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-4 text-sm font-bold text-foreground min-w-[30px] text-center select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3.5 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    variant={isAdding ? "secondary" : "default"}
                    className={`flex-1 font-bold h-14 cursor-pointer text-sm ${
                      isAdding ? "bg-emerald-600 text-white hover:bg-emerald-600 border-emerald-600" : ""
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Added to Cart
                      </>
                    ) : isOutOfStock ? (
                      "Sold Out"
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  {!isOutOfStock && (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        handleAddToCart();
                        // Open cart drawer by triggering click simulation
                        const cartBtn = document.querySelector('[aria-label="Cart"]') as HTMLButtonElement;
                        if (cartBtn) setTimeout(() => cartBtn.click(), 100);
                      }}
                      className="flex-1 font-bold h-14 border-border text-foreground hover:bg-muted shrink-0 text-sm cursor-pointer"
                    >
                      Buy Now
                    </Button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3. Product Tabs Description (Sourcing, Prep) */}
        <div className="bg-white border border-border rounded-2xl p-6 md:p-10 mt-8 shadow-sm">
          {/* Tabs header */}
          <div className="flex border-b border-border mb-6 overflow-x-auto gap-6">
            {[
              { id: "desc", name: "Description" },
              { id: "source", name: "Sourcing & Ethics" },
              { id: "prep", name: "Butcher's Prep Guide" }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs md:text-sm font-bold tracking-wide uppercase relative shrink-0 transition-colors cursor-pointer select-none ${
                    isSelected ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.name}
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tabs Content */}
          <div className="min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs md:text-sm text-muted-foreground leading-relaxed space-y-4"
              >
                {activeTab === "desc" && (
                  <div>
                    <p>{product.longDescription}</p>
                  </div>
                )}
                {activeTab === "source" && (
                  <div>
                    <p>{product.sourcing}</p>
                  </div>
                )}
                {activeTab === "prep" && (
                  <div>
                    <p>{product.prep}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4. Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-background text-foreground text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm select-none">
                        {p.weight}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col">
                    <Link to={`/shop/product/${p.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1 mb-1 leading-snug">
                      {p.name}
                    </Link>
                    <p className="text-primary font-bold text-base mb-4 font-sans">₱{p.price.toLocaleString()}</p>
                    <Button 
                      onClick={() => {
                        addToCart({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          weight: p.weight,
                          image: p.image,
                          type: "product"
                        }, 1);
                      }}
                      className="w-full font-bold text-xs h-9 cursor-pointer" 
                      variant="outline"
                    >
                      Quick Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

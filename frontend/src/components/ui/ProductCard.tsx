import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Check, Plus } from "lucide-react";
import { Product } from "@/config/products";
import { useCart } from "@/context/CartContext";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Card, CardContent } from "./Card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isOutOfStock = product.stockStatus === "out-of-stock";
  const isLowStock = product.stockStatus === "low-stock";

  const handleQuickAdd = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
      type: "product"
    }, 1);

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="card-container">
      <Card className="group flex flex-col card-layout h-full bg-white border border-border/60 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 overflow-hidden relative">
        {/* Image Wrap */}
        <div className="relative aspect-square card-image-wrap overflow-hidden bg-muted border-b border-border shrink-0">
          <Link to={`/shop/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                isOutOfStock ? "grayscale opacity-60" : ""
              }`}
            />
          </Link>

          {/* Badge Overlay */}
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

        {/* Content */}
        <CardContent className="p-5 flex-1 flex flex-col card-content-wrap">
          {/* Category & Rating */}
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

          {/* Title */}
          <Link
            to={`/shop/product/${product.id}`}
            className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1 leading-snug"
          >
            {product.name}
          </Link>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* Buy Row */}
          <div className="flex items-center justify-between pt-2 border-t border-border mt-auto shrink-0">
            <span className="text-lg font-bold text-primary font-sans">
              ₱{product.price.toLocaleString()}
            </span>

            <Button
              size="sm"
              variant={isOutOfStock ? "outline" : isAdding ? "secondary" : "default"}
              disabled={isOutOfStock}
              onClick={handleQuickAdd}
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
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/Toaster";

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  weight: string;
  image: string;
  quantity: number;
  type: "product" | "bundle" | "subscription";
  frequency?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cartCount", count.toString());
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    if (quantity <= 0) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        toast.success(`Updated ${item.name} quantity to ${newQty}`);
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: newQty } : i
        );
      }
      toast.success(`Added ${item.name} to cart`);
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      return prevItems.filter((i) => i.id !== id);
    });
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

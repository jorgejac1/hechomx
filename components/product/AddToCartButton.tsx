"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  showIcon?: boolean;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  size = "md",
  fullWidth = false,
  showIcon = true,
}: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Reset animation
    setTimeout(() => setIsAdding(false), 600);
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600",
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`
        flex items-center justify-center gap-2 rounded-lg font-medium transition-all
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${isAdding ? "scale-95" : ""}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {showIcon && (
        <ShoppingCart 
          className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${isAdding ? "animate-bounce" : ""}`} 
        />
      )}
      <span>{isInCart(product.id) ? "Agregar más" : "Agregar al carrito"}</span>
    </button>
  );
}
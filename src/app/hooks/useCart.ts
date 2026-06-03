import { useState, useEffect } from 'react';
import { cartStore } from '../store/cartStore';
import type { Product } from '../data/products';

export function useCart() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return cartStore.subscribe(() => forceUpdate(n => n + 1));
  }, []);

  return {
    cart: cartStore.getCart(),
    wishlist: cartStore.getWishlist(),
    addToCart: (product: Product) => cartStore.addToCart(product),
    removeFromCart: (id: string) => cartStore.removeFromCart(id),
    updateQuantity: (id: string, qty: number) => cartStore.updateQuantity(id, qty),
    clearCart: () => cartStore.clearCart(),
    toggleWishlist: (product: Product) => cartStore.toggleWishlist(product),
    isInWishlist: (id: string) => cartStore.isInWishlist(id),
    cartTotal: cartStore.cartTotal(),
    cartCount: cartStore.cartCount(),
  };
}

import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

// Simple state store using module-level state + listener pattern
let cartItems: CartItem[] = [];
let wishlistItems: WishlistItem[] = [];
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach(l => l());
}

export const cartStore = {
  getCart: () => cartItems,
  getWishlist: () => wishlistItems,
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  },
  addToCart: (product: Product) => {
    const existing = cartItems.find(i => i.product.id === product.id);
    if (existing) {
      cartItems = cartItems.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      cartItems = [...cartItems, { product, quantity: 1 }];
    }
    notify();
  },
  removeFromCart: (productId: string) => {
    cartItems = cartItems.filter(i => i.product.id !== productId);
    notify();
  },
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      cartItems = cartItems.filter(i => i.product.id !== productId);
    } else {
      cartItems = cartItems.map(i => i.product.id === productId ? { ...i, quantity } : i);
    }
    notify();
  },
  clearCart: () => {
    cartItems = [];
    notify();
  },
  toggleWishlist: (product: Product) => {
    const exists = wishlistItems.find(i => i.product.id === product.id);
    if (exists) {
      wishlistItems = wishlistItems.filter(i => i.product.id !== product.id);
    } else {
      wishlistItems = [...wishlistItems, { product }];
    }
    notify();
  },
  isInWishlist: (productId: string) => wishlistItems.some(i => i.product.id === productId),
  cartTotal: () => cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  cartCount: () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
};

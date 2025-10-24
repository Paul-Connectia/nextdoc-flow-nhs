import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  type: 'subscription' | 'one-time';
  originalPrice?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setItems(current => {
      const existing = current.find(i => i.id === item.id);
      if (existing) {
        return current; // Don't add duplicates for subscriptions/one-time purchases
      }
      return [...current, item];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setIsOpen(false);
  };

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
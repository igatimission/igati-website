import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "igati_marketplace_cart_v1";
const CartContext = createContext(null);
const readCart = () => {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    if (product.listing_type !== "product" || !product.allow_online_purchase || product.price == null) {
      throw new Error("This listing is not available for online purchase.");
    }
    const amount = Math.floor(Number(quantity));
    if (!Number.isFinite(amount) || amount < 1) throw new Error("Invalid quantity.");
    const existingNow = items.find((x) => x.id === product.id);
    const max = product.track_inventory ? product.stock_quantity : 1000;
    if ((existingNow?.quantity || 0) + amount > max) throw new Error("Requested quantity exceeds available stock.");
    setItems((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      const next = (existing?.quantity || 0) + amount;
      const entry = {
        id: product.id, slug: product.slug, title: product.title,
        image: product.image, price: product.price, currency: product.currency,
        organisation: product.organisation, quantity: next,
        track_inventory: product.track_inventory, stock_quantity: product.stock_quantity,
      };
      return existing ? prev.map((x) => x.id === product.id ? entry : x) : [...prev, entry];
    });
  }, [items]);

  const setQuantity = useCallback((id, quantity) => setItems((prev) => prev.map((x) => {
    if (x.id !== id) return x;
    const max = x.track_inventory ? x.stock_quantity : 1000;
    return { ...x, quantity: Math.max(1, Math.min(max, Math.floor(Number(quantity) || 1))) };
  })), []);
  const removeItem = useCallback((id) => setItems((prev) => prev.filter((x) => x.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, addItem, setQuantity, removeItem, clearCart,
    count: items.reduce((sum, x) => sum + x.quantity, 0) }), [items, addItem, setQuantity, removeItem, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Wrap marketplace pages in CartProvider.");
  return value;
}
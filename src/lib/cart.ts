export type CartSessionItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  currencySymbol?: string;
  currencyCode?: string;
};

const CART_KEY = "cart";

export function readCart(): CartSessionItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function writeCart(cart: CartSessionItem[]) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartItemCount(): number {
  return readCart().reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(): number {
  return readCart().reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
}

export function addToCart(item: CartSessionItem) {
  const cart = readCart();

  const existingIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

  if (existingIndex >= 0) {
    cart[existingIndex] = {
      ...cart[existingIndex],
      quantity: cart[existingIndex].quantity + item.quantity,
      unitPrice: item.unitPrice,
      image: item.image,
      currencySymbol: item.currencySymbol,
      currencyCode: item.currencyCode,
    };
  } else {
    cart.push(item);
  }

  writeCart(cart);
}

export function updateCartItemQuantity(id: string, quantity: number) {
  const cart = readCart();

  const updatedCart = cart.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: Math.max(1, quantity),
        }
      : item,
  );

  writeCart(updatedCart);
}

export function removeCartItem(id: string) {
  const cart = readCart();
  const updatedCart = cart.filter((item) => item.id !== id);
  writeCart(updatedCart);
}

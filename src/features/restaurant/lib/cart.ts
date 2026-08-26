import type { CartItem, MenuItem } from "../../../entities/hotel/model/types";

export function addDishToCart(cart: CartItem[], dish: MenuItem): CartItem[] {
  const existingItem = cart.find((item) => item.dish.id === dish.id);
  if (existingItem) {
    return cart.map((item) =>
      item.dish.id === dish.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }
  return [...cart, { dish, quantity: 1 }];
}

export function updateCartQuantity(
  cart: CartItem[],
  dishId: string,
  delta: number,
): CartItem[] {
  return cart
    .map((item) =>
      item.dish.id === dishId
        ? { ...item, quantity: item.quantity + delta }
        : item,
    )
    .filter((item) => item.quantity > 0);
}

export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce(
    (total, item) => total + item.dish.priceUSD * item.quantity,
    0,
  );
}

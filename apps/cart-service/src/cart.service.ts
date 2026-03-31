import { Injectable } from '@nestjs/common';
import { UserCart } from './cart.types'; // Jo upar banaya

@Injectable()
export class CartService {
  // Map to store carts: Key is userId, Value is UserCart object
  private carts = new Map<string, UserCart>();
  addToCart(userId: string, product: any): UserCart {
    // 1. Get existing cart or create new
    const userCart = this.carts.get(userId) || { items: [], total: 0 };

    // 2. Check if product already in cart
    const existingItem = userCart.items.find(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (item) => item.productId === product.id,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // 3. Add new item
      userCart.items.push({ ...product });
    }

    // 4. Calculate total price correctly
    userCart.total = userCart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    // 5. Save back to Map
    this.carts.set(userId, userCart);
    return userCart;
  }

  getCart(userId: string): UserCart {
    return this.carts.get(userId) || { items: [], total: 0 };
  }

  clearCart(userId: string): void {
    this.carts.delete(userId);
  }

  // apps/cart-service/src/cart.service.ts

  updateQuantity(userId: string, productId: number, action: string) {
    const userCart = this.carts.get(userId);

    if (!userCart) {
      throw new Error('Cart nahi mila! 🛒');
    }

    // Cart mein wo specific product dhundho
    const item = userCart.items.find((i) => i.productId === productId);

    if (item) {
      if (action === 'inc') {
        item.quantity += 1; // Quantity badhao
      } else if (action === 'dec') {
        if (item.quantity > 1) {
          item.quantity -= 1; // Quantity kam karo (lekin 1 se neeche nahi)
        } else {
          // Agar quantity 1 hai aur user '-' dabaye, toh item remove kar do
          userCart.items = userCart.items.filter(
            (i) => i.productId !== productId,
          );
        }
      }
      return { message: 'Quantity update ho gayi! ✅', items: userCart.items };
    }

    throw new Error('Product cart mein nahi hai! ❌');
  }
}

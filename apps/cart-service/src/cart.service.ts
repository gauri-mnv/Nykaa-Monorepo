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
      userCart.items.push({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        productId: product.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        title: product.title,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        price: product.price,
        quantity: 1,
      });
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
}

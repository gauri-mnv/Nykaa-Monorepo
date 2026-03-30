export class CartItem {
  productId: number;
  quantity: number;
  price: number;
  title: string;
}

export class Cart {
  userId: string;
  items: CartItem[];
  totalPrice: number;
}

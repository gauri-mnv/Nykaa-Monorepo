export interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export interface UserCart {
  items: CartItem[];
  total: number;
}

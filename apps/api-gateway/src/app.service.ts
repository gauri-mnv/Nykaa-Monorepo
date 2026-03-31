/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Product } from '@nykaa-monorepo/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  // private readonly PRODUCT_URL = 'http://localhost:3001/all-products';
  // private readonly CART_URL = 'http://localhost:3002/cart';

//   private readonly PRODUCT_URL = 'https://nykaa-product-service.onrender.com/all-products/all-products';
//  private readonly CART_URL = 'https://nykaa-cart-service.onrender.com/cart';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
private readonly PRODUCT_BASE_URL = this.configService.get<string>('PRODUCT_SERVICE_URL');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private readonly CART_BASE_URL = this.configService.get<string>('CART_SERVICE_URL');

  async getProductsFromOtherService(): Promise<Record<string, Product[]>> {
    const response = await axios.get(`${this.PRODUCT_BASE_URL}/all-products`);

    // console.log(
    //   `go to https://nykaa-product-service.onrender.com/all-products/all-products to see the products from Product Service`,
    // );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const allProducts: Product[] = response.data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    const categories = [...new Set(allProducts.map((p) => p.category))];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const categorizedData = categories.reduce( (acc: Record<string, Product[]>, category: string) => {
        acc[category] = allProducts
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .filter((p: Product) => p.category === category)
          .slice(0, 5);
        return acc;
      },{});

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return categorizedData;
  }
  // Cart ki request 3002 par bhejo
  async addToCart(userId: string, product: any) {
    const response = await axios.post(
      `${this.CART_BASE_URL}/cart/add/${userId}`,
      product,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
}

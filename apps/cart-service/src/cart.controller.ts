import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:userId')
  addItem(@Param('userId') userId: string, @Body() product: any) {
    return this.cartService.addToCart(userId, product);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete('clear/:userId')
  // Endpoint: DELETE http://localhost:3002/cart/clear/user123
  clearCart(@Param('userId') userId: string) {
    this.cartService.clearCart(userId);
    return { message: 'Bag khali ho gaya! 🧹' };
  }

  @Patch('update/:userId/:productId')
  updateQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: number,
    @Body('action') action: 'inc' | 'dec',
  ) {
    return this.cartService.updateQuantity(userId, productId, action);
  }
}

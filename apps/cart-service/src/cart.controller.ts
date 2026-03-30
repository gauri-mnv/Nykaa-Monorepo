import { Controller, Post, Get, Body, Param } from '@nestjs/common';
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
}

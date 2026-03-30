import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { HttpModule } from '@nestjs/axios';
import { ProductService } from './product.service';
@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

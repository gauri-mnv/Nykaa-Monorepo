import { NestFactory } from '@nestjs/core';
import { CartModule } from './cart.module';

async function bootstrap() {
  const app = await NestFactory.create(CartModule);
  await app.listen(process.env.PORT ?? 3002);
  console.log('🚀 Cart Service is running on: http://localhost:3002');
}
bootstrap();

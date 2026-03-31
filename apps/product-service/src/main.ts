import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.enableCors({
    origin: ['http://localhost:5173', '*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log('🚀 Product Service is running on: http://localhost:3001');
}
bootstrap();

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  async getExternalProducts(): Promise<any[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await firstValueFrom(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.httpService.get('https://dummyjson.com/products'),
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('🚀Products:', data.products);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return data.products;
  }
}

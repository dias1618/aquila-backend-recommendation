import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Serviço Aquila-Recommendation está no ar!';
  }
}

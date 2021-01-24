import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationService } from './services/recommendation/recommendation.service';
import { RecommendationController } from './controllers/recommendation.controler';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [
    AppController,
    RecommendationController
  ],
  providers: [
    AppService,
    RecommendationService,
  ],
})
export class AppModule {}

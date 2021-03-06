import { Controller, Post, HttpCode, Body, Param, Get, Query } from "@nestjs/common";
import { RecommendationService } from "src/services/recommendation.service";

@Controller('recommendations')
export class RecommendationController {

    constructor(
        private readonly recommendationService: RecommendationService
    ) {}

    @Get()
    @HttpCode(200)
    async recommendation(@Query('idUsuario') idUsuario, @Query('idCategoria') idCategoria, @Query('idCanal') idCanal) {
        return await this.recommendationService.recomendarVideos(idUsuario, idCategoria, idCanal); 
    }
}
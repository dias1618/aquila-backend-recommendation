import { Video } from "src/entities/video.entity";
import { getRepository } from "typeorm";

export class RecommendationService{

    async recomendarVideos(idUsuario:number, idCategoria:number, idCanal:number):Promise<Video[]>{
        let videosRecomendados:Video[] = await this.buscarVideosRecomendados(idCategoria, idCanal);
        return videosRecomendados;
    }

    async buscarVideosRecomendados(idCategoria:number, idCanal:number):Promise<Video[]>{
        let query = await getRepository(Video)
            .createQueryBuilder('video')
            .innerJoinAndSelect("video.categoria", "categoria")
            .innerJoinAndSelect("video.canal", "canal")
            .where("");

        if(idCategoria && idCategoria > 0)
            query = await query.andWhere("categoria.id = :idCategoria", {idCategoria: idCategoria});
        if(idCanal && idCanal > 0)
            query = await query.andWhere("canal.id = :idCanal", {idCanal: idCanal});
        return await query.getMany();
    }
    


}
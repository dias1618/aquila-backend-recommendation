import { Video } from "src/entities/video.entity";
import { getRepository } from "typeorm";
import { UsuarioVideo } from "src/entities/usuario-video.entity";

export class RecommendationService{

    async recomendarVideos(idUsuario:number, idCategoria:number, idCanal:number):Promise<Video[]>{
        let videosAssistidos:Video[] = await this.buscarVideosAssistidos(idUsuario);
        let videosRecomendados:Video[] = await this.buscarVideosRecomendados(videosAssistidos, idCategoria, idCanal);
        return videosRecomendados;
    }

    async buscarVideosAssistidos(idUsuario:number):Promise<Video[]>{
        let usuarioVideos:UsuarioVideo[] = await getRepository(UsuarioVideo)
            .createQueryBuilder('usuarioVideo')
            .innerJoinAndSelect("usuarioVideo.usuario", "usuario")
            .innerJoinAndSelect("usuarioVideo.video", "video")
            .where("usuario.id = :idUsuario", {idUsuario: idUsuario})
            .getMany();

        let videos:Video[] = [];
        usuarioVideos.forEach((usuarioVideo) => videos.push(usuarioVideo.video));
        return videos;
    }

    async buscarVideosRecomendados(videosAssistidos:Video[], idCategoria:number, idCanal:number):Promise<Video[]>{
    
        let idsVideosAssistidos:number[] = [];
        videosAssistidos.map((video)=>idsVideosAssistidos.push(video.id));

        let query = await getRepository(Video)
            .createQueryBuilder('video')
            .innerJoinAndSelect("video.categoria", "categoria")
            .innerJoinAndSelect("video.canal", "canal")
            .where("");

        if(idCategoria && idCategoria > 0)
            query = await query.andWhere("categoria.id = :idCategoria", {idCategoria: idCategoria});
        if(idCanal && idCanal > 0)
            query = await query.andWhere("canal.id = :idCanal", {idCanal: idCanal});
        if(idsVideosAssistidos.length > 0)
            query = await query.andWhere("video.id NOT IN(:...idsVideosAssistidos)", {idsVideosAssistidos: idsVideosAssistidos})
        return await query.getMany();

    }
    


}
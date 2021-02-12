import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Video } from "./video.entity";

@Entity()
export class Canal extends BaseEntity{

    constructor(data: {id?:number, titulo?:string, descricao?:string}){
        super();
        this.id = data && data.id || 0;
        this.titulo = data && data.titulo || "";
        this.descricao = data && data.descricao || "";
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar")
    titulo:string;

    @Column("varchar")
    descricao:string;

    @OneToMany(type => Video, videos => videos.canal)
    videos: Video[];

    toJson():string{
        return `{
            "id": ${this.id},
            "titulo": "${this.titulo}",
            "descricao": "${this.descricao}",
        }`
    }
}
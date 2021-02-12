import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Video } from "./video.entity";

@Entity()
export class Categoria extends BaseEntity{

    constructor(data: {id?:number, nome?:string}){
        super();
        this.id = data && data.id || 0;
        this.nome = data && data.nome || "";
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar")
    nome:string;

    @OneToMany(type => Video, videos => videos.categoria)
    videos: Video[];

    toJson():string{
        return `{
            "id": ${this.id},
            "nome": "${this.nome}",
        }`
    }
}
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, BaseEntity, ManyToOne } from "typeorm";
import { Canal } from "./canal.entity";
import { Categoria } from "./categoria.entity";

@Entity()
export class Video extends BaseEntity{

    constructor(data: {id?:number, titulo?:string, descricao?:string, url?:string}){
        super();
        this.id = data && data.id || 0; 
        this.titulo = data && data.titulo || "";
        this.descricao = data && data.descricao || "";
        this.url = data && data.url || "";
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar", {nullable: true})
    titulo:string;

    @Column("varchar", {nullable: true})
    descricao:string;

    @Column("varchar", {nullable: true})
    url:string;

    channelId:string;
    @ManyToOne(type => Canal, canal => canal.videos)
    canal: Canal;

    categoryId:number;
    @ManyToOne(type => Categoria, categoria => categoria.videos)
    categoria: Categoria;
    
    toJson():string{
        return `{
                "id": ${this.id},
                "titulo": "${this.titulo}",
                "descricao": "${this.descricao}",
                "url": "${this.url}",
                "canal": ${this.canal.toJson()},
                "categoria": ${this.categoria.toJson()},
        }`
    }
}
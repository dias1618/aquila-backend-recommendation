import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { UsuarioCategoria } from "./usuario-categoria.entity";
import { Video } from "./video.entity";

@Entity()
export class Categoria extends BaseEntity{

    constructor(data: {id?:number, nome?:string, idPlatform?:number}){
        super();
        this.id = data && data.id || 0;
        this.nome = data && data.nome || "";
        this.idPlatform = data && data.idPlatform || 0;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar")
    nome:string;

    @Column("integer", {nullable: true})
    idPlatform:number;

    @OneToMany(type => Video, videos => videos.categoria)
    videos: Video[];

    @OneToMany(type => UsuarioCategoria, usuariosCategorias => usuariosCategorias.categoria)
    usuariosCategorias: UsuarioCategoria[];
    

    toJson():string{
        return `{
            "id": ${this.id},
            "nome": "${this.nome}",
            "idPlatform": "${this.idPlatform}",
        }`
    }
}
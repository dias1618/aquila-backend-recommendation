import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Programacao } from "./programacao.entity";
import { Categoria } from "./categoria.entity";
import { UsuarioCategoria } from "./usuario-categoria.entity";
import { UsuarioVideo } from "./usuario-video.entity";

@Entity()
export class Usuario extends BaseEntity{

    constructor(data: {id?:number, nome?:string, login?:string, senha?:string, email?:string}){
        super();
        this.id = data && data.id || 0;
        this.nome = data && data.nome || "";
        this.login = data && data.login || "";
        this.senha = data && data.senha || "";
        this.email = data && data.email || "";
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar", {nullable: true})
    nome:string;

    @Column("varchar", {nullable: true})
    login:string;

    @Column("varchar", {nullable: true})
    senha:string;

    @Column("varchar", {nullable: true})
    email:string;

    @OneToMany(type => Programacao, programacoes => programacoes.usuario)
    programacoes: Programacao[];

    @OneToMany(type => UsuarioCategoria, usuariosCategorias => usuariosCategorias.usuario)
    usuariosCategorias: UsuarioCategoria[];

    @OneToMany(type => UsuarioVideo, usuariosVideos => usuariosVideos.usuario)
    usuariosVideos: UsuarioVideo[];

    toJson():string{
        return `{
            "id": ${this.id},
            "nome": "${this.nome}",
            "login": "${this.login}",
            "senha": "${this.senha}",
            "email": "${this.email}",
        }`
    }
}
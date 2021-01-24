import { PrimaryGeneratedColumn, Entity, Column, OneToMany, BaseEntity, ManyToOne } from "typeorm";
import { Midia } from "src/enums/midia.enum";
import { ProgramacaoVideo } from "./programacao-video.entity";
import { Canal } from "./canal.entity";
import { Categoria } from "./categoria.entity";
import { UsuarioVideo } from "./usuario-video.entity";

@Entity()
export class Video extends BaseEntity{

    constructor(data: {id?:number, titulo?:string, descricao?:string, idPlatform?:string, url?:string, midia?:Midia, duracao?:string, criado?:Date, urlImage?:string}){
        super();
        this.id = data && data.id || 0; 
        this.titulo = data && data.titulo || "";
        this.descricao = data && data.descricao || "";
        this.idPlatform = data && data.idPlatform || "";
        this.url = data && data.url || "";
        this.midia = data && data.midia || Midia.FILME;
        this.duracao = data && data.duracao || '';
        this.criado = data && data.criado || null;
        this.urlImage = data && data.urlImage || "";
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar", {nullable: true})
    titulo:string;

    @Column("varchar", {nullable: true})
    descricao:string;

    @Column("varchar", {nullable: true})
    idPlatform:string;

    @Column("varchar", {nullable: true})
    url:string;

    @Column()
    midia:Midia;

    @Column("varchar", {nullable: true})
    duracao:string;

    @Column("timestamp without time zone", {nullable: true})
    criado:Date;

    @Column("varchar")
    urlImage:string;

    channelId:string;
    @ManyToOne(type => Canal, canal => canal.videos)
    canal: Canal;

    categoryId:number;
    @ManyToOne(type => Categoria, categoria => categoria.videos)
    categoria: Categoria;

    @OneToMany(type => ProgramacaoVideo, programacoesVideos => programacoesVideos.video)
    programacoesVideos: ProgramacaoVideo[];

    @OneToMany(type => UsuarioVideo, usuariosVideos => usuariosVideos.usuario)
    usuariosVideos: UsuarioVideo[];
    
    toJson():string{
        return `{
                "id": ${this.id},
                "titulo": "${this.titulo}",
                "descricao": "${this.descricao}",
                "idPlatform": "${this.idPlatform}",
                "url": "${this.url}",
                "midia": "${this.midia}",
                "duracao": "${this.duracao}",
                "criado": "${this.criado}",
                "urlImage": "${this.urlImage}",
                "canal": ${this.canal.toJson()},
                "categoria": ${this.categoria.toJson()},
        }`
    }
}
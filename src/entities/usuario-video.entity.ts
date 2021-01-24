import { PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity, Column } from "typeorm";
import { Video } from "./video.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class UsuarioVideo extends BaseEntity{

    constructor(data: {id?:number, nota?:number, usuario?:Usuario, video?:Video}){
        super();
        this.id = data && data.id || 0;
        this.nota = data && data.nota || 0;
        this.usuario = data && data.usuario || undefined;
        this.video = data && data.video || undefined;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("integer", {nullable: true})
    nota:number;

    @ManyToOne(type => Usuario, usuario => usuario.usuariosVideos)
    usuario: Usuario;

    @ManyToOne(type => Video, video => video.usuariosVideos)
    video: Video;

    toJson():string{
        return `{
            "id": ${this.id},
            "nota": ${this.nota},
            "usuario": "${this.usuario.toJson()}",
            "video": "${this.video.toJson()}",
        }`
    }
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Programacao } from "./programacao.entity";
import { Video } from "./video.entity";

@Entity()
export class ProgramacaoVideo extends BaseEntity{

    constructor(data: {id?:number}){
        super();
        this.id = data && data.id || 0;
    }


    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => Programacao, programacao => programacao.programacoesVideos)
    programacao: Programacao;

    @ManyToOne(type => Video, video => video.programacoesVideos)
    video: Video;
}
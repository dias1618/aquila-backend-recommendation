import { Programacao } from "src/entities/programacao.entity";
import { ProgramacaoVideo } from "src/entities/programacao-video.entity";

export class ProgramacaoService{
    async save(programacao:Programacao):Promise<Programacao>{
        return programacao.save();
    }

    async addVideo(programacaoVideo:ProgramacaoVideo):Promise<ProgramacaoVideo>{
        return programacaoVideo.save();
    }
}
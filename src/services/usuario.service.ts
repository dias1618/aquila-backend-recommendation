import { Usuario } from "src/entities/usuario.entity";
import { getRepository, Connection } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioService{

    constructor(private connection:Connection){}

    async get(idUsuario:number):Promise<Usuario>{

        let usuario:Usuario = await getRepository(Usuario).createQueryBuilder('usuario')
            .where("usuario.id = :id", {id: idUsuario})
            .getOne();

        return usuario;
    }

}
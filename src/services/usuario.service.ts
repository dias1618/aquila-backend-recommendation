import { Usuario } from "src/entities/usuario.entity";
import { getRepository, Connection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UsuarioCategoria } from "src/entities/usuario-categoria.entity";

@Injectable()
export class UsuarioService{

    constructor(private connection:Connection){}

    async get(idUsuario:number):Promise<Usuario>{

        let usuario:Usuario = await getRepository(Usuario).createQueryBuilder('usuario')
            .where("usuario.id = :id", {id: idUsuario})
            .getOne();

        usuario.usuariosCategorias = await getRepository(UsuarioCategoria).createQueryBuilder('usuario_categoria')
            .where("usuario_categoria.usuarioId = :id", {id: idUsuario})
            .innerJoinAndSelect("usuario_categoria.categoria", "categoria")
            .getMany();

        return usuario;
    }

}
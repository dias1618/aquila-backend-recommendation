import { PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity } from "typeorm";
import { Categoria } from "./categoria.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class UsuarioCategoria extends BaseEntity{

    constructor(data: {id?:number, usuario?:Usuario, categoria?:Categoria}){
        super();
        this.id = data && data.id || 0;
        this.usuario = data && data.usuario || undefined;
        this.categoria = data && data.categoria || undefined;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => Usuario, usuario => usuario.usuariosCategorias)
    usuario: Usuario;

    @ManyToOne(type => Categoria, categoria => categoria.usuariosCategorias)
    categoria: Categoria;


    toJson():string{
        return `{
            "id": ${this.id},
            "usuario": "${this.usuario.toJson()}",
            "categoria": "${this.categoria.toJson()}",
        }`
    }
}
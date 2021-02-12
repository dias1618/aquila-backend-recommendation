import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";

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
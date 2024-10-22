import { IsEmail } from "class-validator";
import { Message } from "src/messages/entities/menssage.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique: true })
    @IsEmail()
    email : string;

    @Column({ length: 255})
    passwordHash : string;
    
    @Column({ length: 100})
    nome : string;

    @CreateDateColumn()
    createdAt?: Date; //

    
    @UpdateDateColumn()
    updatedAt?: Date; //

    // Uma pessoa pode ter enviado muitos recados
    // "de" é um campo da tabela que estar atrelando as duas tabelas
    @OneToMany(() => Message, message => message.de)
    messagesEnviadas :Message[];

    // Uma pessoa pode ter recebido muitos recados
    // "para" é um campo da tabela que estar atrelando as duas tabelas
    @OneToMany(() => Message, message => message.para)
    messagesRecebidas :Message[];
}

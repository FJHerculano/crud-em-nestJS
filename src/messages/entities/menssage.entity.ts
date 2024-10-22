import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 255})
    texto:string;
       
    @Column({default: false })
    lido: boolean;

    @Column()
    data: Date;

    @CreateDateColumn()
    createdAt?: Date; //

    
    @UpdateDateColumn()
    updatedAt?: Date; //

    // Muitas mensagens podem ser enviados por uma unica pessoa
    @ManyToOne(() => Pessoa)
    // Especifica a coluna "de" que armazena o ID da pessoa que enviou a mensagem
    @JoinColumn({ name : 'de'})
    de: Pessoa;
    
    // Uma unica pessoa pode receber muitos recados
    @ManyToOne(() => Pessoa)
    @JoinColumn({ name : 'para'})
    para: Pessoa;
}
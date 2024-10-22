import { Injectable, NotFoundException } from "@nestjs/common";
import { Message } from "./entities/menssage.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PessoasService } from "src/pessoas/pessoas.service";

@Injectable()
export class MessagesService {

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        private readonly pessoaService: PessoasService,
    ){}
   
    throwNotFoundError(){
        throw new NotFoundException('Messagem não encontrada')
    }

    async findAll(){
        const messages = await this.messageRepository.find({
            relations: ['de', 'para'],
            order: {
                id: 'desc',
            },
            select:{
                de: {
                    id: true,
                    nome: true
                },
                para:{
                    id: true,
                    nome: true
                }
            }
        });
        return messages;
    }

    async findOne(id: number){
      const message = await this.messageRepository.findOne({
        where: {
            id,
        },
        relations: ['de', 'para'],
        select:{
            de: {
                id: true,
                nome: true
            },
            para:{
                id: true,
                nome: true
            }
        }

      });

      if(message) return message;

      this.throwNotFoundError();

    }

    async create(createMessageDto: CreateMessageDto){
        const {deId, paraId } = createMessageDto;
        // Encontrar a pessoa que estar criando o recado
        const de = await this.pessoaService.findOne(deId);
        // Encontrar a pessoa que receberám o recado
        const para = await this.pessoaService.findOne(paraId);

        const newMessage = {
            texto: createMessageDto.texto,
            de,
            para,
            lido: false,
            data: new Date()
        };
        
        const message = await this.messageRepository.create(newMessage);
        await this.messageRepository.save(message);
        return {
            ...message,
            de: {
                id: message.de.id,
            },
            para: {
                id: message.para.id,
            },
        };
    }

    async update(id: number, updateMessageDto: UpdateMessageDto){
        const PartialUpdateMessageDto = {
            lido: updateMessageDto?.lido,
            texto: updateMessageDto?.texto,
        }
        const message = await this.messageRepository.preload({
            id,
            ...PartialUpdateMessageDto
        });

        if(!message) return this.throwNotFoundError();

        return this.messageRepository.save(message);
    }

    async remove(id: number){
        const message = await this.messageRepository.findOneBy({
            id,
        });

        if(!message) return this.throwNotFoundError();

        return this.messageRepository.remove(message);
    }
}
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/menssage.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports:[TypeOrmModule.forFeature([Message]), PessoasModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}

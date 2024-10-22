import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {

  constructor(private readonly messagesService: MessagesService){}

  // Find all messages
  // @HttpCode(201) Caso queira mudar a resposta http no serv
  // @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  // Find one mensage used ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  // Cria uma message
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // Atualiza uma message
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMessageDto: UpdateMessageDto) {
   return this.messagesService.update(id, updateMessageDto);
  }

  // Atualiza uma message
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.messagesService.remove(id);
  }
 

}

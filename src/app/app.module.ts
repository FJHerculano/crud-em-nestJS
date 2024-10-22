import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      database: 'postgres',
      password: 'admin',
      autoLoadEntities: true, //Carrega entidades sem precisar especifica-las
      synchronize: true, // Sincroniza com o BD. Não deve ser usado em produção
    }),
    MessagesModule,
    PessoasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

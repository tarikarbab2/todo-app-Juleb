import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import {UsersModule} from './users/users.module'
import { ConfigModule,ConfigService } from '@nestjs/config';
import {TodoModule} from './todo/todo.module'
import {User} from './users/user.entity';
import {Todo} from "./todo/todo.entity"
import { type } from 'os';
import { Database } from 'sqlite3';
import { join } from 'path';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:`.env`
  }) ,TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(config:ConfigService)=>{
      return{
    type:'sqlite',
    database:"db/"+config.get<string>('DB_NAME'),
    entities:[User,Todo],
    synchronize: true
    }}
    
  }),ServeStaticModule.forRoot({
    
    rootPath: join(__dirname,'..','public'),})
    ,UsersModule,TodoModule
],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}

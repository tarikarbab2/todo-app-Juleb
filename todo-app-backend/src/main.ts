import { NestFactory } from '@nestjs/core';
import {ValidationPipe,Res,Req} from "@nestjs/common";
import {response,request,static as static_} from 'express'
import { AppModule } from './app.module';
import path from 'path';
const cors =require('cors')
const cookieSession=require('cookie-session')
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  )



  await app.listen(process.env.PORT);
}
bootstrap();

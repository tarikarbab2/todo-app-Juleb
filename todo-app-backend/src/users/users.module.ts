import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_INTERCEPTOR} from '@nestjs/core'
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import {AuthService} from './auth.service'
import {cuurentUserInterseptor} from './interceptor/currentuser.interceptor';
//building the modul so it can provide the servecis and the controllers to part or for all the app
@Module({
  ///////import the user entity so type orm can handle the repositr
  imports:[TypeOrmModule.forFeature([User])],
  controllers:[UsersController],
  providers: [UsersService,AuthService
  ,{provide:APP_INTERCEPTOR,
  useClass:cuurentUserInterseptor
  }
]
})
export class UsersModule {}

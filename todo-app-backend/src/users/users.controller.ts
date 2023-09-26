import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
  UseGuards,
  Res ,
  Req,Redirect
} from '@nestjs/common';
import {Response} from 'express'
import { CreatUserDto } from './dtos/creatUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import {Serilaize} from '../interceptors/serilaize.interceptor'
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import {currentUser} from "./decorator/currentuser.decorator"
import { User } from './user.entity';
import { AuthGaurd } from 'src/Guard/auth.guard';
import jwt=require("jsonwebtoken")


@Controller()
export class RedirectController {
  
}
//control the api reauest
@Controller('/api')
@Serilaize(UserDto)
export class UsersController {
  constructor(private userService: UsersService
    ,private authservice:AuthService) {}
  
//signup request handling
  @Post('/auth/signup')
 async creatUser(@Body() body: CreatUserDto,@Res() res:Response) {
  //create a user from the data posted in the body
    const user= await this.authservice.signUp(body.email, body.name, body.password);
    //creating a token from the dat
    const token=jwt.sign({userId:user.id,name:user.name},"supersecret")
     //send a response that contain some of the user data as well as the token
    return res.send({id:user.id,name:user.name,token:token})
  }
  @Post('/auth/signin')
 async signIn(@Body() body ,@Session() session:any,@Req() req,@Res() res:Response){
  //check if there is a user and then sign it 
     const user =await  this.authservice.signIn(body.email,body.password)
    //create a token for the signed in user
      const token=await jwt.sign({userId:user.id,name:user.name},"supersecret")
     //send a response that contain some of the user data as well as the token
      return res.send({id:user.id,name:user.name,token:token})
  }

 //---------------------------------------------------------------
   // a set of admin setting that is not reqierd for the app
    //---------------------------------------------------------------
  @Get('/:id')
  async find(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Get('/users/:email')
  async findAll(@Param("email") email:string) {
    const users = await this.userService.find(email);
    console.log(users);
    return users;
  }
  @Patch('/user/:id')
  async updateuser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updateuser = await this.userService.update(parseInt(id), body);
    console.log(updateuser);
  }

  @Delete('/user/:id')
  async Delete(@Param('id') id: number) {
    await this.userService.Delete(id);
    return 'this user has been deleted';
  }
}

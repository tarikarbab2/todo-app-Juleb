import { Injectable,NotFoundException,BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes,scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
 
const scrypt=promisify(_scrypt)


@Injectable()
export class AuthService {
 constructor(private userService:UsersService){}


async signUp(email:string,name:string,password:string){
   const users=await this.userService.find(email)
   //checking if there is a user
   if(users.length){
    // if there is an email regesired in the data base throw an error
    throw new BadRequestException('this email already exist')
   }
   //hashing password
   const salt=randomBytes(8).toString('hex')

   const hash= (await scrypt(password,salt,32))as Buffer

   const result=salt +'.' +hash.toString('hex')
    
   //creating user
   
   const user=await this.userService.create(email,name,result)
   
   return user
   

 }

async signIn(email:string,password:string){
    const [user]=await this.userService.find(email);

    if(!user){
        //check if there is a user registerd with the email if not throw an error
        throw new NotFoundException("there is no user that has this email")
    }
    // checking for the password if it is matched or not by hashing it and compare it
    const [salt,hash]=user.password.split(".")
    const userhash= (await scrypt(password,salt,32))as Buffer
  
    if(hash !== userhash.toString('hex')){
       throw new BadRequestException("the password is wrong")
    }
    else{
        return user
    }
    
 }
}
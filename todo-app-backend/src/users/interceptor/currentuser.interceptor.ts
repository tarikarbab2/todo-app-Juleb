import {
   
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
  } from '@nestjs/common';
const jwt =require('jsonwebtoken')

import {UsersService} from '../users.service'
  
@Injectable()
 export  class cuurentUserInterseptor implements NestInterceptor {
     constructor(private userservice:UsersService){}
  
  
  async  intercept(
      context: ExecutionContext,
      handler: CallHandler) {
        ///geting the http requests from the execution context
        const request=context.switchToHttp().getRequest()
        //checking for  the authentication header
      const auth=request.headers.authorization || false
      if(auth){
         const token= auth.split(' ')[1] 
 
      //decode the token
       const decodedjson=  jwt.verify(token,'supersecret')
       //save user data in the request object
         request.userData={userId:decodedjson.userId,username:decodedjson.name}
         
       if(decodedjson.userId){
            const user=await this.userservice.findOne(decodedjson.userId)
            //save the user in the request object to be used by the deocrator
            request.cuurentuser=user
       }
      
    }
    //go to the nest request
       return handler.handle()
     
    }
  }
  
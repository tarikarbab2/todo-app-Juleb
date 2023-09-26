import {
       ExecutionContext,
    createParamDecorator
  } from '@nestjs/common';
  

  

export const currentUser=   createParamDecorator( 
(data:any,context:ExecutionContext)=>{
  //get the http request
    const requst=context.switchToHttp().getRequest()
   //send back the user data that is saved in the request
    return requst.cuurentuser;

}

)
import {CanActivate,ExecutionContext} from '@nestjs/common'
import { Observable } from 'rxjs'
const jwt =require('jsonwebtoken')
export class AuthGaurd implements CanActivate{

    canActivate(context: ExecutionContext){
        //get the http request object
        const request=context.switchToHttp().getRequest()
          //get the token for the user that is stored in the header
        const token= request.headers.authorization.split(' ')[1]

   
         //if there is'nt a token denie the requests from the server
        if(!token){
            return false
        }
        return true

    }
}
import { Injectable,NotFoundException } from '@nestjs/common';
import {Repository} from "typeorm"
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './user.entity';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>){}


    create(email:string, name:string,password:string){
       const user=this.repo.create({email,name,password})

       return this.repo.save(user)
    }

    findOne(id:number){
        if(!id){
            return null
        }
        return this.repo.findOne({where :{id}});

    }

   async find(email:string){
        const users=await this.repo.find({where :{email}})
        if(!users){
            throw new NotFoundException("there is no users")
        }
        
        return users
        
    }

   async update(id:number,attrs:Partial<User>){
        const user =await this.findOne(id)
        if(!user){
            throw  new NotFoundException("there is no users")
        }
        Object.assign(user,attrs)
        return this.repo.save(user)

    }

    async Delete(id:number){
      const user=await this.findOne(id)
      if(!user){
        throw new NotFoundException("there is no users")
      }
      return this.repo.remove(user)
    }
}

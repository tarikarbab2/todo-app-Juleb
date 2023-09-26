import { Injectable,NotFoundException } from '@nestjs/common';
import {Repository} from "typeorm"
import {InjectRepository} from '@nestjs/typeorm'
import { Todo } from './todo.entity';
import { TodoDto } from './dtos/todos.dto';


import {User} from '../users/user.entity'
@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private repo:Repository<Todo>){}

    //create a todo
    create(task:string,user:User){
       //creating a todo that only require a task from the user
       const todo=this.repo.create({task,completed:false,created:new Date()})
       //asign a user to the todo object before saving it
       todo.user=user;
      //save a todo to the data base
       return this.repo.save(todo)
    }
   //find the todos from the data base
    async findtodos(user){
        
        return await this.repo.find({where:{user}});
        

    }

    //a function the is used to find a todo to be edit or deleted
   async find(id:number){
        const todo=await this.repo.findOne({where :{id}})
        if(!todo){
            throw new NotFoundException("thers is no a todo")
        }
        
        return todo
        
    }
//update a todo by the assign values
   async update(id:number,attrs:Partial<Todo>){
        const todos =await this.find(id)
        if(!todos){
            throw  new NotFoundException("there is no todos")
        }
        //create an object of the assigned values than save it
        Object.assign(todos,attrs)
        return this.repo.save(todos)

    }
   //delete a todo
    async Delete(id:number){
      const todo=await this.find(id)
      if(!todo){
        throw new NotFoundException("there is no users")
      }
      return this.repo.remove(todo)
    }
}

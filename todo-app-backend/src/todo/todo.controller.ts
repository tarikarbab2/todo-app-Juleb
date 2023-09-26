import { Controller ,Get,Post,Delete,Body,Param,Session,UseGuards, Put} from '@nestjs/common';
import { CreatTododtos } from './dtos/createTodo.dto';
import { TodoService } from './todo.service';
import {AuthGaurd} from '../Guard/auth.guard'
import {currentUser} from '../users/decorator/currentuser.decorator';
import {User} from '../users/user.entity'
import {TodoDto} from './dtos/todos.dto'
import {Serilaize} from '../interceptors/serilaize.interceptor'

@Controller('api/todo')
@UseGuards(AuthGaurd)
//control the todo api
export class TodoController {
    constructor(private todoservice:TodoService){}

 // get all the todos for the loged in user
@Get("/todos")
getTodos(@currentUser() user:User){
    //by using the userdecorator get the user data and then use the service to find the todos
    return this.todoservice.findtodos(user)
 }

 //post a new todo and connecting it to a user
@Post('')
@Serilaize(TodoDto)
createTodo(@Body() body:CreatTododtos,@currentUser() user:User){
    
 return this.todoservice.create(body.task,user);
}

//update a todo by getting its id from the http pram
@Put('/:id')
updateTodo(@Param("id") id:string,@Body() body){
    this.todoservice.update(parseInt(id),body)
}
//deleting a todo by its id
@Delete("/:id")
deleteTodo(@Param('id') id:string){
    this.todoservice.Delete(parseInt(id))
}





}

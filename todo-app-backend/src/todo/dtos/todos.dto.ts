import {Expose,Transform} from 'class-transformer'
import { User } from 'src/users/user.entity'


export class TodoDto{
    @Expose()
    id:number;
    @Expose()
    task:string;
    @Expose()
    completed:boolean;
    @Expose()
    created:Date;

    @Transform( ({obj}) => obj.user.id)
    @Expose()
    userId:number


}
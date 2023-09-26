import {Entity,Column,PrimaryGeneratedColumn,ManyToOne} from "typeorm"
import { User } from "src/users/user.entity";


//setting the todo entity so that typeorm create a repo out of
@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    task:string;
    @Column()
    completed:boolean;
    @Column()
    created:Date
    
    @ManyToOne(() => User, user => user.todos)
    user: User;

}
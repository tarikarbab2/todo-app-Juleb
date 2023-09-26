import {Entity,Column,PrimaryGeneratedColumn,OneToMany} from "typeorm"
import {Todo} from "../todo/todo.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;

    @OneToMany(()=>Todo,(todo)=>todo.user)
    todos:Todo[]


}
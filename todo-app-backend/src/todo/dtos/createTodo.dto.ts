import {IsString,IsBoolean} from "class-validator"



export class CreatTododtos {
    @IsString() 
    task:string
    
}
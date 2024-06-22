import { EmailValidator } from "@angular/forms"

export interface Person{
    id:number,
    name:String,
    lastName:String,
    phone:String,
    email:EmailValidator,
    username:String,
    password:String
}
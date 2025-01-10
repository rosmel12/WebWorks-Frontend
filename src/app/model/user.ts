import { EmailValidator } from "@angular/forms"

export interface User {
    id:number,
    name:String,
    lastname:String,
    birthDate:Date,
    phone:String,
    email:EmailValidator,
    username:String,
    password:String,
    photo:String,
    rol:String
}

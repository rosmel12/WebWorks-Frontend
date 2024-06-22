import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ 
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnInit{
  public loginForm!: FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private userService:AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
   private cookieService:CookieService
  ){}

  ngOnInit(): void {
    this.reactiveForm()  
   }
   reactiveForm(){
     this.loginForm=this.formBuilder.group({
       usuario:['',[Validators.required,Validators.email]],
       contraseña:['',[Validators.required]]
       })
   }
   login(){
    if(this.loginForm.valid){
      console.log("todo correcto")
      const user: User ={
        username:this.loginForm.get('usuario')!.value,
        password:this.loginForm.get('contraseña')!.value
      }
      this.userService.login(user).subscribe({
        next: (_data) => {
          
          console.log("dato correcto")
          this.snackBar.open('usuario validado','', {
            duration: 3000
          })

          this.router.navigateByUrl("/pageUser");
        },
        error: (err) => {
          console.log(err)
        },
       })
      
       
      this.loginForm.reset()
    }else{
      alert("error")
    }
  }
}

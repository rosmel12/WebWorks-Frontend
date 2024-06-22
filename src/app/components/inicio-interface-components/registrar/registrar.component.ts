import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import {Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Person } from '../../../model/person';
import { PersonService } from '../../../services/person.service';
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit{
  public registrarForm!: FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private personService:PersonService,
    private router: Router,
   private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.reactiveForm()  
   }
   reactiveForm(){
     this.registrarForm=this.formBuilder.group({
       name:['',[Validators.required]],
       lastName:['',[Validators.required]],
       phone:['',[Validators.required]],
       email:['',[Validators.required,Validators.email]],
       username:['',[Validators.required]],
       password:['',[Validators.required]]
       })
   }


   registrar(){
    if(this.registrarForm.valid){
      const person: Person ={
        id:0,
        name:this.registrarForm.get('name')!.value,
        lastName:this.registrarForm.get('lastName')!.value,
        phone:this.registrarForm.get('phone')!.value,
        email:this.registrarForm.get('email')!.value,
        username:this.registrarForm.get('username')!.value,
        password:this.registrarForm.get('password')!.value}

        this.personService.registrar(person).subscribe({
          next: (data) => {
            console.log("ingresando registro...")
            this.snackBar.open('usuario creado correctamento', '', {
              duration: 3000
            })
          },
          error: (err) => {
            console.log(err)
          },
         })
       console.log("todo correcto")
       this.router.navigateByUrl("/pageUser");
      this.registrarForm.reset()
    }else{
      alert("error")
    }
  }
}

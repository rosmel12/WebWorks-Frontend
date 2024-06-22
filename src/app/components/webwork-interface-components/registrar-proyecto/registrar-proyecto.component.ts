import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proyecto } from '../../../model/proyecto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registrar-proyecto',
  standalone: true,
  imports: [ 
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './registrar-proyecto.component.html',
  styleUrl: './registrar-proyecto.component.css'
})
export class RegistrarProyectoComponent implements OnInit{
  public myForm!: FormGroup
  

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reactiveForm()
  }
  reactiveForm() {
    this.myForm = this.fb.group ({
      name: ['',Validators.required],
      dateEnd: ['', Validators.required],
      description:  ['', Validators.required]

    })
  }

  Registrar(){
    if(this.myForm.valid){
      console.log("todo correcto")

      const proyecto: Proyecto ={
        id: 0,
        name: this.myForm.get('name')!.value,
        dateStart:this.myForm.get('dateEnd')!.value,
        dateEnd: this.myForm.get('dateEnd')!.value,
        description: this.myForm.get('description')!.value,
        Developer_Id: 1
      }
         
      
      this.proyectoService.AñadirProyecto(proyecto).subscribe({
        next: (_data) => {
          
          console.log("dato correcto")
          this.snackBar.open('proyecto creado','', {
            duration: 3000
          })
        },
        error: (err: any) => {
          console.log(err)
        },
       })
      this.router.navigateByUrl("/pageUser");
       //this.router.navigateByUrl("/listProyecto");
      this.myForm.reset()
    }else{
      alert("error")
    }
  }

}

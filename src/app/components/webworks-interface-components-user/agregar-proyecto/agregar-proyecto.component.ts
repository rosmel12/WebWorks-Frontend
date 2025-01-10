import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../model/project';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {RepositoryService} from "../../../services/repository.service";
@Component({
  selector: 'app-agregar-proyecto',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
],
  templateUrl: './agregar-proyecto.component.html',
  styleUrl: './agregar-proyecto.component.css'
})
export class AgregarProyectoComponent implements OnInit {

  public projectForm!: FormGroup
  public id: number | undefined |null
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private repositoryService: RepositoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.clear();
    this.reactiveForm()
  }
  reactiveForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required]
    })

    if (this.projectService.getIdUpdate() != null) {
      this.id = parseInt(this.projectService.getIdUpdate()!);
      this.projectService.projectById(parseInt(this.projectService.getIdUpdate()!)).subscribe((data: Project) => {
        this.projectForm.get('name')!.setValue(data.name);
        this.projectForm.get('description')!.setValue(data.description);
        this.projectForm.get('language')!.setValue(data.language);
      })
    }

  }

  addOrUpdate() {
    if (this.projectForm.valid) {
      const project: Project = {
        id: 0,
        name: this.projectForm.get('name')!.value,
        dateCreate: new Date(), // Fecha de inicio actual como objeto Date
        description: this.projectForm.get('description')!.value,
        language:this.projectForm.get('language')!.value,
        id_repository: parseInt(this.repositoryService.getIdSave()!),
      };
      if (this.projectService.getIdUpdate() == null) {
            this.projectService.addProject(project).subscribe({
              next: (data) => {
                if (data) {
                  console.log("proyecto creado")
                  this.projectForm.reset()
                  this.router.navigateByUrl("/listProyecto").then( ()=> console.log("redirected"));
                }else{
                  alert('error al crear el proyecto')
                }
              }
        })
      } else {
        project.id = this.id!;
        console.log(project.id)
        this.projectService.update(project).subscribe({
          next: (_data) => {
            console.log('proyecto modificado')
            this.projectForm.reset()
            this.router.navigate(["/listProyecto"]).then()
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    } else {
      console.error('completo todos los datos requeridos ');

    }
  }


}

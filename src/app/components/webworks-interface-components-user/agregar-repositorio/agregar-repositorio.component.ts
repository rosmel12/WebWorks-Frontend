import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  Router, RouterModule } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Repository} from '../../../model/repository';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {SubscriptionService} from "../../../services/subscription.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-agregar-repositorio',
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
    MatNativeDateModule,],
  templateUrl: './agregar-repositorio.component.html',
  styleUrl: './agregar-repositorio.component.css'
})
export class AgregarRepositorioComponent implements OnInit {
  public repositorioForm!: FormGroup
  dataSource = new MatTableDataSource<Repository>()
  public id: number | undefined | null
  constructor(
    private fb: FormBuilder,
    private repositoryService: RepositoryService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,
  ) {  }

  ngOnInit(): void {
    console.clear()
    this.reactiveForm();
    this.numberRepository();
  }

  reactiveForm() {
    this.repositorioForm = this.fb.group({
      name: [''],
      description: ['', Validators.required],
      numberProject: ['', Validators.required],
    });

    if (this.repositoryService.getIdSave() != null) {
      this.id = parseInt(this.repositoryService.getIdSave()!)
      this.repositoryService.getRepositoryById(this.id).subscribe((data: Repository) => {
          this.repositorioForm.get('name')!.setValue(data.name)
          this.repositorioForm.get('description')!.setValue(data.description)
          this.repositorioForm.get('numberProject')!.setValue(data.numberProject);
      })
    }
  }

  numberRepository() {
    return this.repositoryService.getRepositoriesUser(parseInt( this.userService.getId())).subscribe(
      (data: Repository[]) => {
      this.dataSource.data = data
    })
  }

  addOrUpdate() {
    if (this.repositorioForm.valid) {

      const repository: Repository = {
        id: 0,
        name: this.repositorioForm.get('name')!.value,
        description: this.repositorioForm.get('description')!.value,
        dateCreate: new Date(),
        numberProject: this.repositorioForm.get('numberProject')!.value,
        id_user: parseInt(this.userService.getId())
      };

      if(this.subscriptionService.getCheckSubscription()==false && repository.numberProject > this.subscriptionService.freeMaxNumberProjects()){
        alert("usted tiene un plan free, solo tiene permitido maximo " +this.subscriptionService.freeMaxNumberProjects()  + " Proyectos, unete al lado divertido")
        return;
      }
      this.createOrUpdate(repository);

    } else{
      console.error('completo todos los datos requeridos ');
    }
  }

  createOrUpdate(repository: Repository) {
    if (this.repositoryService.getIdSave() == null) {

      this.repositoryService.andRepository(repository).subscribe(
        ( check:boolean ) => {
          if(check){
            this.repositorioForm.reset()
            this.repositoryService.deleteDateSave();
            this.router.navigateByUrl('/listRepositorio').then(()=>{console.log('repositorio creado')});}
          else{
            console.log('ya existe un repositorio con ese nombre')
          }
        }
      )
    }
    else {
      repository.id = parseInt(this.repositoryService.getIdSave())
      this.repositoryService.update(repository).subscribe(
        (check:boolean)=>{
          if (check){
            this.repositorioForm.reset()
            this.repositoryService.deleteDateSave();
            this.router.navigateByUrl("/listRepositorio").then( ()=> console.log("repository updated"));}
          else {
            console.log('ya existe un repositorio con ese nombre')}
        })
    }
  }

  deleteDateSave(){
    this.repositoryService.deleteDateSave()
  }


}



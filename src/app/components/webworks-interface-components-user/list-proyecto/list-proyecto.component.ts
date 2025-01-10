import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';

import ApexCharts from 'apexcharts'
import { Project } from '../../../model/project';
import { ProjectService } from '../../../services/project.service';
import { CommonModule } from '@angular/common';
import {RepositoryService} from "../../../services/repository.service";
@Component({
  selector: 'app-list-proyecto',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './list-proyecto.component.html',
  styleUrl: './list-proyecto.component.css'
})
export class ListProyectoComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateCreate', 'description', 'language', 'actions']
  name: string = ''
  numProjects: string = '';
  dataSource = new MatTableDataSource<Project>()
  private chart: ApexCharts | null = null;

  constructor(
    private projectService: ProjectService,
    private repositoryService: RepositoryService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    console.clear();
    this.getProjectRepository();
  }

  getProjectRepository() {
      this.projectService.getProjectRepository(parseInt(this.repositoryService.getIdSave())).subscribe((data: Project[]) => {
          this.dataSource = new MatTableDataSource(data);
          this.name=this.repositoryService.getNameSave();
          this.numProjects=this.repositoryService.getNumProjectsSave();
          this.graphic(data);
    })
  }

  saveId(id: number) {
    this.projectService.saveId(id)
    this.router.navigate(["/agregarProyecto"]).then(() => {console.log("rediriendo al form proyecto")})
  }
  deleteIdSave(){
    if(this.dataSource.data.length >= parseInt(this.numProjects)){
      alert("usted ya no puede agregar mas proyectos, alcanzo el limite permitido")
      return;
    }
    this.projectService.deleteIdSave();
    this.router.navigate(["/agregarProyecto"]).then(() => {console.log("rediriendo al form proyecto")})
  }
  delete(id: number) {
    this.projectService.delete(id).subscribe({
      next: (_data) => {
        console.log('proyecto eliminado')
        this.getProjectRepository();
        this.router.navigate(["/listProyecto"]).then()
      }, error(err: any) {
        console.log(err)
      }
    })
  }
  deleteDateTotal(){
    this.repositoryService.deleteDateSave()
    this.projectService.deleteIdSave();
  }

  graphic(project:Project[]) {
    const options= {
    series: project.map(project => project.id),
    chart: {
      type: 'donut',
      height: 350
    },
    labels: project.map(project => '' + project.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    title: {
      text: 'Proyecto'
    }
  };
  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new ApexCharts(document.querySelector("#chart"), options);
  this.chart.render().then(() => {console.log("se creo el garfico")});
}

}

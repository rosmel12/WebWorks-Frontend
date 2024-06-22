import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Proyecto } from '../../../model/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-proyecto',
  standalone: true,
  imports: [
    MatTableModule],
  templateUrl: './list-proyecto.component.html',
  styleUrl: './list-proyecto.component.css'
})
export class ListProyectoComponent implements OnInit{
 
  displayedColumns: string[] = ['id', 'name', 'dateStart', 'dateEnd','description']
  
  dataSource = new MatTableDataSource<Proyecto>()
  constructor(
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar,
    ) {}
    ngOnInit(): void {
      this.getProyectos()
    }
  getProyectos() {
    this.proyectoService.getProyecto().subscribe((data:Proyecto[])=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}

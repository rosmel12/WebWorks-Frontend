import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
export interface PeriodicElement {
  id:number,
  name:string,
  description:string,
  datePublication:string,
  quantityProject:number,
  Developer_Id:number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Repositorio HTML', description: 'Proyectos html', datePublication:'2023-11-15T05:00:00.000+00:00',quantityProject:5,Developer_Id:1},]
  
  
@Component({
  selector: 'app-list-repositorio',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-repositorio.component.html',
  styleUrl: './list-repositorio.component.css'
})
export class ListRepositorioComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'datePublication','quantityProject'];
  dataSource = ELEMENT_DATA;
}

import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { Plan } from '../../../model/plan';
import { PlanesService } from '../../../services/planes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listplan',
  standalone: true,
  imports: [ 
    CommonModule ,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './listplan.component.html',
  styleUrl: './listplan.component.css'
})
export class ListplanComponent implements OnInit{
  
  dataSource = new MatTableDataSource<Plan>()
  constructor(
    private planService: PlanesService,
    private snackBar: MatSnackBar,
    private router: Router) {}
    
    ngOnInit(): void {
      this.getPlanes();
    }

    getPlanes(){
      this.planService.getPlanes().subscribe((data:Plan[])=>{
        this.dataSource=new MatTableDataSource(data)
      })
    }
}

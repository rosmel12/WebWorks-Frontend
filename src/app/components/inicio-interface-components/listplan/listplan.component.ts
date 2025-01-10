import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { Plan } from '../../../model/plan';
import { PlanesService } from '../../../services/planes.service';

import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import { AuthService } from '../../../services/auth.service';
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
  height: string = '90%';
  dataSource = new MatTableDataSource<Plan>()
  constructor(
    private planService: PlanesService,
    private auth:AuthService,
    private router: Router) {}

    ngOnInit(): void {
      this.getPlanes();
    }

    getPlanes(){
      this.planService.getPlanes().subscribe((data:Plan[])=>{
        this.dataSource=new MatTableDataSource(data)
        if(this.auth.getToken()!=null){
          this.height = '100%';
        }
      })
    }

    savePlan(id:number,price:number){
      this.planService.saveIdPlan(id);
      this.planService.savePricePlan(price);
      if(this.auth.getToken()!=null){
        this.router.navigate(["/subscription"]).then(()=>console.log(price));

      }else{
        this.router.navigate(["/login"]).then(()=>console.log(price));
      }
    }
}

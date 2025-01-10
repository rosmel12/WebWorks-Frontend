import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {Employment} from "../../../model/employment";
import {EmploymentService} from "../../../services/employment.service";
import {CompanyService} from "../../../services/company.service";
import {MatTooltipModule} from "@angular/material/tooltip"

@Component({
  selector: 'app-list-employment-company',
  standalone: true,
    imports: [
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      RouterModule,
      MatInputModule,
      CommonModule,
    ],
  templateUrl: './list-employment-company.component.html',
  styleUrl: './list-employment-company.component.css'
})
export class ListEmploymentCompanyComponent implements OnInit {

  displayedColumns: string[] = ["title",'position', 'description', 'vacancies','contracted' ,'dateMaxPostulation', 'actions']
  dataSource = new MatTableDataSource<Employment>()

  constructor(
    private employmentService:EmploymentService,
    private companyService:CompanyService,
  ) { }

  ngOnInit(): void {
    this.getEmployment()
  }


  getEmployment() {
    this.employmentService.getEmploymentsByCompany(parseInt( this.companyService.getIdCompany())).subscribe((data: Employment[]) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  saveIdEmployment(id:number){
    this.employmentService.saveIdEmployment(id);
  }

  deleteEmployment(id:number){
    this.employmentService.deleteEmployment(id).subscribe(
      (check:boolean)=>{
        if(check){
          this.getEmployment()
        }else{
          alert("error")}
      }
    )
  }

}

import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule,} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Company} from "../../../model/company";
import {AuthService} from "../../../services/auth.service";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-profile-company',
  standalone: true,
    imports: [
      CommonModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      RouterModule,
      MatButtonModule,
      MatCardModule,
    ],
  templateUrl: './profile-company.component.html',
  styleUrl: './profile-company.component.css'
})
export class ProfileCompanyComponent  implements  OnInit{
  dataSource = new MatTableDataSource<Company>()
  constructor(
    private companyService:CompanyService,
    private authService:AuthService,) {
  }
  ngOnInit(): void {
    this.getCompany()
  }
  getCompany() {
    this.companyService.getCompany(this.authService.getUser() || "").subscribe((data: Company) => {
      this.dataSource.data=[data]
    })
  }

}

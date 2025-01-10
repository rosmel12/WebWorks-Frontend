import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import { MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {EmploymentService} from "../../../services/employment.service";
import {UserService} from "../../../services/user.service";
import {JobApplication} from "../../../model/jobApplication";
import {JobApplicationService} from "../../../services/jobapplication";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmploymentSummary} from "../../../modelComplement/employmentSummary";

@Component({
  selector: 'app-list-employment',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './list-employment.component.html',
  styleUrl: './list-employment.component.css'
})

export class ListEmploymentComponent implements OnInit{
  dataSource = new MatTableDataSource<EmploymentSummary>()

  applicationStatuses: { [key: number]: boolean } = {};

  constructor(
    private employmentService:EmploymentService,
    private userService:UserService,
    private jobApplicationService:JobApplicationService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.clear()
    this.getEmployment()
  }

  getEmployment(){
    this.employmentService.getEmployments().subscribe((data: EmploymentSummary[]) => {
      this.dataSource = new MatTableDataSource(data);
      const userId = parseInt(this.userService.getId());
      const employmentIds = data.map(employment => employment.id);

      employmentIds.forEach(employmentId => {
        this.jobApplicationService.checkJobApplication(employmentId, userId).subscribe(
          (status: boolean) => {
            this.applicationStatuses[employmentId] = status; // Store in map
          }
        );
      });

    })
  }

  check(idEmployment: number): boolean {
    return this.applicationStatuses[idEmployment] || false; // Default to false if not loaded yet
  }

  applyAt(idEmployment:number){
    if(idEmployment){
      const jobApplication :JobApplication = {
        id:0,
        status:"PENDING",
        dateApplication:new Date(),
        id_employment:idEmployment,
        id_user:parseInt(this.userService.getId()),
      }
     this.jobApplicationService.addJobApplication(jobApplication).subscribe(
       (check:boolean)=>{
         if(check){
           this.getEmployment()
           this.snackBar.open('We send your job application', '', {
             duration: 1000
           })
         }else{
           alert("error")}
       }
     )
    }
  }

}

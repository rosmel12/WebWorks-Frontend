import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {CompanyService} from "../../../services/company.service";
import {EmploymentService} from "../../../services/employment.service";
import {Employment} from "../../../model/employment";

@Component({
  selector: 'app-register-employment',
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
  templateUrl: './register-employment.component.html',
  styleUrl: './register-employment.component.css'
})
export class RegisterEmploymentComponent implements OnInit{
  public employmentForm!: FormGroup
  public id: number | undefined |null
  constructor(
    private fb: FormBuilder,
    private companyService:CompanyService,
    private employmentService:EmploymentService,
    private router: Router,

  ) {}
  ngOnInit(): void {
    this.reactiveForm()
  }
  reactiveForm(): void {
    this.employmentForm = this.fb.group({
      title: ['', Validators.required],
      position: ['', Validators.required],
      description: ['', Validators.required],
      vacancies: ['', Validators.required],
      dateMaxPostulation:['', Validators.required],
    })
    if(this.employmentService.getIdEmployment() != null){
      this.employmentService.getEmploymentById(parseInt( this.employmentService.getIdEmployment())).subscribe(
       (data:Employment)=>{
         this.employmentForm.get('title')!.setValue(data.title);
         this.employmentForm.get('position')!.setValue(data.position);
         this.employmentForm.get('description')!.setValue(data.description);
         this.employmentForm.get('vacancies')!.setValue(data.vacancies);
         this.employmentForm.get('dateMaxPostulation')!.setValue(data.dateMaxPostulation);
         this.id=data.id;
      })
    }
  }

  addOrUpdate(){
    if(this.employmentForm.valid){
      const  employment : Employment = {
        id:0,
        title:this.employmentForm.get("title")!.value,
        position:this.employmentForm.get("position")!.value,
        description:this.employmentForm.get("description")!.value,
        vacancies:this.employmentForm.get("vacancies")!.value,
        contracted:0,
        dateMaxPostulation:this.employmentForm.get("dateMaxPostulation")!.value,
        id_company:parseInt(this.companyService.getIdCompany()),
      }

      console.log(this.employmentForm)

      if(this.employmentService.getIdEmployment() == null){
       this.employmentService.addEmployment(employment).subscribe(
         (check:boolean)=>{
         if(check){
           this.router.navigateByUrl("/listEmployment").then( ()=> console.log("redirected"));
         }else {
         alert("error")}
         }
       )}
      else {
        employment.id = parseInt(this.employmentService.getIdEmployment());
        this.employmentService.updateEmployment(employment).subscribe(
          (check:boolean)=>{
            if(check){
              this.employmentService.deleteIdEmployment();
              this.router.navigateByUrl("/listEmployment").then( ()=> console.log("redirected"));
            }else{
              alert("error")}
          }
        )
      }
    }
  }
}

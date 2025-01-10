import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {CompanyService} from "../../../services/company.service";
import {Company} from "../../../model/company";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-update-profile-company',
  standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule
    ],
  templateUrl: './update-profile-company.component.html',
  styleUrl: './update-profile-company.component.css'
})
export class UpdateProfileCompanyComponent  implements OnInit{
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hideNewPassword = signal(true);
  clickEventNewPassword(event: MouseEvent) {
    this.hideNewPassword.set(!this.hideNewPassword());
    event.stopPropagation();
  }
  public updateProfileForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private authService:AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.getCompany();
  }
  reactiveForm() :void {
    this.updateProfileForm = this.formBuilder.group(({
      ruc: ['', [Validators.required]],
      socialReason: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      legalRepresentative: ['', [Validators.required]],
      description: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    }))
  }

  getCompany(){
    this.companyService.getCompany(this.authService.getUser() || "").subscribe((data: Company) => {
      this.updateProfileForm.get('ruc')!.setValue(data.ruc);
      this.updateProfileForm.get('socialReason')!.setValue(data.socialReason);
      this.updateProfileForm.get('sector')!.setValue(data.sector);
      this.updateProfileForm.get('legalRepresentative')!.setValue(data.legalRepresentative);
      this.updateProfileForm.get('description')!.setValue(data.description);
      this.updateProfileForm.get('username')!.setValue(data.username);
    })
  }

  update(){
   if(this.updateProfileForm.valid && this.updateProfileForm.get('password')!.value == this.authService.getPassword()){
    const company:Company ={
      id:parseInt(this.companyService.getIdCompany()),
      ruc:this.updateProfileForm.get('ruc')!.value,
      socialReason:this.updateProfileForm.get('socialReason')!.value,
      sector:this.updateProfileForm.get('sector')!.value,
      legalRepresentative:this.updateProfileForm.get('legalRepresentative')!.value,
      description:this.updateProfileForm.get('description')!.value,
      username:this.updateProfileForm.get('username')!.value,
      password:this.updateProfileForm.get('newPassword')!.value,
      rol:"COMPANY"
     }
     this.companyService.updateCompany(company).subscribe(
       (check)=>{
         if(check){
           this.router.navigateByUrl("/profileCompany").then( () => console.log("redirected"));
         }else{
           console.log("error")
           return;}
       }
     )
   }else {
     alert("incorrect password")
   }
  }
}

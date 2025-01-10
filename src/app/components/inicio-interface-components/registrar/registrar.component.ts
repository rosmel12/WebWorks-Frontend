import {Component, OnInit, signal} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import {Auth} from '../../../model/Auth';
import { AuthService } from '../../../services/auth.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from "@angular/material/tabs";
import {Company} from "../../../model/company";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTabsModule,
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hideConfirmPassword = signal(true);
  clickEventConfirmPassword(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }

  hideCompany = signal(true);
  clickEventCompany(event: MouseEvent) {
    this.hideCompany.set(!this.hideCompany());
    event.stopPropagation();
  }

  hideConfirmPasswordCompany = signal(true);
  clickEventConfirmPasswordCompany(event: MouseEvent) {
    this.hideConfirmPasswordCompany.set(!this.hideConfirmPasswordCompany());
    event.stopPropagation();
  }

  public registrarFormUser!: FormGroup
  public registrarFormCompany!: FormGroup
  constructor(
    private formBuilderUser: FormBuilder,
    private formBuilderCompany: FormBuilder,
    private userService: UserService,
    private companyService:CompanyService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.reactiveForm()
  }

  reactiveForm() {
    this.registrarFormUser = this.formBuilderUser.group(({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }));
    this.registrarFormCompany = this.formBuilderCompany.group(({
      ruc: ['', [Validators.required]],
      socialReason: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      legalRepresentative: ['', [Validators.required]],
      description: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }));

  }

  registrarUser() {
    if (this.registrarFormUser.valid) {
      if (this.registrarFormUser.get('password')!.value == this.registrarFormUser.get('confirmPassword')!.value) {
        const user: User = {
        id: 0,
        name: this.registrarFormUser.get('name')!.value,
        lastname: this.registrarFormUser.get('lastname')!.value,
        birthDate:this.registrarFormUser.get('birthDate')!.value,
        phone: this.registrarFormUser.get('phone')!.value,
        email: this.registrarFormUser.get('email')!.value,
        username: this.registrarFormUser.get('username')!.value,
        password: this.registrarFormUser.get('password')!.value,
        photo:"",
        rol:"USER"}
      this.userService.registrar(user).subscribe((userReturn: User) => {
        if (userReturn != null) {
          //generate token
          const userLogin: Auth = {
            username: user.username,
            password: user.password,}

          this.authService.login(userLogin).subscribe({
            next: (_data) => {
              this.router.navigateByUrl("/pageUser").catch(()=>console.log("todo correcto"));
              this.snackBar.open('Cuenta creada para '+user.username,'', {duration: 3000})},
            error: (err) => {console.log(err)},})
          this.registrarFormUser.reset()}
        else{alert("cambie de username: "+user.username)}})}
      else{alert("verifique la contraseña")}}
    else {alert("Ingrese todos los datos")}}

  registrarCompany(){
  if (this.registrarFormCompany.valid) {
   if (this.registrarFormCompany.get('password')!.value == this.registrarFormCompany.get('confirmPassword')!.value){
     const company:Company={
       id:0,
       ruc:this.registrarFormCompany.get('ruc')!.value,
       socialReason:this.registrarFormCompany.get('socialReason')!.value,
       sector:this.registrarFormCompany.get('sector')!.value,
       legalRepresentative:this.registrarFormCompany.get('legalRepresentative')!.value,
       description:this.registrarFormCompany.get('description')!.value,
       username:this.registrarFormCompany.get('username')!.value,
       password:this.registrarFormCompany.get('password')!.value,
       rol:"COMPANY"}
     this.companyService.AddCompany(company).subscribe((corporation :Company)=>{
       if(corporation !=null){
         ///generar token
         const companyAuth: Auth = {
           username: company.username,
           password: company.password,}
         this.authService.login(companyAuth).subscribe({
           next: (_data) => {
             this.router.navigateByUrl("/pageCompany").catch(()=>console.log("todo correcto"));
             this.snackBar.open('Cuenta creada para '+company.username,'', {
               duration: 3000
             })},
           error: (err) => {
             console.log(err)},})
         this.registrarFormCompany.reset()}
       else {
         alert("cambie de username: "+company.username)}})}
   else {alert("verifique su contraseña")}}
  else {alert("Ingrese todos los datos")}}

}

import {Component, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Router, RouterModule} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {FileService} from "../../../services/file.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-modificar-usuario',
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
  ],
  templateUrl: './modificar-usuario.component.html',
  styleUrl: './modificar-usuario.component.css'
})
export class ModificarUsuarioComponent implements OnInit {
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

  file:any
  urlPhoto:string | undefined ;

  public updateProfileForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService:AuthService,
    private fileService:FileService,
    private sanitizer:DomSanitizer,
    private router: Router,
  ) { }
  reactiveForm() {
    this.updateProfileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    console.clear();
    this.reactiveForm()
    this.getUser()
  }

  captureImage(event: any ):any{
    this.file =event.target.files[0];
    this.extractBase64(this.file).then( (imagen:any)=>{
      this.urlPhoto=imagen.base as string;
    })
  }

  async extractBase64(file: any): Promise<{ base: string | ArrayBuffer | null }> {
    return new Promise((resolve, reject) => {
      try {
        const url = window.URL.createObjectURL(file); // Renombrado para mayor claridad
        this.sanitizer.bypassSecurityTrustUrl(url); // `image` eliminado porque no se utiliza
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve({ base: reader.result });
        reader.onerror = (error) => reject(error);
      } catch (error) {
        reject(error); // Eliminé el retorno de `null` para manejar errores correctamente
      }
    });
  }

  getUser( ) {
    this.userService.getUser(this.authService.getUser() || "").subscribe((data: User) => {
      this.updateProfileForm.get('name')!.setValue(data.name);
      this.updateProfileForm.get('lastname')!.setValue(data.lastname);
      this.updateProfileForm.get('birthDate')!.setValue(data.birthDate);
      this.updateProfileForm.get('phone')!.setValue(data.phone);
      this.updateProfileForm.get('email')!.setValue(data.email);
      this.updateProfileForm.get('username')!.setValue(data.username);
      this.urlPhoto="http://localhost:8080/webworks/media/profileAdd.png";
    })
  }

  update(){
    if(this.updateProfileForm.valid){
      if(this.updateProfileForm.get('password')!.value== this.authService.getPassword()){
        if(this.file){
          const formData = new FormData();
          formData.append('file',this.file)
          this.fileService.addFile(formData).subscribe(
            (urlPhoto:any)=>{
             if(urlPhoto) {
               this.updateProfileUser(urlPhoto)
             }else {
               alert("hubo un error en servidor de subir una imagen ")}
            })
        }else{
          this.updateProfileUser("");}
      } else{
        alert("ingrese la contraseña actual")}
    }else{
      alert('ingrese todos los campos')}
  }

  updateProfileUser( urlPhoto:any){
  this.userService.getUser(this.authService.getUser() || "").subscribe((data: User) => {
    const user: User = {
      id: data.id,
      name: this.updateProfileForm.get('name')!.value,
      lastname: this.updateProfileForm.get('lastname')!.value,
      birthDate: this.updateProfileForm.get('birthDate')!.value,
      phone: this.updateProfileForm.get('phone')!.value,
      email: this.updateProfileForm.get('email')!.value,
      username: this.updateProfileForm.get('username')!.value,
      password: this.updateProfileForm.get('newPassword')!.value,
      photo: urlPhoto.url,
      rol: data.rol
    }

    if (urlPhoto==""){user.photo=data.photo}
    this.userService.updateUser(user).subscribe(
      (check) => {
        if (check) {
          this.authService.updatePassword(user.password.toString())
          this.router.navigateByUrl("/profileUser").then(() => console.log("redirected"));
        } else {
          return;
        }
      })
  })
}


}

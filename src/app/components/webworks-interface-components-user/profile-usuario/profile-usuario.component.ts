import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-profile-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage,
  ],
  templateUrl: './profile-usuario.component.html',
  styleUrl: './profile-usuario.component.css'
})
export class ProfileUsuarioComponent  implements  OnInit{
  dataSource = new MatTableDataSource<User>()
  constructor(
    private userService: UserService,
    private authService:AuthService,) {
  }

  ngOnInit(): void {
   this.getUser()
  }
  getUser() {
    this.userService.getUser(this.authService.getUser() || "").subscribe((data: User) => {
      this.dataSource.data=[data]
    })
  }
}

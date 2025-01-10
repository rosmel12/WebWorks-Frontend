import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from './auth.service';
import {tap} from "rxjs/operators";
import {Url} from "../model/url";


const base_url = Url.urlBackend + '/webworks';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private Auth: AuthService) { }
  //User
  registrar(user: User) {
    const url = base_url+ '/registerUser';
    const endpoint = `${url}`;
    return this.http.post<User>(endpoint, user);
  }

  getUser(username: string) {
    const url=base_url + `/usuario/user/userByUsername/${username}`
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<User>(endpoint,{headers}).pipe(
      tap(response => {
        // Almacenar el token JWT en el almacenamiento local o de sesión
        localStorage.setItem('idUser', response.id.toString());
        localStorage.setItem('name',response.name.toString())
      }));
  }

  updateUser(user: User) {
    const url=base_url + `/usuario/user/updateUser`
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.put<boolean>(endpoint, user,{headers});
  }

  getId(): string{
    return localStorage.getItem('idUser')!;
  }

  getName(): string{
    return localStorage.getItem('name')!;
  }

  deleteDateSave() {
    localStorage.removeItem('idUser');
    localStorage.removeItem('name');
  }

  gerAllUsers(){
    const url = base_url + '/usuario/user/getAllUsers';
    const endpoint = `${url}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<User[]>(endpoint,{headers})
  }

  //Company
  saveUserId(idUser:number) {
    localStorage.setItem("idUserSave" , idUser.toString());
  }

  getSaveUserId(): string {
    return localStorage.getItem("idUserSave")!;
  }

  deleteUserSave() {
    localStorage.removeItem("idUserSave");
  }

  getUserById(idUser:number) {
    const url=base_url + `/usuario/company/userById/${idUser}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const endpoint = `${url}`;
    return this.http.get<User>(endpoint,{headers});
  }

}

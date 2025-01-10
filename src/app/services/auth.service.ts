import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Auth } from '../model/Auth';
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: Auth) {
    const endpoint = `${base_url}`;
    this.logout()
    return this.http.post<any>(endpoint, user).pipe(
      tap(response => {
        // Almacenar el token JWT en el almacenamiento local o de sesión
        localStorage.setItem('token', response.token);
        localStorage.setItem('password',user.password.toString())
        console.log(response.token);
      }));
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload['']; // Suponiendo que el campo 'role' está presente en el token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;}

  getUser(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload.sub; // Suponiendo que el campo 'role' está presente en el token
      } catch (error) {
        console.error('Error decoding token:', error);
      }}
      return null;}

  getPassword():string| null{
    return localStorage.getItem('password')!;
  }

  updatePassword(password:string){
    localStorage.setItem('password',password);
  }

  getToken(): string | null {
    return localStorage.getItem('token')!;}

  logout() {
    // Eliminar el token JWT del almacenamiento local o de sesión
    localStorage.removeItem('password');
    localStorage.removeItem('token');}

  isLoggedIn(): boolean {
    return !!this.getToken();}

}



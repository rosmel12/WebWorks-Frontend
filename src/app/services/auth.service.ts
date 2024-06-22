import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

const base_url = 'http://localhost:8080/webworks/Token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private Cookie:CookieService ) { }
  login(user: User) {
    const direccion = base_url + '/inicio'
    const endpoint = `${direccion}`;
   
    return this.http.post<any>(endpoint, user).pipe(
      tap(response => {
        // Almacenar el token JWT en el almacenamiento local o de sesión
        localStorage.setItem('token', response.token);
        this.Cookie.set("TOKEN",response.token);
        this.getRoleFromToken();
        this.getUserFromToken()
      }));
  } 

  getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        this.Cookie.set("ROLE",decodedPayload.role)
        return decodedPayload.role; // Suponiendo que el campo 'role' está presente en el token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }

  getUserFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        this.Cookie.set("USER",decodedPayload.sub)
        return decodedPayload.sub; // Suponiendo que el campo 'role' está presente en el token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }
  logout() {
    // Eliminar el token JWT del almacenamiento local o de sesión
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token')!;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}



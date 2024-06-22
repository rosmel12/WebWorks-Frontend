import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../model/proyecto';
import { CookieService } from 'ngx-cookie-service';

const base_url = 'http://localhost:8080/webworks/project';
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  

  constructor(private http:HttpClient,  private cookieService: CookieService) { }

  getProyecto() :Observable<any[]> {
    const direccion=base_url+'/developer/projects'
    const endpoint = `${direccion}`;
    const token = this.cookieService.get('token');
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Proyecto[]>(endpoint,{headers});
  }

  AñadirProyecto(proyecto:Proyecto) {
    const direccion=base_url+'/developer/añadir'
    const endpoint = `${direccion}`;
    const token = this.cookieService.get('token');
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Proyecto>(endpoint,proyecto,{headers});
  }

 
}

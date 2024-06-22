import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Developer } from '../model/developer';

const base_url = 'http://localhost:8080/webworks/cliente';
@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient) {
  }

  registrar(developer:Developer){
    const direccion=base_url+'/normal/add'
    const endpoint = `${direccion}`;
    return this.http.post<Developer>(endpoint,developer);
  }
}

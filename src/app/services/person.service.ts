import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person';

const base_url = 'http://localhost:8080/webworks/usuario';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

 constructor(private http:HttpClient){}

  registrar(person:Person){
    const direccion=base_url+'/CrearCuenta'
    const endpoint = `${direccion}`;
    return this.http.post<Person>(endpoint,person);
  }

}

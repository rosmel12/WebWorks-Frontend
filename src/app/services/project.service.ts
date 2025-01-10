import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Project } from '../model/project';
import {Url} from "../model/url";


const base_url = Url.urlBackend + '/webworks/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient,  private Auth:AuthService) { }

  getProyectosTotal(){
    const role = this.Auth.getRole();
    let url;
    if (role == "DEVELOPER") {
      url = base_url + '/developer/proyectototal'
    } else {
      url = base_url + '/normal/proyectototal'
    }
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Project[]>(endpoint, { headers });
  }

  getProjectRepository(id:number)  {
    const url= base_url + `/user/projectsRepository/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Project[]>(endpoint, { headers });
  }

  projectById(id:number){
    const role = this.Auth.getRole();
    const url= base_url + `/user/projectById/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Project>(endpoint,{ headers });
  }

  addProject(project:Project) {
    const url=base_url+'/user/addProject'
    const endpoint = `${url}`;
    const token = this.Auth.getToken();
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Boolean>(endpoint,project,{headers});
  }

  update(project:Project){
    const url=base_url+'/user/updateProject'
    const endpoint = `${url}`;
    const token = this.Auth.getToken();
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`

    });
    return this.http.put<Boolean>(endpoint,project,{headers});
  }

  delete(id:number){
    const url=base_url+`/user/deleteProject/${id}`
    const endpoint = `${url}`;
    const token = this.Auth.getToken();
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Boolean>(endpoint,{headers});
  }

  saveId(id:number){
    localStorage.setItem('id',id.toString())
  }

  getIdUpdate():string{
    return localStorage.getItem('id')!;
  }

  deleteIdSave(){
    localStorage.removeItem('id');
  }

  //Company
  getProjectsRepositoryCompany(idRepository:number){
    const url= base_url + `/company/projectsRepository/${idRepository}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Project[]>(endpoint, { headers });
  }

}

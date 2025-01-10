import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Repository} from "../model/repository";
import {Url} from "../model/url";


const base_url = Url.urlBackend + '/webworks/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http:HttpClient,  private Auth:AuthService) { }

  getRepositoriesUser(id:number)  {
    const url= base_url + `/user/repositoryByUser/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Repository[]>(endpoint,{headers});
  }

  getRepositoryById(id:number){
    const url= base_url + `/user/repositoryById/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Repository>(endpoint, { headers });
  }

  andRepository(repository:Repository) {
    const url=base_url+'/user/addRepository'
    const endpoint = `${url}`;
    const token = this.Auth.getToken();
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<boolean>(endpoint,repository,{headers});
  }

  update(repository:Repository){
    const url=base_url+'/user/updateRepository'
    const endpoint = `${url}`;
    const token = this.Auth.getToken();
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`

    });
    return this.http.put<boolean>(endpoint,repository,{headers});
  }

  delete(id:number){
    const url=base_url+`/user/deleteRepository/${id}`
    const endpoint = `${url}`;
    const token = this.Auth.getToken();
     // Crea los encabezados HTTP con el token
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(endpoint,{headers});
  }

  saveDateImport(id:number, name:string, numProjects:number){
    localStorage.setItem('idRepository',id.toString())
    localStorage.setItem('nameRepository',name)
    localStorage.setItem('numProjects',numProjects.toString())
  }

  getIdSave() : string{
    return localStorage.getItem('idRepository')!;
  }

  getNameSave() : string{
    return localStorage.getItem('nameRepository')!;
  }

  getNumProjectsSave() : string{
    return localStorage.getItem('numProjects')!;
  }

  deleteDateSave(){
    localStorage.removeItem('idRepository');
    localStorage.removeItem('nameRepository');
    localStorage.removeItem('numProjects');
  }

  //Company-method
  getRepositoryUserCompany(idUser:number){

    const url= base_url + `/company/repositoryByUserCompany/${idUser}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Repository[]>(endpoint,{headers});
  }
}

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Employment} from "../model/employment";
import {Url} from "../model/url";
import {EmploymentSummary} from "../modelComplement/employmentSummary";

const base_url = Url.urlBackend + '/webworks/employment';

@Injectable({
  providedIn: 'root'
})

export class EmploymentService {
  constructor(private http: HttpClient,private Auth:AuthService) { }

  addEmployment(employment:Employment){
    const url=base_url+'/company/addEmployment'
    const token=this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
   return this.http.post<boolean>(endpoint,employment,{headers});
  }

  getEmploymentsByCompany(id:number){
    const url=base_url+`/company/getEmploymentsByCompany/${id}`
    const token=this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Employment[]>(endpoint,{headers});
  }

  getEmploymentById(id:number){
    const url=base_url+`/company/getEmploymentById/${id}`
    const token=this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Employment>(endpoint,{headers});
  }

  updateEmployment(employment:Employment){
    const url=base_url+`/company/updateEmployment`
    const token=this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<boolean>(url,employment,{headers});
  }

  deleteEmployment(id:number){
    const url=base_url+`/company/deleteEmployment/${id}`
    const token=this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<boolean>(url,{headers});
  }

  saveIdEmployment(id:number){
    localStorage.setItem('idEmployment', id.toString());
  }

  getIdEmployment():string{
    return localStorage.getItem('idEmployment')!;
  }

  deleteIdEmployment(){
    localStorage.removeItem('idEmployment');
  }

  //employment-User
  getEmployments(){
    const url=base_url+`/user/getEmploymentsSummary`
    const token=this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<EmploymentSummary[]>(endpoint,{headers});
  }


}

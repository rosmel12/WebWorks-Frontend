import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Company} from "../model/company";
import {tap} from "rxjs/operators";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient, private Auth: AuthService) { }

  getCompany(username:string){
    const url=base_url+`/corporation/company/companyByUsername/${username}`
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<Company>(endpoint,{headers}).pipe(
      tap(response => {
        // Almacenar el token JWT en el almacenamiento local o de sesión
        localStorage.setItem('idCompany', response.id.toString());
      }));
  }

  AddCompany(company:Company){
    const url=base_url+`/registerCompany`
    const endpoint = `${url}`;
   return  this.http.post<Company>(endpoint,company)
  }

  updateCompany(company:Company){
    const url=base_url+`/corporation/company/updateCompany`
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<boolean>(url,company,{headers});
  }

  getIdCompany():string{
    return localStorage.getItem('idCompany')!;
  }

  deleteIdCompany(){
    localStorage.removeItem('idCompany');
  }
}

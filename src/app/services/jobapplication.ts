import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {JobApplication} from "../model/jobApplication";
import {JobApplicationSummary} from "../modelComplement/jobApplicationSummary";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks/jobApplication';

@Injectable({
  providedIn: 'root'
})

export class JobApplicationService {

  constructor(private http:HttpClient, private Auth: AuthService) { }

  //Users
  checkJobApplication(idEmployment:number,idUser:number) {
    const url = base_url + `/user/checkJobApplication/${idEmployment}/${idUser}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<boolean>(endpoint ,{headers})
  }
  addJobApplication(jobApplication:JobApplication){
    const url=base_url + `/user/addJobApplication`
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.post<boolean>(endpoint,jobApplication,{headers});
  }

  //Company
  getJobApplicationStatusByCompany(idCompany:number,status:String) {
    const url = base_url + `/company/getJobApplicationStatusByCompany/${idCompany}/${status}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const endpoint = `${url}`;
    return this.http.get<JobApplicationSummary[]>(endpoint ,{headers})
  }

  changeJobApplication(idJobApplication:number, status:String) {
    const url = base_url + `/company/changeJobApplication/${idJobApplication}/${status}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const endpoint = `${url}`;
    return this.http.get<Boolean>(endpoint ,{headers})
  }
}

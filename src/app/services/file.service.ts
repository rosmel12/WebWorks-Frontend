import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks/media';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient, private Auth: AuthService) { }

  addFile(formData: FormData){
    const url=base_url + `/user/addFile`
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.post<string>(endpoint,formData,{headers});
  }


}

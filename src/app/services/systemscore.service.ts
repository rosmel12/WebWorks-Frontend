import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {SystemScore} from "../model/systemScore";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks/systemScore';

@Injectable({
  providedIn: 'root'
})

export class SystemScoreService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  addScore(systemScore:SystemScore) {
     const url = base_url + '/user/addScore';
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.post<Boolean>(endpoint, systemScore, {headers});
  }
}

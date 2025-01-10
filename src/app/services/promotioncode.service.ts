import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {PromotionCode} from "../model/promotionCode";
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks/promotionCode';
@Injectable({
  providedIn: 'root'
})

export class PromotionCodeService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPromotionCodeByCode(code: string){
    const url= base_url + `/user/getPromotion/${code}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<PromotionCode>(endpoint, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MethodPayment } from '../model/methodPayment';
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks/methodpayment';
@Injectable({
  providedIn: 'root'
})
export class MethodpaymentService {

  constructor(private http: HttpClient, private Auth: AuthService) { }

  methodsPaymentByUser(id: number){
    const url= base_url + `/user/methodsPaymentByUser/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<MethodPayment[]>(endpoint,{ headers });
  }

  addMethodPayment(methodPayment:MethodPayment) {
    const url = base_url + '/user/addMethodPayment';
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.post<Boolean>(endpoint,methodPayment,{headers});
  }

  getMethodPaymentById(id: number) {
    const url = base_url + `/user/methodPaymentById/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<MethodPayment>(endpoint,{ headers});
  }

  saveId( id:number){
    localStorage.setItem('idCard', id.toString());
  }

  getIdCardSave() {
    return localStorage.getItem('idCard')!
  }

  deleteIdSave() {
    localStorage.removeItem('idCard');
  }

  delete(id: number) {
    const url = base_url + `/user/deleteMethodPaymentById/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.delete<Boolean>(endpoint,{ headers});
  }

  update(methodPayment:MethodPayment){
    const url = base_url + '/user/updateMethodPayment';
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.put<boolean>(endpoint, methodPayment,{headers });
  }


}


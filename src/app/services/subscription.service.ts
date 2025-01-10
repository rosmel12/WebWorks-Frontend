import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from '../model/subscription';
import {SubscriptionSummary} from "../modelComplement/subscriptionSummary";
import {tap} from "rxjs/operators";
import {Url} from "../model/url";
import {SubscriptionCheck} from "../modelComplement/subscriptioCheck";

const base_url = Url.urlBackend + '/webworks/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http:HttpClient,private Auth:AuthService) { }

  checkSubscription(id:number){
    const url= base_url + `/user/subscriptionActive/${id}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<SubscriptionCheck>(endpoint,{headers}).pipe(
      tap(response => {
        localStorage.setItem('check', response.valueOf().toString());
      }));
  }

  getCheckSubscription(): Boolean {
    const checkValue = localStorage.getItem('check');
    return checkValue === 'true'; // Convierte el string a booleano
  }

  addSubscription(subscription:Subscription){
    const url= base_url + `/user/addSubscription`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.post<boolean>(endpoint,subscription,{ headers });
  }

  getSubscriptions(idUser:number){
    const url= base_url + `/user/listSubscriptionsByUser/${idUser}`;
    const token = this.Auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const endpoint = `${url}`;
    return this.http.get<SubscriptionSummary[]>(endpoint,{ headers });
  }

  freMaxNumberRepositories(){
    return 3;
  }

  freeMaxNumberProjects(){
    return 2;
  }

}

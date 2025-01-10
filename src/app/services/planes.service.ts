import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import {Url} from "../model/url";

const base_url = Url.urlBackend + '/webworks/planes';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http: HttpClient) { }

  getPlanes()  {
    const endpoint = `${base_url}`;
    return this.http.get<Plan[]>(endpoint);
  }

  saveIdPlan(id:number){
   localStorage.setItem('id', id.toString());
  }
  savePricePlan(price:number){
    localStorage.setItem('price', price.toString());
  }
  getIdPlan(){
    return localStorage.getItem('id')!
  }
  getPricePlan() {
    return localStorage.getItem('price')!
  }

  deleteData() {
    localStorage.removeItem('id');
    localStorage.removeItem('price');
  }

}

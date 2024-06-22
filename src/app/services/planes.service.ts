import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Plan } from '../model/plan';
const base_url = 'http://localhost:8080/webworks/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http: HttpClient) { }

  getPlanes() :Observable<any[]> {
    const endpoint = `${base_url}`;
    return this.http.get<Plan[]>(endpoint);
  }
}

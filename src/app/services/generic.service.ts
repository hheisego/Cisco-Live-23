import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  readonly API_Url = 'https://te-health.dev:5007'

  constructor(private http: HttpClient) { }


  getReport(): Observable<any[]> {

    return this.http.get<any>(this.API_Url + '/reports/');

  }



}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    public http: HttpClient
  ) { }
  protected get Header() {
    return {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    };
  }
  
  get(url: string){
    return this.http.get(environment.urlBase + url);
  }

  post(url: string, payload: any){
    const params = {
      data:payload
    };
    return this.http.post(environment.urlBase + url, params,this.Header);
  }
}
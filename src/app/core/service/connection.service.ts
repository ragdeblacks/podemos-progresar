import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  headers = new HttpHeaders();
  constructor(
    public http: HttpClient
  ) { }
  protected get Header() {
    return {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  }
  
  get(url: string){
    return this.http.get(environment.urlBase + url);
  }

  post(url: string, payload: any){
    const params = {
      data:payload
    };
    this.headers.set('Accept', 'application/json; charset=UTF-8');
    this.headers.set('Content-Type', 'application/json' );
    return this.http.post(environment.urlBase + url, JSON.stringify(params),{headers:this.headers});
  }
}
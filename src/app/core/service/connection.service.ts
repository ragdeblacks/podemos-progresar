import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  // tslint:disable-next-line: typedef
  get(url: string){
    return this.http.get(environment.urlBase + url);
  }

  // tslint:disable-next-line: typedef
  post(url: string, payload: any){
    const params = {
      data: payload
    };
    this.headers.set('Accept', 'application/json; charset=UTF-8');
    this.headers.set('Content-Type', 'application/json' );
    return this.http.post(environment.urlBase + url, JSON.stringify(params), {headers: this.headers});
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpHandler} from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http:HttpClient;

  constructor(handler: HttpHandler) {
    this.http = new HttpClient(handler);
  }

  get(url: string, headers: HttpHeaders) {
    return this.http.get(url, { headers: headers });
  }

  post(url: string, data: any, headers: HttpHeaders) {
    return this.http.post(url, data, { headers: headers });
  }

  put(url: string, data: any, headers: HttpHeaders) {
    return this.http.put(url, data, { headers: headers });
  }
}

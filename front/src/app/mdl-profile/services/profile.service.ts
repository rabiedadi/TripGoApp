import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = 'http://51.91.79.72';
  constructor(private http: HttpClient) { }

  getEstablishments(){
    return this.http.get(this.url + ':3003/establishment');
  }

  sendVerificationEmail(): Observable<any> {
    return this.http.get<any>( this.url + ':3000/user/sendVerificationEmail');
  }

  VerifyEmail(token) {
    return this.http.post( this.url + ':3000/user/verifyEmail', {token});
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  completeBooking(email: string): Observable<any>{
    return this.http.post('http://51.91.79.72:3001/recommend/send', {email});
  }
}

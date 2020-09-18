import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  url = 'http://51.91.79.72';
  constructor(private http: HttpClient) { }


  getEstablishmentsDetails(id) {
    return this.http.get(this.url + `:3001/hotel/profil/${id}`);
  }
}

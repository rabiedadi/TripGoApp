import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IRecommendation {
  name: string;
  stars: number;
  city: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  url = 'http://51.91.79.72:3001/recommend/';
  constructor(private http: HttpClient) { }

  getRecommendations(): Observable<{}[]> {
    return this.http.get<{}[]>(this.url + 'get');
  }
}

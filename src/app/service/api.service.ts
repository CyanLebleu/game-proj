import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../model/series.model';
import { Token } from '../model/token.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://opentdb.com/api.php?amount=10&category=11&type=multiple&token='
  private API_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request'
  private SESSION_TOKEN = ''

  constructor(private http: HttpClient) { }

  getToken() {
    this.http.get<Token>(this.API_TOKEN_URL).subscribe((data) => this.SESSION_TOKEN = data.token);
  }

  getQuestions(): Observable<Series> {
    return this.http.get<Series>(this.API_URL)
  }

  getQuestionsWithTracking(): Observable<Series> {
    return this.http.get<Series>(this.API_URL + this.SESSION_TOKEN)
  }






}

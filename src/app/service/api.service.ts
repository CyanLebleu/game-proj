import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../model/series.model';
import { Token } from '../model/token.model';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category.model';
import { numberOfQuestions } from '../config/game.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SESSION_TOKEN = '&token=';

  constructor(private http: HttpClient) { }

  public getToken() {
    this.http.get<Token>(environment.tokenURL).subscribe((data) => this.SESSION_TOKEN += data.token);
  }

  public getQuestions(): Observable<Series> {
    return this.http.get<Series>(environment.baseURL + numberOfQuestions.default)
  }

  public getQuestionsWithTracking(): Observable<Series> {
    return this.http.get<Series>(environment.baseURL + numberOfQuestions.default + this.SESSION_TOKEN)
  }

  public getTriviaCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.categoryURL)
  }
  
}

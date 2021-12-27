import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TourPackage} from "../_models/tour-package";
import {PopularQuestion} from "../_models/popular-question";

@Injectable({
  providedIn: 'root'
})
export class PopularQuestionsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPopularQuestions(): Observable<PopularQuestion[]> {
    return this.http.get<PopularQuestion[]>(this.baseUrl + 'popularquestions');
  }
}

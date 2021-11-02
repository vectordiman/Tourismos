import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TourPackage } from '../_models/tour-package';

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTourPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.baseUrl + 'tourpackages');
  }

  getTourPackage(id: string): Observable<TourPackage> {
    return this.http.get<TourPackage>(this.baseUrl + 'tourpackages/' + id);
  }
}

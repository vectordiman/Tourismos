import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  createTourPackage(model: TourPackage) {
    return this.http.post<TourPackage>(this.baseUrl + 'tourpackages', model);
  }

  updateTourPackage(model: TourPackage): Observable<TourPackage> {
    return this.http.put<TourPackage>(this.baseUrl + 'tourpackages', model).pipe(
      map(() => {
        return model;
      })
    );
  }
}

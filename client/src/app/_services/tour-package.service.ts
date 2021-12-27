import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/photo';
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

  getHotTourPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.baseUrl + 'tourpackages/hot');
  }

  getTourPackage(id: string): Observable<TourPackage> {
    return this.http.get<TourPackage>(this.baseUrl + 'tourpackages/' + id);
  }

  getTourPhotos(tourId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.baseUrl + 'tourpackages/photos/' + tourId);
  }

  createTourPackage(model: TourPackage) {
    return this.http.post<TourPackage>(this.baseUrl + 'tourpackages', model);
  }

  updateTourPackage(model: TourPackage): Observable<TourPackage> {
    return this.http.put<TourPackage>(this.baseUrl + 'tourpackages', model).pipe(
      map((expert) => {
        return expert;
      })
    );
  }

  setMainPhoto(tourId: number, photoId: number) {
    let url: string = this.baseUrl + 'tourpackages/' + tourId + '/set-main-photo/' + photoId;
    return this.http.put(url, {});
  }

  deletePhoto(tourId: number, photoId: number) {
    let url: string = this.baseUrl + 'tourpackages/' + tourId + '/delete-photo/' + photoId;
    return this.http.delete(url);
  }
}

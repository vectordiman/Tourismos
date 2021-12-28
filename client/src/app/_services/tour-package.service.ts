import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/photo';
import { TourPackage } from '../_models/tour-package';
import {getPaginatedResult, getPaginationHeaders} from "./paginationHelpers";
import {TourParams} from "../_models/tour-params";

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  baseUrl = environment.apiUrl;
  tourParams!: TourParams;
  tourCache = new Map();

  constructor(private http: HttpClient) {
    this.tourParams = new TourParams();
  }

  resetTourParams() {
    this.tourParams = new TourParams();
    return this.tourParams;
  }

  getTourParams(): TourParams {
    return this.tourParams;
  }

  setTourParams(value: TourParams) {
    this.tourParams = value;
  }

  getTourPackages(tourParams: TourParams) {

    var response = this.tourCache.get(Object.values(tourParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(tourParams.pageNumber, tourParams.pageSize);

    params = params.append('start', tourParams.start.toString());
    params = params.append('end', tourParams.end.toString());
    params = params.append('orderBy', tourParams.orderBy);

    return getPaginatedResult<TourPackage[]>(this.baseUrl + 'tourpackages', params, this.http).pipe(map(response => {
      this.tourCache.set(Object.values(tourParams).join('-'), response);
      return response;
    }))

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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/photo';
import { Service } from '../_models/service';

@Injectable({
  providedIn: 'root'
})
export class TourServiceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createService(service: Service) {
    return this.http.post<Service>(this.baseUrl + 'services', service);
  }

  getServices() {
    return this.http.get<Service[]>(this.baseUrl + 'services');
  }

  getService(id: string) {
    return this.http.get<Service>(this.baseUrl + 'services/' + id);
  }

  getServicePhotos(id: string) {
    return this.http.get<Photo[]>(this.baseUrl + 'services/' + id + '/photos');
  }
}

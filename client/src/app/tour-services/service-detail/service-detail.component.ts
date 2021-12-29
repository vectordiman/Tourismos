import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { Service } from 'src/app/_models/service';
import { TourServiceService } from 'src/app/_services/tour-service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  service!: any;
  isLoaded: boolean = false;

  constructor(private tourService: TourServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadService();
  }

  loadService() {
    this.tourService.getService(this.route.snapshot.paramMap.get('id') || "").subscribe((service: Service) => {
      this.service = service;
      this.loadServicePhotos();
    });
  }

  loadServicePhotos() {
    this.tourService.getServicePhotos(this.route.snapshot.paramMap.get('id') || "").subscribe((photos: Photo[]) => {
      this.service.photos = photos;
      this.isLoaded = true;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/_models/service';
import { TourServiceService } from 'src/app/_services/tour-service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];

  constructor(private tourService: TourServiceService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.tourService.getServices().subscribe((services: Service[]) => {
      this.services = services;
    });
  }

}

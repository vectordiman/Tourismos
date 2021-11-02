import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourPackage } from 'src/app/_models/tour-package';
import { TourPackageService } from 'src/app/_services/tour-package.service';

@Component({
  selector: 'app-tour-package-detail',
  templateUrl: './tour-package-detail.component.html',
  styleUrls: ['./tour-package-detail.component.css']
})
export class TourPackageDetailComponent implements OnInit {
  package!: TourPackage;

  constructor(private tourPackageService: TourPackageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPackage();
  }

  loadPackage() {
    this.tourPackageService.getTourPackage(this.route.snapshot.paramMap.get('id') || "")
      .subscribe(tourPackage => {
        console.log(tourPackage);
        this.package = tourPackage;
      });
  }

}

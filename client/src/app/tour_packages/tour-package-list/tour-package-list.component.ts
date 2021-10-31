import { Component, OnInit } from '@angular/core';
import { TourPackage } from 'src/app/_models/tour-package';
import { TourPackageService } from 'src/app/_services/tour-package.service';

@Component({
  selector: 'app-tour-package-list',
  templateUrl: './tour-package-list.component.html',
  styleUrls: ['./tour-package-list.component.css']
})
export class TourPackageListComponent implements OnInit {
  packages: TourPackage[] = [];

  constructor(private tourPackageService: TourPackageService) { }

  ngOnInit(): void {
    this.getTourPackages();
  }

  getTourPackages() {
    this.tourPackageService.getTourPackages().subscribe(packages => {
      console.log(packages);
      this.packages = packages;
    });
  }

}

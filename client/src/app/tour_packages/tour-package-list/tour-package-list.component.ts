import { Component, OnInit } from '@angular/core';
import { TourPackage } from 'src/app/_models/tour-package';
import { TourPackageService } from 'src/app/_services/tour-package.service';
import {Pagination} from "../../_models/pagination";

@Component({
  selector: 'app-tour-package-list',
  templateUrl: './tour-package-list.component.html',
  styleUrls: ['./tour-package-list.component.css']
})
export class TourPackageListComponent implements OnInit {
  packages: TourPackage[] = [];
  pagination!: Pagination;
  pageNumber = 1;
  pageSize = 9;
  loading = false;

  constructor(private tourPackageService: TourPackageService) { }

  ngOnInit(): void {
    this.getTourPackages();
  }

  getTourPackages() {
    this.loading = true;
    this.tourPackageService.getTourPackages(this.pageNumber, this.pageSize).subscribe(response => {
      this.packages = response.result;
      this.pagination = response.pagination;
      console.log(response);
      this.loading = false;
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.getTourPackages();
    }
  }

}

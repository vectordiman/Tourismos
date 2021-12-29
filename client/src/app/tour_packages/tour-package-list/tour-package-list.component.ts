import { Component, OnInit } from '@angular/core';
import { TourPackage } from 'src/app/_models/tour-package';
import { TourPackageService } from 'src/app/_services/tour-package.service';
import {Pagination} from "../../_models/pagination";
import {TourParams} from "../../_models/tour-params";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tour-package-list',
  templateUrl: './tour-package-list.component.html',
  styleUrls: ['./tour-package-list.component.css']
})
export class TourPackageListComponent implements OnInit {
  packages: TourPackage[] = [];
  pagination!: Pagination;
  tourParams!: TourParams;
  loading = false;

  constructor(private tourPackageService: TourPackageService, private toastr: ToastrService) {
    this.tourParams = tourPackageService.getTourParams();
  }

  ngOnInit(): void {
    this.getTourPackages();
  }

  getTourPackages() {
    this.loading = true;
    this.tourPackageService.setTourParams(this.tourParams);
    this.tourPackageService.getTourPackages(this.tourParams).subscribe(response => {
      this.packages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
      console.log(response)
    }, error =>  {
      this.toastr.error('Bad request', '400')
    });
  }

  resetFilters() {
    this.tourParams = this.tourPackageService.resetTourParams();
    this.getTourPackages()
  }

  pageChanged(event: any) {
    if (this.tourParams.pageNumber !== event.page) {
      this.tourParams.pageNumber = event.page;
      this.getTourPackages();
    }
  }

}

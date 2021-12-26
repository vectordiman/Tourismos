import { Component, OnInit } from '@angular/core';
import {PopularQuestionsService} from "../_services/popular-questions.service";
import {PopularQuestion} from "../_models/popular-question";
import {TourPackageService} from "../_services/tour-package.service";
import {TourPackage} from "../_models/tour-package";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularQuestions: PopularQuestion[] = [];
  hotTourPackages: TourPackage[] = [];
  loading = false;

  constructor(private popularQuestionsService: PopularQuestionsService, private tourPackageService: TourPackageService) { }

  ngOnInit(): void {
    this.loadHotTourPackages()
    this.loadPopularQuestions()
  }

  loadPopularQuestions() {
    this.loading = true;
    this.popularQuestionsService.getPopularQuestions().subscribe(result => {
      this.popularQuestions = result
      this.loading = false;
    })
  }

  loadHotTourPackages() {
    this.tourPackageService.getHotTourPackages().subscribe(result => {
      this.hotTourPackages = result
    })
  }

  getPhotoUrl(photoUrl: string) {
    return 'url(' + photoUrl + ')'
  }
}

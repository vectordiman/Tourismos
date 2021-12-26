import { Component, OnInit } from '@angular/core';
import {PopularQuestionsService} from "../_services/popular-questions.service";
import {PopularQuestion} from "../_models/popular-question";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularQuestions: PopularQuestion[] = [];
  loading = false;

  constructor(private popularQuestionsService: PopularQuestionsService) { }

  ngOnInit(): void {
    this.loadPopularQuestions()
  }

  loadPopularQuestions() {
    this.loading = true;
    this.popularQuestionsService.getPopularQuestions().subscribe(result => {
      this.popularQuestions = result
      this.loading = false;
    })
  }
}

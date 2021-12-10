import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user";
import {TourPackage} from "../../_models/tour-package";
import {MemberService} from "../../_services/member.service";

@Component({
  selector: 'app-favorites-tours',
  templateUrl: './favorites-tours.component.html',
  styleUrls: ['./favorites-tours.component.css']
})
export class FavoritesToursComponent implements OnInit {
  tours!: TourPackage[];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours() {
    this.memberService.getTours().subscribe(result => {
      this.tours = result
    })
  }

  deleteTour(tourId: number) {
    this.memberService.deleteTour(tourId).subscribe(() => {
      this.loadTours();
    })
  }

  deleteAllTours() {
    this.memberService.deleteAllTours().subscribe(() => {
      this.loadTours();
    })
  }
}

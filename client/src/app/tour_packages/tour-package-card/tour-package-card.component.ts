import { Component, Input, OnInit } from '@angular/core';
import { TourPackage } from 'src/app/_models/tour-package';

@Component({
  selector: 'app-tour-package-card',
  templateUrl: './tour-package-card.component.html',
  styleUrls: ['./tour-package-card.component.css']
})
export class TourPackageCardComponent implements OnInit {
  @Input() package!: TourPackage;

  constructor() { }

  ngOnInit(): void {
  }

}

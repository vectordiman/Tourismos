import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/_models/service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {
  @Input() service!: Service;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/_models/service';
import { TourServiceService } from 'src/app/_services/tour-service.service';

@Component({
  selector: 'app-service-creation',
  templateUrl: './service-creation.component.html',
  styleUrls: ['./service-creation.component.css']
})
export class ServiceCreationComponent implements OnInit {
  serviceForm!: FormGroup;
  service!: Service;

  constructor(private tourService: TourServiceService, 
    private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.serviceForm = this.fb.group({
      "name": ["", [Validators.required]],
      "price": [0, [Validators.required]],
      "description": [""]
    });
  }

  ngOnInit(): void {
  }

  createService() {
    this.tourService.createService(this.serviceForm.value).subscribe((service: Service) => {
      this.router.navigateByUrl("/services/" + service.id);
    }, error => {
      this.toastr.error(error);
    });
  }

}

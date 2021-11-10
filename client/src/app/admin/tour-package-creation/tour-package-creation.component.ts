import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TourPackage } from 'src/app/_models/tour-package';
import { TourPackageService } from 'src/app/_services/tour-package.service';

@Component({
  selector: 'app-tour-package-creation',
  templateUrl: './tour-package-creation.component.html',
  styleUrls: ['./tour-package-creation.component.css']
})
export class TourPackageCreationComponent implements OnInit {
  packageCreationForm!: FormGroup;
  maxDate!: Date;
  validationErrors: string[] = [];

  constructor(private tourPackageService: TourPackageService,
    private toastr: ToastrService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(): void {
    this.packageCreationForm = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      start: ["", Validators.required],
      end: ["", Validators.required],
      country: ["", Validators.required],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value
        ? null : {isMatching: true}
    }
  }

  createPackage(){
    this.tourPackageService.createTourPackage(this.packageCreationForm.value).subscribe((tourPackage: TourPackage) => {
      this.router.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
    });
  }

}

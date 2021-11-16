import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TourPackage } from 'src/app/_models/tour-package';
import { TourPackageService } from 'src/app/_services/tour-package.service';

@Component({
  selector: 'app-tour-package-edit',
  templateUrl: './tour-package-edit.component.html',
  styleUrls: ['./tour-package-edit.component.css']
})
export class TourPackageEditComponent implements OnInit, OnChanges {
  @Input() tourPackage!: TourPackage;
  @Output() tourPackageChange = new EventEmitter<TourPackage>();
  editTourForm!: FormGroup;

  constructor(private tourPackageService: TourPackageService,
    private toastr: ToastrService, private fb: FormBuilder,
    private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.editTourForm = this.fb.group({
      id: [this.tourPackage.id],
      name: [this.tourPackage.name, Validators.required],
      price: [this.tourPackage.price, Validators.required],
      start: [this.tourPackage.start, Validators.required],
      end: [this.tourPackage.end, Validators.required],
      country: [this.tourPackage.country, Validators.required],
      description: [this.tourPackage.description],
    });
  }

  updatePackage() {
    this.tourPackageService.updateTourPackage(this.editTourForm.value).subscribe((updatedPackage: TourPackage) => {
      this.tourPackage = updatedPackage;
      this.tourPackageChange.emit(this.tourPackage);
    }); 
  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { Expert } from 'src/app/_models/expert';
import { TourPackage } from 'src/app/_models/tour-package';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { TourPackageService } from 'src/app/_services/tour-package.service';

@Component({
  selector: 'app-tour-package-edit',
  templateUrl: './tour-package-edit.component.html',
  styleUrls: ['./tour-package-edit.component.css']
})
export class TourPackageEditComponent implements OnInit, OnChanges {
  @Input() tourPackage!: TourPackage;
  @Output() tourPackageChange = new EventEmitter<TourPackage>();
  bsModalRef!: BsModalRef;
  editTourForm!: FormGroup;
  experts: Partial<Expert[]> = [];

  constructor(private tourPackageService: TourPackageService,
    private toastr: ToastrService, private fb: FormBuilder,
    private router: Router, private adminService: AdminService,
    private modalService: BsModalService) { }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.loadExperts();
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
      photoUrl: [this.tourPackage.photoUrl],
      expertName: [this.tourPackage.expert?.username],
      expert: [this.tourPackage.expert],
    });
  }

  updatePackage() {
    let expert = this.experts.find(exp => exp?.username == this.editTourForm.controls["expertName"].value);
    this.editTourForm.controls["expert"].setValue(expert);

    this.tourPackageService.updateTourPackage(this.editTourForm.value).subscribe(() => {
      this.toastr.success("Updated successfully");
      this.editTourForm.reset(this.tourPackage);
      this.editTourForm.controls["expertName"].setValue(this.tourPackage.expert.username);
    });
  }

  loadExperts() {
    this.adminService.getExperts().subscribe((experts: Partial<Expert[]>) => {
      this.experts = experts;
      console.log(this.experts);
    });
  }

  openExpertModal() {
    let expert = this.experts.find(exp => exp?.username == this.editTourForm.controls["expertName"].value);
    let user: Partial<User> = {
      username: expert!.username,
      photoUrl: expert!.photoUrl,
      name: expert!.name,
      lastName: expert!.lastName,
      role: 'Expert'
    };

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user
      }
    };
    this.bsModalRef = this.modalService.show(UserModalComponent, config);
  }

}

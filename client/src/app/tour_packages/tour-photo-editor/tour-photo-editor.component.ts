import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { TourPackage } from 'src/app/_models/tour-package';
import { User } from 'src/app/_models/user';
import { Photo } from 'src/app/_models/photo';
import { AccountService } from 'src/app/_services/account.service';
import { TourPackageService } from 'src/app/_services/tour-package.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-photo-editor',
  templateUrl: './tour-photo-editor.component.html',
  styleUrls: ['./tour-photo-editor.component.css']
})
export class TourPhotoEditorComponent implements OnInit {
  @Input() tour!: TourPackage;
  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user!: User;

  constructor(private accountService: AccountService,
    private tourPackageService: TourPackageService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.tourPackageService.setMainPhoto(this.tour.id, photo.id).subscribe(() => {
      this.tour.photoUrl = photo.url;
      this.tour.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = false;
      });
    });
  }

  deletePhoto(photo: Photo) {
    this.tourPackageService.deletePhoto(this.tour.id, photo.id).subscribe(() => {
      this.tour.photos = this.tour.photos.filter(x => x.id != photo.id);
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'tourpackages/add-photo/' + this.tour.id,
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.tour.photos.push(photo);
      }
    };
  }

}

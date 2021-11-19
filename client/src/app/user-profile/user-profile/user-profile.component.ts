import {Component, OnInit} from '@angular/core';
import {User} from "../../_models/user";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs/operators";
import {MemberService} from "../../_services/member.service";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {environment} from "../../../environments/environment";
import {Photo} from "../../_models/photo";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  uploader!: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user!: User;

  constructor(private route: ActivatedRoute, private accountService: AccountService, public memberService: MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event: any) {
    this.hasBaseDropzoneOver = event;
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {})
  }

  deletePhoto(photoId: number) {
    this.user.photoUrl = null!;
    this.user.photoId = null!;
    this.accountService.setCurrentUser(this.user);
    this.memberService.deletePhoto(photoId).subscribe(() => {})
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.user.photoUrl = photo.url;
        this.user.photoId = photo.id;
        this.accountService.setCurrentUser(this.user);

        this.setMainPhoto(photo);
      }
    }
  }

  edit() {
    this.memberService.changeEditUserMode();
  }
}

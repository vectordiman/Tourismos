import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Member} from "../../_models/member";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {environment} from "../../../environments/environment";
import {User} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {MemberService} from "../../_services/member.service";
import {take} from "rxjs/operators";
import {Photo} from "../../_models/photo";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;
  @Output() memberChange = new EventEmitter<Member>()
  uploader!: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user!: User;

  constructor(private accountService: AccountService, private memberService: MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event: any) {
    this.hasBaseDropzoneOver = event;
  }

  addMainPhoto(photoUrl: string) {
    this.uploader.uploadAll()
    this.user.photoUrl = photoUrl;
    this.accountService.setCurrentUser(this.user);
    this.member.photoUrl = photoUrl;
    this.memberChange.emit(this.member)
  }

  // deletePhoto(photoId: number) {
  //   this.memberService.deletePhoto(photoId).subscribe(() => {
  //     this.member.photos = this.member.photos.filter(x => x.id !== photoId);
  //   })
  // }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-main-photo',
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
        this.member.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user);
      }
    }
  }
}

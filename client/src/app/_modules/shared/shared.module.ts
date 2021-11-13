import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {TimeagoModule} from "ngx-timeago";
import {FileUploadModule} from "ng2-file-upload";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimeagoModule.forRoot(),
    FileUploadModule,
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    BsDatepickerModule,
    TimeagoModule,
    FileUploadModule
  ]
})
export class SharedModule { }

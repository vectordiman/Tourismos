import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TourPackage} from 'src/app/_models/tour-package';
import {TourPackageService} from 'src/app/_services/tour-package.service';
import {User} from "../../_models/user";
import {take} from "rxjs/operators";
import {AccountService} from "../../_services/account.service";
import {MessageService} from "../../_services/message.service";

@Component({
  selector: 'app-tour-package-detail',
  templateUrl: './tour-package-detail.component.html',
  styleUrls: ['./tour-package-detail.component.css']
})
export class TourPackageDetailComponent implements OnInit, OnDestroy {
  package!: TourPackage;
  user!: User;
  messageMode = false;

  constructor(private tourPackageService: TourPackageService, private route: ActivatedRoute, private accountService: AccountService, private messageService: MessageService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadPackage();
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  loadPackage() {
    this.tourPackageService.getTourPackage(this.route.snapshot.paramMap.get('id') || "")
      .subscribe(tourPackage => {
        console.log(tourPackage);
        this.package = tourPackage;
      });
  }

  messageModeChange() {
    if(!this.messageMode) {
      this.messageService.createHubConnection(this.user, this.package.expert.username);
    }
    else {
      this.messageService.stopHubConnection();
    }
    this.messageMode = !this.messageMode;
  }

}

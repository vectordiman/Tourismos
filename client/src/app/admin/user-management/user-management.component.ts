import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]> = [];
  bsModalRef!: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    });
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any) => {
      const rolesToUpdate = {
        roles: [...values.filter((el: any) => el.checked === true).map((el: any) => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRole(user.username, rolesToUpdate.roles[0])
          .subscribe(() => {
            user.role = rolesToUpdate.roles[0];
          });
      }
    });
  }

  private getRolesArray(user: User) {
    const roles: string[] = [];
    const userRole = user.role;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Expert', value: 'Expert'},
      {name: 'Client', value: 'Client'},
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      if (role.name === userRole) {
        isMatch = true;
        role.checked = true;
        roles.push(role);
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  } 
}

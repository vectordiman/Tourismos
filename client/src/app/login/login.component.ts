import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  loginForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    })
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
    })
  }
}

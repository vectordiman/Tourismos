import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['',Validators.required],
      name: ['',Validators.required],
      lastname: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      // @ts-ignore
      return control?.value !== control?.parent?.controls[matchTo].value ? {isMatching: true} : null;
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authenticationService';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  public loginInvalid = false;
  public formSubmitAttempt = false;

  invalidLogin: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): any {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        let user = new User(username, password);

        this.authenticationService.login(user).subscribe(response => {
          const token = response.Data;
          localStorage.setItem("userToken", token);
          this.invalidLogin = false;
          this.router.navigate(["/account-list"]);
        }, err => {
          this.invalidLogin = true;
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

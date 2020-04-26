import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  changePassForm: FormGroup;

  loading: boolean;
  signinUser: boolean;

  authUser: any;

  constructor(private fb: FormBuilder, private router: Router, public snackBar: MatSnackBar) {
    this.signinForm = fb.group({
      'username': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      'password': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]]
    });

    this.changePassForm = fb.group({
      'password': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]]
    });
  }

  ngOnInit() {
    this.signinUser = true;
  }

  signin(): void {
    if (this.signinForm.valid) {
      this.loading = true;
      const username = this.signinForm.value.username;
      const password = this.signinForm.value.password;
      Auth.signIn(username, password)
      .then(user => {
        this.loading = false;
        if (user['challengeName'] == 'NEW_PASSWORD_REQUIRED') {
          this.signinUser = false;
          this.authUser = user;
          this.snackBar.open('Password reset required', '', {
            duration: 3000
          });
        } else {
          this.router.navigateByUrl('/management');
        }

      })
      .catch(err => console.log(err));
    }
  }

  changePass(): void {
    const requiredAttributes = {};
    Auth.completeNewPassword(this.authUser, this.changePassForm.value.password, requiredAttributes)
    .then(res => {
      this.signinUser = true;
      this.snackBar.open('Password changed, please login', '', {
        duration: 3000
      });
    });
  }

}

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  serverUrl = environment.serverUrl;
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });
  registered: number;
  constructor(
    private http: HttpClient,
    private route: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}
  onFormSubmit(): void {
    if (this.loginForm.valid) {
      const userData = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
      };
      this.http.post(this.serverUrl + '/users/login', userData).subscribe(
        (res: any) => {
          this.registered = res.registered;
          if (res['token']) {
            localStorage.setItem('token', res['token']); //token here is stored in a local storage
            localStorage.setItem('user_id', res['id']); //token here is stored in a local storage
            localStorage.setItem('igdb_id', res['igdb_id']); //token here is stored in a local storage
            localStorage.setItem('igdb_token', res['igdb_token']); //token here is stored in a local storage

            return this.route
              .navigate(['/backlog'])
              .then((navigated: boolean) => {
                if (navigated) {
                  this.snackBarService.openSnackBar(
                    'Logged in successfully!.',
                    'Close',
                    4000
                  );
                }
              });
          }if(this.registered === 0){
            this.snackBarService.openSnackBar(
              'User not registered, please sign up.',
              'Close',
              4000
            );
          }
          return null;
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.snackBarService.openSnackBar(
        'Fields cannot be empty!.',
        'Close',
        4000
      );
    }
  }
}

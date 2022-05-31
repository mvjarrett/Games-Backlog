import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  serverUrl = environment.serverUrl
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {}
  onFormSubmit(): void {
    const userData = {
      username: this.signupForm.controls['username'].value,
      password: this.signupForm.controls['password'].value,
    };
    this.http
      .post(this.serverUrl + 'users/register', userData)
      .subscribe((newUser: any) => {
        if (newUser.exist) {
          console.log('toast: ', newUser.message);
        } else {
          this.route.navigate(['/games']);
        }
      });
  }

  // onSubmit(): Observable <{}> {
  //   let userData = {
  //     username: this.signupForm.controls['username'].value,
  //     password: this.signupForm.controls['password'].value
  //   };
  //   return this.http.post<{}>('http://localhost:8080/users/register',  {observe: 'response'}, userData).subscribe(res => {
  //     console.log(res)
  //   });
  // }
}

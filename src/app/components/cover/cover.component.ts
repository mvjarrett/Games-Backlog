import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { SnackBarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css'],
})
export class CoverComponent implements OnInit {
  user!: SocialUser;
  loggedIn!: boolean;
  GoogleLoginProvider = GoogleLoginProvider;
  serverUrl = environment.serverUrl;
  registered: number;

  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private route: Router,
    private snackBarService: SnackBarService,
  ) {}


  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null; 
      if(user){
        this.handleGsi()
      }
    });
  }
  
  handleGsi() {

    if (this.user) {
      const userData = {
        username: this.user.email,
        gjwt: this.user.idToken,
        password: this.user.id
      };
      this.http.post(this.serverUrl + '/users/gsi', userData).subscribe(
        (res: any) => {
          this.registered = res.registered;
          if (res['token']) {
            localStorage.setItem('token', res['token']); //token here is stored in a local storage
            localStorage.setItem('user_id', res['id']); //token here is stored in a local storage
            localStorage.setItem('igdb_id', res['igdb_id']); //token here is stored in a local storage
            localStorage.setItem('igdb_token', res['igdb_token']); //token here is stored in a local storage
            console.log('res: ', res);

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
        console.log(err);
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

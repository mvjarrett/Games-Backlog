import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { SnackBarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css'],
})
export class CoverComponent implements OnInit {
  // user!: SocialUser;
  loggedIn!: boolean;
  GoogleLoginProvider = GoogleLoginProvider;
  serverUrl = environment.serverUrl;
  registered: number;

  constructor(
    private http: HttpClient,
    private route: Router,
    private snackBarService: SnackBarService,
  ) {}


  ngOnInit(): void {

  }
}

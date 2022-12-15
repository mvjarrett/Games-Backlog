import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import genre from 'src/app/models/genre';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import platform from 'src/app/models/platform';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchTerm: string;
  genres: genre[];
  platforms: platform[];
  searchForm = new UntypedFormGroup({
    search: new UntypedFormControl('', Validators.required),
  });
  glist: any[];
  
  
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token',
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.navbarService.getGenres().subscribe((res: genre[]) => (this.genres = res));
    this.navbarService.getPlatforms().subscribe((res: platform[]) => (this.platforms = res));
  }
  onSubmit(): void {
    this.searchTerm = this.searchForm.controls['search'].value;

    this.router
      .navigateByUrl('/games', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/games/search'], {
          queryParams: { term: this.searchTerm },
        });
      });
  }

 

  

  logout() {
    localStorage.clear();
    this.authService.signOut();
    this.router.navigate(['']);
  }
}

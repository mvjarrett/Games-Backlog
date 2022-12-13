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
  glist: any[]
  genreUrl = "externalgames/genres"
  platformUrl = "externalgames/platforms"
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token',
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
this.getGenres().subscribe((res: genre[]) => this.genres = res)
this.getPlatforms().subscribe((res: platform[]) => this.platforms = res)


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


  getGenres(): Observable<genre[]>{
    let genreBody = 'fields name; limit 200;'
  return this.http.post<genre[]>(this.genreUrl, genreBody, {
    headers: this.headers
     
    }).pipe(map((response:genre[]) => response as genre[]));
  }

  getPlatforms(): Observable<platform[]>{
    let platformBody = 'fields name; limit 200; sort id :asc;'
  return this.http.post<platform[]>(this.platformUrl, platformBody, {
    headers: this.headers
     
    }).pipe(map((response:genre[]) => response as genre[]));
  }


  logout() {
    localStorage.clear();
    this.authService.signOut();
    this.router.navigate(['']);
  }

  
}



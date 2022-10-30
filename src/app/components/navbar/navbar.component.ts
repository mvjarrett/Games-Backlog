import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchTerm: string;
  searchForm = new UntypedFormGroup({
    search: new UntypedFormControl('', Validators.required),
  });
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
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
    this.router.navigate(['/'])
  }

}

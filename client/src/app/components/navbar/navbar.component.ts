import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Client-id': '7v9kmaf3qgxdnfne5cdxb6ah64fbco',
    Authorization: 'Bearer lwvrxsjfyx0auv0yvs9hgm81hbkvxl',
  };
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {
    this.searchTerm = this.searchForm.controls['search'].value;

    
    this.router.navigate(['/games/search'],
     {queryParams: { term: this.searchTerm }});

    //     let searchString ='fields name; limit 200; ' + 'search ' + '"' + this.searchForm.controls['search'].value + '";';
    //     console.log(searchString)
    //     this.http.post('/externalgames/search', searchString, {
    //       headers: this.headers}).subscribe((data: any) => {
    //       console.log(data)
    //       // this.dialogRef.close(newGame);
    //     });
  }
}

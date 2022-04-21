import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { igObject } from './models/igGame';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenRng {
  rngUrl = 'https://api.igdb.com/v4/games';

  constructor(private http: HttpClient) {}

  GetTen(): Observable<igObject[]> {
    return this.http.get<igObject[]>(this.rngUrl);

  }
}



  // {
//                 headers: {'Access-Control-Allow-Origin': '*', 'Client-id': '7v9kmaf3qgxdnfne5cdxb6ah64fbco', 'Authorization': 'Bearer lwvrxsjfyx0auv0yvs9hgm81hbkvxl'}
//             }
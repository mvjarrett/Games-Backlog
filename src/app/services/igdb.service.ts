import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { igGame } from '../models/igGame';


@Injectable({
  providedIn: 'root',
})
export class TenRng {
  rngUrl = 'https://api.igdb.com/v4/games';

  constructor(private http: HttpClient) {}

  GetTen(): Observable<igGame[]> {
    return this.http.get<igGame[]>(this.rngUrl);

  }
}



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { igGame } from '../models/igGame';

@Injectable({
  providedIn: 'root',
})
export class GameDetailsService {
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Client-id': '7v9kmaf3qgxdnfne5cdxb6ah64fbco',
    Authorization: 'Bearer lwvrxsjfyx0auv0yvs9hgm81hbkvxl',
  };
  
 

  constructor(private http: HttpClient) {}

  getDetails(id: string): Observable<igGame[]> {
    let body =
    `fields id, name, cover.url, first_release_date, summary, genres.name, platforms.name, rating, screenshots.url, url; where id = ${id};`
    return this.http.post<igGame[]>('externalgames/games', body, {
      headers: this.headers,
    });
  }

  
}


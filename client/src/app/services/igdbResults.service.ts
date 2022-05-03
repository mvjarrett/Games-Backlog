import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { igGame } from '../models/igGame';

@Injectable({
  providedIn: 'root',
})
export class IgdbResultsService {
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Client-id': '7v9kmaf3qgxdnfne5cdxb6ah64fbco',
    Authorization: 'Bearer lwvrxsjfyx0auv0yvs9hgm81hbkvxl',
  };
  body =
    'fields name, summary, cover.url; where rating >90; where total_rating_count >900; limit 50;';

  constructor(private http: HttpClient) {}

  gamesRng(): Observable<igGame[]> {
    return this.http.post<igGame[]>('externalgames/games', this.body, {
      headers: this.headers,
    });
  }
}


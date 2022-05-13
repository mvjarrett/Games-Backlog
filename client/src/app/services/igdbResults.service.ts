import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { igGame } from '../models/igGame';
import { IgdbResultsComponent } from '../components/igdb-results/igdb-results.component';


@Injectable({
  providedIn: 'root',
})
export class IgdbResultsService {
  offset = 50;
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Client-id': '7v9kmaf3qgxdnfne5cdxb6ah64fbco',
    Authorization: 'Bearer lwvrxsjfyx0auv0yvs9hgm81hbkvxl',
  };
  body =
    'fields name, cover.url; where rating >90; where total_rating_count >900; limit 50;';

  infiniteBody =
    `fields name, cover.url; where rating >90; where total_rating_count >350; limit 50; offset ${this.offset};`;
  constructor(private http: HttpClient) {}

  topGames(): Observable<igGame[]> {
    return this.http.post<igGame[]>('externalgames/games', this.body, {
      headers: this.headers,
    });
  }
  infiniteGames(): Observable<igGame[]> {
        this.offset+50;
    return this.http.post<igGame[]>('externalgames/games', this.infiniteBody, {
      headers: this.headers,
    });

  }
}

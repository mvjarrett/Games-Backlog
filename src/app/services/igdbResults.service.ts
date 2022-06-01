import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  };
  offset = 50;
  topBody =
    'fields name, cover.url; limit 50; where rating >85 & aggregated_rating != null & rating != null; sort total_rating desc; ';

  constructor(private http: HttpClient) {}

  topGames(): Observable<igGame[]> {
    return this.http.post<igGame[]>('externalgames/games', this.topBody, {
      headers: this.headers,
    });
  }
  infiniteGames(): Observable<igGame[]> {
    let infiniteBody =
      'fields name, cover.url; limit 50; where rating != null & category = 0; sort total_rating desc; offset ' +
      this.offset +
      ';';
    this.offset += 50;
    console.log('offset is: ', this.offset);
    console.log(infiniteBody);
    return this.http.post<igGame[]>('externalgames/games', infiniteBody, {
      headers: this.headers,
    });
  }

  searchGames(term: string | null): Observable<igGame[]> {
    let searchString =
      'fields name, cover.url; limit 200; search ' + '"' + term + '";';
    return this.http.post<igGame[]>('/externalgames/games', searchString, {
      headers: this.headers,
    });
  }
  searchPlatforms(platformId: number): Observable<igGame[]> {
    let filterString =
      'fields name, cover.url; limit 200; where category = 0 & release_dates.platform = ' + platformId + ' & aggregated_rating != null & rating != null; sort total_rating desc;'
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: this.headers,
    });
  }
  searchGenres(genreId: number): Observable<igGame[]> {
    let filterString =
      'fields name, cover.url; limit 200; where category = 0 & genres = ' + genreId + ' & aggregated_rating != null & rating != null; sort total_rating desc;'
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: this.headers,
    });
  }
}

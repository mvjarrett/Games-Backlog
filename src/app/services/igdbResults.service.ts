import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { igGame } from '../models/igGame';


// =========== Below is a list of strings I moved out of the functions below to make them more human-readable

const searchStrings = {
  topBody:
    'fields name, cover.url; limit 50; where rating >80 & aggregated_rating != null & rating != null; sort total_rating desc; ',
  platformString1:
    'fields name, cover.url; limit 50; where category = 0 & release_dates.platform = ',
  platformString2: ' & rating != null; sort total_rating desc;',
  genreString1:
    'fields name, cover.url; limit 50; where category = 0 & genres = ',
  genreString2: ' & rating != null; sort total_rating desc;',
  searchString: 'fields name, cover.url; limit 200; search ',
};



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
  body: string;

  constructor(private http: HttpClient) {}

  topGames(): Observable<igGame[]> {
    this.body = searchStrings.topBody
    return this.http.post<igGame[]>('/externalgames/games', searchStrings.topBody, {
      headers: this.headers,
    });
  }
  infiniteGames(): Observable<igGame[]> {
    let infiniteBody = this.body + ' offset ' + this.offset + ';';
    this.offset += 50;
    console.log('offset is: ', this.offset);
    console.log(infiniteBody);
    return this.http.post<igGame[]>('/externalgames/games', infiniteBody, {
      headers: this.headers,
    });
  }

  searchGames(term: string | null): Observable<igGame[]> {
    let filterString =
      searchStrings.searchString + '"' + term + '";';
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: this.headers,
    });
  }
  searchPlatforms(platformId: number): Observable<igGame[]> {
    let filterString = searchStrings.platformString1 + platformId + searchStrings.platformString2;
    this.body = filterString;
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: this.headers,
    });
  }
  searchGenres(genreId: number): Observable<igGame[]> {
    let filterString = searchStrings.genreString1 + genreId + searchStrings.genreString2;
    this.body = filterString;
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: this.headers,
    });
  }
}

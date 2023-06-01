import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { igGame } from '../models/igGame';
import { environment } from 'src/environments/environment';


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

//list the top rated games for easy backlog adding

  topGames(): Observable<igGame[]> {
    this.body = searchStrings.topBody
    return this.http.post<igGame[]>('/externalgames/games', searchStrings.topBody, {
      headers: environment.headers,
    });
  }

//infinite scrolling function 

  infiniteGames(): Observable<igGame[]> {
    let infiniteBody = this.body + ' offset ' + this.offset + ';';
    this.offset += 50;
    return this.http.post<igGame[]>('/externalgames/games', infiniteBody, {
      headers: environment.headers,
    });
  }

//search function by game

  searchGames(term: string | null): Observable<igGame[]> {
    let filterString =
      searchStrings.searchString + '"' + term + '";';
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: environment.headers,
    });
  }

//search function by platform

  searchPlatforms(platformId: number): Observable<igGame[]> {
    let filterString = searchStrings.platformString1 + platformId + searchStrings.platformString2;
    this.body = filterString;
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: environment.headers,
    });
  }

  //search function by genre

  searchGenres(genreId: number): Observable<igGame[]> {
    let filterString = searchStrings.genreString1 + genreId + searchStrings.genreString2;
    this.body = filterString;
    return this.http.post<igGame[]>('/externalgames/games', filterString, {
      headers: environment.headers,
    });
  }
}

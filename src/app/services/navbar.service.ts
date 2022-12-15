import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import genre from '../models/genre';
import platform from '../models/platform';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  genreUrl = 'externalgames/genres';
  platformUrl = 'externalgames/platforms';
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };
  constructor(private http: HttpClient) {}

  getGenres(): Observable<genre[]> {
    let genreBody = 'fields name; limit 200;';
    return this.http
      .post<genre[]>(this.genreUrl, genreBody, {
        headers: environment.headers,
      })
      .pipe(map((response: genre[]) => response as genre[]));
  }

  getPlatforms(): Observable<platform[]> {
    let platformBody = 'fields name; limit 200; sort id :asc;';
    return this.http
      .post<platform[]>(this.platformUrl, platformBody, {
        headers: environment.headers,
      })
      .pipe(map((response: genre[]) => response as genre[]));
  }

}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { igGame } from '../models/igGame';
import { gameObject } from '../models/gameobject';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class GameDetailsService {
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'user_id': '1337',
    'Client-id': '7v9kmaf3qgxdnfne5cdxb6ah64fbco',
    Authorization: 'Bearer lwvrxsjfyx0auv0yvs9hgm81hbkvxl',
  };
  serverUrl = environment.serverUrl
  logUrl = this.serverUrl +  "/backlog"
  gameLogUrl = this.serverUrl +  '/backlog/game'

  constructor(private http: HttpClient) {}

  getDetails(id: number): Observable<igGame[]> {
    let body =
    `fields id, name, cover.url, first_release_date, summary, genres.name, platforms.name, rating, screenshots.url, url; where id = ${id};`
    return this.http.post<igGame[]>('externalgames/games', body, {
      headers: this.headers
    });
   
  }

  getBacklog(id: number): Observable<gameObject[]> {
    return this.http.get<gameObject[]>(this.serverUrl +'/backlog/game/' + id)
  }
  
}


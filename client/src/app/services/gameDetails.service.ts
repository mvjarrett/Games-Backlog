import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { igGame } from '../models/igGame';
import { gameObject } from '../models/gameobject';


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

  logUrl = "http://localhost:8080/backlog"
  gameLogUrl = 'http://localhost:8080/backlog/game'

  constructor(private http: HttpClient) {}

  getDetails(id: string): Observable<igGame[]> {
    let body =
    `fields id, name, cover.url, first_release_date, summary, genres.name, platforms.name, rating, screenshots.url, url; where id = ${id};`
    return this.http.post<igGame[]>('externalgames/games', body, {
      headers: this.headers
    });
   
  }

  getBacklog(id: string): Observable<gameObject[]> {
    return this.http.get<gameObject[]>('http://localhost:8080/backlog/game/' + id)
  }
  
}


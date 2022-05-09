import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { gameObject } from '../models/gameobject';
import { igGame } from '../models/igGame';

@Injectable({
    providedIn: 'root'
  })

  export class GameService {
      logUrl = "http://localhost:8080/backlog"
      apiUrl = "externalgames/games"
      headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Client-id': '7v9kmaf3qgxdnfne5cdxb6ah64fbco',
        Authorization: 'Bearer lwvrxsjfyx0auv0yvs9hgm81hbkvxl',
      };
      id = this.GetGames(); logItems: any
     
    
      constructor(private http: HttpClient) { }

      GetGames(): Observable<gameObject[]> {
          return this.http.get<gameObject[]>(this.logUrl)
     
      }
      backlogInfo(backlogIds: number[]): Observable<igGame>{
        let logBody = 'fields id, name, cover.url; where id = (' + backlogIds.join() + ');'
          return this.http.post<igGame>(this.apiUrl, logBody, {
            headers: this.headers})
      }

  }


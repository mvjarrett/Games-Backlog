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
    //   id = igGame.id
      logBody = 'fields id, cover.url;'
    
      constructor(private http: HttpClient) { }

      GetGames(): Observable<gameObject[]> {
          return this.http.get<gameObject[]>(this.logUrl)
      }
      backlogInfo(): Observable<[]>{
          return this.http.post<[]>(this.apiUrl, this.logBody)
      }

  }


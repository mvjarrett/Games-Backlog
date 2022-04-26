import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { gameObject } from '../models/gameobject';

@Injectable({
    providedIn: 'root'
  })

  export class GameService {
      apiUrl = "http://localhost:8080/backlog"

      constructor(private http: HttpClient) { }

      GetGames(): Observable<gameObject[]> {
          return this.http.get<gameObject[]>(this.apiUrl)
      }
  }


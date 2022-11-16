import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gameObject } from '../models/gameobject';
import { igGame } from '../models/igGame';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class GameService {
    serverUrl = environment.serverUrl
    logUrl = this.serverUrl + "/backlog"
      
      apiUrl = "externalgames/games"
      headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      };

     
    
      constructor(private http: HttpClient) { }

      GetGames(): Observable<gameObject[]> {

        //change to this.http.post
          return this.http.get<gameObject[]>(this.logUrl)
          
     
      }
      backlogInfo(backlogIds: number[]): Observable<igGame[]>{
        let logBody = 'fields id, name, cover.url; limit 500; where id = (' + backlogIds.join() + ');'
          return this.http.post<igGame[]>(this.apiUrl, logBody, {
            headers: this.headers})
      }

  }


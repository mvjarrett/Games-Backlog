import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  
    export class BacklogService {
      serverUrl = environment.serverUrl
        baseUrl = this.serverUrl + "/backlog"
        putUrl = this.serverUrl + "/backlog/game/:id"
    }


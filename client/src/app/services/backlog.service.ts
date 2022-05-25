import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
  
    export class BacklogService {
        baseUrl = "http://localhost:8080/backlog"
        putUrl = "http://localhost:8080/backlog/game/:id"
    }


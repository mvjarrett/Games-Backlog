import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gameObject } from '../models/gameobject';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  
    export class BacklogService {
        baseUrl = "http://localhost:8080/backlog"
        putUrl = "http://localhost:8080/backlog/game/:id"
    }


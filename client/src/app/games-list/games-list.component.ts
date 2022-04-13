import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GameService } from '../games.service';
import { gameObject } from '../models/gameobject';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  dataSource = new MatTableDataSource<gameObject>();
  columnsToDisplay:string[] = ['title_name', 'sys', 'genre'];

  constructor(private gameService: GameService) {
    
  }

  ngOnInit(): void {
    this.gameService.GetGames().subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<gameObject>(data);
        console.log(this.dataSource);
      }
    })
  }

}

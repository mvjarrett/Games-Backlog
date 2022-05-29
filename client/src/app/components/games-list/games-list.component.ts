import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { MatDialog } from '@angular/material/dialog';
import { igGame } from 'src/app/models/igGame';
import { gameObject } from 'src/app/models/gameobject';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  logItems: igGame[] = [];
backlogItems = false;
  constructor(private gameService: GameService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('prebacklog = ', this.backlogItems)
    this.gameService.GetGames().subscribe((data) => {
      if (data) { 
        console.log('backlog = ', this.backlogItems)

        const backlogIds = data.map((x) => x.id);
        this.gameService.backlogInfo(backlogIds).subscribe((info) => {
          if (info) {
            this.logItems = info;
            this.backlogItems = true;
          }
        });
      }
    });
    console.log(localStorage)
  }
}

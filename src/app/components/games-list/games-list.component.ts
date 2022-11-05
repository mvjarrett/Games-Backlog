import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { MatDialog } from '@angular/material/dialog';
import { igGame } from 'src/app/models/igGame';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  logItems: igGame[] = [];
backlogItems = false;
  constructor(private gameService: GameService, public dialog: MatDialog) {}


  buttonCheck(category: number){
    console.log(category)
  }
  ngOnInit(): void {
    this.gameService.GetGames().subscribe((data) => {
      if (data.length > 0) { 
        const backlogIds = data.map((x) => x.id);
        this.gameService.backlogInfo(backlogIds).subscribe((info) => {
          if (info) {
            this.logItems = info;
            this.backlogItems = true;
            console.log(data)
          }
        });
      }
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { MatDialog } from '@angular/material/dialog';
import { igGame } from 'src/app/models/igGame';
import { FormControl } from '@angular/forms';
import { gameObject } from 'src/app/models/gameobject';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  tabs = ['Wishlist', 'Playing', 'Played'];
  selected = new FormControl(0);

  logGames: gameObject[];
  wish: igGame[];
  playing: igGame[];
  played: igGame[];
  backlogItems?: boolean;

  constructor(private gameService: GameService, public dialog: MatDialog) {}




  ngOnInit(): void {
    this.gameService.GetGames().subscribe((data) => {
      if (data.length > 0) {
        this.backlogItems = true;
        this.logGames = data
        this.logSorting()
      } else {this.backlogItems = false}
    });
  }


  

  logSorting() {
    var logs = this.groupBy(this.logGames, 'category');
        this.wish = logs[1];
        this.playing = logs[2];
        this.played = logs[3];

        const wishIds = logs[1].map((x: { id: any }) => x.id);
        this.gameService.backlogInfo(wishIds).subscribe((wishlist) => {
          if (wishlist) {
            this.wish = wishlist;
          }
        });

        const playingIds = logs[2].map((x: { id: any }) => x.id);
        this.gameService.backlogInfo(playingIds).subscribe((playinglist) => {
          if (playinglist) {
            this.playing = playinglist;
          }
        });

        const playedIds = logs[3].map((x: { id: any }) => x.id);
        this.gameService.backlogInfo(playedIds).subscribe((playedlist) => {
          if (playedlist) {
            this.played = playedlist;
          }
        });
  }

  groupBy(arr: any[], property: any) {
    return arr.reduce(function (data, x) {
      if (!data[x[property]]) {
        data[x[property]] = [];
      }
      data[x[property]].push(x);
      return data;
    }, {});
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { MatDialog } from '@angular/material/dialog';
import { igGame } from 'src/app/models/igGame';
import { FormControl } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { gameObject } from 'src/app/models/gameobject';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  tabs = ['Wishlist', 'Playing', 'Played'];
  selected = new FormControl(0);
  logItems: igGame[] = [];
  logGames: gameObject[];
  wish: igGame[];
  playing: igGame[];
  played: igGame[];
  backlogItems = false;

  constructor(private gameService: GameService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.gameService.GetGames().subscribe((data) => {
      if (data.length > 0) {
        this.backlogItems = true;
        var logs = this.groupBy(data, 'category');
        this.wish = logs[1];
        this.playing = logs[2];
        this.played = logs[3];

        const wishIds = logs[1].map((x: { id: any }) => x.id);
        this.gameService.backlogInfo(wishIds).subscribe((wishlist) => {
          if (wishlist) {
            this.wish = wishlist;
            console.log('wishlist = ', wishlist);
          }
        });

        const playingIds = logs[2].map((x: { id: any }) => x.id);
        this.gameService.backlogInfo(playingIds).subscribe((playinglist) => {
          if (playinglist) {
            this.playing = playinglist;
            console.log('playinglist = ', playinglist);
          }
        });

        const playedIds = logs[3].map((x: { id: any }) => x.id);
        this.gameService.backlogInfo(playedIds).subscribe((playedlist) => {
          if (playedlist) {
            this.played = playedlist;
            console.log('playedlist = ', playedlist);
          }
        });
      }
    });
  }

  groupBy(arr: any[], property: any) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  // isCategoryOne() {
  // for (let i = 0; i < this.logGames.length; i++){
  // console.log(this.logGames.map(({category}) =>  === 1))
  // }
  // return this.logGames.map(({category}) => category === 1)
  // console.log(this.logGames)
  // }
}

//logitems --- the actual data from IGDB. it only sends back what is needed because the ID of each game is being passed into the backloginfo function

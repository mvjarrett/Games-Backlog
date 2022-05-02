import { Component, Input, OnInit } from '@angular/core';
import { TenGamesService } from '../../services/tenGamesTest.service';
import { igGame } from '../../models/igGame';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-igdb-game-card',
  templateUrl: './igdb-game-card.component.html',
  styleUrls: ['./igdb-game-card.component.css'],
})
export class IgdbGameCardComponent implements OnInit {

  @Input() game: igGame;
  showName: boolean;
  constructor(private tenGames: TenGamesService) {
    this.showName = false;
  }

  igGames: igGame[] = [];
  ngOnInit(): void {}
  getGameCover(game: igGame): string {
    if (game.cover != null) {
      return game.cover.url.replace('t_thumb', 't_cover_big');
    } else {
      return '';
    }
  }

  // toDetails():void {

  // }
}

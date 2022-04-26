import { Component, Input, OnInit } from '@angular/core';
import { TenGamesService } from '../../services/tenGamesTest.service';
import { igGame } from '../../models/igGame';

@Component({
  selector: 'app-igdb-game-card',
  templateUrl: './igdb-game-card.component.html',
  styleUrls: ['./igdb-game-card.component.css']
})
export class IgdbGameCardComponent implements OnInit {
@Input() game: igGame;
  constructor(private tenGames: TenGamesService) {}

  igGames: igGame[] = [];
  ngOnInit(): void {
    this.tenGames.gamesRng().subscribe((data) => {
      if (data) {
        this.igGames = data;
      }
    });
  }
  getGameCover(game: igGame): string {
    if (game.cover != null) {
      return game.cover.url.replace('t_thumb', 't_cover_big');
    } else {
      return '';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TenGamesService } from '../../services/tenGamesTest.service';
import { igGame } from '../../models/igGame';

@Component({
  selector: 'app-ten-games',
  templateUrl: './ten-games.component.html',
  styleUrls: ['./ten-games.component.css'],
})
export class TenGamesComponent implements OnInit {
  constructor(private tenGames: TenGamesService) {}
  igGames: igGame[] = [];
  ngOnInit(): void {
    this.tenGames.gamesRng().subscribe((data) => {
      if (data) {
        this.igGames = data;
      }
    });
  }

  // getGameCover(game: igGame): string {
  //   if (game.cover != null) {
  //     return game.cover.url.replace('t_thumb', 't_cover_big');
  //   } else {
  //     return '';
  //   }
  // }
}

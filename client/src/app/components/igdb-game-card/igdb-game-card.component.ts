import { Component, Input, OnInit } from '@angular/core';
import { IgdbResultsService } from '../../services/igdbResults.service';
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
  constructor(private igdbResults: IgdbResultsService) {
    this.showName = false;
  }
  // cover = document.getElementsByClassName(this.cover)
  igGames: igGame[] = [];
  ngOnInit(): void {
    // this.game.cover?.addEventListener('load', function() {
    //   console.log('My width is: ', this.naturalWidth);
    //   console.log('My height is: ', this.naturalHeight);
    // });
  }
  getGameCover(game: igGame): string {
    if (game.cover != null) {
      return game.cover.url.replace('t_thumb', 't_cover_big');
    } else {
      return 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png';
    } 
  }

  // coverResize()

  // toDetails():void {

  // }
}

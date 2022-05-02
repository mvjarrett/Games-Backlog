import { Component, Input, OnInit } from '@angular/core';
import { GameDetailsService } from '../../services/gameDetails.service';
import { igGame } from '../../models/igGame';
import { ActivatedRoute } from '@angular/router';
import { ScreenshotModalComponent } from '../screenshot-modal/screenshot-modal.component';
import { MatDialog } from '@angular/material/dialog';
import screenshot from 'src/app/models/screenshot';

// import screenshot from 'src/app/models/screenshot';
// import platform from 'src/app/models/platform';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  // @Input() game: igGame;
  constructor(
    private details: GameDetailsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  igGames: igGame;

  openDialog(screenshot: screenshot): void {
    let dialogRef = this.dialog.open(ScreenshotModalComponent, {

      data: {screenshot: screenshot}
      
    });
  }

  ngOnInit(): void {
    let id =  this.route.snapshot.params['id']
    this.details.getDetails(id).subscribe((data) => {
      if (data) {
        this.igGames = data[0];
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

  // getScreenshots(game: igGame): string {
  //   if (game.screenshots != null) {
  //     return game.screenshots.url
  //   } else {
  //     return '';
  //   }
  // }
}
    //     this.game = {
    //   id: this.route.snapshot.params['game.id'],
    //   name: this.route.snapshot.params['game.name'],
    // };
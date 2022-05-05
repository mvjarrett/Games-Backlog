import { Component, Input, OnInit } from '@angular/core';
import { GameDetailsService } from '../../services/gameDetails.service';
import { igGame } from '../../models/igGame';
import { ActivatedRoute } from '@angular/router';
import { ScreenshotModalComponent } from '../screenshot-modal/screenshot-modal.component';
import { MatDialog } from '@angular/material/dialog';
import screenshot from 'src/app/models/screenshot';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { gameObject } from 'src/app/models/gameobject';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  @Input() game: igGame;
  constructor(
    private http: HttpClient,
    private details: GameDetailsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  igGames: igGame;

  openDialog(screenshot: screenshot): void {
    let dialogRef = this.dialog.open(ScreenshotModalComponent, {
      data: { screenshot: screenshot },
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
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

  getTimeStamp(game: igGame): any {
    let unix_timestamp = game.first_release_date;
    if (unix_timestamp != null) {
      let releaseDate = new Date(unix_timestamp * 1000).toLocaleDateString(
        'en-US'
      );
      return releaseDate;
    }
  }

  wish() {
    let logData: gameObject = {
      id: this.igGames.id,
      wishlist: true,
      played: false,
      playing: false,
    };
    let options ={
      headers: new HttpHeaders().append('user_id', '1337')
    }

    this.http.post('http://localhost:8080/backlog', logData, options).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  played() {
    console.log('played button');
  }

  playing() {
    console.log('playing button');
  }
}

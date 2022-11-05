import { Component, Input, OnInit } from '@angular/core';
import { GameDetailsService } from '../../services/gameDetails.service';
import { igGame } from '../../models/igGame';
import { ActivatedRoute } from '@angular/router';
import { ScreenshotModalComponent } from '../screenshot-modal/screenshot-modal.component';
import { MatDialog } from '@angular/material/dialog';
import screenshot from 'src/app/models/screenshot';
import { environment } from 'src/environments/environment';
import { gameObject } from 'src/app/models/gameobject';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private details: GameDetailsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  serverUrl = environment.serverUrl;
  @Input() game: igGame;
  category: number = 0;
  igGames: igGame;
  wish: boolean;
  playing: boolean;
  played: boolean;
  id: number;
  isBacklogged: boolean = false;
  ratingWidth: any;

  openDialog(screenshot: screenshot): void {
    let dialogRef = this.dialog.open(ScreenshotModalComponent, {
      data: { screenshot: screenshot },
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.details.getDetails(this.id).subscribe((data) => {
      if (data) {
        this.igGames = data[0];
        this.ratingWidth = Math.trunc(this.igGames.rating) + '%';
      }
    });
    this.details.getBacklog(this.id).subscribe((backlogGame) => {
      if (backlogGame?.length > 0) {
        this.isBacklogged = true;
        this.category = backlogGame[0].category;
        switch (this.category) {
          case 1:
            this.wish = true;
            this.playing = false;
            this.played = false;
            break;
          case 2:
            this.wish = false;
            this.playing = true;
            this.played = false;
            break;
          case 3:
            this.wish = false;
            this.playing = false;
            this.played = true;
            break;
          default:
            console.log('update switch broke');
        }
      } else {
        this.isBacklogged = false;
        this.category = 0;
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

  wishlistToggle(id: any) {
    this.wish = !this.wish;
    let logData: gameObject = {
      id: id,
      category: this.category,
    };
    switch (this.category) {
      case 0:
        this.category = 1;
        logData.category = 1;
        this.backlogAdd(logData);
        break;
      case 1:
        this.category = 0;
        logData.category = 0;
        this.backlogRemove(logData);
        break;
      case 2:
        this.category = 1;
        logData.category = 1;
        this.backlogUpdate(logData);
        break;
      case 3:
        this.category = 1;
        logData.category = 1;
        this.backlogUpdate(logData);
        break;
      default:
        console.log('hit default case, check for error. ' + console.error);
    }
    console.log(this.category);
  }

  playingToggle(id: any) {
    this.playing = !this.playing
    let logData: gameObject = {
      id: id,
      category: this.category,
    };
    switch (this.category) {
      case 0:
        this.category = 2;
        logData.category = 2;
        this.backlogAdd(logData);
        break;
      case 1:
        this.category = 2;
        logData.category = 2;
        this.backlogUpdate(logData);
        break;
      case 2:
        this.category = 0;
        logData.category = 0;
        this.backlogRemove(logData);
        break;
      case 3:
        this.category = 2;
        logData.category = 2;
        this.backlogUpdate(logData);
        break;
      default:
        console.log('hit default case, check for error. ' + console.error);
    }
  }

  playedToggle(id: any) {
    this.played = !this.played
    let logData: gameObject = {
      id: id,
      category: this.category,
    };
    switch (this.category) {
      case 0:
        this.category = 3;
        logData.category = 3;
        this.backlogAdd(logData);
        break;
      case 1:
        this.category = 3;
        logData.category = 3;
        this.backlogUpdate(logData);
        break;
      case 2:
        this.category = 3;
        logData.category = 3;
        this.backlogUpdate(logData);
        break;
      case 3:
        this.category = 0;
        logData.category = 0;
        this.backlogRemove(logData);
        break;
      default:
        console.log('hit default case, check for error. ' + console.error);
    }
  }

  backlogAdd(logData: gameObject) {
    let options = {};
    this.http.post(this.serverUrl + '/backlog', logData, options).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  backlogUpdate(logData: gameObject) {
    let options = {};
    this.http
      .put(`${this.serverUrl}/backlog/game/${logData.id}`, logData, options)
      .subscribe(
        (res) => {
          res = this.category;
          switch (this.category) {
            case 1:
              this.wish = true;
              this.playing = false;
              this.played = false;
              break;
            case 2:
              this.wish = false;
              this.playing = true;
              this.played = false;
              break;
            case 3:
              this.wish = false;
              this.playing = false;
              this.played = true;
              break;
            default:
              console.log('update switch broke');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  backlogRemove(logData: gameObject) {
    let options = {};
    this.http
      .delete(`${this.serverUrl}/backlog/game/${logData.id}`, options)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

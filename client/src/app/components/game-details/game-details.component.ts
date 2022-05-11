import { Component, Input, OnInit } from '@angular/core';
import { GameDetailsService } from '../../services/gameDetails.service';
import { igGame } from '../../models/igGame';
import { ActivatedRoute } from '@angular/router';
import { ScreenshotModalComponent } from '../screenshot-modal/screenshot-modal.component';
import { MatDialog } from '@angular/material/dialog';
import screenshot from 'src/app/models/screenshot';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  isBacklogged: boolean = false;
  backlogStatus: any
  wishStatus: boolean = false;
  playedStatus: boolean = false;
  playingStatus: boolean = false;

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
    this.details.getBacklog(id).subscribe((backlogGame) => {
      if (backlogGame?.length > 0) {
        this.isBacklogged = true;
console.log('is this game backlogged?: ', this.isBacklogged);
        this.wishStatus = backlogGame[0].wishlist;
        this.playedStatus = backlogGame[0].played;
        this.playingStatus = backlogGame[0].playing;
        this.testSwitch;
        console.log('backlogStatus = ', this.backlogStatus)
      }
    });
  }

  testSwitch(){
    switch (this.isBacklogged){
    case this.wishStatus = true:
      this.backlogStatus = 1
      break;
    case this.playingStatus = true:
      this.backlogStatus = 2
      break;
    case this.playedStatus = true:
      this.backlogStatus = 3
      break;
    default: this.backlogStatus = 0
    }
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
    let options = {
      headers: new HttpHeaders().append('user_id', '1337'),
    };
    switch (this.isBacklogged && this.wishStatus) {
      case false && false:
        this.wishStatus = true;
        console.log('logData is ', logData)
        console.log('case1 prepost wish status is ', this.wishStatus)
        this.http
          .post('http://localhost:8080/backlog', logData, options)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        this.isBacklogged = true;
        console.log('case 1');
        break;
      case true && true:
        this.http
          .delete(`http://localhost:8080/backlog/game/${logData.id}`, options)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        this.wishStatus = false;
        this.isBacklogged = false;
        console.log('case 2');
        break;
      case true && false:

        this.http.put(`/backlog/game/${logData.id}`, logData, options);
        console.log('case 3');
        this.wishStatus = true;
        break;
      default:
        console.log('wish button has issues');
    }
  }

  played() {
    let logData: gameObject = {
      id: this.igGames.id,
      wishlist: false,
      played: true,
      playing: false,
    };
    let options = {
      headers: new HttpHeaders().append('user_id', '1337'),
    };
    switch (this.isBacklogged && this.playedStatus) {
      case false && false:
        this.playedStatus = true;
        console.log('logData is ', logData)
        console.log('case1 prepost played status is ', this.playedStatus)
        this.http
          .post('http://localhost:8080/backlog', logData, options)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        this.isBacklogged = true;
        console.log('case 1');
        break;
      case true && true:
        this.http
          .delete(`http://localhost:8080/backlog/game/${logData.id}`, options)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        this.playedStatus = false;
        this.isBacklogged = false;
        console.log('case 2');
        break;
      case true && false:

        this.http.put(`/backlog/game/${logData.id}`, logData, options);
        console.log('case 3');
        this.playedStatus = true;
        break;
      default:
        console.log('played button has issues');
    }
  }
  playing() {
    let logData: gameObject = {
      id: this.igGames.id,
      wishlist: false,
      played: false,
      playing: true,
    };
    let options = {
      headers: new HttpHeaders().append('user_id', '1337'),
    };
    switch (this.isBacklogged && this.playingStatus) {
      case false && false:
        this.playingStatus = true;
        console.log('logData is ', logData)
        console.log('case1 prepost playing status is ', this.playingStatus)
        this.http
          .post('http://localhost:8080/backlog', logData, options)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        this.isBacklogged = true;
        console.log('case 1');
        break;
      case true && true:
        this.http
          .delete(`http://localhost:8080/backlog/game/${logData.id}`, options)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
        this.playingStatus = false;
        this.isBacklogged = false;
        console.log('case 2');
        break;
      case true && false:

        this.http.put(`/backlog/game/${logData.id}`, logData, options);
        console.log('case 3');
        this.playingStatus = true;
        break;
      default:
        console.log('playing button has issues');
    }
  }
}

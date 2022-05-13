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
        this.wishStatus = backlogGame[0].wishlist;
        this.playedStatus = backlogGame[0].played;
        this.playingStatus = backlogGame[0].playing;
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
  let logData: gameObject ={
    id: this.igGames.id,
    wishlist: this.wishStatus,
    playing: this.playingStatus,
    played: this.playedStatus
  }
  let options = {
    headers: new HttpHeaders().append('user_id', '1337',),
  };
  if(!this.isBacklogged && !this.wishStatus) {
    this.wishStatus = true;
    this.playedStatus = false;
    this.playingStatus = false;
    logData.wishlist = true;
    logData.played = false;
    logData.playing = false;
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
  } else if(this.isBacklogged && !this.wishStatus){
    this.wishStatus = true;
    this.playedStatus = false;
    this.playingStatus = false;
    logData.wishlist = true;
    logData.played = false;
    logData.playing = false;
    this.http.put(`http://localhost:8080/backlog/game/${logData.id}`, logData, options)
    .subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  } else{
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
    this.playedStatus = false;
    this.playingStatus = false;
    this.isBacklogged = false;
  }

}

playing() {
  let logData: gameObject ={
    id: this.igGames.id,
    wishlist: this.wishStatus,
    playing: this.playingStatus,
    played: this.playedStatus
  }
  let options = {
    headers: new HttpHeaders().append('user_id', '1337'),
  };
  if(!this.isBacklogged && !this.playingStatus) {
    this.wishStatus = false;
    this.playedStatus = false;
    this.playingStatus = true;
    logData.wishlist = false;
    logData.played = false;
    logData.playing = true;
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
  } else if(this.isBacklogged && !this.playingStatus){
    this.wishStatus = false;
    this.playedStatus = false;
    this.playingStatus = true;
    logData.wishlist = false;
    logData.played = false;
    logData.playing = true;
    this.http.put(`http://localhost:8080/backlog/game/${logData.id}`, logData, options)
    .subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  } else if(this.isBacklogged && this.playingStatus){
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
    this.playedStatus = false;
    this.playingStatus = false;
    this.isBacklogged = false;
  }

}

played()  {
  let logData: gameObject ={
    id: this.igGames.id,
    wishlist: this.wishStatus,
    playing: this.playingStatus,
    played: this.playedStatus
  }
  let options = {
    headers: new HttpHeaders().append('user_id', '1337'),
  };
  if(!this.isBacklogged && !this.playedStatus) {
    this.wishStatus = false;
    this.playedStatus = true;
    this.playingStatus = false;
    logData.wishlist = false;
    logData.played = true;
    logData.playing = false;
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
  } else if(this.isBacklogged && !this.playedStatus){
    this.wishStatus = false;
    this.playedStatus = true;
    this.playingStatus = false;
    logData.wishlist = false;
    logData.played = true;
    logData.playing = false;
    this.http.put(`http://localhost:8080/backlog/game/${logData.id}`, logData, options)
    .subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

  } else if(this.isBacklogged && this.playedStatus){
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
    this.playedStatus = false;
    this.playingStatus = false;
    this.isBacklogged = false;
  }

}

}

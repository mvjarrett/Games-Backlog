import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { gameObject } from '../models/gameobject';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent implements OnInit {
  backlogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    platform: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });


  onFormSubmit(): void {
    const logStatus = this.checkGameStatus();
    const gameData: gameObject = {
      user_id: 1337,
      title_name: this.backlogForm.controls['title'].value,
      sys: this.backlogForm.controls['platform'].value,
      genre: this.backlogForm.controls['genre'].value,
      played: logStatus.played,
      playing: logStatus.playing,
      wishlist: logStatus.wishlist,
    };
    this.http.post('http://localhost:8080/backlog', gameData).subscribe((newGame) => {
      // console.log(newGame)
      this.dialogRef.close(newGame);
    });
  }
  constructor(private http: HttpClient, public dialogRef: MatDialogRef<EntryFormComponent>) {}

  ngOnInit(): void {}

  checkGameStatus(): any {
    let logType: string = this.backlogForm.controls['status'].value;

    switch (logType) {
      case 'Wishlist':
        return { wishlist: true, playing: false, played: false };

      case 'Playing':
        return { wishlist: false, playing: true, played: false };

      case 'Played':
        return { wishlist: false, playing: false, played: true };

      default:
        return { wishlist: false, playing: false, played: false };
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
}

// ______________________________________________________________________

// console.log('Name: ' + this.backlogForm.controls['title'].value);
// console.log('Platform: ' + this.backlogForm.controls['platform'].value);
// console.log('Genre: ' + this.backlogForm.controls['genre'].value);

// let logType : string = this.backlogForm.controls['status'].value

// switch (logType) {
//   case 'Wishlist':
//     console.log('wishlist was selected')
//     break;
//   case 'Playing':
//     console.log('playing was selected')
//     break;
//   case 'Played':
//     console.log('played was selected')
//     break;
// }

// console.log('Log Status: ' + this.backlogForm.controls['status'].value )

//   console.log('Name: ' + this.backlogForm.controls['title'].value);
//   console.log('Platform: ' + this.backlogForm.controls['platform'].value);
//   console.log('Genre: ' + this.backlogForm.controls['genre'].value);


  // @Output() open = new EventEmitter<any>();

  // sendNew() {
  //   this.open.emit(Output);
  // }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { gameObject } from '../models/gameobject';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent implements OnInit {
  backlogForm = new FormGroup({
    title: new FormControl(''),
    platform: new FormControl(''),
    genre: new FormControl(''),
    status: new FormControl(''),
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
    this.http.post('http://localhost:8080/backlog', gameData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  checkGameStatus() {
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

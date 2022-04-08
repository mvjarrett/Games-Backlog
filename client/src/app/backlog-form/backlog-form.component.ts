import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameObject } from '../models/gameobject';

@Component({
  selector: 'app-backlog-form',
  templateUrl: './backlog-form.component.html',
  styleUrls: ['./backlog-form.component.css']
})
export class BacklogFormComponent implements OnInit {
  gname = new FormControl('');
  sysname = new FormControl('');
  genre = new FormControl('');
  gameObject: GameObject;

  constructor() {
    this.gameObject = {
      gname: '',
      sysname: '',
      genre: ''
    }
   }

  ngOnInit(): void {
  }

  // updateGame() {
  //   this.gname.setValue('Elden Ring');
  // }

  submitGame(): void {
    this.gameObject.gname = this.gname.value;
    this.gameObject.sysname = this.sysname.value;
    this.gameObject.genre = this.genre.value;
    console.log(this.gameObject);
  }

}

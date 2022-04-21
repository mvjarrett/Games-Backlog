import { Component, OnInit } from '@angular/core';
import { TenRng } from '../igdb.service';
import { igObject } from '../models/igGame';

@Component({
  selector: 'app-igdb-game',
  templateUrl: './igdb-game.component.html',
  styleUrls: ['./igdb-game.component.css']
})
export class IgdbGameComponent implements OnInit {


  constructor(private tenRng: TenRng) { }

  ngOnInit(): void {
    this.tenRng.GetTen().subscribe((data) => {
      if (data) {
        console.log('ayo its some data')
      }
    })
  }

}

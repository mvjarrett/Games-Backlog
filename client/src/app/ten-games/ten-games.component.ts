import { Component, OnInit } from '@angular/core';
import { TenGamesService } from '../tenGamesTest.service';
import { igGame } from '../models/igGame';

@Component({
  selector: 'app-ten-games',
  templateUrl: './ten-games.component.html',
  styleUrls: ['./ten-games.component.css'],
})
export class TenGamesComponent implements OnInit {
  constructor(private tenGames: TenGamesService) {}
  igGames: igGame[] = [];
  ngOnInit(): void {
    this.tenGames.gamesRng().subscribe((data) => {
      if (data) {
        this.igGames = data;
        console.log(data)
      }
    });
  }
}

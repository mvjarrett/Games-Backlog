import { Component, OnInit } from '@angular/core';
import { IgdbResultsService } from '../../services/igdbResults.service';
import { igGame } from '../../models/igGame';

@Component({
  selector: 'app-igdb-results',
  templateUrl: './igdb-results.component.html',
  styleUrls: ['./igdb-results.component.css'],
})
export class IgdbResultsComponent implements OnInit {
  constructor(private igdbResults: IgdbResultsService) {}
  igGames: igGame[] = [];
  throttle = 0;
  distance = 2;
  page = 1;
  ngOnInit(): void {
    this.igdbResults.topGames().subscribe((data) => {
      if (data) {
        this.igGames = data;
      }
    });
  }
  // onScroll(): void {
  //   this.igdbResults.infiniteGames().subscribe((data) => {
  //     if (data) {
  //       this.igGames = data;
  //       this.igGames.push(...this.igGames)
  //     }
  //   });
  // }
}

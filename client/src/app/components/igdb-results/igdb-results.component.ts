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
  ngOnInit(): void {
    this.igdbResults.gamesRng().subscribe((data) => {
      if (data) {
        this.igGames = data;
      }
    });
  }
}

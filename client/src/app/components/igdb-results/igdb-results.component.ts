import { Component, OnInit, ViewChild } from '@angular/core';
import { IgdbResultsService } from '../../services/igdbResults.service';
import { igGame } from '../../models/igGame';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-igdb-results',
  templateUrl: './igdb-results.component.html',
  styleUrls: ['./igdb-results.component.css'],
})
export class IgdbResultsComponent implements OnInit {
  infiniteScroll: InfiniteScrollDirective;
  constructor(private igdbResults: IgdbResultsService) {}
  igGames: igGame[] = [];
  throttle = 500;
  distance = 0.5;
  offset = 50;
  @ViewChild(InfiniteScrollDirective)
  set appScroll(directive: InfiniteScrollDirective) {
    this.infiniteScroll = directive;
  }
  ngOnInit(): void {
    this.igdbResults.topGames().subscribe((data) => {
      if (data) {
        this.igGames = data;
      }
      this.infiniteScroll.setup();
      this.infiniteScroll.ngOnDestroy();
    });
  }
  onScroll(): void {
    this.igdbResults.infiniteGames().subscribe((data) => {
      if (data) {
        this.igGames.push(...data);
        console.log(this.igGames.length)
        this.infiniteScroll.setup();
        this.infiniteScroll.ngOnDestroy();
      }
      (error: any) => {
        console.log(error);
      }
    });
  }
}

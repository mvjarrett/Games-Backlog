import { Component, OnInit, ViewChild } from '@angular/core';
import { IgdbResultsService } from '../../services/igdbResults.service';
import { igGame } from '../../models/igGame';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-igdb-results',
  templateUrl: './igdb-results.component.html',
  styleUrls: ['./igdb-results.component.css'],
})
export class IgdbResultsComponent implements OnInit {
  infiniteScroll: InfiniteScrollDirective;
  term: string | null;
  constructor(
    private igdbResults: IgdbResultsService,
    private _Activatedroute: ActivatedRoute
  ) {}
  igGames: igGame[] = [];
  throttle = 500;
  distance = 0.5;
  offset = 50;
  @ViewChild(InfiniteScrollDirective)
  set appScroll(directive: InfiniteScrollDirective) {
    this.infiniteScroll = directive;
  }

  //----------- organizational seperator ----------

  ngOnInit(): void {
    this._Activatedroute.queryParams.subscribe((queryParams: any) => {
      this.term = queryParams.term;
    });
    if (this.term === undefined) {
      this.allGames();
    } else {
      this.searchResult(this.term);
    }
  }

  allGames() {
    this.igdbResults.topGames().subscribe((data) => {
      if (data) {
        this.igGames = data;
      }
    });
  }

  onScroll(): void {
    this.igdbResults.infiniteGames().subscribe((data) => {
      if (data) {
        this.igGames.push(...data);
        console.log(this.igGames.length);
        this.infiniteScroll.setup();
        this.infiniteScroll.ngOnDestroy();
      }
      (error: any) => {
        console.log(error);
      };
    });
  }

  searchResult(term: string | null) {
    this.igdbResults.searchGames(term).subscribe((data) => {
      if (data) {
        this.igGames = data;
      }
    });
  }
}

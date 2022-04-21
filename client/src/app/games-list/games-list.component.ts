import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GameService } from '../games.service';
import { gameObject } from '../models/gameobject';
import { MatDialog } from '@angular/material/dialog';
import { EntryFormComponent } from '../entry-form/entry-form.component';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  dataSource = new MatTableDataSource<gameObject>();
  columnsToDisplay: string[] = ['title_name', 'sys', 'genre'];

  updateLog(gameData: any) {
    this.dataSource = gameData;
  }

  constructor(private gameService: GameService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.gameService.GetGames().subscribe((data) => {
      if (data) {
        this.dataSource = new MatTableDataSource<gameObject>(data);
        console.log(this.dataSource);
      }
    });
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(EntryFormComponent, {
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        const existingData = this.dataSource.data;
        existingData.push(result);
        this.dataSource.data = existingData;
      }
    });
  }
}

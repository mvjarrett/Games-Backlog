import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IgdbResultsComponent } from './components/igdb-results/igdb-results.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { CoverComponent } from './components/cover/cover.component';

const routes: Routes = [
  {path: '', component: CoverComponent},
  { path: 'games', component: IgdbResultsComponent},
  { path: 'backlog', component: GamesListComponent},
  { path: 'games/:id', component: GameDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

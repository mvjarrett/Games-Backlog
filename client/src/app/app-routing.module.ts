import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IgdbResultsComponent } from './components/igdb-results/igdb-results.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { CoverComponent } from './components/cover/cover.component';

const routes: Routes = [
  { path: '', component: CoverComponent },
  { path: 'backlog', component: GamesListComponent },
  { path: 'games/search', component: IgdbResultsComponent, runGuardsAndResolvers: 'always'},
  { path: 'games/platforms/:platformId', component: IgdbResultsComponent },
  { path: 'games/genres/:genreId', component: IgdbResultsComponent },
  { path: 'games/:id', component: GameDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

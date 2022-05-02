import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenGamesComponent } from './components/ten-games/ten-games.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

const routes: Routes = [
  { path: 'games', component: TenGamesComponent},
  { path: 'backlog', component: GamesListComponent},
  { path: 'games/:id', component: GameDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

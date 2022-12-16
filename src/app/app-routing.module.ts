import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IgdbResultsComponent } from './components/igdb-results/igdb-results.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { CoverComponent } from './components/cover/cover.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', component: CoverComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'backlog', component: GamesListComponent, runGuardsAndResolvers: 'always' },
  { path: 'games', component: IgdbResultsComponent },
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

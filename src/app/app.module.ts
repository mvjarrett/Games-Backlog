import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GamesListComponent } from './components/games-list/games-list.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IgdbResultsComponent } from './components/igdb-results/igdb-results.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { IgdbGameCardComponent } from './components/igdb-game-card/igdb-game-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { ScreenshotModalComponent } from './components/screenshot-modal/screenshot-modal.component';
import { CoverComponent } from './components/cover/cover.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    IgdbResultsComponent,
    IgdbGameCardComponent,
    NavbarComponent,
    GameDetailsComponent,
    ScreenshotModalComponent,
    CoverComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatSnackBarModule,
    InfiniteScrollModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '540271258342-88l1r5tkp7fh3sqjce93epkndui8ua99.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export const APP_ROUTING = RouterModule.forRoot;

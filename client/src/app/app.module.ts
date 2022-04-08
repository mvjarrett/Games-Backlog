import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BacklogFormComponent } from './backlog-form/backlog-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import axios, { Axios } from 'axios';

@NgModule({
  declarations: [
    AppComponent,
    BacklogFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Axios
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

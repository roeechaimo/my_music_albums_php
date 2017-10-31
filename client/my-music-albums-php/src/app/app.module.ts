import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {GetFromServer} from './services/getFromServer.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AlbumComponent } from './components/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [GetFromServer],
  bootstrap: [AppComponent]
})
export class AppModule { }

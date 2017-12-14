import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GetFromServer } from './services/getFromServer.service';
import { SendObjToServer } from './services/sendObjToServer.service';
import { LoadAlbumToPlayer } from './services/LoadAlbumToPlayer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AlbumComponent } from './components/album/album.component';
import { AlbumDetailsComponent } from './components/album.details/album.details.component';
import { PlayerComponentt } from './components/player/player.component';

//TODO - add route to album.details.component
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'albums', component: AlbumComponent },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AlbumComponent,
    AlbumDetailsComponent,
    PlayerComponentt
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [GetFromServer, SendObjToServer, LoadAlbumToPlayer],
  bootstrap: [AppComponent]
})
export class AppModule { }

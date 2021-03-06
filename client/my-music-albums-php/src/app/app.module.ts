import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GetFromServer } from './services/getFromServer.service';
import { SendObjToServer } from './services/sendObjToServer.service';
import { LoadAlbumToPlayer } from './services/LoadAlbumToPlayer.service';
import { LoadUserAlbums } from './services/LoadUserAlbums.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { DialogService } from './services/dialog.service';

import { DialogComponent } from './components/dialog/dialog.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AlbumsOverallComponent } from './components/albums.overall/albums.overall.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumComponent } from './components/album/album.component';
import { AlbumDetailsComponent } from './components/album.details/album.details.component';
import { PlayerComponentt } from './components/player/player.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'albums', component: AlbumsOverallComponent },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    DialogComponent,
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AlbumsOverallComponent,
    AlbumsComponent,
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
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [
    DialogComponent
  ],
  providers: [GetFromServer, SendObjToServer, LoadAlbumToPlayer, LoadUserAlbums, DialogService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }

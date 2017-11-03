import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { GetFromServer } from './services/getFromServer.service';
import { SendObjToServer } from './services/sendObjToServer.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AlbumComponent } from './components/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [GetFromServer,SendObjToServer],
  bootstrap: [AppComponent]
})
export class AppModule { }

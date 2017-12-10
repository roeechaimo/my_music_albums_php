import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetFromServer } from '../../services/getFromServer.service';
import { LoadAlbumToPlayer } from '../../services/LoadAlbumToPlayer.service';

@Component({
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponentt implements OnInit {

  constructor(private _getFromServer: GetFromServer, private _loadAlbumToPlayer: LoadAlbumToPlayer) { }

  album;
  audio;
  subscription: any;

  //TODO - make audio pause and load a new one
  //TODO - set player controls

  ngOnInit() {
    this.album = this._loadAlbumToPlayer.getLoadedAlbum();
    this.subscription = this._loadAlbumToPlayer.albumChange$.subscribe(
      album => this.selectedAlbum(album));
  }

  selectedAlbum(album: object) {
    this.album = album;
    this.playAudio(this.album);
    console.log(this.album);
  }

  playAudio(album){
    this.audio = null;
    this.audio = new Audio();
    this.audio.src = album.playlistDetails[0].song_src;
    this.audio.play();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

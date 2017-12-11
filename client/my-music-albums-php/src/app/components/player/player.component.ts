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

  //TODO - handle with album image error on init
  //TODO - fix style of player
  album;
  albumToCheck;
  audio;
  subscription: any;

  //TODO - set player controls and add option for playing next/previous

  ngOnInit() {
    this.album = this._loadAlbumToPlayer.getLoadedAlbum();
    this.subscription = this._loadAlbumToPlayer.albumChange$.subscribe(
      album => this.selectedAlbum(album));
  }

  selectedAlbum(album: object) {
    this.albumToCheck = album;
    if (this.albumToCheck.playlistDetails.length < 1) {
      //TODO - display error in case song missing details
      console.log(JSON.stringify(this.albumToCheck) + ' missing some details');
      return;
    }
    this.album = album;
    if (this.audio !== undefined) {
      this.audio.pause();
      this.audio = undefined;
    }
    this.playAudio(this.album);
    console.log(this.album);
  }

  playAudio(album) {
    this.audio = new Audio();
    this.audio.src = album.playlistDetails[0].song_src;
    this.audio.play();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

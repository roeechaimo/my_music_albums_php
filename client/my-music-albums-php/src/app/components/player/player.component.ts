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
  songsArray;
  albumToCheck;
  audio;
  playingSong;
  showPlay: boolean = false;
  showPause: boolean = true;
  subscription: any;

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
    this.songsArray = this.album.playlistDetails;
    this.playingSong = this.songsArray[0];
    this.playAudio(this.album, 0);
    this.showPlay = false;
    this.showPause = true;
    console.log(this.album);
  }

  playAudio(album, songIndex) {
    if (this.audio !== undefined) {
      this.audio.pause();
      this.audio = undefined;
    }
    this.audio = new Audio();
    this.audio.src = album.playlistDetails[songIndex].song_src;
    this.audio.play();
  }

  pauseSong() {
    if (this.audio) {
      this.audio.pause();
      this.showPause = false;
      this.showPlay = true;
    }
  }

  keepPlayingSong() {
    if (this.audio) {
      this.audio.play();
      this.showPlay = false;
      this.showPause = true;
    }
  }

  playNextSong() {
    let songOrderObj = this.checkNextAndBackSongs(this.playingSong);
    this.playAudio(this.album, this.songsArray.indexOf(songOrderObj.nextSongIndex));
    this.playingSong = songOrderObj.nextSongIndex;
    this.showPause = true;
    this.showPlay = false;
  }

  playPreviousSong() {
    let songOrderObj = this.checkNextAndBackSongs(this.playingSong);
    this.playAudio(this.album, this.songsArray.indexOf(songOrderObj.previousSongIndex));
    this.playingSong = songOrderObj.previousSongIndex;
    this.showPause = true;
    this.showPlay = false;
  }

  checkNextAndBackSongs(playingSong) {
    if (this.album) {
      let currentSongIndex = this.songsArray.indexOf(playingSong);
      let previousSongIndex = this.songsArray[currentSongIndex == 0 ? this.songsArray.length - 1 : currentSongIndex - 1];
      let nextSongIndex = this.songsArray[currentSongIndex == this.songsArray.length -1 ? 0 : currentSongIndex + 1];
      let songOrderObj = {
        "currentSongIndex": currentSongIndex,
        "previousSongIndex": previousSongIndex,
        "nextSongIndex": nextSongIndex
      }
      return songOrderObj;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

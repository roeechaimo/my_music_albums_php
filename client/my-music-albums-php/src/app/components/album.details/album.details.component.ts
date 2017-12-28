import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LoadAlbumToPlayer } from '../../services/LoadAlbumToPlayer.service';
import { SLIDE_ANIMATION } from '../../animations/slide.animation';

@Component({
  selector: 'app-album-details',
  templateUrl: 'album.details.component.html',
  styleUrls: ['album.details.component.scss'],
  animations: [SLIDE_ANIMATION]
})
export class AlbumDetailsComponent implements OnInit {

  constructor(private _loadAlbumToPlayer: LoadAlbumToPlayer) { }

  album: object = {};
  subscription: any;
  currentPlaylist = [];
  detailsState: string = 'outFromRight';
  showPlayButton: boolean = false;

  ngOnInit() {
    this.album = this._loadAlbumToPlayer.getLoadedAlbum();
    this.subscription = this._loadAlbumToPlayer.albumChange$.subscribe(
      album => this.selectedAlbum(album));
  }

  selectedAlbum(album: object) {
    if (!this.validateAlbum(album)) {
      return false;
    }
    this.album = album;
    this.showPlayButton = this.checkPlaylistLength(this.album);
    this.toggleDetails(event);
    console.log(this.album);
  }

  checkPlaylistLength(album) {
    if ((album.hasOwnProperty('playlistDetails')) && (album.playlistDetails.length > 0)) {
      return true;
    }
    return false;
  }

  //Check if album can or should be loaded to player
  validateAlbum(album) {
    if (album.purpose !== 'info') {
      return false;
    }
    return true;
  }

  toggleDetails(event) {
    let target = event.target;
    let hasClasses = target.classList;
    if (!hasClasses) {
      this.detailsState = this.detailsState === 'outFromRight' ? 'inFromRight' : 'inFromRight';
    } else if (target.classList.contains('fa-angle-left') || target.classList.contains('fa-angle-right')) {
      this.detailsState = this.detailsState === 'outFromRight' ? 'inFromRight' : 'outFromRight';
    } else {
      this.detailsState = this.detailsState === 'outFromRight' ? 'inFromRight' : 'inFromRight';
    }
  }

  loadAlbum(album, purpose) {
    let albumObj = { "albumDetails": album.albumDetails, "playlistDetails": album.playlistDetails, "purpose": purpose };
    this._loadAlbumToPlayer.loadAlbum(albumObj);
  }

}

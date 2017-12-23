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

  //TODO - make the component synchronize with player component

  album: object = {};
  subscription: any;
  currentPlaylist = [];
  detailsState: string = 'outFromRight';

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
    this.toggleDetails(event);
    console.log(this.album);
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
    if (typeof target === 'object' && target.nodeType !== 1) {
      this.detailsState = this.detailsState === 'outFromRight' ? 'inFromRight' : 'inFromRight';
    } else {
      this.detailsState = this.detailsState === 'outFromRight' ? 'inFromRight' : 'outFromRight';
    }
  }

}

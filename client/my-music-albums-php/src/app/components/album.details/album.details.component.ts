import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LoadAlbumToPlayer } from '../../services/LoadAlbumToPlayer.service';

@Component({
  selector: 'app-album-details',
  templateUrl: 'album.details.component.html',
  styleUrls: ['album.details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  constructor(private _loadAlbumToPlayer: LoadAlbumToPlayer) { }

  //TODO - make the component synchronize with album component
  //TODO - fix player animation
  //TODO - fix errors on init  
  //TODO - fix element style

  album: object = {};
  subscription: any;
  currentPlaylist = [];

  ngOnInit() {
    this.album = this._loadAlbumToPlayer.getLoadedAlbum();
    this.subscription = this._loadAlbumToPlayer.albumChange$.subscribe(
      album => this.selectedAlbum(album));
  }

  selectedAlbum(album: object) {
    this.album = album;
    console.log(this.album);
  }

}

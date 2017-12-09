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

  album: object = {};
  subscription: any;

  //TODO - make data to be shared not just on init

  ngOnInit() {
    debugger;
    this.album = this._loadAlbumToPlayer.getLoadedAlbum();
    this.subscription = this._loadAlbumToPlayer.albumChange$.subscribe(
      album => this.selectedAlbum(album));
  }

  selectedAlbum(album: object) {
    this.album = album;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

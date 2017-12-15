import { Component } from '@angular/core';
import { GetFromServer } from '../../services/getFromServer.service';
import { LoadAlbumToPlayer } from '../../services/LoadAlbumToPlayer.service';

@Component({
  selector: 'app-album-details',
  templateUrl: 'album.details.component.html',
  styleUrls: ['album.details.component.scss']
})
export class AlbumDetailsComponent {

  constructor(private _getFromServer: GetFromServer, private _loadAlbumToPlayer: LoadAlbumToPlayer) { }

  showAlbumsUrl = 'http://localhost/my_music_albums_php/Ci/index.php/albums_ctrl/show';
  loadAlbumUrl = 'http://localhost/my_music_albums_php/Ci/index.php/song_ctrl/showPlaylist/';

  //TODO - make the component synchronize with album component
  //TODO - fix player animation 

  results: string[];
  albums = [];
  currentPlaylist = [];

  loadAlbum(album){
    let albumId = album.album_id;
    this._getFromServer.getDataFromJson(this.loadAlbumUrl + albumId).then((res) => {
      this.currentPlaylist = res;
      let albumObj = {"albumDetails" : album, "playlistDetails" : this.currentPlaylist};
      this._loadAlbumToPlayer.loadAlbum(albumObj);
    });
  }

}

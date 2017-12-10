import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetFromServer } from '../../services/getFromServer.service';
import { LoadAlbumToPlayer } from '../../services/LoadAlbumToPlayer.service';

@Component({
  selector: 'app-album',
  templateUrl: 'album.component.html',
  styleUrls: ['album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private _getFromServer: GetFromServer, private _loadAlbumToPlayer: LoadAlbumToPlayer) { }

  showAlbumsUrl = 'http://localhost/my_music_albums_php/Ci/index.php/albums_ctrl/show';
  loadAlbumUrl = 'http://localhost/my_music_albums_php/Ci/index.php/song_ctrl/showPlaylist/';

  //TODO - solve No 'Access-Control-Allow-Origin'. added code in .htaccess and Albums_ctrl

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

  ngOnInit(): void {
    this._getFromServer.getDataFromJson(this.showAlbumsUrl).then((res) => {
      this.albums = res;
    });
  }

}

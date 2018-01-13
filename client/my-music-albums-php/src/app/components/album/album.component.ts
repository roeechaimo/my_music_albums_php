import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetFromServer } from '../../services/getFromServer.service';
import { LoadAlbumToPlayer } from '../../services/LoadAlbumToPlayer.service';
import { LoadUserAlbums } from '../../services/LoadUserAlbums.service';

@Component({
  selector: 'app-album',
  templateUrl: 'album.component.html',
  styleUrls: ['album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private _getFromServer: GetFromServer,
    private _loadAlbumToPlayer: LoadAlbumToPlayer,
    private _loadUserAlbums: LoadUserAlbums) { }

  showAlbumsUrl = 'http://localhost/my_music_albums_php/Ci/index.php/albums_ctrl/show';
  loadAlbumUrl = 'http://localhost/my_music_albums_php/Ci/index.php/song_ctrl/showPlaylist/';
  loadUserAlbumsUrl = 'http://localhost/my_music_albums_php/Ci/index.php/albums_ctrl/showUserAlbums/';

  //TODO - solve No 'Access-Control-Allow-Origin'. added code in .htaccess and Albums_ctrl

  results: string[];
  albums = [];
  currentPlaylist = [];
  userToShow: any;
  subscription: any;

  loadAlbum(album, purpose) {
    let albumId = album.album_id;
    this._getFromServer.getDataFromJson(this.loadAlbumUrl + albumId).then((res) => {
      this.currentPlaylist = res;
      let albumObj = { "albumDetails": album, "playlistDetails": this.currentPlaylist, "purpose": purpose };
      this._loadAlbumToPlayer.loadAlbum(albumObj);
    });
  }

  ngOnInit(): void {
    this._getFromServer.getDataFromJson(this.showAlbumsUrl).then((res) => {
      this.albums = res;
    });
    this.userToShow = this._loadUserAlbums.getLoadedUser();
    this.subscription = this._loadUserAlbums.userChange$.subscribe(
      user => this.selectedUser(user));
    this.userToShow = {};
  }

  selectedUser(user: object) {
    this.userToShow = user;
    this._getFromServer.getDataFromJson(this.loadUserAlbumsUrl + this.userToShow.user_id).then((res) => {
      this.albums = res;
    });
    console.log(this.userToShow);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetFromServer } from '../../services/getFromServer.service';

@Component({
  selector: 'app-album',
  templateUrl: 'album.component.html',
  styleUrls: ['album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private _getFromServer: GetFromServer) { }

  url = 'http://localhost/my_music_albums_php/Ci/index.php/albums_ctrl/show';

  //todo - handle No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:4200' is therefore not allowed access.

  results: string[];

  ngOnInit(): void {
    let albums;
    this._getFromServer.getDataFromJson(this.url).then((res) => {
      albums = res;
    });
  }

}

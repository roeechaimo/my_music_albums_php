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

  //TODO - solve No 'Access-Control-Allow-Origin'. added code in .htaccess and Albums_ctrl

  results: string[];
  albums = [];

  ngOnInit(): void {    
    this._getFromServer.getDataFromJson(this.url).then((res) => {
      this.albums = res;
    });
  }

}

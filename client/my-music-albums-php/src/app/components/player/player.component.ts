import { Component } from '@angular/core';
import { GetFromServer } from '../../services/getFromServer.service';

@Component({
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponentt {

  constructor(private _getFromServer: GetFromServer) { }

  url = 'http://localhost/my_music_albums_php/Ci/index.php/albums_ctrl/show';

  results: string[];
  albums = [];


}

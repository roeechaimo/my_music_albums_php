import { Component } from '@angular/core';
import { SendObjToServer } from '../../services/sendObjToServer.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor(private _sendObjToServer: SendObjToServer) { }

  url = 'http://localhost/my_music_albums_php/Ci/index.php/auth_ctrl/login';

  results: string[];

  login() {
    this._sendObjToServer.getDataFromJson(this.url).then((res) => {
      this.results = res;
      return this.results;
    });
  }


}

import { Component } from '@angular/core';
import { GetFromServer } from '../../services/getFromServer.service';
import { SendObjToServer } from '../../services/sendObjToServer.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor(private _sendObjToServer: SendObjToServer, private _getFromServer: GetFromServer) { }

  loginUrl = 'http://localhost/my_music_albums_php/Ci/index.php/auth_ctrl/login';
  logoutUrl = 'http://localhost/my_music_albums_php/Ci/index.php/auth_ctrl/logout';

  results: string[];

  userEmail: string;
  userPassword: string;

  login() {
    let userObj = {};
    userObj['user_email'] = this.userEmail;
    userObj['user_pass'] = this.userPassword;
    this._sendObjToServer.sendObjToServer(this.loginUrl, JSON.stringify(userObj)).then((res) => {
      this.results = res;
      return this.results;
    });
  }

  logout() {
    this._getFromServer.getDataFromJson(this.logoutUrl).then((res) => {
      this.results = res;
      return this.results;
    });
  }


}

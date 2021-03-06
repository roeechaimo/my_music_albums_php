import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetFromServer } from '../../services/getFromServer.service';
import { SendObjToServer } from '../../services/sendObjToServer.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor(private _sendObjToServer: SendObjToServer, private _getFromServer: GetFromServer, private _router: Router) { }

  loginUrl = 'http://localhost/my_music_albums_php/Ci/index.php/auth_ctrl/login';
  logoutUrl = 'http://localhost/my_music_albums_php/Ci/index.php/auth_ctrl/logout';

  results: string[];

  userEmail: string;
  userPassword: string;

  login() {
    let userObj = {};
    userObj['user_email'] = this.userEmail;
    userObj['user_pass'] = this.userPassword;
    let jsonStr = JSON.stringify(userObj);
    this._sendObjToServer.sendObjToServer(this.loginUrl, jsonStr).then((res) => {
      this.results = res;
      console.log(this.results);
      this._router.navigate(['../album']);
    });
  }

  logout() {
    this._getFromServer.getDataFromJson(this.logoutUrl).then((res) => {
      this.results = res;
      console.log(this.results);
    });
  }


}

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class SendObjToServer {

  constructor(private http: Http) { }

  sendObjToServer(url, obj) {
    // let options = new RequestOptions({
    //   headers: new Headers({
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': '*'
    //   })
    // });
    return this.http
      .post(url, obj)
      .toPromise()
      .then(this.extractData)
  }

  //TODO - solve No 'Access-Control-Allow-Origin'. added code in .htaccess and auth_ctrl
  //TODO - solve No 'Access-Control-Allow-Origin'. try and move project to www directory in uwamp

  extractData(res: Response) {
    let results = res.json();
    return results;
  }

}

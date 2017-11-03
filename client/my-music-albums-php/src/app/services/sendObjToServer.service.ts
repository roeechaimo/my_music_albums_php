import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class SendObjToServer {

  constructor(private http: Http) { }

  sendObjToServer(url, obj) {
    let options = new RequestOptions({
      headers: new Headers({
        // 'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
        // 'Access-Control-Request-Headers': '*'
      })
    });
    return this.http
      .post(url, obj, options)
      .toPromise()
      .then(this.extractData)
  }

  extractData(res: Response) {
    let results = res.json();
    return results;
  }

}

import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class SendObjToServer {

  constructor(private http: Http) { }

  sendObjToServer(url, obj) {
    debugger;
    return this.http
      .post(url, obj)
      .toPromise()
      .then(this.extractData)
  }

  extractData(res: Response) {
    debugger;
    let results = res.json();
    return results;
  }

}

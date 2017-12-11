import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class GetFromServer {

  constructor(private http: Http) { }

  getDataFromJson(url) {
    return this.http
      .get(url)
      .toPromise()
      .then(this.extractData)
  }

  extractData(res: Response) {    
    let results = res.json();
    return results;
  }

}

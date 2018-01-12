import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Observer } from 'rxjs/Observer';

@Injectable()

export class LoadUserAlbums {

  private user = [];
  userChange$: Observable<object>;
  private _observer: Observer<object>;

  constructor() {
    this.userChange$ = new Observable(observer =>
      this._observer = observer).share();
  }

  loadUser(user) {    
    this.user = user;
    this._observer.next(user);
  }

  getLoadedUser() {
    return this.user;
  }

}

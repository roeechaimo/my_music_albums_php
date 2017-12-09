import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Observer } from 'rxjs/Observer';

@Injectable()

export class LoadAlbumToPlayer {

  private album = {};
  albumChange$: Observable<object>;
  private _observer: Observer<object>;

  constructor() {
    this.albumChange$ = new Observable(observer =>
      this._observer = observer).share();
  }

  loadAlbum(album) {
    debugger;
    this.album = album;
    this._observer.next(album);    
  }

  getLoadedAlbum() {
    debugger;
    return this.album;
  }

}

import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) { }

  test: string;

  //TODO - edit this dialog to fit our needs
  addAlbum() {
    let dialog = this.dialog.open(DialogComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (selection) {
          this.test = selection;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

}

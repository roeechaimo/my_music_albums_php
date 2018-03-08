import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-albums-overall',
  templateUrl: 'albums.overall.component.html',
  styleUrls: ['albums.overall.component.scss']
})
export class AlbumsOverallComponent {

  constructor(public dialog: MatDialog) { }

  selectedEmoji: string;

  openEmojiDialog() {
    let dialog = this.dialog.open(DialogComponent);

    // dialog.afterClosed()
    //   .subscribe(selection => {
    //     if (selection) {
    //       this.selectedEmoji = selection;
    //     } else {
    //       // User clicked 'Cancel' or clicked outside the dialog
    //     }
    //   });
  }

}

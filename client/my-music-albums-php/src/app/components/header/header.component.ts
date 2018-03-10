import { Component } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  constructor(private dialogService: DialogService) { }

  public result: any;

  //TODO - edit this dialog to fit our needs
  addAlbum() {
    this.dialogService
      .confirm('Add Album', "Fill The Album's Details")
      .subscribe(res => this.result = res);

    // dialog.afterClosed()
    //   .subscribe(selection => {
    //     if (selection) {
    //       this.test = selection;
    //     } else {
    //       // User clicked 'Cancel' or clicked outside the dialog
    //     }
    //   });
  }

}

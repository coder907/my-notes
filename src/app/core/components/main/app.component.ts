import {
  Component,
  ChangeDetectionStrategy,
  AfterViewChecked,
  HostListener
} from '@angular/core';

import { ItemService } from '../../services/item.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements AfterViewChecked {

  editedItemId: string = null;

  constructor(public itemService: ItemService) { }

  post(text: string) {
    if (this.editedItemId) {
      this.itemService.updateItem(this.editedItemId, text);

    } else {
      this.itemService.addItem(text);
    }
  }

  startEditing(id: string) {
    this.editedItemId = id;
  }

  stopEditing() {
    this.editedItemId = null;
  }

  removeEditedItem() {
    if (this.editedItemId) {
      this.itemService.removeItem(this.editedItemId);
      this.stopEditing();
    }
  }

  // ***** TODO: find CSS solution
  ngAfterViewChecked() {
    this.resizeList();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeList();
  }

  resizeList() {
    const list: any = window.document.getElementsByTagName('app-list')[0];
    list.style.height = (document.body.offsetHeight - list.offsetTop) + 'px';
  }
  // *****
}

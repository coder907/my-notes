import { Component } from '@angular/core';

import { ItemService } from '../../services/item.service';



@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
})
export class NotesManagerComponent  {

  editedItemId: string = null;

  constructor(
    public itemService: ItemService,
  ) {}

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
}

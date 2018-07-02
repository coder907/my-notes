import {
  Component,
  ChangeDetectionStrategy,
  AfterViewChecked,
  OnInit,
  HostListener
} from '@angular/core';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { ItemService } from '../../services/item.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  editedItemId: string = null;

  constructor(
    public itemService: ItemService,
    private breakpointObserver: BreakpointObserver,
  ) { }



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

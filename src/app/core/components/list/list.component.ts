import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';

import { Observable } from 'rxjs';

import { Item } from '../../models/item';



@Component({
  selector: 'app-list',
  styleUrls: ['list.component.scss'],
  templateUrl: 'list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListComponent {
  displayedColumns: string[];

  constructor() {
    this.setColumns();
  }

  @Input()
  items: Observable<Item[]>;

  @Input()
  editedItem: Observable<Item>;

  @Output()
  rowClick = new EventEmitter();

  // ***** TODO: is there a better solution?
  @HostListener('window:resize')
  onResize() {
    this.setColumns();
  }

  setColumns() {
    if (window.innerWidth < 768) {
      this.displayedColumns = ['text'];
    } else {
      this.displayedColumns = ['updated', 'text'];
    }
  }
  // *****
}

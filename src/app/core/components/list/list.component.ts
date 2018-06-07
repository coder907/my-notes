import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
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
  displayedColumns = ['text'];

  @Input()
  items: Observable<Item[]>;

  @Input()
  editedItem: Observable<Item>;

  @Output()
  rowClick = new EventEmitter();
}

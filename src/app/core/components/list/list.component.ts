import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ListDefinition } from './models/list-definition';
import { ColumnDefinition } from './models/column-definition';
import { ColumnFormat } from './models/column-format';



@Component({
  selector: 'app-list',
  styleUrls: ['list.component.scss'],
  templateUrl: 'list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListComponent<T extends { id: number | string; }> implements OnInit, OnChanges {

  @Input()
  listDefinition: ListDefinition;

  @Input()
  columnDefinitions: ColumnDefinition[];

  /**
   * T must extend object and have an 'id' property of type number or string.
   */
  @Input()
  items: T[];

  @Input()
  editedItem: T;

  @Input()
  noItemsLabel = 'No items to display.';

  @Output()
  startEditing = new EventEmitter();

  displayedColumns: string[];

  ngOnInit() {
    this.updateDisplayedColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columnDefinitions) {
      this.updateDisplayedColumns();
    }
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.columnDefinitions.map(
      columnDefinition => columnDefinition.name
    );
  }

  formatData(item: T, columnDefinition: ColumnDefinition) {
    const value = item[columnDefinition.name];

    if (columnDefinition.format === ColumnFormat.Enum) {
      return columnDefinition.enum[value];

    } else if (columnDefinition.format === ColumnFormat.Datetime) {
      return new Date(value).toLocaleString();

    } else {
      return value;
    }
  }
}

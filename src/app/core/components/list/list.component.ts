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

export class ListComponent implements OnInit, OnChanges {

  @Input()
  listDefinition: ListDefinition;

  @Input()
  columnDefinitions: ColumnDefinition[];

  @Input()
  items: object[];

  @Input()
  editedItem: object;

  @Input()
  noItemsLabel = 'No items to display.';

  @Output()
  startEditing = new EventEmitter();

  displayedColumns: string[];

  ngOnInit() {
    this.updateDisplayedColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    const columnDefinitions = changes.columnDefinitions;

    if (  columnDefinitions &&
         (columnDefinitions.currentValue !== columnDefinitions.previousValue)
    ) {
      this.updateDisplayedColumns();
    }
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.columnDefinitions.map(columnDefinition => columnDefinition.name);
  }

  formatData(item: object, columnDefinition: ColumnDefinition) {
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

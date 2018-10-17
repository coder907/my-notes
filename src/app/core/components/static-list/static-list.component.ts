import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  MatTableDataSource,
  MatSort,
  MatSortable
} from '@angular/material';



@Component({
  selector: 'app-static-list',
  styleUrls: ['static-list.component.scss'],
  templateUrl: 'static-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StaticListComponent implements OnInit, OnChanges {

  @Input()
  items: {id: string, text: string, added: number, updated: number}[];

  @Input()
  editedItem: {id: string};

  @Input()
  noItemsLabel = 'No items to display.';

  @Output()
  startEditing = new EventEmitter();

  displayedColumns: string[];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort)
  private __sort: MatSort;

  constructor() {
    this.__setColumns();
  }

  ngOnInit() {
    this.__sort.sort(<MatSortable> {
      id: 'updated',
      start: 'desc'
    });
  }

  // ***** TODO: is there a better solution?
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.items;
    this.dataSource.sort = this.__sort;
  }
  // *****

  // ***** TODO: is there a better solution?
  @HostListener('window:resize')
  onResize() {
    this.__setColumns();
  }

  private __setColumns() {
    if (window.innerWidth < 768) {
      this.displayedColumns = ['text'];
    } else {
      this.displayedColumns = ['updated', 'text'];
    }
  }
  // *****
}

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

import { Item } from '../../models/item';



@Component({
  selector: 'app-list',
  styleUrls: ['list.component.scss'],
  templateUrl: 'list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListComponent implements OnInit, OnChanges {

  @Input()
  items: Item[];

  @Input()
  editedItem: Item;

  @Output()
  startEditing = new EventEmitter();

  displayedColumns: string[];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.setColumns();
  }

  ngOnInit() {
    this.sort.sort(<MatSortable> {
      id: 'updated',
      start: 'desc'
    });
  }

  // ***** TODO: is there a better solution?
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.items;
    this.dataSource.sort = this.sort;
  }
  // *****

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

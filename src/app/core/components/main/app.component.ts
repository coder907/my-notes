import {
  Component,
  ChangeDetectionStrategy,
  AfterViewChecked,
  HostListener } from '@angular/core';

import { ItemService } from '../../services/item.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements AfterViewChecked {

  constructor(
    private itemService: ItemService
  ) {}

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

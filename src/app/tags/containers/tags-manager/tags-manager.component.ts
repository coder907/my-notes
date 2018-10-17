import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { TagService } from '../../services/tag.service';
import { GuiService } from 'src/app/core/services/gui.service';
import { ListDefinition } from 'src/app/core/components/list/models/list-definition';
import { ColumnDefinition } from '../../../core/components/list/models/column-definition';
import { ColumnFormat } from '../../../core/components/list/models/column-format';



@Component({
  selector: 'app-tags-manager',
  templateUrl: './tags-manager.component.html',
  styleUrls: ['./tags-manager.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsManagerComponent implements OnInit, OnDestroy  {

  listDefinition: ListDefinition;
  columnDefinitions: ColumnDefinition[];

  __isHandsetSubscription: Subscription;

  constructor(
    public tagService: TagService,
    public guiService: GuiService,
  ) {
    this.__isHandsetSubscription = guiService.isHandset$.subscribe(
      (breakpointState) => {
        const isHandset = breakpointState.matches;

        this.__updateListDefinition(isHandset);
        this.__updateColumnDefinitions(isHandset);
      }
    );
  }
  __updateListDefinition(isHandset: boolean) {
    let height;

    if (isHandset) {
      height = 'calc(95vh - 134px)';
    } else {
      height = 'calc(100vh - 138px)';
    }

    this.listDefinition = {
      height,
    };
  }

  __updateColumnDefinitions(isHandset: boolean) {
    const columnDefinitions = [];

    if (!isHandset) {
      columnDefinitions.push({
        name: 'updated',
        description: 'Updated',
        format: ColumnFormat.Datetime,
        width: '15%',
      });
    }

    columnDefinitions.push({
      name: 'text',
      description: 'Text',
      format: ColumnFormat.Text,
    });

    this.columnDefinitions = columnDefinitions;
  }

  ngOnInit() {
    this.tagService.startSync();
  }

  post(text: string) {
    this.tagService.addOrUpdateTag(text);
  }

  ngOnDestroy() {
    this.tagService.stopEditing();
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    if (this.__isHandsetSubscription !== null) {
      this.__isHandsetSubscription.unsubscribe();
    }
  }
}

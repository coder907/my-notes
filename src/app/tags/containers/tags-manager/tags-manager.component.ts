import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { TagService } from '../../services/tag.service';
import { ListDefinition } from 'src/app/core/components/list/models/list-definition';
import { ColumnDefinition } from '../../../core/components/list/models/column-definition';
import { ColumnFormat } from '../../../core/components/list/models/column-format';



@Component({
  selector: 'app-tags-manager',
  templateUrl: './tags-manager.component.html',
  styleUrls: ['./tags-manager.component.scss'],
})
export class TagsManagerComponent implements OnInit, OnDestroy  {

  listDefinition: ListDefinition = {
    height: 'calc(95vh - 88px)',
  };

  columnDefinitions: ColumnDefinition[] = [
    {
      name: 'updated',
      description: 'Updated',
      format: ColumnFormat.Datetime,
      width: '15%',
    },
    {
      name: 'text',
      description: 'Text',
      format: ColumnFormat.Text,
    },
  ];

  constructor(
    public tagService: TagService,
  ) {}

  ngOnInit() {
    this.tagService.startSync();
  }

  post(text: string) {
    this.tagService.addOrUpdateTag(text);
  }

  ngOnDestroy() {
    this.tagService.stopEditing();
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { TagService } from '../../services/tag.service';



@Component({
  selector: 'app-tags-manager',
  templateUrl: './tags-manager.component.html',
  styleUrls: ['./tags-manager.component.scss'],
})
export class TagsManagerComponent implements OnInit, OnDestroy  {

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

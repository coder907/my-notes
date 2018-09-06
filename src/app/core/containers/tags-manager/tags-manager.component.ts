import { Component } from '@angular/core';

import { TagService } from '../../services/tag.service';



@Component({
  selector: 'app-tags-manager',
  templateUrl: './tags-manager.component.html',
  styleUrls: ['./tags-manager.component.scss'],
})
export class TagsManagerComponent  {

  constructor(
    public tagService: TagService,
  ) {}

  post(text: string) {
    this.tagService.addOrUpdateTag(text);
  }
}

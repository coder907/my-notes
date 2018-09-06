import {
  Component,
  OnDestroy
} from '@angular/core';

import { TagService } from '../../services/tag.service';



@Component({
  selector: 'app-tags-manager',
  templateUrl: './tags-manager.component.html',
  styleUrls: ['./tags-manager.component.scss'],
})
export class TagsManagerComponent implements OnDestroy  {

  constructor(
    public tagService: TagService,
  ) {}

  post(text: string) {
    this.tagService.addOrUpdateTag(text);
  }

  ngOnDestroy() {
    this.tagService.stopEditing();
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs';

import { Item } from '../../models/item';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {

  @Input()
  item: Observable<Item>;

  @Output()
  post = new EventEmitter();

  @Output()
  clear = new EventEmitter();

  @ViewChild('textarea')
  textarea;

  ngOnInit() {
    // TODO: check for item == null?
    // TODO: unsubscribe?
    this.item.subscribe(item => this.textarea.nativeElement.focus());
  }

  onPostClick() {
    this.post.emit(this.textarea.nativeElement.value);
    this.onClear();
  }

  onClearClick() {
    this.onClear();
  }

  onTextAreaKeyUpEsc() {
    this.onClear();
  }

  onClear() {
    this.clear.emit();

    // TODO: find solution without accessing native element
    const textarea = this.textarea.nativeElement;
    textarea.value = '';
    textarea.focus();
  }
}

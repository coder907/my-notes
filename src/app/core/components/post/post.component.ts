import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Item } from '../../models/item';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges  {

  @Input()
  item: Observable<Item>;

  @Output()
  post = new EventEmitter();

  @Output()
  clear = new EventEmitter();

  @ViewChild('textArea')
  private textArea;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item.currentValue && changes.item.currentValue !== changes.item.previousValue) {
      this.textareaFocus();
    }
  }

  onPostClick() {
    this.post.emit(this.textareaValue());
    this.onClear();
  }

  onClearClick() {
    this.onClear();
  }

  onTextAreaKeyUpEsc() {
    this.onClear();
  }

  onAppDblClickOrPress() {
    window.alert('onAppDblClickOrPress');
  }

  private onClear() {
    this.textareaClear();
    this.clear.emit();
    this.textareaFocus();
  }

  private textareaValue() {
    return this.textArea.nativeElement.value;
  }

  private textareaClear() {
    this.textArea.nativeElement.value = '';
  }

  private textareaFocus() {
    this.textArea.nativeElement.focus();
  }
}

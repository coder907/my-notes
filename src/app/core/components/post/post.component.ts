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

import { Observable } from 'rxjs';

import { Note } from '../../models/note';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges  {

  @Input()
  item: Note;

  @Output()
  post = new EventEmitter();

  @Output()
  clear = new EventEmitter();

  @ViewChild('textArea')
  private __textArea;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item.currentValue && (changes.item.currentValue !== changes.item.previousValue)) {
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

  private onClear() {
    this.textareaClear();
    this.clear.emit();
  }

  private textareaValue() {
    return this.__textArea.nativeElement.value;
  }

  private textareaClear() {
    this.__textArea.nativeElement.value = '';
  }

  private textareaFocus() {
    this.__textArea.nativeElement.focus();
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Item } from '../../models/item';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, OnDestroy  {

  @Input()
  item: Observable<Item>;

  @Output()
  post = new EventEmitter();

  @Output()
  clear = new EventEmitter();

  @ViewChild('textArea')
  private textArea;

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.item.subscribe(item => this.textareaFocus());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges  {

  @Input()
  item: {text: string};

  @Input()
  multiline: boolean;

  @Input()
  placeholder: string;

  @Output()
  post = new EventEmitter();

  @Output()
  clear = new EventEmitter();

  @ViewChild('textElement')
  private textElement: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item.currentValue && (changes.item.currentValue !== changes.item.previousValue)) {
      this.textElementFocus();
    }
  }

  onPostClick() {
    this.post.emit(this.textElementValue());
    this.onClear();
  }

  onClearClick() {
    this.onClear();
  }

  onTextElementKeyUpEsc() {
    this.onClear();
  }

  private onClear() {
    this.textElementClear();
    this.clear.emit();
  }

  private textElementValue(): string {
    if (this.textElement) {
      return this.textElement.nativeElement.value;

    } else {
      return '';
    }
  }

  private textElementClear() {
    if (this.textElement) {
      this.textElement.nativeElement.value = '';
    }
  }

  private textElementFocus() {
    if (this.textElement) {
      this.textElement.nativeElement.focus();
    }
  }
}

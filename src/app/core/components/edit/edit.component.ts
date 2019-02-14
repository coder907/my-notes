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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnChanges  {

  @Input()
  item: {text: string};

  @Input()
  placeholder: string;

  @Output()
  save = new EventEmitter();

  @Output()
  clear = new EventEmitter();

  @ViewChild('textElement')
  private textElement: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item.currentValue && (changes.item.currentValue !== changes.item.previousValue)) {
      this.textElementFocus();
    }
  }

  onSaveClick() {
    this.save.emit(this.textElementValue());
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

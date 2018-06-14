import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { DetectionUtil } from '../detection-util';



@Directive({
  selector: '[appDblClickOrPress]'
})
export class DblClickOrPressDirective {

  @Output() appDblClickOrPress = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('dblclick') onDblClick() {
    if (!DetectionUtil.supportsTouch()) {
      this.appDblClickOrPress.emit();
    }
  }

  @HostListener('press') onPress() {
    if (DetectionUtil.supportsTouch()) {
      this.appDblClickOrPress.emit();
    }
  }
}

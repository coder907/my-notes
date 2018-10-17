import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

import { DetectionUtil } from '../utils/detection-util';



@Directive({
  selector: '[appDblClickOrPress]'
})
export class DblClickOrPressDirective {

  @Output()
  appDblClickOrPress = new EventEmitter();

  @HostListener('dblclick')
  onDblClick() {
    if (!DetectionUtil.supportsTouch()) {
      this.appDblClickOrPress.emit();
    }
  }

  @HostListener('press')
  onPress() {
    if (DetectionUtil.supportsTouch()) {
      this.appDblClickOrPress.emit();
    }
  }
}

import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

import * as detectionUtil from '../utils/detection-util';



@Directive({
  selector: '[appDblClickOrPress]'
})
export class DblClickOrPressDirective {

  @Output()
  appDblClickOrPress = new EventEmitter();

  @HostListener('dblclick')
  onDblClick() {
    if (!detectionUtil.supportsTouch()) {
      this.appDblClickOrPress.emit();
    }
  }

  @HostListener('press')
  onPress() {
    if (detectionUtil.supportsTouch()) {
      this.appDblClickOrPress.emit();
    }
  }
}

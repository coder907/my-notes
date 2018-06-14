import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig  {
  overrides = <any> {
    'tap':    { time: 500 },
    'press':  { time: 501 }
  };
}

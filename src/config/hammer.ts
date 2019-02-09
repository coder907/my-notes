import { HammerGestureConfig } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    tap:    { time: 500 },
    press:  { time: 501 }
  };
}

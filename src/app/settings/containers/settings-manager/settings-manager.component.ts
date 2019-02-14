import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SettingsService } from '../../services/settings.service';



@Component({
  selector: 'app-settings-manager',
  templateUrl: './settings-manager.component.html',
  styleUrls: ['./settings-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsManagerComponent {

  constructor(
    public readonly settingsService: SettingsService,
  ) { }

}

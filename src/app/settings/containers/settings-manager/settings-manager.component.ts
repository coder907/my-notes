import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-settings-manager',
  templateUrl: './settings-manager.component.html',
  styleUrls: ['./settings-manager.component.scss'],
})
export class SettingsManagerComponent {

  language = new FormControl('en');
  isDayTheme = new FormControl(false);
  hasPassword = new FormControl(false);
}

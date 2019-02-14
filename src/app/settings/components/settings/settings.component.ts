import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  language: string;

  @Input()
  isDayTheme: boolean;

  @Input()
  hasPassword: boolean;

  @Output()
  languageChanged = new EventEmitter<string>();

  @Output()
  isDayThemeChanged = new EventEmitter<boolean>();

  @Output()
  hasPasswordChanged = new EventEmitter<boolean>();

  @Output()
  init = new EventEmitter();

  languageControl = new FormControl();
  isDayThemeControl = new FormControl();
  hasPasswordControl = new FormControl();

  languageSubscription: Subscription;
  isDayThemeSubscription: Subscription;
  hasPasswordSubscription: Subscription;

  ngOnInit() {
    this.languageSubscription = this.languageControl.valueChanges.subscribe(this.languageControlChanged.bind(this));
    this.isDayThemeSubscription = this.isDayThemeControl.valueChanges.subscribe(this.isDayThemeControlChanged.bind(this));
    this.hasPasswordSubscription = this.hasPasswordControl.valueChanges.subscribe(this.hasPasswordControlChanged.bind(this));

    this.init.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
      this.languageControl.setValue(
        changes.language.currentValue, {
          emitEvent: false,
        }
      );
    }

    if (changes.isDayTheme) {
      this.isDayThemeControl.setValue(
        changes.isDayTheme.currentValue, {
          emitEvent: false,
        }
      );
    }

    if (changes.hasPassword) {
      this.hasPasswordControl.setValue(
        changes.hasPassword.currentValue, {
          emitEvent: false,
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.isDayThemeSubscription) {
      this.isDayThemeSubscription.unsubscribe();
    }
    if (this.hasPasswordSubscription) {
      this.hasPasswordSubscription.unsubscribe();
    }
  }

  languageControlChanged(newValue: string) {
    this.languageChanged.emit(newValue);
  }

  isDayThemeControlChanged(newValue: boolean) {
    this.isDayThemeChanged.emit(newValue);
  }

  hasPasswordControlChanged(newValue: boolean) {
    this.hasPasswordChanged.emit(newValue);
  }
}

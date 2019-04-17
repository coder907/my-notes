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
  requiresPassword: boolean;

  @Output()
  languageChanged = new EventEmitter<string>();

  @Output()
  isDayThemeChanged = new EventEmitter<boolean>();

  @Output()
  requiresPasswordChanged = new EventEmitter<boolean>();

  @Output()
  init = new EventEmitter();

  languageControl = new FormControl();
  isDayThemeControl = new FormControl();
  requiresPasswordControl = new FormControl();

  languageSubscription: Subscription;
  isDayThemeSubscription: Subscription;
  requiresPasswordSubscription: Subscription;

  ngOnInit() {
    this.languageSubscription = this.languageControl.valueChanges.subscribe(this.languageControlChanged.bind(this));
    this.isDayThemeSubscription = this.isDayThemeControl.valueChanges.subscribe(this.isDayThemeControlChanged.bind(this));
    this.requiresPasswordSubscription = this.requiresPasswordControl.valueChanges.subscribe(this.requiresPasswordControlChanged.bind(this));

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

    if (changes.requiresPassword) {
      this.requiresPasswordControl.setValue(
        changes.requiresPassword.currentValue, {
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
    if (this.requiresPasswordSubscription) {
      this.requiresPasswordSubscription.unsubscribe();
    }
  }

  languageControlChanged(newValue: string) {
    this.languageChanged.emit(newValue);
  }

  isDayThemeControlChanged(newValue: boolean) {
    this.isDayThemeChanged.emit(newValue);
  }

  requiresPasswordControlChanged(newValue: boolean) {
    this.requiresPasswordChanged.emit(newValue);
  }
}

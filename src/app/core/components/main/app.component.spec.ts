import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { TestUtil, name } from '../../../../shared/test-util';
import { AppComponent } from './app.component';
import { Item } from '../../models/item';



describe(name(AppComponent) + ' tests.', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it(name(AppComponent) + ' is created.', () => {
    expect(component).toBeDefined();
  });

  it('Adding a note works correctly. [specification-features-notes-actions-adding-a-note]', () => {

  });

});

import { SimpleChange } from '@angular/core';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Observable,
  of
} from 'rxjs';

import {
  TestUtil,
  name
} from '../../../../shared/test-util';

import { PostComponent } from './post.component';
import { Note } from '../../models/note';



describe(name(PostComponent) + ' tests.', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it(name(PostComponent) + ' is created.', () => {
    expect(component).toBeDefined();
  });

  it('Input item works correctly.', (done: DoneFn) => {
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

    expect(textArea).toBeDefined();
    textArea.value = 'initial value';

    TestUtil.trackFocus(textArea, false);

    const testNote = 'My test note 1.';
    component.item = {
      id: 'id',
      text: testNote
    } as Note;

    fixture.detectChanges();

    component.ngOnChanges({
      item: new SimpleChange(null, component.item, true)
    });

    expect(textArea.value).toBe(testNote);

    window.setTimeout(() => {
      expect(TestUtil.hasFocus(textArea)).toBe(true);
      done();
    }, 1000);
  });

  it('Post button works correctly.', (done: DoneFn) => {
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    const btnPost = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'Post');

    expect(textArea).toBeDefined();
    expect(textArea.value.trim()).toBe('');

    expect(btnPost).toBeDefined();
    expect(btnPost.textContent.trim()).toBe('Post');

    const testNote = 'My test note 2.';
    textArea.value = testNote;

    TestUtil.trackFocus(textArea, true);

    component.post.subscribe(
      (text) => {
        expect(text).toBe(testNote);
        expect(TestUtil.hasFocus(textArea)).toBe(true);
        done();
      },
      fail
    );

    btnPost.click();
  });

  it('Clear button works correctly.', (done: DoneFn) => {
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    const btnClear = TestUtil.getElementByTextContent(fixture.nativeElement, 'button', 'Clear');

    expect(textArea).toBeDefined();
    expect(textArea.value.trim()).toBe('');

    expect(btnClear).toBeDefined();
    expect(btnClear.textContent.trim()).toBe('Clear');

    const testNote = 'My test note 3.';
    textArea.value = testNote;

    TestUtil.trackFocus(textArea, true);

    component.clear.subscribe(
      () => {
        expect(textArea.value).toBe('');
        expect(TestUtil.hasFocus(textArea)).toBe(true);
        done();
      },
      fail
    );

    btnClear.click();
  });
});

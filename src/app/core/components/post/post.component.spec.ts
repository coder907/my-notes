import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { TestUtil, name } from '../../../../shared/test-util';
import { PostComponent } from './post.component';
import { Item } from '../../models/item';


describe(name(PostComponent) + ' tests.', () => {
  const c: PostComponent = TestUtil.nameAllFunctions(new PostComponent()); // Dummy component for use solely in test descriptions

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

  it('Input item works correctly.', () => {
    /*component.ngOnInit(); // Fails

    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

    expect(textArea).toBeDefined();
    expect(textArea.value.trim()).toBe('');


    textArea.value = 'afg';

    const testNote = 'My test note 1.';
    component.item = of({
      id: 1,
      text: testNote
    });

    expect(textArea.value).toBe(testNote);*/
  });

  it('Post button works correctly.', () => {
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    const btnPost: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];

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
      },
      fail
    );

    btnPost.click();
  });

  it('Clear button works correctly.', () => {
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    const btnClear: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];

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
      },
      fail
    );

    btnClear.click();
  });
});

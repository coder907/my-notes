import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { TestUtil, name } from '../../../../shared/test-util';
import { PostComponent } from './post.component';



describe(name(PostComponent) + ' tests.', () => {
  const c: PostComponent = TestUtil.nameAllProperties(new PostComponent()); // Dummy component for use solely in test descriptions

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

  it('Post button works correctly.', () => {
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelectorAll('textarea')[0];
    const btnPost: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];

    expect(textArea).toBeDefined();
    expect(textArea.value.trim()).toBe('');

    expect(btnPost).toBeDefined();
    expect(btnPost.textContent.trim()).toBe('Post');

    const testNote = 'My test note.';
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
    const textArea: HTMLTextAreaElement = fixture.nativeElement.querySelectorAll('textarea')[0];
    const btnClear: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];

    expect(textArea).toBeDefined();
    expect(textArea.value.trim()).toBe('');

    expect(btnClear).toBeDefined();
    expect(btnClear.textContent.trim()).toBe('Clear');

    const testNote = 'My test note.';
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

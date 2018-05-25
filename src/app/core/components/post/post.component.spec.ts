import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUtil, name } from '../../../../shared/test-util';
import { PostComponent } from './post.component';

/*
describe(_(PostComponent) + ' tests', () => {
  // An attempt to create refactor-friendly test descriptions. Will see how it works in practice.
  const c: PostComponent = TestUtil.nameAllProperties(new PostComponent()); // Dummy component for use solely in test descriptions

  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(_(PostComponent) + ' is created', () => {
    expect(component).toBeTruthy();
  });

});
*/

describe(name(PostComponent) + ' tests', () => {
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

  it(name(PostComponent) + ' is created', () => {
    expect(component).toBeDefined();
  });
});

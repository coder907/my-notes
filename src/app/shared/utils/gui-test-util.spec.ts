import { Component, DebugElement } from '@angular/core';

import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';

import { methodName } from './test-util';
import * as guiTestUtil from './gui-test-util';



@Component({
  selector: 'app-test',
  template: `
    <div
      id="container"
      (click)="onClick()"
      (dblclick)="onDblClick()"
    >
      Test
      <input
        type="text"
        name="textbox"
        (keyup)="onKeyUp()"
      />
    </div>
  `
})
export class TestComponent {

  onClick() {
  }

  onDblClick() {
  }

  onKeyUp() {
  }
}

describe('Gui test util', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('Test component is created.', () => {
    expect(component).toBeTruthy();
  });

  it(methodName(guiTestUtil, guiTestUtil.query) + ' works (DebugElement).', () => {
    const container = guiTestUtil.query(fixture.debugElement, 'div[id="container"]') as DebugElement;
    expect(container).toBeTruthy();
    expect(container.nativeElement.innerText.trim()).toEqual('Test');
  });

  it(methodName(guiTestUtil, guiTestUtil.query) + ' works (HTMLElement).', () => {
    const container = guiTestUtil.query(fixture.nativeElement, 'div[id="container"]') as HTMLElement;
    expect(container).toBeTruthy();
    expect(container.innerText.trim()).toEqual('Test');

  });

  it(methodName(guiTestUtil, guiTestUtil.click) + ' works (DebugElement).', () => {
    const container = guiTestUtil.query(fixture.debugElement, 'div[id="container"]') as DebugElement;

    spyOn(component, 'onClick');
    guiTestUtil.click(container);
    expect(component.onClick).toHaveBeenCalled();
  });

  it(methodName(guiTestUtil, guiTestUtil.click) + ' works (HTMLElement).', () => {
    const container = guiTestUtil.query(fixture.nativeElement, 'div[id="container"]') as HTMLElement;

    spyOn(component, 'onClick');
    guiTestUtil.click(container);
    expect(component.onClick).toHaveBeenCalled();
  });

  it(methodName(guiTestUtil, guiTestUtil.dblclick) + ' works (DebugElement).', () => {
    const container = guiTestUtil.query(fixture.debugElement, 'div[id="container"]') as DebugElement;

    spyOn(component, 'onDblClick');
    guiTestUtil.dblclick(container);
    expect(component.onDblClick).toHaveBeenCalled();
  });

  it(methodName(guiTestUtil, guiTestUtil.dblclick) + ' works (HTMLElement).', () => {
    const container = guiTestUtil.query(fixture.nativeElement, 'div[id="container"]') as HTMLElement;

    spyOn(component, 'onDblClick');
    guiTestUtil.dblclick(container);
    expect(component.onDblClick).toHaveBeenCalled();
  });

  it(methodName(guiTestUtil, guiTestUtil.keyup) + ' works (DebugElement).', () => {
    const textbox = guiTestUtil.query(fixture.debugElement, 'input[type="text"]') as DebugElement;

    const key = 'a';
    spyOn(component, 'onKeyUp');
    guiTestUtil.keyup(textbox, key);
    expect(component.onKeyUp).toHaveBeenCalled();
  });

  it(methodName(guiTestUtil, guiTestUtil.keyup) + ' works (HTMLElement).', () => {
    const textbox = guiTestUtil.query(fixture.nativeElement, 'input[type="text"]') as HTMLElement;

    const key = 'a';
    spyOn(component, 'onKeyUp');
    guiTestUtil.keyup(textbox, key);
    expect(component.onKeyUp).toHaveBeenCalled();
  });
});

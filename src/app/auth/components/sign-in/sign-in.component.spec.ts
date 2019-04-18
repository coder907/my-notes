import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';

import * as guiTestUtil from 'src/app/shared/utils/gui-test-util';
import { name } from 'src/app/shared/utils/test-util';

import { AuthMaterialModule } from '../../auth-material.module';
import { SignInComponent } from './sign-in.component';



describe(name(SignInComponent), () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AuthMaterialModule,
      ],
      declarations: [ SignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  });

  it('Is created.', () => {
    expect(component).toBeTruthy();
  });

  function getUserNameInput(): DebugElement {
    return guiTestUtil.query(fixture.debugElement, 'input[name="userName"]') as DebugElement;
  }

  function getPasswordInput(): DebugElement {
    return guiTestUtil.query(fixture.debugElement, 'input[name="password"]') as DebugElement;
  }

  function getSignInButton(): DebugElement {
    return guiTestUtil.query(fixture.debugElement, 'button[name="signIn"]') as DebugElement;
  }

  function getSpinner(): DebugElement {
    return guiTestUtil.query(fixture.debugElement, 'mat-spinner') as DebugElement;
  }

  function prepareUsernameAndPassword(done: DoneFn) {
    const userName = 'userName';
    getUserNameInput().nativeElement.value = userName;

    const password = 'password';
    getPasswordInput().nativeElement.value = password;

    component.signIn.subscribe(credentials => {
      expect(credentials.userName).toEqual(userName);
      expect(credentials.password).toEqual(password);

      done();
    });
  }

  it('Emits on Sign In button click.', (done) => {
    fixture.detectChanges();

    prepareUsernameAndPassword(done);
    guiTestUtil.click(getSignInButton());
  });

  it('Emits on Username Enter keyup event.', (done) => {
    fixture.detectChanges();

    prepareUsernameAndPassword(done);
    guiTestUtil.keyup(getUserNameInput().nativeElement, 'Enter');
  });

  it('Emits on Password Enter keyup event.', (done) => {
    fixture.detectChanges();

    prepareUsernameAndPassword(done);
    guiTestUtil.keyup(getPasswordInput().nativeElement, 'Enter');
  });

  it('Spinner works.', () => {
    component.isAuthenticating = true;
    fixture.detectChanges();

    const spinner = getSpinner();
    expect(spinner).toBeTruthy();
  });
});

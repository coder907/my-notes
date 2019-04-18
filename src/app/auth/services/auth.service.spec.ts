import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import {
  mock,
  instance,
} from 'ts-mockito';

import { name, methodName, observableValues } from 'src/app/shared/utils/test-util';

import { AuthService } from './auth.service';
import { AuthServiceBackend } from './backend/auth-service-backend';
import { AuthServiceBackendMock } from './backend/auth-service-backend-mock';
import { User } from '../models/user';



const authServiceNames = instance(mock(AuthService));

describe(name(AuthService), () => {
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  let storeSpy: jasmine.SpyObj<Store<User>>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [{
        provide: Router,
        useValue: routerSpyObj,
      }, {
        provide: Store,
        useValue: storeSpyObj,
      }, {
        provide: AuthServiceBackend,
        useClass: AuthServiceBackendMock,
      }]
    });

    authService = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
    storeSpy = TestBed.get(Store);
  });

  it('Is created.', () => {
    expect(authService).toBeTruthy();
  });

  it(methodName(authServiceNames, authServiceNames.redirectToMainPage) + ' works.', () => {
    authService.redirectToMainPage();

    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.mostRecent().args[0]).toEqual(['']);
  });

  it(methodName(authServiceNames, authServiceNames.redirectToSignInPage) + ' works.', () => {
    authService.redirectToSignInPage();

    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.mostRecent().args[0]).toEqual(['signin']);
  });

  function userIds(users: User[]): string[] {
    return users.map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    });
  }

  fit('Sign in with valid credentials works.', fakeAsync(() => {
    const isAuthenticatingValues = observableValues(authService.isAuthenticating$);
    const userValues = observableValues(authService.user$);

    // Initial values.
    expect(isAuthenticatingValues).toEqual([false]);
    expect(userIds(userValues)).toEqual([null]);

    authService.signIn('user', 'test').then(
      signedIn => expect(signedIn).toEqual(true)
    );

    // Wait some.
    tick(50);

    expect(isAuthenticatingValues).toEqual([false, true]);
    expect(userIds(userValues)).toEqual([null]);

    // Wait until after mocked backend returns.
    tick(1000);

    expect(isAuthenticatingValues).toEqual([false, true]);
    expect(userIds(userValues)).toEqual([null, '1']);

    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.mostRecent().args[0]).toEqual(['']);

    // Wait until after isAuthenticating delay completes.
    tick(500);

    expect(isAuthenticatingValues).toEqual([false, true, false]);
    expect(userIds(userValues)).toEqual([null, '1']);
  }));

  it('Sign in with invalid credentials works.', fakeAsync(() => {
    const isAuthenticatingValues = observableValues(authService.isAuthenticating$);
    const userValues = observableValues(authService.user$);
    const authNotValidSignalValues = observableValues(authService.authNotValidSignal$);

    // Initial values.
    expect(isAuthenticatingValues).toEqual([false]);
    expect(userIds(userValues)).toEqual([null]);
    expect(authNotValidSignalValues).toEqual([false]);

    authService.signIn('invalid', 'credentials').then(
      signedIn => expect(signedIn).toEqual(false)
    );

    // Wait some.
    tick(50);

    expect(isAuthenticatingValues).toEqual([false, true]);
    expect(userIds(userValues)).toEqual([null]);
    expect(authNotValidSignalValues).toEqual([false]);

    // Wait until after mocked backend returns.
    tick(1000);

    expect(isAuthenticatingValues).toEqual([false, true, false]);
    expect(userIds(userValues)).toEqual([null]);
    expect(authNotValidSignalValues).toEqual([false, true]);

    // Wait until after authNotValidSignal delay completes.
    tick(750);

    expect(isAuthenticatingValues).toEqual([false, true, false]);
    expect(userIds(userValues)).toEqual([null]);
    expect(authNotValidSignalValues).toEqual([false, true, false]);
  }));

  it('Sign out works.', (done) => {
    const userValues = observableValues(authService.user$);

    // Initial values.
    expect(userIds(userValues)).toEqual([null]);

    authService.signOut().then(() => {
      // After sign out.
      expect(userIds(userValues)).toEqual([null, null]);

      expect(routerSpy.navigate.calls.count()).toEqual(1);
      expect(routerSpy.navigate.calls.mostRecent().args[0]).toEqual(['signin']);

      done();
    });
  });
});

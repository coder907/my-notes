import {
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import * as testUtil from 'src/app/shared/utils/test-util';
import { name } from 'src/app/shared/utils/test-util';

import { User } from '../../models/user';
import { AuthServiceBackendMock } from './auth-service-backend-mock';



describe(name(AuthServiceBackendMock), () => {
  let authServiceBackendMock: AuthServiceBackendMock;

  beforeEach(() => {
    authServiceBackendMock = TestBed.get(AuthServiceBackendMock);
  });

  it('Is created.', () => {
    expect(authServiceBackendMock).toBeTruthy();
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

  it('Sign in with valid credentials works.', fakeAsync(() => {
    const userValues = testUtil.observableValues(authServiceBackendMock.user$);

    // Initial values.
    expect(userIds(userValues)).toEqual([null]);

    authServiceBackendMock.signIn('user', 'test').then(
      signedIn => expect(signedIn).toEqual(true)
    );

    // Wait until simulated server call (sign in) returns.
    tick(1050);

    expect(userIds(userValues)).toEqual([null, '1']);
  }));

  it('Sign in with invalid credentials works.', fakeAsync(() => {
    const userValues = testUtil.observableValues(authServiceBackendMock.user$);

    // Initial values.
    expect(userIds(userValues)).toEqual([null]);

    authServiceBackendMock.signIn('invalid', 'credentials').then(
      signedIn => expect(signedIn).toEqual(false)
    );

    // Wait until simulated server call (sign in) returns.
    tick(1050);

    expect(userIds(userValues)).toEqual([null]);
  }));
});

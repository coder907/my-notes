import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import {
  mock,
  instance,
  when,
} from 'ts-mockito';

import { name, methodName } from 'src/app/shared/utils/test-util';

import { User } from '../models/user';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';



const authGuardServiceNames = instance(mock(AuthGuardService));

describe(name(AuthGuardService), () => {
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    const user$ = of({id: '1'} as User);
    const authServiceMock: AuthService = mock(AuthService);
    when(authServiceMock.user$).thenReturn(user$);

    TestBed.configureTestingModule({
      providers: [{
        provide: AuthService,
        useFactory: () => instance(authServiceMock)
      }]
    });

    authGuardService = TestBed.get(AuthGuardService);
  });

  it('Is created.', () => {
    expect(authGuardService).toBeTruthy();
  });

  it(methodName(authGuardServiceNames, authGuardServiceNames.canActivate) + ' works.', () => {
    authGuardService.canActivate().subscribe(
      result => expect(result).toEqual(true)
    );
  });
});

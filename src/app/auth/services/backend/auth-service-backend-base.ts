import { Observable } from 'rxjs';

import { User } from '../../models/user';



export abstract class AuthServiceBackendBase {

  abstract get user$(): Observable<User>;

  abstract async signIn(userName: string, password: string): Promise<boolean>;

  abstract async signOut(): Promise<boolean>;
}

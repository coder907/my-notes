import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';



export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'https://en.wikipedia.org/wiki/Terms_of_service',
  privacyPolicyUrl: 'https://en.wikipedia.org/wiki/Privacy_policy',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

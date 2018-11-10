import { AppUserClaim } from './app-user-claim';

export class LoginResponse {
  userId = 0;
  userName = '';
  emailAddress = '';
  token = '';
  claims: AppUserClaim[] = [];
}

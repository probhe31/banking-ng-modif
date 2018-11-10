export class AppUserClaim  {
  id = '';
  userId = '';
  type = '';
  value = '';

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }
}

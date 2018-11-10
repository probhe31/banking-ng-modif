export class Account {
  id: number;
  number: string;
  balance: number;
  locked: boolean;

  public constructor(init?: Partial<Account>) {
    Object.assign(this, init);
  }
}

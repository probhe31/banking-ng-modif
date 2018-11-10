export class Customer {
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }

  id: number;
  firstName: string;
  lastName: string;
}

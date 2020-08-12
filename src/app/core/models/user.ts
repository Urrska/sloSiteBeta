export class User {
  uid?: string;
  displayName?: string;
  email: string;
  password?: string;

  constructor(data) {
    Object.assign(this, data);
  }
}

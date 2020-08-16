export class User {
  uid?: string;
  email: string;
  password?: string;

  constructor(data) {
    Object.assign(this, data);
  }
}

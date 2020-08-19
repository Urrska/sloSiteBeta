
export interface Roles {
  subscriber?: boolean;
  admin?: boolean;
}

export class User {
  uid: string;
  email: string;
  role: Roles;

  constructor(data) {
    Object.assign(this, data);
  }
}

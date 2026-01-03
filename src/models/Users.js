export default class User {
  constructor({
    id = null,
    tenant_id = null,
    username = "",
    email = "",
    password = null,
    admin = false,
    signature = null,
  } = {}) {
    this.id = id;
    this.tenant_id = tenant_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.admin = admin;
    this.signature = signature;
  }

  static fromRequest(body = {}) {
    return new User({
      tenant_id: body.tenant_id || body.tenant || null,
      username: body.username,
      email: body.email,
      password: body.password || body.passwordHash || null,
      admin: typeof body.admin !== "undefined" ? body.admin : false,
      signature: body.signature || null,
    });
  }

  toJSON() {
    return {
      id: this.id,
      tenant_id: this.tenant_id,
      username: this.username,
      email: this.email,
      admin: this.admin,
      signature: this.signature,
    };
  }

  toDB() {
    return {
      id: this.id,
      tenant_id: this.tenant_id,
      username: this.username,
      email: this.email,
      password: this.password,
      admin: this.admin,
      signature: this.signature,
    };
  }
}

// @ts-nocheck
import connection from "../database/connection.js";

export default class UsersRepository {
  static async getAll(tenant_id) {
    const connect = await connection.connect();
    const users = await connect.query(
      "SELECT id, username, email, root, admin, signature FROM users WHERE tenant_id = $1",
      [tenant_id]
    );
    connect.release();
    return users.rows;
  }

  static async getById(user: any, tenant_id) {
    const connect = await connection.connect();
    const users = await connect.query(
      "SELECT id, username, root, admin FROM users WHERE id = $1 AND tenant_id = $2",
      [user.id, tenant_id]
    );
    connect.release();
    return users.rows;
  }

  static async getSignature(user: any, tenant_id) {
    const connect = await connection.connect();
    const users = await connect.query(
      "SELECT signature FROM users WHERE id = $1 AND tenant_id = $2",
      [user.id, tenant_id]
    );
    connect.release();
    return users.rows.length > 0 ? users.rows[0].signature : null;
  }

  static async checkUsersExists(user: any) {
    // This stays global as usernames/emails are usually unique per system
    const queryEmail = "SELECT * FROM users WHERE email = $1";
    const queryUsername = "SELECT * FROM users WHERE username = $1";

    const connect = await connection.connect();
    const checkEmail = await connect.query(queryEmail, [user.email]);
    const checkUsername = await connect.query(queryUsername, [user.username]);
    connect.release();

    return [checkEmail.rowCount, checkUsername.rowCount];
  }

  static async register(user: any) {
    const query =
      "INSERT INTO users (tenant_id, username, email, password, root, admin, signature) VALUES ($1, $2, $3, $4, $5, $6, $7)";

    const values = [
      user.tenant_id,
      user.username,
      user.email,
      user.password,
      user.root,
      user.admin,
      user.signature
    ];

    const connect = await connection.connect();
    const register = await connect.query(query, values);
    connect.release();

    return register.rows;
  }

  static async login(user: any) {
    const query = "SELECT * FROM users WHERE username = $1";
    const value = [user.username];
    const connect = await connection.connect();
    const result = await connect.query(query, value);
    connect.release();
    return result.rows;
  }

  static async remove(user: any, tenant_id) {
    const connect = await connection.connect();
    const removed = await connect.query("DELETE FROM users WHERE id = $1 AND tenant_id = $2", [user.id, tenant_id]);
    connect.release();
    return removed.rowCount;
  }
}

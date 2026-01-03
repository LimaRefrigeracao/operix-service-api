import connection from "../database/connection.js";
import bcrypt from "bcrypt";

class UsersRepository {
  static async getAll() {
    const connect = await connection.connect();
    const users = await connect.query(
      "SELECT id, username, email, admin, signature FROM users"
    );
    connect.release();
    return users.rows;
  }

  static async getSignature(id) {
    const connect = await connection.connect();
    const users = await connect.query(
      `SELECT signature FROM users WHERE id = ${id}`
    );
    connect.release();
    return users.rows[0].signature;
  }

  static async checkUsersExists(email, username) {
    const queryEmail = "SELECT * FROM users WHERE email = $1";
    const queryUsername = "SELECT * FROM users WHERE username = $1";

    const valueEmail = [email];
    const valueUsername = [username];

    const connect = await connection.connect();
    const checkEmail = await connect.query(queryEmail, valueEmail);
    const checkUsername = await connect.query(queryUsername, valueUsername);
    connect.release();

    return [checkEmail.rowCount, checkUsername.rowCount];
  }

  static async register(request) {
    const { tenant_id, username, email, passwordHash, admin, signature } = request;

    const query =
      "INSERT INTO users (tenant_id, username, email, password, admin, signature) VALUES ($1, $2, $3, $4, $5, $6)";

    const values = [tenant_id, username, email, passwordHash, admin, signature];

    const connect = await connection.connect();
    const register = await connect.query(query, values);
    connect.release();

    return register.rows;
  }

  static async login(request) {
    const { username, password } = request;
    const query = "SELECT * FROM users WHERE username = $1";
    const value = [username];
    const connect = await connection.connect();
    const user = await connect.query(query, value);
    connect.release();

    if (!user.rows[0]) {
      return false;
    }
    const checkPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!checkPassword) {
      return false;
    }
    return user.rows[0];
  }


  static async verifyRemoveUser(id){
    const connect = await connection.connect();
    const users = await connect.query(
      `SELECT id, username, admin FROM users WHERE id = ${id}`
    );
    connect.release();
    return users.rows;
  }

  static async remove(id) {
    const connect = await connection.connect();
    const removed = await connect.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    connect.release();
    return removed.rowCount;
  }
}

export default UsersRepository;

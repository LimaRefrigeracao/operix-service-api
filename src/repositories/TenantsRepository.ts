// @ts-nocheck
import connection from "../database/connection.js";

class TenantsRepository {
  static tableName = "tenants";

  static async getAll() {
    const connect = await connection.connect();
    const tenants = await connect.query(`SELECT * FROM ${this.tableName}`);
    connect.release();
    return tenants.rows;
  }

  static async create(tenantname) {
    const query = `INSERT INTO ${this.tableName} (name) VALUES ($1)`;

    const values = [tenantname];

    const connect = await connection.connect();
    const created = await connect.query(query, values);
    connect.release();

    return created.rowCount;
  }

  static async remove(id) {
    const connect = await connection.connect();
    const removed = await connect.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    connect.release();
    return removed.rowCount;
  }
}

export default TenantsRepository;

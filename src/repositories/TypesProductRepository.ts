// @ts-nocheck
import connection from "../database/connection.js";

class TypesProductRepository {
  static async getAll(tenant_id) {
    const connect = await connection.connect();
    const types_product = await connect.query("SELECT * FROM types_product WHERE tenant_id = $1", [tenant_id]);
    connect.release();
    return types_product.rows;
  }

  static async create(types_product) {
    const { tenant_id, name } = types_product;
    const query = "INSERT INTO types_product (tenant_id, name) VALUES ($1, $2)";

    const values = [tenant_id, name];

    const connect = await connection.connect();
    const created = await connect.query(query, values);
    connect.release();

    return created.rowCount;
  }

  static async remove(id, tenant_id) {
    const connect = await connection.connect();
    const removed = await connect.query("DELETE FROM types_product WHERE id = $1 AND tenant_id = $2", [id, tenant_id]);
    connect.release();
    return removed.rowCount;
  }
}

export default TypesProductRepository;


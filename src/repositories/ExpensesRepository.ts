// @ts-nocheck
import connection from "../database/connection.js";
import app from "../app.js";

class ExpensesRepository {
  static async reloadSocketData(tenant_id) {
    const data = await this.getAll(tenant_id);
    const { io } = app;
    io.emit("reloadDataExpenses", data);
    return true;
  }

  static async getAll(tenant_id) {
    const connect = await connection.connect();
    const expenses = await connect.query("SELECT * FROM expenses WHERE tenant_id = $1", [tenant_id]);
    connect.release();
    return expenses.rows;
  }

  static async create(expense) {
    const { tenant_id, date, type, description, value } = expense;
    const query = "INSERT INTO expenses (tenant_id, date, type, description, value) VALUES ($1, $2, $3, $4, $5)";

    const values = [tenant_id, date, type, description, value];

    const connect = await connection.connect();
    const created = await connect.query(query, values);
    connect.release();

    await this.reloadSocketData(tenant_id);

    return created.rowCount;
  }

  static async remove(id, tenant_id) {
    const connect = await connection.connect();
    const removed = await connect.query("DELETE FROM expenses WHERE id = $1 AND tenant_id = $2", [id, tenant_id]);
    connect.release();
    await this.reloadSocketData(tenant_id);
    return removed.rowCount;
  }
}

export default ExpensesRepository;


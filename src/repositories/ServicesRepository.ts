// @ts-nocheck
import connection from "../database/connection.js";
import Utils from "../utils/Utils.js";
import OrderOfServiceRepository from "./OrderOfServiceRepository.js";
import StatusPaymentRepository from "./StatusPaymentRepository.js";
import app from "../app.js";

class ServicesRepository {
  static async reloadSocketData(tenant_id, typeTable) {
    let data = null;
    if (typeTable == 1) {
      data = await this.getAll(tenant_id);
    } else if (typeTable == 2) {
      data = await this.getAllWharehouse(tenant_id);
    }
    const { io } = app;
    io.emit("reloadDataService", data);
    return true;
  }

  static async getAllPaid(tenant_id) {
    try {
      const status = await StatusPaymentRepository.getUniqueStatus('Pago', tenant_id);
      const connect = await connection.connect();
      const services = await connect.query(
        "SELECT * FROM services WHERE payment_status = $1 AND tenant_id = $2",
        [status[0].cod, tenant_id]
      );
      connect.release();
      return services.rows;
    } catch (error) {
      console.error("Error in getAllPaid:", error.message);
      throw error;
    }
  }

  static async getAllNotConcluded(tenant_id) {
    const connect = await connection.connect();
    const services = await connect.query(
      "SELECT * FROM services WHERE warehouse_status = false AND status <> 13 AND tenant_id = $1 ORDER BY id DESC",
      [tenant_id]
    );
    connect.release();
    return services.rows;
  }

  static async getAll(tenant_id) {
    const connect = await connection.connect();
    const services = await connect.query(
      "SELECT * FROM services WHERE warehouse_status = false AND tenant_id = $1 ORDER BY id DESC",
      [tenant_id]
    );
    connect.release();
    return services.rows;
  }

  static async getAllWharehouse(tenant_id) {
    const connect = await connection.connect();
    const services = await connect.query(
      "SELECT * FROM services WHERE warehouse_status = true AND tenant_id = $1 ORDER BY created_at_warehouse DESC",
      [tenant_id]
    );
    connect.release();
    return services.rows;
  }

  static async create(service) {
    const {
      tenant_id,
      product,
      client,
      telephone,
      adress,
      status,
      observation,
      created_at,
      typeTable,
    } = service;

    const cod_order = await OrderOfServiceRepository.create(created_at, tenant_id);
    if (cod_order) {
      const query =
        "INSERT INTO services(tenant_id, product, client, telephone, adress, status, payment_status, order_of_service, observation, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

      const values = [
        tenant_id,
        product,
        client,
        telephone,
        adress,
        status,
        1,
        cod_order,
        observation,
        created_at,
      ];

      const connect = await connection.connect();
      const created = await connect.query(query, values);
      connect.release();

      await this.reloadSocketData(tenant_id, typeTable);

      return created.rowCount;
    } else {
      return false;
    }
  }

  static async updateWarehouse(id, tenant_id, value, typeTable) {
    const created_at_warehouse = Utils.generateDateLocale();
    let warehouse_status = null;

    if (value === "false") {
      warehouse_status = true;
    } else {
      warehouse_status = false;
    }

    const query =
      "UPDATE services SET warehouse_status = $1, created_at_warehouse = $2 WHERE id = $3 AND tenant_id = $4";

    const values = [warehouse_status, created_at_warehouse, id, tenant_id];
    const connect = await connection.connect();
    const updated = await connect.query(query, values);
    connect.release();
    await this.reloadSocketData(tenant_id, typeTable);
    return updated.rowCount;
  }

  static async updateInfoClient(id, tenant_id, info) {
    const { product, client, telephone, adress, observation, typeTable } = info;

    const query =
      "UPDATE services SET product = $1, client = $2, telephone = $3, adress = $4, observation = $5 WHERE id = $6 AND tenant_id = $7";

    const values = [product, client, telephone, adress, observation, id, tenant_id];
    const connect = await connection.connect();
    const updated = await connect.query(query, values);
    connect.release();
    await this.reloadSocketData(tenant_id, typeTable);
    return updated.rowCount;
  }

  static async updateStatusService(id, tenant_id, status, typeTable) {
    const updated_at_service = Utils.generateDateLocale();

    const query =
      "UPDATE services SET status = $1, updated_at_service = $2 WHERE id = $3 AND tenant_id = $4 RETURNING id, status";

    const values = [status, updated_at_service, id, tenant_id];
    const connect = await connection.connect();
    const updated = await connect.query(query, values);
    connect.release();

    await this.reloadSocketData(tenant_id, typeTable);

    return updated.rowCount;
  }

  static async updateStatusPayment(id, tenant_id, status, typeTable) {
    const updated_at_payment = Utils.generateDateLocale();

    const query =
      "UPDATE services SET payment_status = $1, updated_at_payment = $2 WHERE id = $3 AND tenant_id = $4";

    const values = [status, updated_at_payment, id, tenant_id];
    const connect = await connection.connect();
    const updated = await connect.query(query, values);
    connect.release();
    await this.reloadSocketData(tenant_id, typeTable);
    return updated.rowCount;
  }

  static async remove(id, tenant_id, cod_order, typeTable) {
    const connect = await connection.connect();
    const removed = await connect.query("DELETE FROM services WHERE id = $1 AND tenant_id = $2", [id, tenant_id]);
    connect.release();
    await this.reloadSocketData(tenant_id, typeTable);
    if (removed.rowCount) {
      await OrderOfServiceRepository.remove(cod_order, tenant_id);
    }
    return removed.rowCount;
  }

  static async getCountProductByService(tenant_id) {
    const connect = await connection.connect();
    const services = await connect.query(
      "SELECT status.name, COUNT(service.status_id) AS count FROM status LEFT JOIN service ON status.id = service.status_id WHERE service.tenant_id = $1 GROUP BY status.name",
      [tenant_id]
    );
    connect.release();
    return services.rows;
  }
}

export default ServicesRepository;


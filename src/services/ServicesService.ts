// @ts-nocheck
import ServicesRepository from "../repositories/ServicesRepository.js";

class ServicesService {
  static async getAll(tenant_id) {
    return ServicesRepository.getAll(tenant_id);
  }

  static async getAllWharehouse(tenant_id) {
    return ServicesRepository.getAllWharehouse(tenant_id);
  }

  static async create(service) {
    return ServicesRepository.create(service);
  }

  static async updateWarehouse(id, tenant_id, value, typeTable) {
    return ServicesRepository.updateWarehouse(id, tenant_id, value, typeTable);
  }

  static async updateInfoClient(id, tenant_id, info) {
    return ServicesRepository.updateInfoClient(id, tenant_id, info);
  }

  static async updateStatusService(id, tenant_id, status, typeTable) {
    return ServicesRepository.updateStatusService(id, tenant_id, status, typeTable);
  }

  static async updateStatusPayment(id, tenant_id, status, typeTable) {
    return ServicesRepository.updateStatusPayment(id, tenant_id, status, typeTable);
  }

  static async remove(id, tenant_id, cod, typeTable) {
    return ServicesRepository.remove(id, tenant_id, cod, typeTable);
  }
}

export default ServicesService;

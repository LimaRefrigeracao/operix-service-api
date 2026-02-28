// @ts-nocheck
import PanelAnalyticalRepository from "../repositories/PanelAnalyticalRepository.js";

class PanelAnalyticalService {
  static async getOrdersPaid(tenant_id) {
    return PanelAnalyticalRepository.getOrdersPaid(tenant_id);
  }

  static async loadExpensesAll(tenant_id) {
    return PanelAnalyticalRepository.loadExpensesAll(tenant_id);
  }
}

export default PanelAnalyticalService;

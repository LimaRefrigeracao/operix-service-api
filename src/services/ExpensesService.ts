// @ts-nocheck
import ExpensesRepository from "../repositories/ExpensesRepository.js";

class ExpensesService {
  static async getAll(tenant_id) {
    return ExpensesRepository.getAll(tenant_id);
  }

  static async create(expense) {
    return ExpensesRepository.create(expense);
  }

  static async remove(id, tenant_id) {
    return ExpensesRepository.remove(id, tenant_id);
  }
}

export default ExpensesService;

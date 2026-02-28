// @ts-nocheck
import ServicesRepository from "./ServicesRepository.js";
import OrderOfServiceRepository from "./OrderOfServiceRepository.js";
import ExpensesRepository from "./ExpensesRepository.js";

class PanelAnalyticalRepository {
  static async getOrdersPaid(tenant_id) {
    try {
      const services_paid = await ServicesRepository.getAllPaid(tenant_id);
      const all_order_of_service = await OrderOfServiceRepository.getAll(tenant_id);

      const data = {
        services_paid,
        all_order_of_service
      };

      const orderOfServices = data.services_paid.map(item => item.order_of_service);
      const filteredOrderOfService = data.all_order_of_service.filter(item => orderOfServices.includes(item.cod_order));

      filteredOrderOfService.forEach(order => {
        const servicePaid = data.services_paid.find(service => service.order_of_service === order.cod_order);
        if (servicePaid) {
          order.updated_at = servicePaid.updated_at_payment;
        }
      });

      return filteredOrderOfService;

    } catch (error) {
      console.error("Error in getOrdersPaid:", error.message);
      throw error;
    }
  }

  static async loadExpensesAll(tenant_id) {
    try {
      const expensesAll = await ExpensesRepository.getAll(tenant_id);
      return expensesAll;
    } catch (error) {
      console.error("Error in loadExpensesAll:", error.message);
      return null;
    }
  }
}

export default PanelAnalyticalRepository;


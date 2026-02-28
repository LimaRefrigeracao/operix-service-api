import type { Request, Response } from 'express';
import OrderOfServiceService from "../services/OrderOfServiceService.js";
import Utils from "../utils/Utils.js";
import ResponseHandler from "../utils/ResponseHandler.js";

export default class OrderOfServiceController {
  static async getAll(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const order_of_service = await OrderOfServiceService.getAll(tenant_id);
    return ResponseHandler.success(res, order_of_service, "Ordens de serviço listadas com sucesso");
  }

  static async getUnique(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { cod } = req.params;
    const order_of_service = await OrderOfServiceService.getUnique(cod, tenant_id);
    return ResponseHandler.success(res, order_of_service, "Ordem de serviço detalhada com sucesso");
  }

  static async updateEstimate(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { cod } = req.params;

    if (req.body.type === "completa") {
      const getOrderValue = await OrderOfServiceService.getUnique(cod, tenant_id);

      const id = Utils.generateUuid();
      let estimateArray = JSON.parse(getOrderValue[0].estimate) || [];

      const newRecord = {
        id: id,
        amount: req.body.amount,
        description: req.body.description,
        price: req.body.price,
      };

      estimateArray.push(newRecord);
      let totalPrice = 0;
      for (const record of estimateArray) {
        totalPrice += record.price;
      }

      const updated = await OrderOfServiceService.updateEstimate(
        JSON.stringify(estimateArray),
        totalPrice,
        cod,
        tenant_id
      );
      return ResponseHandler.success(res, updated, "Orçamento atualizado com sucesso");
    } else {
      const removed = await OrderOfServiceService.removeEstimateSimple(cod, tenant_id);
      if (removed) {
        const getOrderValue = await OrderOfServiceService.getUnique(cod, tenant_id);
        const id = Utils.generateUuid();
        let estimateArray = JSON.parse(getOrderValue[0].estimate) || [];

        const newRecord = {
          id: id,
          amount: req.body.amount,
          description: req.body.description,
          price: req.body.price,
        };

        estimateArray.push(newRecord);
        let totalPrice = 0;
        for (const record of estimateArray) {
          totalPrice += record.price;
        }

        const updated = await OrderOfServiceService.updateEstimate(
          JSON.stringify(estimateArray),
          totalPrice,
          cod,
          tenant_id
        );
        return ResponseHandler.success(res, updated, "Orçamento simplificado atualizado com sucesso");
      }
      return ResponseHandler.error(res, "Erro ao atualizar orçamento simplificado", 422);
    }
  }

  static async removeEstimate(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { cod, idEstimate } = req.params;
    const result = await OrderOfServiceService.removeEstimate(
      cod,
      tenant_id,
      idEstimate
    );
    return ResponseHandler.success(res, result, "Orçamento removido com sucesso", 204);
  }
}


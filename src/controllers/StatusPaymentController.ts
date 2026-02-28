import type { Request, Response } from 'express';
import StatusPaymentService from "../services/StatusPaymentService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import StatusPayment from "../models/StatusPayment.js";

export default class StatusPaymentController {
  static async getAll(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const status_payment = await StatusPaymentService.getAll(tenant_id);
    return ResponseHandler.success(res, status_payment, "Status de pagamento listados com sucesso");
  }

  static async create(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const statusData = StatusPayment.fromRequest({ ...req.body, tenant_id });
    const created = await StatusPaymentService.create(statusData);
    return ResponseHandler.success(res, created, "Status de pagamento criado com sucesso", 201);
  }

  static async remove(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { id } = req.params;
    const result = await StatusPaymentService.remove(id, tenant_id);
    return ResponseHandler.success(res, result, "Status de pagamento removido com sucesso", 204);
  }
}


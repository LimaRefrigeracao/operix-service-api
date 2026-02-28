import type { Request, Response } from 'express';
import StatusServiceService from "../services/StatusServiceService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import StatusService from "../models/StatusService.js";

export default class StatusServiceController {
  static async getAll(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const status_service = await StatusServiceService.getAll(tenant_id);
    return ResponseHandler.success(res, status_service, "Status de serviço listados com sucesso");
  }

  static async create(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const statusData = StatusService.fromRequest({ ...req.body, tenant_id });
    const created = await StatusServiceService.create(statusData);
    return ResponseHandler.success(res, created, "Status de serviço criado com sucesso", 201);
  }

  static async remove(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { id } = req.params;
    const result = await StatusServiceService.remove(id, tenant_id);
    return ResponseHandler.success(res, result, "Status de serviço removido com sucesso", 204);
  }
}


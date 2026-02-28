import type { Request, Response } from 'express';
import TenantsService from '../services/TenantsService';
import ResponseHandler from "../utils/ResponseHandler.js";
import Tenant from "../models/Tenants.js";

export default class TenantsController {
  static async getAll(req: Request, res: Response) {
    const tenants = await TenantsService.getAll();
    return ResponseHandler.success(res, tenants, "Unidades listadas com sucesso");
  }

  static async create(req: Request, res: Response) {
    const tenantData = Tenant.fromRequest(req.body);
    const created = await TenantsService.create(tenantData);
    return ResponseHandler.success(res, created, "Unidade criada com sucesso", 201);
  }

  static async remove(req: Request, res: Response) {
    const result = await TenantsService.remove(req.params.id as string);
    return ResponseHandler.success(res, result, "Unidade removida com sucesso", 204);
  }
}


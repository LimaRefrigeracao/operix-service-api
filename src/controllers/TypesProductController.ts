import type { Request, Response } from 'express';
import TypesProductService from "../services/TypesProductService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import TypeProduct from "../models/TypesProduct.js";

export default class TypesProductController {
  static async getAll(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const types_product = await TypesProductService.getAll(tenant_id);
    return ResponseHandler.success(res, types_product, "Tipos de produto listados com sucesso");
  }

  static async create(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const typeData = TypeProduct.fromRequest({ ...req.body, tenant_id });
    const created = await TypesProductService.create(typeData);
    return ResponseHandler.success(res, created, "Tipo de produto criado com sucesso", 201);
  }

  static async remove(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { id } = req.params;
    const result = await TypesProductService.remove(id, tenant_id);
    return ResponseHandler.success(res, result, "Tipo de produto removido com sucesso", 204);
  }
}


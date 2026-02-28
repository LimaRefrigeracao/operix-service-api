import { type Request, type Response } from 'express';
import UsersService from '../services/UsersService';
import User from '../models/Users';
import ResponseHandler from "../utils/ResponseHandler.js";

export default class UsersController {
  static async getAll(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const users = await UsersService.getAll(tenant_id);
    return ResponseHandler.success(res, users, "Usuários listados com sucesso");
  }

  static async getSignature(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const user = User.fromRequestParams(req.params);
    const signature = await UsersService.getSignature(user, tenant_id);
    return ResponseHandler.success(res, signature, "Assinatura obtida com sucesso");
  }

  static async remove(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const user = User.fromRequestParams(req.params);
    const result = await UsersService.remove(user, tenant_id);
    return ResponseHandler.success(res, result, "Usuário removido com sucesso", 204);
  }
}


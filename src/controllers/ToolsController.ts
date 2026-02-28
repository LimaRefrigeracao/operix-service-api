import type { Request, Response } from 'express';
import ToolsService from "../services/ToolsService.js";
import ResponseHandler from "../utils/ResponseHandler.js";

export default class ToolsController {
  static async getNotifications(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const notification = await ToolsService.getNotifications(tenant_id);
    return ResponseHandler.success(res, notification, "Notificações obtidas com sucesso");
  }
}


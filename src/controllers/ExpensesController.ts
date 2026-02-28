import type { Request, Response } from 'express';
import ExpensesService from "../services/ExpensesService.js";
import Utils from "../utils/Utils.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import Expense from "../models/Expenses.js";

export default class ExpensesController {
  static async getAll(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const expenses = await ExpensesService.getAll(tenant_id);
    return ResponseHandler.success(res, expenses, "Despesas listadas com sucesso");
  }

  static async create(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const expenseData = Expense.fromRequest({ ...req.body, tenant_id });
    expenseData.date = Utils.formatDate(expenseData.date || new Date());

    const result = await ExpensesService.create(expenseData);
    return ResponseHandler.success(res, result, "Despesa criada com sucesso", 201);
  }

  static async remove(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { id } = req.params;
    const result = await ExpensesService.remove(id, tenant_id);
    return ResponseHandler.success(res, result, "Despesa removida com sucesso", 204);
  }
}

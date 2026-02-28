import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
import type { Response } from "express";

export default class Expense {
  id: number | null;
  tenant_id: number | null;
  date: string | null;
  type: string;
  description: string;
  value: number;

  constructor({
    id = null,
    tenant_id = null,
    date = null,
    type = "",
    description = "",
    value = 0,
  }: any = {}) {
    this.id = id;
    this.tenant_id = tenant_id;
    this.date = date;
    this.type = type;
    this.description = description;
    this.value = value;
  }

  static fromRequest(body: any = {}) {
    return new Expense({
      id: body.id || null,
      tenant_id: body.tenant_id || null,
      date: body.date,
      type: body.type,
      description: body.description,
      value: body.value,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new Expense({
      id: params.id
    });
  }

  toJSON() {
    return {
      id: this.id,
      tenant_id: this.tenant_id,
      date: this.date,
      type: this.type,
      description: this.description,
      value: this.value,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    date: z.string().min(1, 'Campo "Data" é obrigatório.').openapi({ example: "2023-11-01" }),
    type: z.string().min(1, 'Campo "Tipo" é obrigatório.').openapi({ example: "Manutenção" }),
    description: z.string().min(1, 'Campo "Descrição" é obrigatório.').openapi({ example: "Compra de fluido refrigerante" }),
    value: z.union([z.string(), z.number()]).refine(val => val !== "", { message: 'Campo "Valor" é obrigatório.' }).openapi({ example: 150.50 })
  }).openapi("Expense");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: Expense.schema
  }).openapi("ExpenseResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(Expense.schema)
  }).openapi("ExpenseListResponse");
}


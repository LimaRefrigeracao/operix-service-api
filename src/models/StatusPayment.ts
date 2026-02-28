import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class StatusPayment {
  id: number | null;
  tenant_id: number | null;
  description: string;
  cod: number | null;
  color: string;

  constructor({
    id = null,
    tenant_id = null,
    description = "",
    cod = null,
    color = "",
  }: any = {}) {
    this.id = id;
    this.tenant_id = tenant_id;
    this.description = description;
    this.cod = cod;
    this.color = color;
  }

  static fromRequest(body: any = {}) {
    return new StatusPayment({
      id: body.id || null,
      tenant_id: body.tenant_id || null,
      description: body.description,
      cod: body.cod,
      color: body.color,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new StatusPayment({
      id: params.id
    });
  }

  toJSON() {
    return {
      id: this.id,
      tenant_id: this.tenant_id,
      description: this.description,
      cod: this.cod,
      color: this.color,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    tenant_id: z.number().nullable().openapi({ example: 1 }),
    description: z.string().min(1, 'Campo "Descrição" é obrigatório.').openapi({ example: "Pago" }),
    cod: z.number().nullable().openapi({ example: 2 }),
    color: z.string().openapi({ example: '{hex: "#00FF00", severity: null}' }),
  }).openapi("StatusPayment");

  static createSchema = z.object({
    cod: z.number().nullable().openapi({ example: 2 }),
    tenant_id: z.number().nullable().openapi({ example: 1 }),
    description: z.string().min(1, 'Campo "Descrição" é obrigatório.').openapi({ example: "Pendente" }),
    color: z.string().openapi({ example: '{hex: "#00FF00", severity: null}' }),
  }).openapi("StatusPaymentCreate");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: StatusPayment.schema
  }).openapi("StatusPaymentResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(StatusPayment.schema)
  }).openapi("StatusPaymentListResponse");
}


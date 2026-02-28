import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class Tenant {
  id: number | null;
  name: string;

  constructor({
    id = null,
    name = "",
  }: any = {}) {
    this.id = id;
    this.name = name;
  }

  static fromRequest(body: any = {}) {
    return new Tenant({
      id: body.id || null,
      name: body.name,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new Tenant({
      id: params.id
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Unidade Central" }),
  }).openapi("Tenant");

  static createSchema = z.object({
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Nova Filial" }),
  }).openapi("TenantCreate");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: Tenant.schema
  }).openapi("TenantResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(Tenant.schema)
  }).openapi("TenantListResponse");
}


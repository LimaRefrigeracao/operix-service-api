import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class TypeProduct {
  id: number | null;
  tenant_id: number | null;
  name: string;

  constructor({
    id = null,
    tenant_id = null,
    name = "",
  }: any = {}) {
    this.id = id;
    this.tenant_id = tenant_id;
    this.name = name;
  }

  static fromRequest(body: any = {}) {
    return new TypeProduct({
      id: body.id || null,
      tenant_id: body.tenant_id || null,
      name: body.name,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new TypeProduct({
      id: params.id
    });
  }

  toJSON() {
    return {
      id: this.id,
      tenant_id: this.tenant_id,
      name: this.name,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Ar Condicionado" }),
  }).openapi("TypeProduct");

  static createSchema = z.object({
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Geladeira" }),
  }).openapi("TypeProductCreate");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: TypeProduct.schema
  }).openapi("TypeProductResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(TypeProduct.schema)
  }).openapi("TypeProductListResponse");
}


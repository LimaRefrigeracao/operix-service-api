import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class StatusService {
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
    return new StatusService({
      id: body.id || null,
      tenant_id: body.tenant_id || null,
      description: body.description,
      cod: body.cod,
      color: body.color,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new StatusService({
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
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    description: z.string().min(1, 'Campo "Descrição" é obrigatório.').openapi({ example: "Em Andamento" }),
    cod: z.number().nullable().optional().openapi({ example: 1 }),
    color: z.string().optional().openapi({ example: "#OOOOFF" }),
  }).openapi("StatusService");

  static createSchema = z.object({
    description: z.string().min(1, 'Campo "Descrição" é obrigatório.').openapi({ example: "Concluído" }),
    color: z.string().optional().openapi({ example: "#00FF00" }),
  }).openapi("StatusServiceCreate");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: StatusService.schema
  }).openapi("StatusServiceResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(StatusService.schema)
  }).openapi("StatusServiceListResponse");
}


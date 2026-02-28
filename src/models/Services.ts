import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class Service {
  id: number | null;
  tenant_id: number | null;
  product: string;
  client: string;
  telephone: string;
  adress: string;
  status: number | null;
  payment_status: number | null;
  order_of_service: number | null;
  observation: string;
  warehouse_status: boolean;
  created_at: string | null;
  updated_at_service: string | null;
  updated_at_payment: string | null;
  created_at_warehouse: string | null;

  constructor({
    id = null,
    tenant_id = null,
    product = "",
    client = "",
    telephone = "",
    adress = "",
    status = null,
    payment_status = null,
    order_of_service = null,
    observation = "",
    warehouse_status = false,
    created_at = null,
    updated_at_service = null,
    updated_at_payment = null,
    created_at_warehouse = null,
  }: any = {}) {
    this.id = id;
    this.tenant_id = tenant_id;
    this.product = product;
    this.client = client;
    this.telephone = telephone;
    this.adress = adress;
    this.status = status;
    this.payment_status = payment_status;
    this.order_of_service = order_of_service;
    this.observation = observation;
    this.warehouse_status = warehouse_status;
    this.created_at = created_at;
    this.updated_at_service = updated_at_service;
    this.updated_at_payment = updated_at_payment;
    this.created_at_warehouse = created_at_warehouse;
  }

  static fromRequest(body: any = {}) {
    return new Service({
      id: body.id || null,
      tenant_id: body.tenant_id || null,
      product: body.product,
      client: body.client,
      telephone: body.telephone,
      adress: body.adress,
      status: body.status,
      payment_status: body.payment_status || 1,
      order_of_service: body.order_of_service || null,
      observation: body.observation,
      warehouse_status: body.warehouse_status || false,
      created_at: body.created_at || null,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new Service({
      id: params.id
    });
  }

  toJSON() {
    return {
      id: this.id,
      tenant_id: this.tenant_id,
      product: this.product,
      client: this.client,
      telephone: this.telephone,
      adress: this.adress,
      status: this.status,
      payment_status: this.payment_status,
      order_of_service: this.order_of_service,
      observation: this.observation,
      warehouse_status: this.warehouse_status,
      created_at: this.created_at,
      updated_at_service: this.updated_at_service,
      updated_at_payment: this.updated_at_payment,
      created_at_warehouse: this.created_at_warehouse,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    product: z.string().min(1, 'Campo "Produto" é obrigatório.').openapi({ example: "Ar Condicionado 12000 BTU" }),
    client: z.string().min(1, 'Campo "Cliente" é obrigatório.').openapi({ example: "João Silva" }),
    telephone: z.string().min(1, 'Campo "Telefone" é obrigatório.').openapi({ example: "(11) 99999-9999" }),
    adress: z.string().optional().openapi({ example: "Rua das Flores, 123" }),
    status: z.union([z.string(), z.number()]).optional().openapi({ example: 1 }),
    payment_status: z.number().optional().openapi({ example: 1 }),
    order_of_service: z.number().nullable().optional().openapi({ example: 1001 }),
    observation: z.string().optional().openapi({ example: "Drenagem obstruída" }),
    warehouse_status: z.boolean().optional().openapi({ example: false }),
    created_at: z.string().nullable().optional().openapi({ example: "2023-11-01 10:00:00" }),
    updated_at_service: z.string().nullable().optional().openapi({ example: "2023-11-01 12:00:00" }),
    updated_at_payment: z.string().nullable().optional().openapi({ example: "2023-11-01 12:00:00" }),
    created_at_warehouse: z.string().nullable().optional().openapi({ example: "2023-11-01 10:00:00" }),
  }).openapi("Service");

  static createSchema = z.object({
    product: z.string().min(1, 'Campo "Produto" é obrigatório.'),
    client: z.string().min(1, 'Campo "Cliente" é obrigatório.'),
    telephone: z.string().min(1, 'Campo "Telefone" é obrigatório.'),
    status: z.union([z.string(), z.number()]).refine(val => val !== "", { message: 'Campo "Status" é obrigatório.' })
  }).openapi("ServiceCreate");

  static updateInfoClientSchema = z.object({
    product: z.string().min(1, 'Campo "Produto" é obrigatório.'),
    client: z.string().min(1, 'Campo "Cliente" é obrigatório.'),
    telephone: z.string().min(1, 'Campo "Telefone" é obrigatório.'),
    adress: z.string().optional(),
    observation: z.string().optional(),
  }).openapi("ServiceUpdateInfoClient");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: Service.schema
  }).openapi("ServiceResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(Service.schema)
  }).openapi("ServiceListResponse");
}


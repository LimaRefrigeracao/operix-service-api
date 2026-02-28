import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import ResponseHandler from "../utils/ResponseHandler.js";

class ValidateMiddleware {
  static validateSchema(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.parseAsync(req.body);

      result.then((data) => {
        req.body = data;
        next();
      }).catch((error) => {
        return ResponseHandler.error(res, "Dados inválidos: " + error.message, 400);
      });
    };
  }
}

export default ValidateMiddleware;

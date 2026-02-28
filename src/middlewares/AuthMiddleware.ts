import type { Request, Response, NextFunction } from "express";
import jwt, { type Secret } from "jsonwebtoken";
import ResponseHandler from "../utils/ResponseHandler.js";

export default class AuthMiddleware {
  static authToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return ResponseHandler.error(res, "Acesso Negado!", 401);
    }

    try {
      const secret: Secret = process.env.SECRET as Secret;
      const decoded = jwt.verify(token, secret);
      (req as any).user = decoded;
      next();
    } catch (error) {
      return ResponseHandler.error(res, "Token Inválido!", 401);
    }
  }
}

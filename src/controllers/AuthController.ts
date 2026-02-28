import type { Request, Response } from 'express';
import AuthService from '../services/AuthService.js';
import Auth from '../models/Auth.js';
import ResponseHandler from "../utils/ResponseHandler.js";

export default class AuthController {
  static async register(req: Request, res: Response) {
    const user = Auth.fromRequest(req.body);
    const register = await AuthService.register(user);
    return ResponseHandler.success(res, register, "Usuário registrado com sucesso", 201);
  }

  static async login(req: Request, res: Response) {
    const user = Auth.fromRequestLogin(req.body);
    const login = await AuthService.login(user);
    return ResponseHandler.success(res, { token: login.token, user: login.userData }, "Login realizado com sucesso");
  }
}

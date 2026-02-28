import UsersRepository from "../repositories/UsersRepository.js";
import ValidationError from "../utils/ValidationError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AuthService {
  static async register(user: any) {
    const checkExists = await UsersRepository.checkUsersExists(user);

    if (checkExists[0] > 0 && checkExists[1] > 0) {
      throw new ValidationError("Este nome de usuário e email já estão cadastrados.", 422);
    }

    if (checkExists[0] > 0) {
      throw new ValidationError("Este email já tem uma conta ativa.", 422);
    }

    if (checkExists[1] > 0) {
      throw new ValidationError("Este nome de usuário já está sendo utilizado.", 422);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;

    return UsersRepository.register(user);
  }

  static async login(user: any) {
    const userResult = await UsersRepository.login(user);
    const userRow = userResult[0] ?? null;

    if (!userRow) {
      throw new ValidationError("Nome de usuário ou Senha incorreta.", 404);
    }
    const checkPassword = await bcrypt.compare(user.password, userRow.password);
    if (!checkPassword) {
      throw new ValidationError("Nome de usuário ou Senha incorreta.", 404);
    }

    return await this.signToken(user, userRow);
  }

  static async signToken(user: any, login: any) {
    const expiration = user.remember ? "7d" : "1d";
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: login.id,
        username: login.username,
        email: login.email,
        root: login.root,
        admin: login.admin,
        tenant_id: login.tenant_id
      },
      secret as string,
      { expiresIn: expiration }
    );

    const decoded = jwt.decode(token);
    return { token: token, userData: decoded };
  }
}

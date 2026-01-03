import UsersService from "../services/usersService.js";
import bcrypt from "bcrypt";

class UsersController {
  static async getAll(_req, res) {
    const users = await UsersService.getAll();
    return res.status(200).json(users);
  }

  static async getSignature(req, res) {
    const { id } = req.params;
    const users = await UsersService.getSignature(id);
    return res.status(200).json(users);
  }

  static async register(req, res) {
    const { tenantname, username, email, password, admin, signature } = req.body;

  const checkExists = await UsersService.checkUsersExists(email, username);

    if (checkExists[0] > 0 && checkExists[1] > 0) {
      return res
        .status(422)
        .json({ msg: "Este nome de usuário e email já estão cadastrados." });
    }

    if (checkExists[0] > 0) {
      return res.status(422).json({ msg: "Este email já tem uma conta ativa." });
    }

    if (checkExists[1] > 0) {
      return res
        .status(422)
        .json({ msg: "Este nome de usuário já está sendo utilizado." });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const dataUser = { username, email, passwordHash, admin, signature };

    try {
      const register = await UsersService.register(dataUser);
      return res.status(200).json(register);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao tentar registrar usuário." });
    }
  }

  static async login(req, res) {
    try {
    const loginResult = await UsersService.login(req.body);

      if (loginResult === false) {
        return res
          .status(404)
          .json({ msg: "Nome de usuário ou Senha incorreta." });
      }

      try {
        const response = await UsersService.signToken(req.body.remember, loginResult);
        return res.status(200).json({ token: response.token, user: response.userData });
      } catch (error) {
        return res.status(500).json({ msg: "Erro na assinatura do token" });
      }
    } catch (error) {
      return res.status(404).json({ msg: "Erro ao tentar realizar login." });
    }
  }

  static async remove(req, res) {
    const { id } = req.params;
    // Removendo usuário via service/repository
    await UsersService.remove(id);
    return res.status(204).json();
  }
}

// Export named handlers for compatibility with current router imports
export const getSignature = (req, res) => UsersController.getSignature(req, res);
export const getAll = (req, res) => UsersController.getAll(req, res);
export const register = (req, res) => UsersController.register(req, res);
export const login = (req, res) => UsersController.login(req, res);
export const remove = (req, res) => UsersController.remove(req, res);

export default UsersController;

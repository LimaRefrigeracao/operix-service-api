import UsersRepository from "../repositories/usersRepository.js";
import jwt from "jsonwebtoken";

class UsersService {
  static async getAll() {
    return UsersRepository.getAll();
  }

  static async getSignature(id) {
    return UsersRepository.getSignature(id);
  }

  static async checkUsersExists(email, username) {
    return UsersRepository.checkUsersExists(email, username);
  }

  static async register(dataUser) {
    return UsersRepository.register(dataUser);
  }

  static async login(body) {
    return UsersRepository.login(body);
  }

  static async signToken(remember, user) {
    let expiration = "";

    if (remember == true) {
      expiration = "6d";
    } else {
      expiration = "1d";
    }

    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        admin: user.admin
      },
      secret,
      { expiresIn: expiration }
    );
    const decoded = jwt.decode(token);
    return { token: token, userData: decoded };
  }

  static async verifyRemoveUser(id) {
    return UsersRepository.verifyRemoveUser(id);
  }

  static async remove(id) {
    return UsersRepository.remove(id);
  }
}

export default UsersService;

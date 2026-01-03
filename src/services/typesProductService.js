import TypesProductRepository from "../repositories/typesProductRepository.js";

class TypesProductService {
  static async getAll() {
    return TypesProductRepository.getAll();
  }

  static async create(data) {
    return TypesProductRepository.create(data);
  }

  static async remove(id) {
    return TypesProductRepository.remove(id);
  }
}

export default TypesProductService;

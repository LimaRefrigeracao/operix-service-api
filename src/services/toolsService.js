import ToolsRepository from "../repositories/toolsRepository.js";

class ToolsService {
  static async getNotifications() {
    return ToolsRepository.getNotifications();
  }
}

export default ToolsService;

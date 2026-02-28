// @ts-nocheck
import ToolsRepository from "../repositories/ToolsRepository.js";

class ToolsService {
  static async getNotifications(tenant_id) {
    return ToolsRepository.getNotifications(tenant_id);
  }
}

export default ToolsService;

import { Customer } from "../models/customer/customers";
import {
  getAuth,
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "../util/firebase";

class CustomerInfoController {
  async getAllInformation(req, res, next) {
    return res.status(200).json({ message: "Get all information" });
  }

  async getInformation(req, res, next) {
    return res.status(200).json({ message: "Get information" });
  }

  async createInformation(req, res, next) {
    return res.status(200).json({ message: "Create information" });
  }

  async updateInformation(req, res, next) {
    return res.status(200).json({ message: "Update information" });
  }

  async deleteInformation(req, res, next) {
    return res.status(200).json({ message: "Delete information" });
  }
}

module.exports = new CustomerInfoController();

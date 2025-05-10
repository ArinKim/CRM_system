import { Customer } from "../models/customer/customers";
import {
  getAuth,
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "../util/firebase";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore();

class CustomerInfoController {
  async getAllInformation(req, res, next) {
    try {
      const usersRef = db.collection("customers");

      usersRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.uid,
          ...doc.data(),
        }));
        // console.log(data);
        return res.status(200).json(data);
      });
    } catch (error) {
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
  }

  async getInformation(req, res, next) {
    return res.status(200).json({ message: "Get information" });
  }

  async createInformation(req, res, next) {
    try {
      // const { customer } = req.body;
      const id = uuidv4();

      const data = new Customer({
        id: id,
        ...req.body,
      }).toJson();

      // console.log(req.body);

      await db.collection("customers").doc(id).set(data);
      return res
        .status(200)
        .json({ message: "Create customer information", id: id });
    } catch (error) {
      console.error("Error creating customer information:", error);
      return res.status(500).json(error);
    }
  }

  async updateInformation(req, res, next) {
    try {
      const { id } = req.params;
      // const { data } = req.body;
      // console.log(id, req);
      const data = new Customer({
        id: id,
        ...req.body,
      }).toJson();
      // console.log(data);

      await db.collection("customers").doc(id).update(data);
      return res.status(200).json({ message: "Update information" });
    } catch (error) {
      console.error("Error updating customer information:", error);
      return res.status(500).json(error);
    }
  }

  async deleteInformation(req, res, next) {
    try {
      const { id } = req.params;
      await db.collection("customers").doc(id).delete();
      return res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);
      return res.status(500).json(error);
    }
  }
}

export default new CustomerInfoController();

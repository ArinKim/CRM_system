import { Customer } from "../models/customer/customers";
import { Sales } from "../models/sales/sales";
import {
  getAuth,
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "../util/firebase";

import { v4 as uuidv4 } from "uuid";

const db = getFirestore();

class SalesInfoController {
  async getAllInformation(req, res, next) {
    try {
      const salesRef = db.collection("sales");

      salesRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getInformation(req, res, next) {
    try {
      const salesRef = db.collection("sales").doc(req.params.id);
      const doc = await salesRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", doc.data());
      }
      return res.status(200).json(doc.data());
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async createInformation(req, res, next) {
    try {
      const { customer, value } = req.body;
      const id = uuidv4();

      const sales = new Sales({
        id: id,
        customer: new Customer({
          id: id,
          ...customer,
        }), // Ensure 'customer' is provided in the request body
        value: value,
      }).toJson();

      await db.collection("sales").doc(id).set(sales);
      return res.status(200).json({ message: "Create information", id: id });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateInformation(req, res, next) {
    try {
      const { customer, value } = req.body;
      const id = req.params.id;

      const sales = new Sales({
        id: id,
        value: value,
      }).toJson();

      console.log(sales);
      await db.collection("sales").doc(id).set(sales, { merge: true });
      return res.status(200).json({ message: "Update information" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteInformation(req, res, next) {
    return res.status(200).json({ message: "Delete information" });
  }
}

module.exports = new SalesInfoController();

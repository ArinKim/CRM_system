import { Customer } from "../models/customer/customers";
import { Sales } from "../models/sales/sales";
import {
  getAuth,
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "../util/firebase";

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
      const { id, value } = req.body;
      const sales = new Sales({
        id: id,
        customer: new Customer({
          id: id,
          company: "",
          service: "",
          email: "",
          phone: "",
        }), // Ensure 'customer' is provided in the request body
        value: value,
      }).toJson();

      await db.collection("sales").doc(id).set(sales);
      return res.status(200).json({ message: "Create information" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ general: "Something went wrong" });
    }
  }

  async updateInformation(req, res, next) {
    return res.status(200).json({ message: "Update information" });
  }

  async deleteInformation(req, res, next) {
    return res.status(200).json({ message: "Delete information" });
  }
}

module.exports = new SalesInfoController();

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
  async getAllSales(req, res, next) {
    try {
      const salesRef = db.collection("sales");
      const snapshot = await salesRef.get();

      if (snapshot.empty) {
        return res.status(404).json({
          error: "No sales records found",
          data: [],
        });
      }

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching sales:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to access sales collection",
        });
      }

      return res.status(500).json({
        error: "Internal server error while fetching sales",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async getSales(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          error: "Sales ID is required",
        });
      }

      const salesRef = db.collection("sales").doc(id);
      const doc = await salesRef.get();

      if (!doc.exists) {
        return res.status(404).json({
          error: `Sales record with ID ${id} not found`,
        });
      }

      return res.status(200).json(doc.data());
    } catch (error) {
      console.error("Error fetching sales record:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to access sales collection",
        });
      }

      return res.status(500).json({
        error: "Internal server error while fetching sales record",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async createSales(req, res, next) {
    try {
      const { customer, value } = req.body;

      if (!customer || !value) {
        return res.status(400).json({
          error: "Customer and value are required",
        });
      }

      const id = uuidv4();
      const sales = new Sales({
        id: id,
        customer: new Customer({
          id: id,
          ...customer,
        }),
        value: value,
      }).toJson();

      await db.collection("sales").doc(id).set(sales);
      return res.status(201).json({
        message: "Sales record created successfully",
        id: id,
      });
    } catch (error) {
      console.error("Error creating sales record:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to create sales record",
        });
      }

      return res.status(500).json({
        error: "Internal server error while creating sales record",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async updateSales(req, res, next) {
    try {
      const { customer, value } = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Sales ID is required",
        });
      }

      const salesRef = db.collection("sales").doc(id);
      const doc = await salesRef.get();

      if (!doc.exists) {
        return res.status(404).json({
          error: `Sales record with ID ${id} not found`,
        });
      }

      const sales = new Sales({
        id: id,
        value: value,
      }).toJson();

      await salesRef.set(sales, { merge: true });
      return res.status(200).json({
        message: "Sales record updated successfully",
      });
    } catch (error) {
      console.error("Error updating sales record:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to update sales record",
        });
      }

      return res.status(500).json({
        error: "Internal server error while updating sales record",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async deleteSales(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Sales ID is required",
        });
      }

      const salesRef = db.collection("sales").doc(id);
      const doc = await salesRef.get();

      if (!doc.exists) {
        return res.status(404).json({
          error: `Sales record with ID ${id} not found`,
        });
      }

      await salesRef.delete();
      return res.status(200).json({
        message: "Sales record deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting sales record:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to delete sales record",
        });
      }

      return res.status(500).json({
        error: "Internal server error while deleting sales record",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = new SalesInfoController();

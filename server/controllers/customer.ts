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
  async getAllCustomer(req, res, next) {
    try {
      const customersRef = db.collection("customers");
      const snapshot = await customersRef.get();

      if (snapshot.empty) {
        return res.status(404).json({
          error: "No customers found",
          data: [],
        });
      }

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching customers:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to access customers collection",
        });
      }

      return res.status(500).json({
        error: "Internal server error while fetching customers",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async getCustomer(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Customer ID is required",
        });
      }

      const customerRef = db.collection("customers").doc(id);
      const doc = await customerRef.get();

      if (!doc.exists) {
        return res.status(404).json({
          error: `Customer with ID ${id} not found`,
        });
      }

      return res.status(200).json(doc.data());
    } catch (error) {
      console.error("Error fetching customer:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to access customer",
        });
      }

      return res.status(500).json({
        error: "Internal server error while fetching customer",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async createCustomer(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          error: "Customer data is required",
        });
      }

      const id = uuidv4();
      const data = new Customer({
        id: id,
        ...req.body,
      }).toJson();

      await db.collection("customers").doc(id).set(data);
      return res.status(201).json({
        message: "Customer created successfully",
        id: id,
      });
    } catch (error) {
      console.error("Error creating customer:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to create customer",
        });
      }

      return res.status(500).json({
        error: "Internal server error while creating customer",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Customer ID is required",
        });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          error: "Update data is required",
        });
      }

      const customerRef = db.collection("customers").doc(id);
      const doc = await customerRef.get();

      if (!doc.exists) {
        return res.status(404).json({
          error: `Customer with ID ${id} not found`,
        });
      }

      const data = new Customer({
        id: id,
        ...req.body,
      }).toJson();

      await customerRef.update(data);
      return res.status(200).json({
        message: "Customer updated successfully",
      });
    } catch (error) {
      console.error("Error updating customer:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to update customer",
        });
      }

      return res.status(500).json({
        error: "Internal server error while updating customer",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const { id } = req.params;
      await db.collection("customers").doc(id).delete();
      return res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);

      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to delete customer",
        });
      }

      return res.status(500).json({
        error: "Internal server error while deleting customer",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default new CustomerInfoController();

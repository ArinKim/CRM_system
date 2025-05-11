import { createError } from "../error";
import { User } from "../models/user/user";
import { db } from "../util/admin";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  getFirestore,
} from "../util/firebase";

class userInfoController {
  async getAllUser(req, res, next) {
    try {
      const usersRef = db.collection("users");

      usersRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          uid: doc.data().uid,
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

  async getUser(req, res, next) {
    try {
      const usersRef = db.collection("users").doc(req.params.uid);
      const doc = await usersRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", doc.data());
      }
      return res.status(200).json(doc.data());
    } catch (error) {
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
  }

  async getUsersByRole(req, res, next) {
    try {
      const { role } = req.params;

      if (!role) {
        return res.status(400).json({
          error: "Role parameter is required",
        });
      }

      const usersRef = db.collection("users").where("role", "==", role);

      const snapshot = await usersRef.get();

      if (snapshot.empty) {
        return res.status(404).json({
          error: `No users found with role: ${role}`,
          data: [],
        });
      }

      const data = snapshot.docs.map((doc) => ({
        uid: doc.data().uid,
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
        country: doc.data().country,
        lastLogin: doc.data().lastLogin,
      }));

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching users by role:", error);

      // Handle specific Firestore errors
      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to access users collection",
        });
      }

      if (error.code === "invalid-argument") {
        return res.status(400).json({
          error: "Invalid role parameter",
        });
      }

      // Handle any other unexpected errors
      return res.status(500).json({
        error: "Internal server error while fetching users",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async updateUser(req, res, next) {
    try {
      const currentUser = res.locals.user;
      const newUser = new User(req.body);
      newUser.uid = currentUser.uid;
      newUser.email = currentUser.email;
      console.log(newUser);
      await db.collection("users").doc(currentUser.uid).set(newUser.toJson());
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user details:", error);

      // Handle specific Firestore errors
      if (error.code === "permission-denied") {
        return res.status(403).json({
          error: "Permission denied to access users collection",
        });
      }

      if (error.code === "invalid-argument") {
        return res.status(400).json({
          error: "Invalid role parameter",
        });
      }

      // Handle any other unexpected errors
      return res.status(500).json({
        error: "Internal server error while fetching users",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async deleteUser(req, res, next) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again :)" });
  }
}

module.exports = new userInfoController();

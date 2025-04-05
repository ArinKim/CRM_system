import { createError } from "../error";
import { User } from "../models/user/users";
import { db } from "../util/admin";

import { getAuth, getFirestore } from "../util/firebase";

class userInfoController {
  async getAllInformation(req, res, next) {
    try {
      const usersRef = db.collection("users");

      usersRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          uid: doc.uid,
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

  async updateInformation(req, res, next) {
    try {
      const currentUser = res.locals.user;
      const newUser = new User(req.body);
      newUser.uid = currentUser.uid;
      newUser.email = currentUser.email;
      // console.log(newUser);
      await db.collection("users").doc(currentUser.uid).set(newUser.toJson());
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again :)" });
    }
  }

  async deleteInformation(req, res, next) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again :)" });
  }
}

module.exports = new userInfoController();

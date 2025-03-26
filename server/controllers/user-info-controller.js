const { createError } = require("../error.js");
const User = require("../models/users.js");
const { db } = require("../util/admin.js");

const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  getFirestore,
} = require("../util/firebase.js");

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

  async createInformation(req, res, next) {
    try {
      const newUser = new User(req.body);
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again :)" });
    }
  }

  async updateInformation(req, res, next) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again :)" });
  }

  async deleteInformation(req, res, next) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again :)" });
  }
}

module.exports = new userInfoController();

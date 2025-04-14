import { admin } from "../util/admin.js";
import { createError } from "../error.js";

const verifyToken = async (req, res, next) => {
  try {
    console.log("Check whether request is with Firebase ID token");
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      createError(
        401,
        "No Firebase ID token found in the Authorization header."
      );
      res.status(401).send("Missing necessary information");
      return;
    }
    // Read the ID Token from the Authorization header.
    const idToken = authHeader.split("Bearer ")[1];
    if (!idToken) {
      createError(401, "Malformed Authorization header.");
      res.status(401).send("Malformed Data");
      return;
    }
    const decodedIdToken = await admin.auth().verifyIdToken(idToken, true);
    // console.log("Valid ID token", decodedIdToken);
    // return decodedIdToken;
    res.locals.user = decodedIdToken;
    next();
  } catch (error) {
    createError(401, error);
    res.status(401).json({ error: "Failed to authenticate." });
  }
};

module.exports = verifyToken;

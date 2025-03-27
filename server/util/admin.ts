// var admin = require("firebase-admin");
import admin from "firebase-admin";

var serviceAccount = require("../../server/crm-project-6fb6d-firebase-adminsdk-fbsvc-e8cb87855a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export { admin, db };

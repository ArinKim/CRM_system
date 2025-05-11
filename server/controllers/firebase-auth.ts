const {
  getFirestore,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../util/firebase");
const { admin } = require("../util/admin");

const auth = getAuth();

const db = getFirestore();

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        error: "Validation failed",
        details: {
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
        },
      });
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(async () => {
            try {
              await db
                .collection("users")
                .doc(`${userCredential.user.uid}`)
                .set({
                  uid: userCredential.user.uid,
                  email: userCredential.user.email,
                });

              res.status(201).json({
                message: "Verification email sent! User created successfully!",
                uid: userCredential.user.uid,
              });
            } catch (error) {
              console.error("Error creating user document:", error);
              res.status(500).json({
                error: "Error creating user document",
                details:
                  process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
              });
            }
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
            res.status(500).json({
              error: "Error sending verification email",
              details:
                process.env.NODE_ENV === "development"
                  ? error.message
                  : undefined,
            });
          });
      })
      .catch((error) => {
        console.error("Error registering user:", error);

        // Handle specific Firebase Auth errors
        switch (error.code) {
          case "auth/email-already-in-use":
            res.status(409).json({
              error: "Email is already registered",
            });
            break;
          case "auth/invalid-email":
            res.status(400).json({
              error: "Invalid email format",
            });
            break;
          case "auth/weak-password":
            res.status(400).json({
              error: "Password is too weak",
            });
            break;
          default:
            res.status(500).json({
              error: "Error registering user",
              details:
                process.env.NODE_ENV === "development"
                  ? error.message
                  : undefined,
            });
        }
      });
  }

  loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        error: "Validation failed",
        details: {
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
        },
      });
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const idToken = userCredential._tokenResponse.idToken;
        if (idToken) {
          res.status(200).json({
            message: "User logged in successfully",
            userCredential,
          });
        } else {
          res.status(500).json({
            error: "Failed to generate authentication token",
          });
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);

        // Handle specific Firebase Auth errors
        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            res.status(401).json({
              error: "Invalid email or password",
            });
            break;
          case "auth/invalid-email":
            res.status(400).json({
              error: "Invalid email format",
            });
            break;
          case "auth/user-disabled":
            res.status(403).json({
              error: "Account has been disabled",
            });
            break;
          default:
            res.status(500).json({
              error: "Error logging in",
              details:
                process.env.NODE_ENV === "development"
                  ? error.message
                  : undefined,
            });
        }
      });
  }

  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie("access_token");
        res.status(200).json({
          message: "User logged out successfully",
        });
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        res.status(500).json({
          error: "Error logging out",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        });
      });
  }

  resetPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({
        error: "Validation failed",
        details: {
          email: "Email is required",
        },
      });
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.status(200).json({
          message: "Password reset email sent successfully!",
        });
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);

        // Handle specific Firebase Auth errors
        switch (error.code) {
          case "auth/user-not-found":
            res.status(404).json({
              error: "No account found with this email",
            });
            break;
          case "auth/invalid-email":
            res.status(400).json({
              error: "Invalid email format",
            });
            break;
          default:
            res.status(500).json({
              error: "Error sending password reset email",
              details:
                process.env.NODE_ENV === "development"
                  ? error.message
                  : undefined,
            });
        }
      });
  }
}

module.exports = new FirebaseAuthController();

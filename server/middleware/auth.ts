import { admin } from "../util/admin.js";
import { createError } from "../error.js";
import { Request, Response, NextFunction } from "express";

interface DecodedIdToken {
  uid: string;
  email?: string;
  [key: string]: any;
}

class AuthenticationError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = "AuthenticationError";
  }
}

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("[Auth] Verifying Firebase ID token");
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new AuthenticationError("Authorization header is missing");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError(
        "Authorization header must start with 'Bearer '"
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    if (!idToken) {
      throw new AuthenticationError(
        "ID token is missing from Authorization header"
      );
    }

    try {
      const decodedIdToken: DecodedIdToken = await admin
        .auth()
        .verifyIdToken(idToken, true);
      console.log(
        `[Auth] Successfully authenticated user: ${decodedIdToken.uid}`
      );
      res.locals.user = decodedIdToken;
      next();
    } catch (firebaseError) {
      console.error(
        "[Auth] Firebase token verification failed:",
        firebaseError
      );
      throw new AuthenticationError("Invalid or expired ID token");
    }
  } catch (error) {
    console.error("[Auth] Authentication error:", error);

    if (error instanceof AuthenticationError) {
      res.status(error.statusCode).json({
        error: error.message,
        status: error.statusCode,
      });
    } else {
      res.status(500).json({
        error: "Internal server error during authentication",
        status: 500,
      });
    }
  }
};

export default verifyToken;

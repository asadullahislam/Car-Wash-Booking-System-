import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Middleware to authenticate the user
export const auth = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route. Token is missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded, process.env.JWT_SECRET);
    req.user = decoded as { id: string; role: string }; // Cast decoded token to the user object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

// Middleware to authorize admins only
export const adminAuth = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      statusCode: 403,
      message: "Access denied. Admins only.",
    });
  }
  next();
};

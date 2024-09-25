// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export interface UserRequest extends Request {
//   user?: {
//     id: string;
//     role: string;
//   };
// }

// // Middleware to authenticate the user
// export const auth = (req: UserRequest, res: Response, next: NextFunction) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   // console.log(token);

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       statusCode: 401,
//       message: "You have no access to this route. Token is missing.",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     console.log(decoded, process.env.JWT_SECRET);
//     req.user = decoded as { id: string; role: string }; // Cast decoded token to the user object
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({
//       success: false,
//       statusCode: 401,
//       message: "Invalid or expired token. Please login again.",
//     });
//   }
// };

// // Middleware to authorize admins only
// export const adminAuth = (
//   req: UserRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({
//       success: false,
//       statusCode: 403,
//       message: "Access denied. Admins only.",
//     });
//   }
//   next();
// };

// authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../app/modules/user/user.model";
import { TUser } from "../app/modules/user/user.interface";
// Adjust if you need the User type

// Middleware to authenticate the user and attach the user data to the request object
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    // Verify the JWT token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Fetch the user from the database
    const user: TUser | null = await UserModel.findById(decoded._id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    // Attach the authenticated user to the request object for future access
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};

// Middleware to restrict access to regular users (not admins)
export const userOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === "admin") {
    return res
      .status(403)
      .json({ message: "Admins are not allowed to book services" });
  }
  next();
};

// Middleware to restrict access to admins only
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

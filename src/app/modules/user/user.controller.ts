import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TUser, userValidationSchema } from "./user.interface";
import { userServices } from "./user.service";

const signUp = async (req: Request, res: Response) => {
  const validation = userValidationSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid user data",
      error: validation.error.errors,
    });
  }

  const { name, email, password, phone, address, role }: TUser = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await userServices.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    if (user) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User registered successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          address: user.address,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Error registering user",
        error: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error registering user",
      error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userServices.findUserByEmail({ email });

    // If user is not found or password does not match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      // "b05d112ccd2d3637f758c3618a45a98244ebb8844c1c8b7c1b4c34b864c7174562feae55fe944fa0aee0ae7ac13249d467b149482641f9c76f011c40de69986a",
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Respond with token and user data
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    // Handle any errors that occur during login
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error logging in",
      error: error,
    });
  }
};

export const userController = {
  signUp,
  login,
};

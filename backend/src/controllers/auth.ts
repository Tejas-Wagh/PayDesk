import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { SignUpType, SignInType } from "../config/types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const parse = SignUpType.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }

    const existingUser = await User.findOne({
      email: parse.data.email,
    });

    console.log(existingUser);

    if (existingUser)
      return res.status(400).json({
        message: "User already existed",
      });

    const hashedPass = bcrypt.hashSync(parse.data.password, 10);

    const newUser = new User({
      name: parse.data.name,
      email: parse.data.email,
      password: hashedPass,
    });
    const result = await newUser.save();

    const token = jwt.sign(
      {
        id: result._id,
      },
      process.env.JWT_SECRET as string
    );

    res.cookie("token", token, {
      httpOnly: true, // not accessible by JS (protects from XSS)
      secure: false, // true in production (HTTPS)
      sameSite: "lax", // or "strict" / "none"
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    return res.status(201).json({
      message: "User created successfully",
      data: result,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while signing up",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const parse = SignInType.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }

    const existingUser = await User.findOne({
      email: parse.data.email,
    });

    if (!existingUser)
      return res.status(400).json({
        message: "User does not exist",
      });

    const passwordMatch = bcrypt.compareSync(
      parse.data.password,
      existingUser.password
    );

    if (!passwordMatch)
      return res.status(400).json({
        message: "Incorrect password",
      });

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET as string
    );

    res.cookie("token", token, {
      httpOnly: true, // not accessible by JS (protects from XSS)
      secure: false, // true in production (HTTPS)
      sameSite: "lax", // or "strict" / "none"
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.status(200).json({
      message: "User signed in successfully",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error occured while signing in",
    });
  }
};

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userId = decoded.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Error occured while validating user",
    });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error occured while fetching user details",
    });
  }
};

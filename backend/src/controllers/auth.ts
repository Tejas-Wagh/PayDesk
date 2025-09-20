import type { Request, Response } from "express";
import { User } from "../models/user.js";
import { SignUpType, SignInType } from "../config/types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    res.status(201).json({
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

import express, { type Request, type Response } from "express";
import { signIn, signUp } from "../controllers/auth.js";

export const Router = express.Router();
Router.post("/sign-up", signUp);
Router.post("/sign-in", signIn);

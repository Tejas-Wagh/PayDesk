import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { Router as AuthRouter } from "./routes/authRouter.js";
import { Router as InvoiceRouter } from "./routes/invoiceRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", AuthRouter);
app.use("/api", InvoiceRouter);

app.listen(PORT, () => {
  console.log("Server started on port:" + PORT);
});

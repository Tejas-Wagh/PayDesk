import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
} from "../controllers/invoice.js";
import { validateUser } from "../controllers/auth.js";

export const Router = express.Router();

Router.get("/invoices/:userId", validateUser, getAllInvoices);
Router.get("/invoice/:id", validateUser, getInvoiceById);
Router.post("/invoice", validateUser, createInvoice);
Router.put("/invoice/:id", validateUser, updateInvoice);
Router.delete("/invoice/:id", validateUser, deleteInvoice);

import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
} from "../controllers/invoice.js";

export const Router = express.Router();

Router.get("/invoices/:userId", getAllInvoices);
Router.get("/invoice/:id", getInvoiceById);
Router.post("/invoice", createInvoice);
Router.put("/invoice/:id", updateInvoice);
Router.delete("/invoice/:id", deleteInvoice);

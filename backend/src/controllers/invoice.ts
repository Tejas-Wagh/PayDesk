import type { Request, Response } from "express";
import { Invoice } from "../models/invoice.js";
import { InvoiceTypes, UpdateInvoiceTypes } from "../config/types.js";

export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    console.log(req.params.userId);

    const invoices = await Invoice.find({
      userId: req.params.userId,
    });

    return res.status(200).json(invoices);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching invoices",
    });
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    return res.json(invoice);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching invoice",
    });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    await Invoice.deleteOne({
      _id: req.params.id,
    });

    return res.json({
      message: "Invoice deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting the invoice",
    });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const parsedData = InvoiceTypes.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid data provided",
      });
    }

    const newInvoice = new Invoice(parsedData.data);
    console.log(newInvoice);

    await newInvoice.save();

    return res.json(newInvoice);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error creating invoice",
    });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice)
      return res.status(400).json({
        message: "Invoice not found",
      });

    const parsedInvoice = UpdateInvoiceTypes.safeParse(req.body);
    console.log(parsedInvoice);

    if (!parsedInvoice.success)
      return res.status(400).json({
        message: "Invalid input",
      });

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNumber:
          parsedInvoice.data.invoiceNumber || invoice.invoiceNumber,
        invoiceDate: parsedInvoice.data.invoiceDate || invoice.invoiceDate,
        dueDate: parsedInvoice.data.dueDate || invoice.dueDate,
        billFrom: {
          businessName:
            parsedInvoice.data.billFrom?.businessName ||
            invoice.billFrom.businessName,
          email: parsedInvoice.data.billFrom?.email || invoice.billFrom.email,
          address:
            parsedInvoice.data.billFrom?.address || invoice.billFrom.address,
          phone: parsedInvoice.data.billFrom?.phone || invoice.billFrom.phone,
        },
        billTo: {
          clientName:
            parsedInvoice.data.billTo?.clientName || invoice.billTo.clientName,
          email: parsedInvoice.data.billTo?.email || invoice.billTo.email,
          address: parsedInvoice.data.billTo?.address || invoice.billTo.address,
          phone: parsedInvoice.data.billTo?.phone || invoice.billTo.phone,
        },
        items: parsedInvoice.data.items || invoice.items,
        notes: parsedInvoice.data.notes || invoice.notes,
        terms: parsedInvoice.data.terms || invoice.terms,
        total: parsedInvoice.data.total || invoice.total,
      },
      { new: true }
    );

    return res.json(updatedInvoice);
  } catch (err) {
    return res.status(500).json({
      message: "Error updating the invoice",
    });
  }
};

import z from "zod";

export const SignInType = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const SignUpType = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});

export const InvoiceTypes = z.object({
  invoiceNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  billFrom: z.object({
    businessName: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
  }),
  billTo: z.object({
    clientName: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
  }),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      total: z.number(),
      taxPercent: z.number(),
    })
  ),
  notes: z.string().optional(),
  terms: z.string().optional(),
  total: z.number(),
  userId: z.string(),
});

export const UpdateInvoiceTypes = z.object({
  invoiceNumber: z.string().optional(),
  invoiceDate: z.string().optional(),
  dueDate: z.string().optional(),
  billFrom: z.object({
    businessName: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }).optional(),
  billTo: z.object({
    clientName: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }).optional(),
  items: z
    .array(
      z
        .object({
          name: z.string().optional(),
          quantity: z.number().optional(),
          unitPrice: z.number().optional(),
          total: z.number().optional(),
          taxPercent: z.number().optional(),
        })
        .optional()
    )
    .optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
  total: z.number().optional(),
});

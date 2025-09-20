import mongoose from "mongoose";

export interface IInvoice extends mongoose.Document {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  billFrom: {
    businessName: string;
    email: string;
    address: string;
    phone: string;
  };
  billTo: {
    clientName: string;
    email: string;
    address: string;
    phone: string;
  };
  items: [
    {
      name: {
        type: String;
        required: true;
      };
      quantity: {
        type: Number;
        required: true;
      };
      unitPrice: {
        type: Number;
        required: true;
      };
      total: {
        type: Number;
        required: true;
      };
      taxPercent: {
        type: Number;
        default: 0;
      };
    }
  ];
  notes?: string;
  terms?: string;
  total: number;
  userId: mongoose.Types.ObjectId;
}

const invoiceSchema = new mongoose.Schema<IInvoice>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    billFrom: {
      businessName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    billTo: {
      clientName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
        taxPercent: {
          type: Number,
          default: 0,
        },
      },
    ],
    notes: {
      type: String,
      required: false,
    },
    terms: {
      type: String,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model<IInvoice>("invoice", invoiceSchema);

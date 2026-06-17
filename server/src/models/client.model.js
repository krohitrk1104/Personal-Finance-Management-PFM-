//This Model of schema for Business Owner that track expense and revenue to their vendor, employee, client.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,   // the business owner
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['client', 'vendor', 'employee'],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    gstNumber: {
      type: String,
      trim: true,
      default: null,
    },
    totalRevenue: {
      type: Number,
      default: 0,       // sum of all transactions where this client paid you
    },
    totalExpense: {
      type: Number,
      default: 0,       // sum of all payments made to this vendor/employee
    },
    linkedTransactionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

clientSchema.index({ userId: 1 });
clientSchema.index({ userId: 1, type: 1 });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
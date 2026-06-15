const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    merchant: {
      type: String,
      trim: true,
      default: null,
    },
    category: {
      type: String,
      default: 'Uncategorized',
    },
    subCategory: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['pending', 'cleared', 'reconciled'],
      default: 'cleared',
    },
    transactionDate: {
      type: Date,
      required: true,
    },

    // --- Business owner extras ---
    invoiceRef: {
      type: String,
      trim: true,
      default: null,   // invoice number for B2B transactions
    },
    gstApplicable: {
      type: Boolean,
      default: false,
    },
    gstAmount: {
      type: Number,
      default: null,
    },
    vendorName: {
      type: String,
      trim: true,
      default: null,
    },

    // --- Salaried extras ---
    isSalaryCredit: {
      type: Boolean,
      default: false,   // flag the monthly salary transaction
    },
    payslipRef: {
      type: String,
      trim: true,
      default: null,
    },

    // --- Student extras ---
    isPocketMoney: {
      type: Boolean,
      default: false,   // allowance received from parents
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ userId: 1, transactionDate: -1 });
transactionSchema.index({ accountId: 1, transactionDate: -1 });
transactionSchema.index({ userId: 1, category: 1, transactionDate: -1 });
transactionSchema.index({ userId: 1, isSalaryCredit: 1 });
transactionSchema.index({ userId: 1, gstApplicable: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
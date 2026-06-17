const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionGroupSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,    // "Employee Salaries", "Office Rent", "Raw Material"
    },
    type: {
      type: String,
      enum: ['expense', 'revenue'],
      required: true,
    },
    color: {
      type: String,
      default: '#378ADD', // for UI label rendering
    },
    transactionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],                  // transactions manually or auto-tagged to this group
    totalAmount: {
      type: Number,
      default: 0,       // recomputed on every addition
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

transactionGroupSchema.index({ userId: 1 });
transactionGroupSchema.index({ userId: 1, type: 1 });

const TransactionGroup = mongoose.model('TransactionGroup', transactionGroupSchema);
module.exports = TransactionGroup;
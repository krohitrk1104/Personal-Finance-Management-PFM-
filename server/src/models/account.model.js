const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Extended type enum — business owners need current + GST accounts
    type: {
      type: String,
      enum: [
        'savings',       // all types
        'current',       // business
        'salary',        // salaried
        'credit',        // all types
        'loan',          // all types
        'investment',    // all types
        'wallet',        // student + all
        'gst',           // business only
        'fixed_deposit', // all types
      ],
      required: true,
    },

    // Who this account type is intended for (for UI filtering)
    intendedFor: {
      type: String,
      enum: ['business', 'salaried', 'student', 'all'],
      default: 'all',
    },

    institutionName: {
      type: String,
      trim: true,
      default: null,
    },
    accountNumber: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },

    // Business specific
    gstLinked: {
      type: Boolean,
      default: false,   // true if this account is used for GST filings
    },

    // Salaried-specific
    isSalaryAccount: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    lastSyncedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.index({ userId: 1 });
accountSchema.index({ userId: 1, isActive: 1 });
accountSchema.index({ userId: 1, type: 1 });

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
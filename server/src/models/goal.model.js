const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,       // "Buy a bike", "Trip", "Emergency Fund"
    },
    category: {
      type: String,
      enum: ['vehicle', 'property', 'travel', 'education', 'emergency_fund', 'retirement', 'other'],
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    savedAmount: {
      type: Number,
      default: 0,       // updated as user marks contributions
    },
    targetDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['active', 'achieved', 'cancelled'],
      default: 'active',
    },
    linkedAccountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      default: null,    // optional: user ties goal to a specific savings account
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

goalSchema.index({ userId: 1, status: 1 });

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
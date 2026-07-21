const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Utilities', 'Rent', 'Subscriptions', 'Insurance', 'Credit Card', 'Other'],
    default: 'Other'
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Overdue', 'Due Soon', 'Upcoming'],
    default: 'Upcoming'
  },
  paidDate: {
    type: Date
  },
  notifyBefore: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);

const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  sector: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  pattern: {
    type: String,
    required: true,
    trim: true
  },
  volumeSurge: {
    type: Boolean,
    default: false
  },
  timeframe: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  keySupport: {
    type: Number,
    required: true
  },
  target1: {
    type: Number,
    required: true
  },
  target2: {
    type: Number,
    required: true
  },
  stopLoss: {
    type: Number,
    required: true
  },
  potentialScore: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stock', StockSchema);

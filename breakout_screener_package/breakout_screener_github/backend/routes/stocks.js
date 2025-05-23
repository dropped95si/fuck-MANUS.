const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const auth = require('../middleware/auth');

// @route   GET api/stocks
// @desc    Get all stocks based on subscription
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let stocks;
    
    // If user has premium subscription, return all stocks
    if (req.user.subscription === 'premium') {
      stocks = await Stock.find().sort({ potentialScore: -1 });
    } else {
      // For free users, return only one featured non-premium stock
      stocks = await Stock.find({ isPremium: false, isFeatured: true }).limit(1);
    }
    
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/stocks/:id
// @desc    Get stock by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    
    if (!stock) {
      return res.status(404).json({ msg: 'Stock not found' });
    }
    
    // Check if user has access to premium content
    if (stock.isPremium && req.user.subscription !== 'premium') {
      return res.status(403).json({ msg: 'Premium subscription required to access this content' });
    }
    
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Stock not found' });
    }
    
    res.status(500).send('Server error');
  }
});

// @route   POST api/stocks/refresh
// @desc    Manually refresh stock data
// @access  Private (Admin only)
router.post('/refresh', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to perform this action' });
    }
    
    // In a real implementation, this would call external APIs to fetch fresh data
    // For now, we'll just update the lastUpdated timestamp on all stocks
    
    await Stock.updateMany({}, { lastUpdated: Date.now() });
    
    res.json({ msg: 'Stock data refreshed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/stocks
// @desc    Add a new stock
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to perform this action' });
    }
    
    const {
      ticker,
      company,
      sector,
      price,
      pattern,
      volumeSurge,
      timeframe,
      notes,
      keySupport,
      target1,
      target2,
      stopLoss,
      potentialScore,
      isFeatured,
      isPremium
    } = req.body;
    
    // Create new stock
    const newStock = new Stock({
      ticker,
      company,
      sector,
      price,
      pattern,
      volumeSurge,
      timeframe,
      notes,
      keySupport,
      target1,
      target2,
      stopLoss,
      potentialScore,
      isFeatured,
      isPremium
    });
    
    const stock = await newStock.save();
    
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

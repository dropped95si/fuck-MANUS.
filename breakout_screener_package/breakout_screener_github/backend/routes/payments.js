const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// @route   POST api/payments/create-subscription
// @desc    Create a new subscription
// @access  Private
router.post('/create-subscription', auth, async (req, res) => {
  try {
    const { paymentMethodId, priceId } = req.body;
    
    // Get user from database
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    let customerId = user.stripeCustomerId;
    
    // If user doesn't have a Stripe customer ID, create one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      
      customerId = customer.id;
      
      // Update user with Stripe customer ID
      user.stripeCustomerId = customerId;
      await user.save();
    }
    
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });
    
    // Update user subscription status
    user.subscription = 'premium';
    await user.save();
    
    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      status: subscription.status,
    });
  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ error: err.message });
  }
});

// @route   GET api/payments/subscription
// @desc    Get user's subscription status
// @access  Private
router.get('/subscription', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // If user has a Stripe customer ID, get subscription details
    if (user.stripeCustomerId && user.subscription === 'premium') {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active',
        expand: ['data.default_payment_method'],
      });
      
      if (subscriptions.data.length > 0) {
        return res.json({
          subscription: user.subscription,
          details: subscriptions.data[0],
        });
      }
    }
    
    res.json({ subscription: user.subscription });
  } catch (err) {
    console.error('Subscription status error:', err);
    res.status(500).json({ error: err.message });
  }
});

// @route   POST api/payments/cancel-subscription
// @desc    Cancel a subscription
// @access  Private
router.post('/cancel-subscription', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (!user.stripeCustomerId || user.subscription !== 'premium') {
      return res.status(400).json({ msg: 'No active subscription found' });
    }
    
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
    });
    
    if (subscriptions.data.length === 0) {
      return res.status(400).json({ msg: 'No active subscription found' });
    }
    
    // Cancel the subscription
    await stripe.subscriptions.update(subscriptions.data[0].id, {
      cancel_at_period_end: true,
    });
    
    // Update user subscription status (will be downgraded when subscription actually ends)
    res.json({ msg: 'Subscription will be canceled at the end of the billing period' });
  } catch (err) {
    console.error('Cancel subscription error:', err);
    res.status(500).json({ error: err.message });
  }
});

// @route   POST api/payments/webhook
// @desc    Handle Stripe webhook events
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder'
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'customer.subscription.deleted':
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      
      // If subscription is canceled or expired, downgrade user
      if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
        const user = await User.findOne({ stripeCustomerId: subscription.customer });
        
        if (user) {
          user.subscription = 'free';
          await user.save();
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  res.json({ received: true });
});

module.exports = router;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Mock stripePromise for development
const stripePromise = Promise.resolve(null);

const PaymentForm = ({ planId, planName, planPrice, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    // In a real implementation, this would fetch a payment intent from your backend
    // For demo purposes, we're simulating this
    setTimeout(() => {
      setClientSecret('demo_secret_key');
    }, 1000);
  }, [planId]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setIsProcessing(true);
    setPaymentError(null);
    
    // In a real implementation, this would use the clientSecret to confirm the payment
    // For demo purposes, we're simulating a successful payment after a delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        subscriptionId: 'sub_' + Math.random().toString(36).substr(2, 9),
        planId,
        planName,
        startDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }, 2000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Card details
        </label>
        <div className="mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      
      {paymentError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{paymentError}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : `Pay $${planPrice}`}
        </button>
      </div>
    </form>
  );
};

const CheckoutPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [subscriptionComplete, setSubscriptionComplete] = useState(false);
  const [subscription, setSubscription] = useState(null);
  
  const plans = [
    {
      id: 'price_monthly',
      name: 'Monthly',
      price: 19.99,
      interval: 'month',
      description: 'Full access to all premium features'
    },
    {
      id: 'price_yearly',
      name: 'Yearly',
      price: 199.99,
      interval: 'year',
      description: 'Save $40 with annual billing'
    }
  ];
  
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };
  
  const handlePaymentSuccess = (subscriptionData) => {
    setSubscription(subscriptionData);
    setSubscriptionComplete(true);
    setShowPaymentForm(false);
  };
  
  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
  };
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Complete Your Subscription</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose a plan and enter your payment details to get started.
          </p>
        </div>
      </div>
      
      {/* Subscription Complete */}
      {subscriptionComplete && (
        <div className="bg-green-50 dark:bg-green-900 rounded-xl shadow-lg p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Subscription Successful!</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Thank you for subscribing to our {subscription?.planName} plan. Your subscription is now active.
          </p>
          <div className="mt-6">
            <a
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      )}
      
      {/* Plan Selection */}
      {!subscriptionComplete && !showPaymentForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select a Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm p-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">/{plan.interval}</span>
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Select {plan.name} Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Payment Form */}
      {!subscriptionComplete && showPaymentForm && selectedPlan && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Selected Plan</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedPlan.name} - ${selectedPlan.price}/{selectedPlan.interval}</p>
            </div>
          </div>
          
          <Elements stripe={stripePromise}>
            <PaymentForm
              planId={selectedPlan.id}
              planName={selectedPlan.name}
              planPrice={selectedPlan.price}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </Elements>
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Secure Payment</h3>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Your payment information is encrypted and secure. We use Stripe for secure payment processing and never store your full credit card details on our servers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

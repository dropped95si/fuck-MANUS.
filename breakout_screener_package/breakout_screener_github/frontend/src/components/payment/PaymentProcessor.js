import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { updateSubscription } from '../../features/auth/authActions';

// Mock stripePromise for development
const stripePromise = Promise.resolve(null);

const PaymentProcessor = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  
  const plans = {
    monthly: {
      id: 'price_monthly',
      name: 'Monthly',
      price: 19.99,
      interval: 'month',
      description: 'Full access to all premium features'
    },
    yearly: {
      id: 'price_yearly',
      name: 'Yearly',
      price: 199.99,
      interval: 'year',
      description: 'Save $40 with annual billing'
    }
  };
  
  useEffect(() => {
    // In a real implementation, this would fetch a payment intent from your backend
    // For demo purposes, we're simulating this
    setTimeout(() => {
      setClientSecret('demo_secret_key');
    }, 1000);
  }, [selectedPlan]);
  
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
      setPaymentSuccess(true);
      
      // Update subscription in Redux store
      dispatch(updateSubscription({
        subscriptionId: 'sub_' + Math.random().toString(36).substr(2, 9),
        planId: plans[selectedPlan].id,
        planName: plans[selectedPlan].name,
        startDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + (selectedPlan === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
      }));
    }, 2000);
  };
  
  if (paymentSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900 rounded-xl p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Payment Successful!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Thank you for subscribing to our {plans[selectedPlan].name} plan. Your subscription is now active.
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
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select a Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={plan.id}
              className={`border ${
                selectedPlan === key
                  ? 'border-indigo-500 ring-2 ring-indigo-500'
                  : 'border-gray-300 dark:border-gray-700'
              } rounded-lg shadow-sm p-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer`}
              onClick={() => setSelectedPlan(key)}
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400">/{plan.interval}</span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {plan.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Details</h2>
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
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Subscribe for $${plans[selectedPlan].price}/${plans[selectedPlan].interval}`}
            </button>
          </div>
        </form>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Secure Payment</h3>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Your payment information is encrypted and secure. We use Stripe for secure payment processing and never store your full credit card details on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentProcessor />
    </Elements>
  );
};

export default StripeWrapper;

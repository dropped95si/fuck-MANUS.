import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Mock stripePromise for development
const stripePromise = Promise.resolve(null);

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  const plans = {
    monthly: {
      id: 'price_monthly',
      name: 'Monthly',
      price: 19.99,
      interval: 'month',
      features: [
        'Access to all breakout candidates',
        'Detailed technical analysis',
        'Multiple price targets and stop levels',
        'Priority data refresh',
        'Advanced cheat sheets with entry/exit points'
      ]
    },
    yearly: {
      id: 'price_yearly',
      name: 'Yearly',
      price: 199.99,
      interval: 'year',
      features: [
        'All monthly features',
        '2 months free ($40 savings)',
        'Early access to new features',
        'Historical performance tracking',
        'Premium email support'
      ]
    }
  };
  
  const handleSubscribe = (planId) => {
    // This would be replaced with actual Stripe checkout in production
    console.log(`Subscribing to plan: ${planId}`);
  };
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upgrade to Premium</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get access to all breakout candidates with detailed analysis, entry/exit points, and more.
          </p>
        </div>
      </div>
      
      {/* Plan Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="sm:flex sm:flex-col sm:align-center">
          <div className="relative self-center bg-gray-100 dark:bg-gray-900 rounded-lg p-0.5 flex sm:mt-8">
            <button
              type="button"
              className={`${
                selectedPlan === 'monthly'
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'
                  : 'border border-transparent'
              } relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8`}
              onClick={() => setSelectedPlan('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`${
                selectedPlan === 'yearly'
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'
                  : 'border border-transparent'
              } ml-0.5 relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8`}
              onClick={() => setSelectedPlan('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {Object.values(plans).map((plan) => (
            <div
              key={plan.id}
              className={`${
                plan.interval === selectedPlan
                  ? 'border-indigo-500 ring-2 ring-indigo-500'
                  : 'border-gray-300 dark:border-gray-700'
              } rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700 border`}
            >
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{plan.name}</h2>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">/{plan.interval}</span>
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {plan.interval === 'year' ? 'Save $40 with annual billing' : 'Full access to all premium features'}
                </p>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`${
                    plan.interval === selectedPlan
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800'
                  } mt-8 block w-full py-2 px-3 border border-transparent rounded-md text-center font-medium`}
                >
                  {isAuthenticated ? 'Subscribe Now' : 'Sign Up to Subscribe'}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wide">What's included</h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="pt-6">
              <dt className="text-lg font-medium text-gray-900 dark:text-white">
                Can I cancel my subscription?
              </dt>
              <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to premium features until the end of your billing period.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-medium text-gray-900 dark:text-white">
                How often is the data updated?
              </dt>
              <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Premium users can refresh data on demand with the refresh button. We also update all data automatically before market open each trading day.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-medium text-gray-900 dark:text-white">
                Do you offer refunds?
              </dt>
              <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                We offer a 7-day money-back guarantee. If you're not satisfied with our service, contact us within 7 days of your purchase for a full refund.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-indigo-700 rounded-xl shadow-lg p-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white">Ready to start finding breakout stocks?</h2>
            <p className="mt-4 text-lg text-indigo-100">
              Create an account to get started with our premium features.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Sign up for free
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;

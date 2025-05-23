import React from 'react';
import { Link } from 'react-router-dom';
import DataRefreshButton from '../../components/DataRefreshButton';
import PremiumBadge from '../../components/PremiumBadge';

const Landing = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Breakout Stocks Before They Surge</h1>
          <p className="text-xl mb-8">Identify high-potential stocks with our advanced technical analysis and pattern recognition system.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-center">
              Get Started Free
            </Link>
            <Link to="/login" className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold text-center">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stock Preview (Free) */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Today's Featured Breakout Candidate</h2>
          <DataRefreshButton />
        </div>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">DFDV</h3>
              <p className="text-gray-600 dark:text-gray-400">Fintech Sector</p>
            </div>
            <span className="text-xl font-bold text-green-600">$3.75</span>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pattern</p>
              <p className="font-medium">Bullish Flag</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Volume Surge</p>
              <p className="font-medium text-blue-600">✓ Confirmed</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Timeframe</p>
              <p className="font-medium">1-2 Days</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Potential Score</p>
              <p className="font-medium">5/5</p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="font-medium">Key Support: $3.20</p>
            <p className="font-medium">Target: $4.10 - $5.25</p>
          </div>
        </div>
      </section>

      {/* Premium Preview */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Premium Breakout Candidates</h2>
          <PremiumBadge />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pattern</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timeframe</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Blurred premium content */}
              <tr className="filter blur-sm hover:blur-sm">
                <td className="px-6 py-4 whitespace-nowrap">QBTS</td>
                <td className="px-6 py-4 whitespace-nowrap">Quantum Tech</td>
                <td className="px-6 py-4 whitespace-nowrap">$2.95</td>
                <td className="px-6 py-4 whitespace-nowrap">Ascending Triangle</td>
                <td className="px-6 py-4 whitespace-nowrap">Tomorrow</td>
              </tr>
              <tr className="filter blur-sm hover:blur-sm">
                <td className="px-6 py-4 whitespace-nowrap">EDBL</td>
                <td className="px-6 py-4 whitespace-nowrap">Food Tech</td>
                <td className="px-6 py-4 whitespace-nowrap">$1.45</td>
                <td className="px-6 py-4 whitespace-nowrap">Cup and Handle</td>
                <td className="px-6 py-4 whitespace-nowrap">Tomorrow</td>
              </tr>
              <tr className="filter blur-sm hover:blur-sm">
                <td className="px-6 py-4 whitespace-nowrap">LTRY</td>
                <td className="px-6 py-4 whitespace-nowrap">Gaming</td>
                <td className="px-6 py-4 whitespace-nowrap">$2.35</td>
                <td className="px-6 py-4 whitespace-nowrap">Symmetrical Triangle</td>
                <td className="px-6 py-4 whitespace-nowrap">1-3 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/subscription" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Upgrade to Premium
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Unlock all breakout candidates and detailed analysis</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Our Breakout Screener</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">High Accuracy</h3>
            <p className="text-gray-600 dark:text-gray-400">Our pattern recognition algorithms identify the most promising breakout setups.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600 dark:text-gray-400">Refresh data on-demand to get the latest market information when you need it.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">Get comprehensive technical analysis with support, resistance, and target levels.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Winning Trade?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of traders who use our platform to identify high-potential breakout stocks before they make their big move.</p>
        <Link to="/register" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          Start Free Today
        </Link>
      </section>
    </div>
  );
};

export default Landing;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataRefreshButton from '../../components/DataRefreshButton';

const Dashboard = () => {
  const [subscription, setSubscription] = useState('free'); // 'free' or 'premium'
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // This would be replaced with actual API call in production
    const fetchStocks = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on subscription
        if (subscription === 'premium') {
          setStocks([
            {
              id: '1',
              ticker: 'DFDV',
              company: 'Digital Future Development',
              sector: 'Fintech',
              price: 3.75,
              pattern: 'Bullish Flag',
              volumeSurge: true,
              timeframe: '1-2 Days',
              potentialScore: 5,
              keySupport: 3.20,
              target1: 4.10,
              target2: 5.25,
              stopLoss: 3.00,
              notes: 'Very high potential with strong volume spike'
            },
            {
              id: '2',
              ticker: 'QBTS',
              company: 'D-Wave Quantum',
              sector: 'Quantum Tech',
              price: 2.95,
              pattern: 'Ascending Triangle',
              volumeSurge: true,
              timeframe: 'Tomorrow',
              potentialScore: 4,
              keySupport: 2.70,
              target1: 3.45,
              target2: 4.15,
              stopLoss: 2.65,
              notes: 'Bullish short-term outlook with sector momentum'
            },
            {
              id: '3',
              ticker: 'EDBL',
              company: 'Edible Garden',
              sector: 'Food Tech',
              price: 1.45,
              pattern: 'Cup and Handle',
              volumeSurge: true,
              timeframe: 'Tomorrow',
              potentialScore: 4,
              keySupport: 1.25,
              target1: 1.75,
              target2: 2.10,
              stopLoss: 1.20,
              notes: 'Strong after-hours momentum'
            },
            {
              id: '4',
              ticker: 'LTRY',
              company: 'Lottery.com',
              sector: 'Gaming',
              price: 2.35,
              pattern: 'Symmetrical Triangle',
              volumeSurge: true,
              timeframe: '1-3 Days',
              potentialScore: 4,
              keySupport: 2.10,
              target1: 2.65,
              target2: 3.20,
              stopLoss: 2.05,
              notes: 'Technical setup similar to LTBR'
            }
          ]);
        } else {
          // Free subscription - only one stock
          setStocks([
            {
              id: '1',
              ticker: 'DFDV',
              company: 'Digital Future Development',
              sector: 'Fintech',
              price: 3.75,
              pattern: 'Bullish Flag',
              volumeSurge: true,
              timeframe: '1-2 Days',
              potentialScore: 5,
              keySupport: 3.20,
              target1: 4.10,
              target2: 5.25,
              stopLoss: 3.00,
              notes: 'Very high potential with strong volume spike'
            }
          ]);
        }
        
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [subscription]);

  const handleRefresh = async () => {
    await fetchStocks();
  };

  const toggleSubscription = () => {
    // This is just for demo purposes
    setSubscription(subscription === 'free' ? 'premium' : 'free');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome to your Breakout Screener Dashboard
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleString()}
            </span>
            <DataRefreshButton onClick={handleRefresh} />
          </div>
        </div>
        
        {/* Subscription Badge - For demo purposes */}
        <div className="mt-4 flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            subscription === 'premium' 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}>
            {subscription === 'premium' ? 'Premium' : 'Free'} Subscription
          </span>
          {/* Demo toggle - would be removed in production */}
          <button 
            onClick={toggleSubscription}
            className="ml-4 text-xs text-gray-500 underline"
          >
            (Demo: Toggle Subscription)
          </button>
        </div>
      </div>

      {/* Breakout Candidates Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Breakout Candidates</h2>
          {subscription === 'free' && (
            <Link to="/subscription" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700">
              Upgrade to Premium
            </Link>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading breakout candidates...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sector</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pattern</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timeframe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stocks.map(stock => (
                  <tr key={stock.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{stock.ticker}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stock.sector}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${stock.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stock.pattern}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stock.timeframe}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {stock.potentialScore}/5
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/stock/${stock.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {subscription === 'free' && (
          <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Premium Features</h3>
            <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-400">
              Upgrade to premium to access all breakout candidates, detailed analysis, and more.
            </p>
            <Link to="/subscription" className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Learn more about premium
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Market Overview</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Current market conditions and trends
          </p>
          <div className="mt-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">S&P 500</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">+1.2%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">NASDAQ</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">+1.5%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">VIX</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">-3.2%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Sectors</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sectors with the most breakout candidates
          </p>
          <div className="mt-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Technology</span>
              <span className="text-sm font-medium">42%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Healthcare</span>
              <span className="text-sm font-medium">28%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Energy</span>
              <span className="text-sm font-medium">15%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Status</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Your current subscription details
          </p>
          <div className="mt-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Plan</span>
              <span className="text-sm font-medium">{subscription === 'premium' ? 'Premium' : 'Free'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Refresh</span>
              <span className="text-sm font-medium">Manual</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Next Billing</span>
              <span className="text-sm font-medium">{subscription === 'premium' ? 'June 22, 2025' : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

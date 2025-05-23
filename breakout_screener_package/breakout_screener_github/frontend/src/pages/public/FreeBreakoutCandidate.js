import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DataRefreshButton from '../../components/DataRefreshButton';

const FreeBreakoutCandidate = () => {
  const [freeCandidate, setFreeCandidate] = useState({
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
    stopLoss: 3.00,
    change: 2.7,
    volume: '1.2M',
    avgVolume: '450K',
    lastUpdated: new Date().toLocaleString()
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
      setFreeCandidate({
        ...freeCandidate,
        lastUpdated: new Date().toLocaleString()
      });
    }, 1500);
  };
  
  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };
  
  const getVolumeColor = (volume, avgVolume) => {
    // Convert volume strings to numbers for comparison
    const vol = parseFloat(volume.replace(/[^0-9.]/g, ''));
    const avg = parseFloat(avgVolume.replace(/[^0-9.]/g, ''));
    
    if (vol > avg * 2) return 'text-purple-600 dark:text-purple-400 font-bold';
    if (vol > avg * 1.5) return 'text-blue-600 dark:text-blue-400 font-bold';
    if (vol > avg) return 'text-green-600 dark:text-green-400';
    return 'text-gray-600 dark:text-gray-400';
  };
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Featured Breakout Candidate</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Free daily stock with high breakout potential
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <DataRefreshButton 
              onClick={handleRefresh} 
              isLoading={isRefreshing} 
              lastUpdated={freeCandidate.lastUpdated}
            />
          </div>
        </div>
      </div>
      
      {/* Featured Candidate Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white">{freeCandidate.ticker}</h2>
              <p className="text-indigo-100 text-sm">{freeCandidate.company}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">${freeCandidate.price.toFixed(2)}</p>
              <p className={`text-sm font-medium ${freeCandidate.change > 0 ? 'text-green-300' : 'text-red-300'}`}>
                {freeCandidate.change > 0 ? '+' : ''}{freeCandidate.change}%
              </p>
            </div>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pattern</p>
              <p className="font-medium">{freeCandidate.pattern}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Timeframe</p>
              <p className="font-medium">{freeCandidate.timeframe}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sector</p>
              <p className="font-medium">{freeCandidate.sector}</p>
            </div>
          </div>
          
          {/* Price Targets */}
          <div className="mb-4">
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-red-600">
                    Stop: ${freeCandidate.stopLoss.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    Target: ${freeCandidate.target1.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                {/* Stop Loss Marker */}
                <div 
                  style={{ 
                    left: `${((freeCandidate.stopLoss - (freeCandidate.stopLoss * 0.9)) / ((freeCandidate.target1 * 1.1) - (freeCandidate.stopLoss * 0.9))) * 100}%` 
                  }}
                  className="absolute h-2 w-1 bg-red-500"
                ></div>
                
                {/* Current Price Marker */}
                <div 
                  style={{ 
                    left: `${((freeCandidate.price - (freeCandidate.stopLoss * 0.9)) / ((freeCandidate.target1 * 1.1) - (freeCandidate.stopLoss * 0.9))) * 100}%` 
                  }}
                  className="absolute h-4 w-1 -mt-1 bg-blue-600"
                ></div>
                
                {/* Target 1 Marker */}
                <div 
                  style={{ 
                    left: `${((freeCandidate.target1 - (freeCandidate.stopLoss * 0.9)) / ((freeCandidate.target1 * 1.1) - (freeCandidate.stopLoss * 0.9))) * 100}%` 
                  }}
                  className="absolute h-2 w-1 bg-green-600"
                ></div>
                
                {/* Progress Bar */}
                <div 
                  style={{ 
                    width: `${((freeCandidate.price - (freeCandidate.stopLoss * 0.9)) / ((freeCandidate.target1 * 1.1) - (freeCandidate.stopLoss * 0.9))) * 100}%` 
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
              <div className="flex text-xs justify-between">
                <span className="text-gray-500 dark:text-gray-400">Current: ${freeCandidate.price.toFixed(2)}</span>
                <span className="text-gray-500 dark:text-gray-400">Risk/Reward: {((freeCandidate.target1 - freeCandidate.price) / (freeCandidate.price - freeCandidate.stopLoss)).toFixed(1)}x</span>
              </div>
            </div>
          </div>
          
          {/* Volume */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
            <p className={`font-medium ${getVolumeColor(freeCandidate.volume, freeCandidate.avgVolume)}`}>
              {freeCandidate.volume} <span className="text-xs text-gray-500 dark:text-gray-400">(Avg: {freeCandidate.avgVolume})</span>
            </p>
          </div>
          
          {/* Premium Teaser */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Unlock Premium Features</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Subscribe to access all breakout candidates with detailed analysis, entry/exit points, and more.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Access to all breakout candidates</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Detailed technical analysis</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Multiple price targets and stop levels</span>
              </li>
            </ul>
            <Link 
              to="/subscription"
              className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBreakoutCandidate;

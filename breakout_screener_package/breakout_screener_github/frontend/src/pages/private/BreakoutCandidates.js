import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PriceColumn from '../../components/PriceColumn';

const BreakoutCandidates = () => {
  const [stocks, setStocks] = useState([
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
      riskReward: 2.5,
      notes: 'Very high potential with strong volume spike',
      change: 2.7,
      volume: '1.2M',
      avgVolume: '450K'
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
      riskReward: 2.1,
      notes: 'Bullish short-term outlook with sector momentum',
      change: 1.4,
      volume: '890K',
      avgVolume: '320K'
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
      riskReward: 1.9,
      notes: 'Strong after-hours momentum',
      change: 3.5,
      volume: '2.1M',
      avgVolume: '750K'
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
      riskReward: 1.8,
      notes: 'Technical setup similar to LTBR',
      change: -0.8,
      volume: '650K',
      avgVolume: '410K'
    }
  ]);
  
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [sortField, setSortField] = useState('potentialScore');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });
  
  const getScoreColor = (score) => {
    if (score >= 5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (score >= 4) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (score >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Breakout Candidates</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Stocks with high potential for significant upward movement
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md ${
                  viewMode === 'card' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md ${
                  viewMode === 'table' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStocks.map(stock => (
            <div key={stock.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-white">{stock.ticker}</h2>
                    <p className="text-indigo-100 text-sm">{stock.company}</p>
                  </div>
                  <div className="text-right">
                    <PriceColumn 
                      price={stock.price}
                      change={stock.change}
                      volume={stock.volume}
                      avgVolume={stock.avgVolume}
                    />
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pattern</p>
                    <p className="font-medium">{stock.pattern}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Timeframe</p>
                    <p className="font-medium">{stock.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(stock.potentialScore)}`}>
                      {stock.potentialScore}/5
                    </span>
                  </div>
                </div>
                
                {/* Price Targets */}
                <div className="mb-4">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-red-600">
                          Stop: ${stock.stopLoss.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-600">
                          Target: ${stock.target2.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                      {/* Stop Loss Marker */}
                      <div 
                        style={{ 
                          left: `${((stock.stopLoss - (stock.stopLoss * 0.9)) / ((stock.target2 * 1.1) - (stock.stopLoss * 0.9))) * 100}%` 
                        }}
                        className="absolute h-2 w-1 bg-red-500"
                      ></div>
                      
                      {/* Current Price Marker */}
                      <div 
                        style={{ 
                          left: `${((stock.price - (stock.stopLoss * 0.9)) / ((stock.target2 * 1.1) - (stock.stopLoss * 0.9))) * 100}%` 
                        }}
                        className="absolute h-4 w-1 -mt-1 bg-blue-600"
                      ></div>
                      
                      {/* Target 1 Marker */}
                      <div 
                        style={{ 
                          left: `${((stock.target1 - (stock.stopLoss * 0.9)) / ((stock.target2 * 1.1) - (stock.stopLoss * 0.9))) * 100}%` 
                        }}
                        className="absolute h-2 w-1 bg-green-400"
                      ></div>
                      
                      {/* Target 2 Marker */}
                      <div 
                        style={{ 
                          left: `${((stock.target2 - (stock.stopLoss * 0.9)) / ((stock.target2 * 1.1) - (stock.stopLoss * 0.9))) * 100}%` 
                        }}
                        className="absolute h-2 w-1 bg-green-600"
                      ></div>
                      
                      {/* Progress Bar */}
                      <div 
                        style={{ 
                          width: `${((stock.price - (stock.stopLoss * 0.9)) / ((stock.target2 * 1.1) - (stock.stopLoss * 0.9))) * 100}%` 
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                    <div className="flex text-xs justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Current: ${stock.price.toFixed(2)}</span>
                      <span className="text-gray-500 dark:text-gray-400">T1: ${stock.target1.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Risk/Reward */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Risk/Reward</p>
                  <p className="font-medium text-indigo-600 dark:text-indigo-400">{stock.riskReward.toFixed(1)}x</p>
                </div>
                
                {/* Notes */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                  <p className="text-sm">{stock.notes}</p>
                </div>
                
                {/* Action Button */}
                <Link 
                  to={`/stock/${stock.id}`}
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Detailed Analysis
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('ticker')}
                  >
                    <div className="flex items-center">
                      Ticker
                      {sortField === 'ticker' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          {sortDirection === 'asc' ? (
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price
                      {sortField === 'price' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          {sortDirection === 'asc' ? (
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('pattern')}
                  >
                    <div className="flex items-center">
                      Pattern
                      {sortField === 'pattern' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          {sortDirection === 'asc' ? (
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('timeframe')}
                  >
                    <div className="flex items-center">
                      Timeframe
                      {sortField === 'timeframe' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          {sortDirection === 'asc' ? (
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('potentialScore')}
                  >
                    <div className="flex items-center">
                      Score
                      {sortField === 'potentialScore' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          {sortDirection === 'asc' ? (
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Targets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stop Loss
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('riskReward')}
                  >
                    <div className="flex items-center">
                      R/R
                      {sortField === 'riskReward' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          {sortDirection === 'asc' ? (
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedStocks.map(stock => (
                  <tr key={stock.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{stock.ticker}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{stock.sector}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PriceColumn 
                        price={stock.price}
                        change={stock.change}
                        volume={stock.volume}
                        avgVolume={stock.avgVolume}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{stock.pattern}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{stock.timeframe}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(stock.potentialScore)}`}>
                        {stock.potentialScore}/5
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">T1: ${stock.target1.toFixed(2)}</div>
                      <div className="text-sm text-green-700 dark:text-green-300 font-medium">T2: ${stock.target2.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-red-600 dark:text-red-400 font-medium">${stock.stopLoss.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{stock.riskReward.toFixed(1)}x</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/stock/${stock.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakoutCandidates;

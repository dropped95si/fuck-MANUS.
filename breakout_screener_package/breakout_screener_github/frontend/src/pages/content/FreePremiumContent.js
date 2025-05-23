import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataRefreshButton from '../../components/DataRefreshButton';

const FreePremiumContent = () => {
  const [freeCandidate, setFreeCandidate] = useState(null);
  const [premiumCandidates, setPremiumCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated, subscription } = useSelector(state => state.auth);
  const hasPremiumAccess = isAuthenticated && subscription && subscription.planId;
  
  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      setLoading(true);
      
      // In a real implementation, this would be an API call
      setTimeout(() => {
        // Sample data
        const topCandidate = {
          ticker: 'DFDV',
          name: 'DFD Ventures',
          price: 6.42,
          priceChange: 0.28,
          priceChangePercent: 4.56,
          volume: 1245000,
          avgVolume: 450000,
          pattern: 'Cup and Handle',
          timeframe: '1-2 days',
          sector: 'Technology',
          score: 5,
          targets: {
            entry: 6.50,
            target1: 7.25,
            target2: 8.10,
            stopLoss: 6.10
          },
          notes: 'Strong volume surge with bullish technical setup'
        };
        
        const allCandidates = [
          topCandidate,
          {
            ticker: 'QBTS',
            name: 'Quantum Solutions',
            price: 8.75,
            priceChange: 0.45,
            priceChangePercent: 5.42,
            volume: 980000,
            avgVolume: 320000,
            pattern: 'Ascending Triangle',
            timeframe: 'Tomorrow',
            sector: 'Technology',
            score: 4,
            targets: {
              entry: 8.85,
              target1: 9.50,
              target2: 10.25,
              stopLoss: 8.40
            },
            notes: 'Breaking out of consolidation with increasing volume'
          },
          {
            ticker: 'EDBL',
            name: 'Edible Brands',
            price: 4.28,
            priceChange: 0.18,
            priceChangePercent: 4.39,
            volume: 875000,
            avgVolume: 290000,
            pattern: 'Bull Flag',
            timeframe: 'Tomorrow',
            sector: 'Consumer Goods',
            score: 4,
            targets: {
              entry: 4.35,
              target1: 4.75,
              target2: 5.20,
              stopLoss: 4.10
            },
            notes: 'Consolidating after strong uptrend, ready for next leg up'
          },
          {
            ticker: 'LTRY',
            name: 'Lottery Corp',
            price: 7.85,
            priceChange: 0.32,
            priceChangePercent: 4.25,
            volume: 1120000,
            avgVolume: 380000,
            pattern: 'Symmetrical Triangle',
            timeframe: '1-3 days',
            sector: 'Entertainment',
            score: 4,
            targets: {
              entry: 7.95,
              target1: 8.50,
              target2: 9.25,
              stopLoss: 7.60
            },
            notes: 'Approaching apex of triangle pattern with increasing momentum'
          },
          {
            ticker: 'TLRY',
            name: 'Tilray Inc',
            price: 9.45,
            priceChange: 0.35,
            priceChangePercent: 3.85,
            volume: 1350000,
            avgVolume: 520000,
            pattern: 'Inverse Head & Shoulders',
            timeframe: '2-4 days',
            sector: 'Healthcare',
            score: 3,
            targets: {
              entry: 9.60,
              target1: 10.25,
              target2: 11.00,
              stopLoss: 9.10
            },
            notes: 'Forming right shoulder with decreasing volume, watch for neckline breakout'
          }
        ];
        
        setFreeCandidate(topCandidate);
        setPremiumCandidates(allCandidates);
        setLoading(false);
      }, 1500);
    };
    
    fetchData();
  }, []);
  
  const handleRefresh = () => {
    // Simulate refreshing data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  
  const renderCandidateCard = (candidate) => {
    const volumeRatio = candidate.volume / candidate.avgVolume;
    const isHighVolume = volumeRatio > 1.5;
    
    return (
      <div key={candidate.ticker} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">{candidate.ticker}</h3>
              <p className="text-indigo-100 text-sm">{candidate.name}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-full px-3 py-1 text-sm font-semibold">
              <span className={`${candidate.score >= 4 ? 'text-green-600 dark:text-green-400' : candidate.score >= 3 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'}`}>
                Score: {candidate.score}/5
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${candidate.price}</span>
              <span className={`ml-2 text-sm font-medium ${candidate.priceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {candidate.priceChange >= 0 ? '+' : ''}{candidate.priceChange} ({candidate.priceChangePercent}%)
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Pattern</p>
              <p className="font-medium text-gray-900 dark:text-white">{candidate.pattern}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
              <p className={`font-medium ${isHighVolume ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                {(candidate.volume / 1000000).toFixed(1)}M
                {isHighVolume && <span className="ml-1 text-xs">({volumeRatio.toFixed(1)}x)</span>}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Timeframe</p>
              <p className="font-medium text-gray-900 dark:text-white">{candidate.timeframe}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
              <span>Stop Loss</span>
              <span>Entry</span>
              <span>Target 1</span>
              <span>Target 2</span>
            </div>
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              {/* Current price marker */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-blue-500 dark:bg-blue-400" 
                style={{ 
                  left: `${((candidate.price - candidate.targets.stopLoss) / (candidate.targets.target2 - candidate.targets.stopLoss)) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              ></div>
              
              {/* Stop loss zone */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-red-500 dark:bg-red-600 opacity-70" 
                style={{ 
                  width: `${((candidate.targets.entry - candidate.targets.stopLoss) / (candidate.targets.target2 - candidate.targets.stopLoss)) * 100}%` 
                }}
              ></div>
              
              {/* Target 1 zone */}
              <div 
                className="absolute top-0 bottom-0 bg-green-500 dark:bg-green-600 opacity-70" 
                style={{ 
                  left: `${((candidate.targets.entry - candidate.targets.stopLoss) / (candidate.targets.target2 - candidate.targets.stopLoss)) * 100}%`,
                  width: `${((candidate.targets.target1 - candidate.targets.entry) / (candidate.targets.target2 - candidate.targets.stopLoss)) * 100}%` 
                }}
              ></div>
              
              {/* Target 2 zone */}
              <div 
                className="absolute top-0 bottom-0 bg-green-700 dark:bg-green-800 opacity-70" 
                style={{ 
                  left: `${((candidate.targets.target1 - candidate.targets.stopLoss) / (candidate.targets.target2 - candidate.targets.stopLoss)) * 100}%`,
                  width: `${((candidate.targets.target2 - candidate.targets.target1) / (candidate.targets.target2 - candidate.targets.stopLoss)) * 100}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium mt-1">
              <span className="text-red-600 dark:text-red-400">${candidate.targets.stopLoss.toFixed(2)}</span>
              <span className="text-blue-600 dark:text-blue-400">${candidate.targets.entry.toFixed(2)}</span>
              <span className="text-green-600 dark:text-green-400">${candidate.targets.target1.toFixed(2)}</span>
              <span className="text-green-800 dark:text-green-600">${candidate.targets.target2.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <p>{candidate.notes}</p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Breakout Candidates</h1>
        <DataRefreshButton onClick={handleRefresh} isLoading={loading} />
      </div>
      
      {/* Free Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Top Breakout Candidate</h2>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">Free</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : freeCandidate ? (
          renderCandidateCard(freeCandidate)
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No candidates available at the moment.</p>
        )}
      </div>
      
      {/* Premium Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Premium Breakout Candidates</h2>
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded-full">Premium</span>
        </div>
        
        {hasPremiumAccess ? (
          loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : premiumCandidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {premiumCandidates.map(candidate => renderCandidateCard(candidate))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No premium candidates available at the moment.</p>
          )
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Premium Content Locked</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Upgrade to premium to access all breakout candidates with detailed analysis.
            </p>
            <div className="mt-6">
              <Link
                to="/subscription"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upgrade to Premium
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreePremiumContent;

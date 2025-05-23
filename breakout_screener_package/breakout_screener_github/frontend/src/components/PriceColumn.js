import React from 'react';

const PriceColumn = ({ price, change, volume, avgVolume }) => {
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
    <div className="flex flex-col">
      <div className="text-lg font-bold text-gray-900 dark:text-white">
        ${price.toFixed(2)}
      </div>
      <div className={`text-sm ${getChangeColor(change)}`}>
        {change > 0 ? '+' : ''}{change}%
      </div>
      <div className={`text-xs ${getVolumeColor(volume, avgVolume)}`}>
        Vol: {volume}
      </div>
    </div>
  );
};

export default PriceColumn;

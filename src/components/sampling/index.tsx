import React, { useState } from 'react';

interface SamplingComponentProps {
  onSamplingMethodChange?: (method: string) => void;
  onIntervalChange?: (type: 'second' | 'minute' | 'hour', value: string) => void;
  onLastReadingTimeChange?: (time: string) => void;
}

const SamplingComponent: React.FC<SamplingComponentProps> = ({
  onSamplingMethodChange,
  onIntervalChange,
  onLastReadingTimeChange
}) => {
  const [samplingMethod, setSamplingMethod] = useState<string>('Continuous');
  const [lastReadingTime, setLastReadingTime] = useState<string>('2025-01-10T12:12:12');
  const [secondInterval, setSecondInterval] = useState<string>('1');
  const [minuteInterval, setMinuteInterval] = useState<string>('1');
  const [hourInterval, setHourInterval] = useState<string>('1');
  
  const handleSamplingMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value;
    setSamplingMethod(method);
    if (onSamplingMethodChange) {
      onSamplingMethodChange(method);
    }
  };

  const handleLastReadingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setLastReadingTime(time);
    if (onLastReadingTimeChange) {
      onLastReadingTimeChange(time);
    }
  };

  const handleIntervalChange = (
    type: 'second' | 'minute' | 'hour',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    
    // Only allow numeric input
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    
    switch (type) {
      case 'second':
        setSecondInterval(value);
        break;
      case 'minute':
        setMinuteInterval(value);
        break;
      case 'hour':
        setHourInterval(value);
        break;
    }
    
    if (onIntervalChange) {
      onIntervalChange(type, value);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Could add a toast notification here
        console.log('Copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-10 bg-white rounded-3xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">1. CO2</h2>
        <h2 className="text-xl font-bold">Sampling</h2>
      </div>
      
      <div className="space-y-4">
        {/* Sampling Method Selection */}
        <div className="flex items-center">
          <div className="w-1/3">
            <p className="text-sm text-gray-600">Phương pháp</p>
          </div>
          <div className="w-2/3 relative">
            <select 
              className="w-full p-2 border rounded-md appearance-none bg-white pr-8"
              value={samplingMethod}
              onChange={handleSamplingMethodChange}
            >
              <option value="Continuous">Continuous</option>
              <option value="Periodic">Periodic</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <div className="ml-2">
            <button 
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => handleCopyToClipboard(samplingMethod)}
              aria-label="Copy sampling method"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Last Reading Time */}
        <div className="flex items-center">
          <div className="w-1/3">
            <p className="text-sm text-gray-600">Lần cuối đọc cảm biến</p>
          </div>
          <div className="w-2/3">
            <input 
              type="datetime-local" 
              className="w-full p-2 border rounded-md"
              value={lastReadingTime}
              onChange={handleLastReadingTimeChange}
            />
          </div>
        </div>
        
        {/* Periodic Settings */}
        <div className={samplingMethod === 'Periodic' ? 'block' : 'hidden'}>
          <div className="ml-8 space-y-4">
            {/* Second Interval */}
            <div className="flex items-center">
              <div className="w-1/3">
                <p className="text-sm text-gray-600">Mỗi x Giây</p>
              </div>
              <div className="w-2/3">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md"
                  value={secondInterval}
                  onChange={(e) => handleIntervalChange('second', e)}
                  placeholder="1"
                />
              </div>
              <div className="ml-2">
                <button 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => handleCopyToClipboard(secondInterval)}
                  aria-label="Copy second interval"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Minute Interval */}
            <div className="flex items-center">
              <div className="w-1/3">
                <p className="text-sm text-gray-600">Mỗi x Phút</p>
              </div>
              <div className="w-2/3">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md"
                  value={minuteInterval}
                  onChange={(e) => handleIntervalChange('minute', e)}
                  placeholder="1"
                />
              </div>
            </div>
            
            {/* Hour Interval */}
            <div className="flex items-center">
              <div className="w-1/3">
                <p className="text-sm text-gray-600">Mỗi x Giờ</p>
              </div>
              <div className="w-2/3">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md"
                  value={hourInterval}
                  onChange={(e) => handleIntervalChange('hour', e)}
                  placeholder="1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplingComponent;

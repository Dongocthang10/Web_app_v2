import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

interface ConfigItem {
  title: string;
  onClick: () => void;
}

const SensorAdvance = () => {
  const configItems: ConfigItem[] = [
    {
      title: 'Sum Config',
      onClick: () => console.log('Sum Config clicked')
    },
    {
      title: 'Virtual Config',
      onClick: () => console.log('Virtual Config clicked')
    },
    {
      title: 'Calibration',
      onClick: () => console.log('Calibration clicked')
    },
    {
      title: 'Alarm',
      onClick: () => console.log('Alarm clicked')
    },
    {
      title: 'Error',
      onClick: () => console.log('Error clicked')
    },
    {
        title: 'Limitation',
        onClick: () => console.log('Limitation clicked')
    }
  ];

  return (
    <div className="max-w-sm rounded-xl bg-white p-4 shadow-lg">
      <h2 className="mb-4 font-bold text-gray-800 text-center">Advance Config</h2>

      <div className="flex flex-col">
        {configItems.map((item, index) => (
          <React.Fragment key={index}> {/* Use React.Fragment for conditional rendering */}
            <button
              onClick={item.onClick}
              className="flex shadow-lg items-center rounded-lg p-2 hover:bg-gray-50 transition-colors relative" // Added relative for positioning
            >
              <div className="flex items-center space-x-2 mr-7">
                <Star className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{item.title}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 absolute right-2" /> {/* Positioned absolutely */}
            </button>
            {index < configItems.length - 1 && ( // Conditionally render hr
              <hr className="my-2 border-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SensorAdvance;
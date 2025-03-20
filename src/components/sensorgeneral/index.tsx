import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

interface GenaralConfigItem {
  title: string;
  onClick: () => void;
}

const SensorGeneral = () => {
  const configItems: GenaralConfigItem[] = [
    {
      title: 'General Information',
      onClick: () => console.log('General Information clicked')
    },
    {
      title: 'Sampling Frequency',
      onClick: () => console.log('Sampling Frequency clicked')
    },
    {
      title: 'Modbus TCP/IP',
      onClick: () => console.log('Modbus TCP/IP clicked')
    },
    {
      title: 'Modbus RTU',
      onClick: () => console.log('Modbus RTU clicked')
    },
    {
      title: 'Evo-Sens',
      onClick: () => console.log('Evo-Sens clicked')
    }
  ];

  return (
    <div className="max-w-sm bg-white p-4 shadow-lg rounded-xl">
      <h2 className="mb-4 font-bold text-gray-800 text-center">General Config</h2>

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

export default SensorGeneral;
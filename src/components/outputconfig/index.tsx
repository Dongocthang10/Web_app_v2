import React, { useState } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const OutputConfig = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isOutputLimitEnabled, setIsOutputLimitEnabled] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>('Calib Value');

  // Custom Switch component
  const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => (
    <div
      className="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
      onClick={onChange}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
          checked ? 'translate-x-6 bg-black' : ''
        }`}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">1. CO2</h2>
        <span className="text-lg">Output Config</span>
      </div>

      {/* Kích hoạt */}
      <div className="mb-4 flex items-center">
        <div className="flex items-center w-24">
          <span>Kích hoạt</span>
        </div>
        <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
      </div>

      {/* Set Point Input */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-24">Input Type</div>
          <select
            className="border rounded p-1 w-full"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option>Calib Value</option>
            <option>Raw Value</option>
          </select>
        </div>

        <div className="space-y-4">
          {['Set Point 1', 'Set Point 2'].map((point, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-24">{point} Input</div>
              <input type="text" className="border rounded p-1 flex-grow" defaultValue={index === 0 ? '0' : '1000'} />
              <div className="w-28">{point} Output</div>
              <input type="text" className="border rounded p-1 flex-grow" defaultValue={index === 0 ? '820' : '4000'} />
            </div>
          ))}
        </div>
      </div>

      {/* Modbus TCP/IP */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Modbus TCP/IP</h3>
        <div className="space-y-2">
          {[
            { label: 'IP', value: '0' },
            { label: 'Port', value: '820' },
            { label: 'Slave ID', value: '0' },
            { label: 'Type', value: 'holding' },
            { label: 'Address', value: '0' },
            { label: 'Timeout', value: '1' },
          ].map((field, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-24">{field.label}</div>
              <input type="text" className="border rounded p-1 flex-grow" defaultValue={field.value} />
            </div>
          ))}
        </div>

        <div className="flex items-center mt-4">
          <div className="w-24">Datatype</div>
          <select className="border rounded p-1 w-full">
            <option>int16</option>
            <option>int32</option>
          </select>
        </div>
      </div>

      {/* Output Limit */}
      <div>
        <h3 className="font-medium mb-2">Output Limit</h3>
        <div className="mb-4 flex items-center">
          <div className="flex items-center w-24">
            <span>Kích hoạt</span>
          </div>
          <Switch
            checked={isOutputLimitEnabled}
            onChange={() => setIsOutputLimitEnabled(!isOutputLimitEnabled)}
          />
        </div>

        {/* Lower and Upper Limits */}
        {['Lower', 'Upper'].map((limit, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-start">
              <div className="w-24 h-full flex items-center justify-start" style={{ marginTop: '24px' }}>
                <span>{limit}</span>
              </div>

              <div className="flex flex-col gap-2 w-full">
                {['Limit', 'Saturation', 'Noise'].map((field, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-16">{field}</span>
                    <input
                      type="text"
                      className="border rounded p-1 flex-grow"
                      defaultValue={field === 'Limit' ? (limit === 'Lower' ? '1' : '100') : '0.01'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutputConfig;

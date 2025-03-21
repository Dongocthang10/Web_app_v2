import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import Switch from '../switch';

// Define interfaces for props and data
interface SensorData {
  id: number;
  type: string;
  raw: string;
  calib: string;
  total: string;
  date: string;
}

interface EvoSensorProps {
  initialData?: SensorData[];
  onReadServer?: () => void;
  onReadValues?: () => void;
}

const EvoSensor: React.FC<EvoSensorProps> = ({
  initialData,
  onReadServer,
  onReadValues
}) => {
  // State management
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [useRaw, setUseRaw] = useState<boolean>(true);
  const [useCalib, setUseCalib] = useState<boolean>(true);
  const [useTotal, setUseTotal] = useState<boolean>(true);
  const [serverName, setServerName] = useState<string>("Evo-Sensor-Server-1");
  const [ipAddress, setIpAddress] = useState<string>("12FF-FRCC-12D2-36GG-ASD2");
  
  // Sample data or use provided initialData
  const sensorData: SensorData[] = initialData || Array(7).fill({
    id: 1,
    type: 'SO2',
    raw: '4.567 mA',
    calib: '400 m3/h',
    total: '1234 m3',
    date: '2025/11/1 8:8:8'
  });
  
  // Event handlers
  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    return () => setter(prev => !prev);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Copied to clipboard'))
      .catch(err => console.error('Failed to copy:', err));
  };
  
  const handleReadServer = () => {
    if (onReadServer) {
      onReadServer();
    } else {
      console.log('Reading from server:', serverName);
    }
  };
  
  const handleReadValues = () => {
    if (onReadValues) {
      onReadValues();
    } else {
      console.log('Reading values from IP:', ipAddress);
    }
  };
  
  // Render sensor data rows
  const renderSensorRows = () => {
    return sensorData.map((sensor, index) => (
      <div 
        key={index} 
        className="flex items-center gap-1 p-1 rounded-md border-gray-300 bg-white text-xs"
      >
        <span className="w-5">{sensor.id}.</span>
        <input type="checkbox" className="w-4 h-3" />
        <input 
          type="text" 
          className="rounded p-1 w-20 shadow-lg" 
          defaultValue={sensor.type} 
        />
        <div className="flex items-center gap-1 ml-auto">
          {useRaw && (
            <input 
              type="text" 
              className="rounded p-1 w-28 shadow-lg" 
              defaultValue={sensor.raw} 
            />
          )}
          {useCalib && (
            <input 
              type="text" 
              className="rounded p-1 w-28 shadow-lg" 
              defaultValue={sensor.calib} 
            />
          )}
          {useTotal && (
            <input 
              type="text" 
              className="rounded p-1 w-28 shadow-lg" 
              defaultValue={sensor.total} 
            />
          )}
          <input 
            type="text" 
            className="rounded p-1 w-32 shadow-lg" 
            defaultValue={sensor.date} 
          />
        </div>
      </div>
    ));
  };
  
  // Toggle switch component for reuse
  const ToggleOption: React.FC<{
    label: string;
    checked: boolean;
    onChange: () => void;
  }> = ({ label, checked, onChange }) => (
    <div className="flex items-center gap-7">
      <label className="text-sm font-medium w-48">{label}</label>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
  
  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-lg shadow-md space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">1. CO2</h2>
        <h2 className="text-xl font-medium">Evo-Sensor</h2>
      </div>

      {/* Step 1 */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Step 1</h3>
        <div className="flex items-center gap-40">
          <label className="text-sm font-medium">Kích hoạt</label>
          <Switch checked={isEnabled} onChange={handleToggle(setIsEnabled)} />
        </div>

        <div className="space-y-4">
          {/* Server gần nhất */}
          <div className="flex items-center">
            <span className="text-sm w-48">Server gần nhất</span>
            <div className="flex-1 relative flex items-center gap-2">
              <input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                className="w-full p-2 border rounded-xl pr-10"
              />
              <button 
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
                onClick={handleReadServer}
              >
                Read
              </button>
            </div>
          </div>

          {/* IP của điểm đo */}
          <div className="flex items-center">
            <span className="text-sm w-48">IP của điểm đo</span>
            <div className="flex-1">
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full p-2 border rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Step 2</h3>
        <div className="flex justify-between items-center">
          <span>Đọc các giá trị đo tại điểm đo bên trên</span>
          <div className="flex items-center gap-4">
            <button 
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
              onClick={handleReadValues}
            >
              Read
            </button>
            <Copy 
              className="w-6 h-6 text-gray-400 cursor-pointer" 
              onClick={() => handleCopy(JSON.stringify(sensorData))}
            />
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Step 3</h3>
        <div className="border rounded-lg p-4 bg-white shadow-xl">
          <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide">
            {renderSensorRows()}
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Step 4: Chọn các giá trị áp dụng</h3>
        <div className="space-y-4">
          <ToggleOption 
            label="Sử dụng giá trị Raw" 
            checked={useRaw} 
            onChange={handleToggle(setUseRaw)} 
          />
          <ToggleOption 
            label="Sử dụng giá trị Calib" 
            checked={useCalib} 
            onChange={handleToggle(setUseCalib)} 
          />
          <ToggleOption 
            label="Sử dụng giá trị Total" 
            checked={useTotal} 
            onChange={handleToggle(setUseTotal)} 
          />
        </div>
      </div>
    </div>
  );
};

export default EvoSensor;

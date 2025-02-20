import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const AlarmConfig = () => {
  const [isKichHoatEnabled, setIsKichHoatEnabled] = useState<boolean>(true);
  const [isLevelEnabled, setIsLevelEnabled] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>('Upper');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>('#bc4749');
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

  const handleColorChange = (color: any) => {
    setCurrentColor(color.hex);
  };

  const ColorPicker = () => (
    <div className="absolute mt-2 bg-white shadow-lg rounded p-2">
      <div className="grid grid-cols-6 gap-2">
        {[
          '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
          '#ff8800', '#88ff00', '#0088ff', '#ff0088', '#8800ff', '#00ff88'
        ].map((color) => (
          <div
            key={color}
            className="w-6 h-6 rounded cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => {
              setCurrentColor(color);
              setShowColorPicker(false);
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">1. CO2</h2>
        <span className="text-lg">Alarm</span>
      </div>

      {/* Kich hoat section */}
      <div className="mb-8 flex items-center">
        <div className="flex items-center w-24">
          <span>Kích hoạt</span>
        </div>
        <Switch 
          checked={isKichHoatEnabled} 
          onChange={() => setIsKichHoatEnabled(!isKichHoatEnabled)} 
        />
      </div>

      {/* Raw section */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-24 h-full flex items-center justify-start" style={{ marginTop: "24px" }}>
            <span>Raw</span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <span className="w-16">Lower</span>
              <input 
                type="text" 
                className="border rounded p-1 flex-grow" 
                defaultValue="1"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16">Upper</span>
              <input 
                type="text" 
                className="border rounded p-1 flex-grow" 
                defaultValue="100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calib section */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-24 h-full flex items-center justify-start" style={{ marginTop: "24px" }}>
            <span>Calib</span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <span className="w-16">Lower</span>
              <input 
                type="text" 
                className="border rounded p-1 flex-grow" 
                defaultValue="1"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16">Upper</span>
              <input 
                type="text" 
                className="border rounded p-1 flex-grow" 
                defaultValue="100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mid Level List section */}
      <div>
        <h3 className="font-medium mb-2">Mid Level List</h3>
        <div className="flex items-center gap-2">
          <Switch 
            checked={isLevelEnabled} 
            onChange={() => setIsLevelEnabled(!isLevelEnabled)} 
          />
          <input 
            type="text" 
            className="border rounded p-1 w-20" 
            defaultValue="Level 1"
          />
          <select 
            className="border rounded p-1 w-24"
            value={selectedOption}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOption(e.target.value)}
          >
            <option value="Upper">Upper</option>
            <option value="Lower">Lower</option>
          </select>
          <input 
            type="text" 
            className="border rounded p-1 w-20" 
            placeholder="Value"
          />
          <input 
            type="text" 
            className="border rounded p-1 w-32" 
            placeholder="Note something"
          />
          <input 
            type="text" 
            className="border rounded p-1 w-24" 
            value={currentColor}
            readOnly
          />
          <div className="relative">
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: currentColor }}
              />
            </button>
            {showColorPicker && (
              <div className="absolute z-10 mt-2">
                <ChromePicker
                  color={currentColor}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmConfig;
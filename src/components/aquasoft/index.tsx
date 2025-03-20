import React, { useState } from 'react';
import { Trash2, Plus, Copy, Save } from 'lucide-react';
import Switch from '../switch';
interface SensorRow {
  id: number;
  inputIndex: string;
  sensorName: string;
  type: string;
}

const AquasoftConfig = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [serverConfig, setServerConfig] = useState({
    serverUrl: 'dl.aquasoft.vn',
    serverIp: '171.244.60.37',
    port: '4',
    interval: '5',
    deviceId: '1',
    timeout: '1'
  });

  const [sensorRows, setSensorRows] = useState<SensorRow[]>([
    { id: 1, inputIndex: '21', sensorName: 'SO2', type: 'Raw' }
  ]);

  const handleServerConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServerConfig(prev => ({ ...prev, [name]: value }));
  };

  const addRow = () => {
    setSensorRows(prev => [
      ...prev,
      { id: prev.length + 1, inputIndex: '21', sensorName: 'SO2', type: 'Raw' }
    ]);
  };

  const deleteRow = (id: number) => {
    setSensorRows(prev => prev.filter(row => row.id !== id));
  };

  const duplicateRow = (id: number) => {
    const rowToDuplicate = sensorRows.find(row => row.id === id);
    if (rowToDuplicate) {
      setSensorRows(prev => [
        ...prev,
        { ...rowToDuplicate, id: Math.max(...prev.map(r => r.id)) + 1 }
      ]);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-7 bg-white rounded-lg shadow-2xl shadow-black/50">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Aquasoft</h1>
          <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg">
            <Save size={20} />
            Save
          </button>
        </div>

        {/* Server Configuration */}
            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <label className="text-sm font-medium mr-24">Kích hoạt</label>
                    <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
            </div>
        </div>
          {Object.entries(serverConfig).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-semibold text-sm w-36 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleServerConfigChange}
                className="flex-1 border text-sm rounded-md px-2 py-1 focus:outline-none shadow-xs shadow-black/50 "
              />
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Copy size={20} className="text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Sensor Rows */}
        <div className="max-h-80 overflow-y-auto rounded-lg p-2 scrollbar-hide">
          <div className="space-y-1.5 min-w-[800px]">
            {sensorRows.map((row) => (
              <div key={row.id} className="flex items-center gap-2 bg-white p-1.5 rounded shadow-sm">
                <span className="w-6 text-sm text-gray-600">{row.id}.</span>
                <input
                  type="text"
                  value={row.inputIndex}
                  className="flex-1 border p-1 w-20 rounded text-sm"
                />
                <input
                  type="text"
                  value={row.sensorName}
                  className="flex-1 border p-1 w-20 rounded text-sm"
                />
                <select className="flex-1 border p-1 w-20 rounded text-sm">
                  <option>Raw</option>
                </select>
                <button
                  onClick={() => duplicateRow(row.id)}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <Plus size={16} className="text-gray-500" />
                </button>
                <button
                  onClick={() => deleteRow(row.id)}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <Trash2 size={16} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={addRow}
          className="mt-3 px-3 py-1.5 bg-green-600 text-white rounded flex items-center gap-1 text-sm"
        >
          <Plus size={16} />
          Add Row
        </button>
    </div>
  );
};

export default AquasoftConfig;
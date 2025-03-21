import React, { useState, useEffect } from 'react';

// Define interfaces for data types
interface MonitoringStation {
  id: number;
  enabled: boolean;
  folder: string;
  stationList: string;
  stationName: string;
  stationCode: string;
  deviceCode: string;
  stationId: string;
  parameters: {
    name: string;
    hd: string;
    avtn: string;
    gk1: string;
  }[];
}

interface FtpMonitoringProps {
  // Add any props if needed
  initialMethod?: string;
  initialFolder?: string;
  initialFileName?: string;
  initialStations?: MonitoringStation[];
  onStationToggle?: (id: number, enabled: boolean) => void;
  onStationAdd?: (station: MonitoringStation) => void;
  onStationDelete?: (id: number) => void;
  onValueChange?: (field: string, value: string) => void;
  onSave?: (data: any) => void;
}

const TT17Config: React.FC<FtpMonitoringProps> = ({
  initialMethod = 'TXT - TT-17 BTMNT PAI',
  initialFolder = '/(Year)/(Month)/(Day)',
  initialFileName = 'PT_PHHA_NUON11',
  initialStations,
  onStationToggle,
  onStationAdd,
  onStationDelete,
  onValueChange,
  onSave
}) => {
  // State for method, folder, and file name
  const [method, setMethod] = useState<string>(initialMethod);
  const [folder, setFolder] = useState<string>(initialFolder);
  const [fileName, setFileName] = useState<string>(initialFileName);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State for monitoring stations
  const [stations, setStations] = useState<MonitoringStation[]>(initialStations || [
    {
      id: 1,
      enabled: true,
      folder: 'Folder',
      stationList: 'Danh sách cảm biến',
      stationName: 'Giếng TV',
      stationCode: '/VIETPOWER/GK1',
      deviceCode: 'FLOW_GK1_LEVEL_GK1',
      stationId: '',
      parameters: [
        {
          name: 'Giếng TV',
          hd: 'HD',
          avtn: 'AVTN',
          gk1: 'GK1'
        }
      ]
    },
    {
      id: 2,
      enabled: true,
      folder: '/VIETPOWER/GK1',
      stationList: 'FLOW_GK1_LEVEL_GK1',
      stationName: 'Giếng TV',
      stationCode: 'HD',
      deviceCode: 'AVTN',
      stationId: 'GK1',
      parameters: [
        {
          name: 'Giếng TV',
          hd: 'HD',
          avtn: 'AVTN',
          gk1: 'GK1'
        }
      ]
    },
    {
      id: 3,
      enabled: true,
      folder: '/VIETPOWER/GK1',
      stationList: 'FLOW_GK1_LEVEL_GK1',
      stationName: 'Giếng TV',
      stationCode: 'HD',
      deviceCode: 'AVTN',
      stationId: 'GK1',
      parameters: [
        {
          name: 'Giếng TV',
          hd: 'HD',
          avtn: 'AVTN',
          gk1: 'GK1'
        }
      ]
    },
    {
      id: 4,
      enabled: true,
      folder: '/VIETPOWER/GK1',
      stationList: 'FLOW_GK1_LEVEL_GK1',
      stationName: 'Giếng TV',
      stationCode: 'HD',
      deviceCode: 'AVTN',
      stationId: 'GK1',
      parameters: [
        {
          name: 'Giếng TV',
          hd: 'HD',
          avtn: 'AVTN',
          gk1: 'GK1'
        }
      ]
    },
    {
      id: 5,
      enabled: true,
      folder: '/VIETPOWER/GK1',
      stationList: 'FLOW_GK1_LEVEL_GK1',
      stationName: 'Giếng TV',
      stationCode: 'HD',
      deviceCode: 'AVTN',
      stationId: 'GK1',
      parameters: [
        {
          name: 'Giếng TV',
          hd: 'HD',
          avtn: 'AVTN',
          gk1: 'GK1'
        }
      ]
    }
  ]);

  // Validate inputs
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    if (!method) {
      newErrors.method = 'Method is required';
    }
    
    if (!folder) {
      newErrors.folder = 'Folder path is required';
    }
    
    if (!fileName) {
      newErrors.fileName = 'File name is required';
    }
    
    setErrors(newErrors);
  }, [method, folder, fileName]);
  
  // Function to handle method change
  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMethod(value);
    if (onValueChange) {
      onValueChange('method', value);
    }
  };
  
  // Function to handle folder change
  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFolder(value);
    if (onValueChange) {
      onValueChange('folder', value);
    }
  };
  
  // Function to handle file name change
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFileName(value);
    if (onValueChange) {
      onValueChange('fileName', value);
    }
  };
  
  // Function to handle station toggle
  const handleStationToggle = (id: number) => {
    const updatedStations = stations.map(station => 
      station.id === id ? { ...station, enabled: !station.enabled } : station
    );
    setStations(updatedStations);
    
    const station = updatedStations.find(s => s.id === id);
    if (station && onStationToggle) {
      onStationToggle(id, station.enabled);
    }
  };
  
  // Function to handle adding a new station
  const handleAddStation = () => {
    const newStation: MonitoringStation = {
      id: stations.length > 0 ? Math.max(...stations.map(s => s.id)) + 1 : 1,
      enabled: true,
      folder: '/VIETPOWER/GK1',
      stationList: 'FLOW_GK1_LEVEL_GK1',
      stationName: 'Giếng TV',
      stationCode: 'HD',
      deviceCode: 'AVTN',
      stationId: 'GK1',
      parameters: [
        {
          name: 'Giếng TV',
          hd: 'HD',
          avtn: 'AVTN',
          gk1: 'GK1'
        }
      ]
    };
    
    setStations([...stations, newStation]);
    
    if (onStationAdd) {
      onStationAdd(newStation);
    }
  };
  
  // Function to handle deleting a station
  const handleDeleteStation = (id: number) => {
    setStations(stations.filter(station => station.id !== id));
    
    if (onStationDelete) {
      onStationDelete(id);
    }
  };
  
  // Function to add a parameter to a station
  const handleAddParameter = (stationId: number) => {
    const updatedStations = stations.map(station => {
      if (station.id === stationId) {
        return {
          ...station,
          parameters: [
            ...station.parameters,
            {
              name: 'Giếng TV',
              hd: 'HD',
              avtn: 'AVTN',
              gk1: 'GK1'
            }
          ]
        };
      }
      return station;
    });
    
    setStations(updatedStations);
  };
  
  // Function to delete a parameter from a station
  const handleDeleteParameter = (stationId: number, paramIndex: number) => {
    const updatedStations = stations.map(station => {
      if (station.id === stationId) {
        const updatedParams = [...station.parameters];
        updatedParams.splice(paramIndex, 1);
        return {
          ...station,
          parameters: updatedParams
        };
      }
      return station;
    });
    
    setStations(updatedStations);
  };
  
  // Function to save all data
  const handleSave = () => {
    if (Object.keys(errors).length === 0) {
      const data = {
        method,
        folder,
        fileName,
        stations
      };
      
      if (onSave) {
        onSave(data);
      }
      
      // Could also save to localStorage or make an API call here
      localStorage.setItem('ftpMonitoringData', JSON.stringify(data));
      
      alert('Data saved successfully!');
    } else {
      alert('Please fix the errors before saving.');
    }
  };
  
  // Function to copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard:', text);
        // Show a temporary success message
        const message = document.createElement('div');
        message.textContent = 'Copied!';
        message.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md';
        document.body.appendChild(message);
        setTimeout(() => {
          document.body.removeChild(message);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };
  
  // Function to export data as JSON
  const exportData = () => {
    const data = {
      method,
      folder,
      fileName,
      stations
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ftp-monitoring-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Toggle switch component
  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
    <div 
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${enabled ? 'bg-gray-400' : 'bg-gray-300'}`}
      onClick={onChange}
    >
      <div 
        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'transform translate-x-6' : ''}`}
      />
    </div>
  );
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">1. FTP 1</h2>
        <h2 className="text-xl font-bold">TXT TT-17 BTMNT</h2>
      </div>
      
      {/* Method Selection */}
      <div className="mb-4 grid grid-cols-6 gap-4 items-center">
        <div className="col-span-1">
          <span className="text-sm text-gray-600">Method</span>
        </div>
        <div className="col-span-4 relative">
          <select 
            className={`appearance-none bg-white border rounded-md p-2 pr-8 w-full ${errors.method ? 'border-red-500' : ''}`}
            value={method}
            onChange={handleMethodChange}
          >
            <option value="TXT - TT-17 BTMNT PAI">TXT - TT-17 BTMNT PA1</option>
            <option value="TXT - TT-17 BTMNT PA2">TXT - TT-17 BTMNT PA2</option>
            <option value="TXT - TT-17 BTMNT PA3">TXT - TT-17 BTMNT PA3</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          {errors.method && <p className="text-red-500 text-xs mt-1">{errors.method}</p>}
        </div>
        <div className="col-span-1 flex justify-end">
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={() => copyToClipboard(method)}
            aria-label="Copy method"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Folder Path */}
      <div className="mb-4 grid grid-cols-6 gap-4 items-center">
        <div className="col-span-1">
          <span className="text-sm text-gray-600">Folder</span>
        </div>
        <div className="col-span-4">
          <input 
            type="text" 
            className={`w-full p-2 border rounded-md ${errors.folder ? 'border-red-500' : ''}`}
            value={folder}
            onChange={handleFolderChange}
          />
          {errors.folder && <p className="text-red-500 text-xs mt-1">{errors.folder}</p>}
        </div>
        <div className="col-span-1 flex justify-end">
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={() => copyToClipboard(folder)}
            aria-label="Copy folder"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* File Name */}
      <div className="mb-4 grid grid-cols-6 gap-4 items-center">
        <div className="col-span-1">
          <span className="text-sm text-gray-600">File Name</span>
        </div>
        <div className="col-span-4">
          <input 
            type="text" 
            className={`w-full p-2 border rounded-md ${errors.fileName ? 'border-red-500' : ''}`}
            value={fileName}
            onChange={handleFileNameChange}
          />
          {errors.fileName && <p className="text-red-500 text-xs mt-1">{errors.fileName}</p>}
        </div>
        <div className="col-span-1 flex justify-end">
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={() => copyToClipboard(fileName)}
            aria-label="Copy file name"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Monitoring Stations Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-4 border-t pt-4">Danh sách các trạm quan trắc</h3>        
        {/* Scrollable Station List */}
        <div className="max-h-96 overflow-y-auto border rounded-lg scrollbar-hide">
          {stations.map((station, index) => (
            <div key={station.id} className="border-b last:border-b-0">
              {/* Station Row */}
              <div className="grid grid-cols-12 gap-2 p-2 items-center">
                <div className="col-span-1 text-center">
                  <span className="text-sm">{index + 1}.</span>
                </div>
                <div className="col-span-1 flex justify-center">
                  <ToggleSwitch 
                    enabled={station.enabled} 
                    onChange={() => handleStationToggle(station.id)} 
                  />
                </div>
                <div className="col-span-10 grid grid-cols-10 gap-2">
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={station.stationName}
                      onChange={(e) => {
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, stationName: e.target.value } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={station.stationCode}
                      onChange={(e) => {
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, stationCode: e.target.value } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={station.deviceCode}
                      onChange={(e) => {
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, deviceCode: e.target.value } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={station.stationId}
                      onChange={(e) => {
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, stationId: e.target.value } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-1 flex justify-end space-x-1">
                  <button 
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                    onClick={handleAddStation}
                    aria-label="Add station"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                  <button 
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                    onClick={() => handleDeleteStation(station.id)}
                    aria-label="Delete station"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Station Folder */}
              <div className="px-4 py-2 grid grid-cols-12 gap-2">
                <div className="col-span-2 text-right">
                  <span className="text-sm">{station.folder}</span>
                </div>
                <div className="col-span-10">
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={station.stationList}
                    onChange={(e) => {
                      const updatedStations = stations.map(s => 
                        s.id === station.id ? { ...s, stationList: e.target.value } : s
                      );
                      setStations(updatedStations);
                    }}
                  />
                </div>
              </div>
              {station.parameters.map((param, paramIndex) => (
                <div key={paramIndex} className="px-4 py-2 grid grid-cols-4 gap-2">
                  <div className="col-span-1">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={param.name}
                      onChange={(e) => {
                        const updatedParams = [...station.parameters];
                        updatedParams[paramIndex] = { ...param, name: e.target.value };
                        
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, parameters: updatedParams } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={param.hd}
                      onChange={(e) => {
                        const updatedParams = [...station.parameters];
                        updatedParams[paramIndex] = { ...param, hd: e.target.value };
                        
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, parameters: updatedParams } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={param.avtn}
                      onChange={(e) => {
                        const updatedParams = [...station.parameters];
                        updatedParams[paramIndex] = { ...param, avtn: e.target.value };
                        
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, parameters: updatedParams } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      value={param.gk1}
                      onChange={(e) => {
                        const updatedParams = [...station.parameters];
                        updatedParams[paramIndex] = { ...param, gk1: e.target.value };
                        const updatedStations = stations.map(s => 
                          s.id === station.id ? { ...s, parameters: updatedParams } : s
                        );
                        setStations(updatedStations);
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="px-4 py-2 flex justify-end space-x-2">
                <button 
                  className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                  onClick={() => handleAddParameter(station.id)}
                >
                  Add Parameter
                </button>
                {station.parameters.length > 1 && (
                  <button 
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    onClick={() => handleDeleteParameter(station.id, station.parameters.length - 1)}
                  >
                    Remove Parameter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      {/* <div className="flex justify-end space-x-4 mt-6">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddStation}
        >
          Add Station
        </button>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Configuration
        </button>
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={exportData}
        >
          Export JSON
        </button>
      </div> */}
    </div>
  );
};

export default TT17Config;

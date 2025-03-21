import React, { useState } from 'react';
import Switch from '../switch';

interface ConfigRow {
  id: string;
  input: string;
  address: string;
  value: string;
}

interface StateControlComponentProps {
  // Add any props if needed
  onConfigChange?: (configType: 'normal' | 'calibrated' | 'error', enabled: boolean) => void;
}

const StateControlComponent: React.FC<StateControlComponentProps> = ({ onConfigChange }) => {
  // State for toggle switches
  const [isEnabled, setIsEnabled] = useState(true);
  const [mainEnabled, setMainEnabled] = useState<boolean>(true);
  const [normalConfigEnabled, setNormalConfigEnabled] = useState<boolean>(true);
  const [calibratedConfigEnabled, setCalibratedConfigEnabled] = useState<boolean>(false);
  const [errorConfigEnabled, setErrorConfigEnabled] = useState<boolean>(false);
  
  // State for dropdowns
  const [controlMethod, setControlMethod] = useState<string>('Control Digital Input');
  const [localMethod, setLocalMethod] = useState<string>('Calib');
  const [localExpanded, setLocalExpanded] = useState<boolean>(true);
  
  // State for priority inputs
  const [normalPriority, setNormalPriority] = useState<string>('');
  const [calibratedPriority, setCalibratedPriority] = useState<string>('');
  const [errorPriority, setErrorPriority] = useState<string>('');
  
  // State for config rows
  const [normalConfigRows, setNormalConfigRows] = useState<ConfigRow[]>([
    { id: '1', input: 'Input', address: 'Address', value: 'Value' },
    { id: '2', input: 'Input', address: 'Address', value: 'Value' },
    { id: '3', input: 'Input', address: 'Address', value: 'Value' },
    { id: '4', input: 'Input', address: 'Address', value: 'Value' },
  ]);
  
  const [calibratedConfigRows, setCalibratedConfigRows] = useState<ConfigRow[]>([
    { id: '1', input: 'Input', address: 'Address', value: 'Value' },
    { id: '2', input: 'Input', address: 'Address', value: 'Value' },
    { id: '3', input: 'Input', address: 'Address', value: 'Value' },
    { id: '4', input: 'Input', address: 'Address', value: 'Value' },
  ]);
  
  const [errorConfigRows, setErrorConfigRows] = useState<ConfigRow[]>([
    { id: '1', input: 'Input', address: 'Address', value: 'Value' },
    { id: '2', input: 'Input', address: 'Address', value: 'Value' },
    { id: '3', input: 'Input', address: 'Address', value: 'Value' },
    { id: '4', input: 'Input', address: 'Address', value: 'Value' },
  ]);
  
  // State for editing
  const [editingRow, setEditingRow] = useState<{
    configType: 'normal' | 'calibrated' | 'error' | null;
    rowId: string | null;
  }>({ configType: null, rowId: null });
  
  // Function to add a new row to a specific config
  const addRow = (configType: 'normal' | 'calibrated' | 'error') => {
    const newRow = {
      id: Date.now().toString(),
      input: 'Input',
      address: 'Address',
      value: 'Value'
    };
    
    switch (configType) {
      case 'normal':
        setNormalConfigRows([...normalConfigRows, newRow]);
        break;
      case 'calibrated':
        setCalibratedConfigRows([...calibratedConfigRows, newRow]);
        break;
      case 'error':
        setErrorConfigRows([...errorConfigRows, newRow]);
        break;
    }
  };
  
  // Function to update a row in a specific config
  const updateRow = (
    configType: 'normal' | 'calibrated' | 'error',
    rowId: string,
    field: 'input' | 'address' | 'value',
    value: string
  ) => {
    switch (configType) {
      case 'normal':
        setNormalConfigRows(
          normalConfigRows.map(row => 
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case 'calibrated':
        setCalibratedConfigRows(
          calibratedConfigRows.map(row => 
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case 'error':
        setErrorConfigRows(
          errorConfigRows.map(row => 
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
    }
  };
  
  // Function to delete a row from a specific config
  const deleteRow = (configType: 'normal' | 'calibrated' | 'error', rowId: string) => {
    switch (configType) {
      case 'normal':
        setNormalConfigRows(normalConfigRows.filter(row => row.id !== rowId));
        break;
      case 'calibrated':
        setCalibratedConfigRows(calibratedConfigRows.filter(row => row.id !== rowId));
        break;
      case 'error':
        setErrorConfigRows(errorConfigRows.filter(row => row.id !== rowId));
        break;
    }
  };
  
  // Function to handle config toggle changes
  const handleConfigToggle = (configType: 'normal' | 'calibrated' | 'error', enabled: boolean) => {
    switch (configType) {
      case 'normal':
        setNormalConfigEnabled(enabled);
        break;
      case 'calibrated':
        setCalibratedConfigEnabled(enabled);
        break;
      case 'error':
        setErrorConfigEnabled(enabled);
        break;
    }
    
    if (onConfigChange) {
      onConfigChange(configType, enabled);
    }
  };
  
  // Function to start editing a row
  const startEditing = (configType: 'normal' | 'calibrated' | 'error', rowId: string) => {
    setEditingRow({ configType, rowId });
  };
  
  // Function to stop editing
  const stopEditing = () => {
    setEditingRow({ configType: null, rowId: null });
  };
  
  // Toggle switch component
  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
    <div 
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${enabled ? 'bg-gray-400' : 'bg-gray-300'}`}
      onClick={onChange}
    >
      <div 
        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'transform translate-x-6' : ''}`}
      />
    </div>
  );
  
  // Function to copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard:', text);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">1. CO2</h2>
        <h2 className="text-xl font-bold">State Control</h2>
      </div>
      
      {/* Main toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Kích hoạt</span>
        <div className="flex items-center">
          {/* <ToggleSwitch 
            enabled={mainEnabled} 
            onChange={() => setMainEnabled(!mainEnabled)} 
          /> */}
          <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
          <button 
            className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={() => copyToClipboard(mainEnabled ? 'Enabled' : 'Disabled')}
            aria-label="Copy status"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Control method dropdown */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Phương pháp</span>
        <div className="flex items-center">
          <div className="relative">
            <select 
              className="appearance-none bg-white border rounded-md p-2 pr-8 w-64"
              value={controlMethod}
              onChange={(e) => setControlMethod(e.target.value)}
            >
              <option value="Control Digital Input">Control Digital Input</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <button 
            className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={() => copyToClipboard(controlMethod)}
            aria-label="Copy control method"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Local section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Local</span>
          <button 
            className="p-1 text-gray-500 hover:text-gray-700"
            onClick={() => setLocalExpanded(!localExpanded)}
          >
            <svg className={`w-5 h-5 transform ${localExpanded ? 'rotate-0' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        {localExpanded && (
          <div className="flex items-center justify-between mb-4 pl-4">
            <span className="text-sm text-gray-600">Phương pháp</span>
            <div className="flex items-center">
              <div className="relative">
                <select 
                  className="appearance-none bg-white border rounded-md p-2 pr-8 w-64"
                  value={localMethod}
                  onChange={(e) => setLocalMethod(e.target.value)}
                >
                  <option value="Calib">Calib</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <button 
                className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => copyToClipboard(localMethod)}
                aria-label="Copy local method"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Control Digital Input section */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-4">Control Digital Input</h3>
        
        {/* Normal Config */}
        <div className="border rounded-lg p-4 bg-white shadow-xl">
  <div className="mb-4 flex items-center gap-2">
    <span className="text-sm text-gray-600">Kích hoạt</span>
    <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
    <input
      type="text"
      className="p-2 border rounded-md w-24"
      placeholder="Priority"
      value={normalPriority}
      onChange={(e) => setNormalPriority(e.target.value)}
    />
    <button 
      className="ml-auto p-1 text-gray-500 hover:text-gray-700"
      onClick={() => addRow('normal')}
      aria-label="Add row"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
    </button>
  </div>
  <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide">
    {normalConfigRows.map(row => (
      <div key={row.id} className="flex items-center gap-2 p-0 rounded-md border-gray-300 bg-white text-xs my-[-1px]">
        {/* <span className="w-5">{row.id}.</span> */}
        <input type="text" className="rounded p-1 w-44 h-8 shadow-lg " value={row.input} onChange={(e) => updateRow('normal', row.id, 'input', e.target.value)} placeholder="Input" />
        <input type="text" className="rounded p-1 w-44 h-8 shadow-lg" value={row.address} onChange={(e) => updateRow('normal', row.id, 'address', e.target.value)} placeholder="Address" />
        <input type="text" className="rounded p-1 w-44 h-8 shadow-lg" value={row.value} onChange={(e) => updateRow('normal', row.id, 'value', e.target.value)} placeholder="Value" />
        <button 
              className="ml-2 p-1 text-gray-500 hover:text-gray-700"
              onClick={() => addRow('normal')}
              aria-label="Add row"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
        <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => startEditing('normal', row.id)} aria-label="Edit row">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </button>
        <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => deleteRow('normal', row.id)} aria-label="Delete row">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    ))}
  </div>
</div>

        
        {/* Calibrated Config */}
        <div className="mb-4 border rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium">Calibrated Config</h4>
          </div>
          
          <div className="flex mb-4">
            <div className="flex items-center mr-2">
              <span className="text-sm mr-2 text-gray-600">Kích hoạt</span>
              {/* <ToggleSwitch 
                enabled={calibratedConfigEnabled} 
                onChange={() => handleConfigToggle('calibrated', !calibratedConfigEnabled)} 
              /> */}
              <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
            </div>
            <input
              type="text"
              className="p-2 border rounded-md mr-2 w-24"
              placeholder="Priority"
              value={calibratedPriority}
              onChange={(e) => setCalibratedPriority(e.target.value)}
            />
            <input
              type="text"
              className="p-2 border rounded-md mr-2 w-24"
              placeholder="Input"
              disabled
            />
            <input
              type="text"
              className="p-2 border rounded-md mr-2 w-24"
              placeholder="Address"
              disabled
            />
            <input
              type="text"
              className="p-2 border rounded-md w-24"
              placeholder="Value"
              disabled
            />
            <button 
              className="ml-2 p-1 text-gray-500 hover:text-gray-700"
              onClick={() => addRow('calibrated')}
              aria-label="Add row"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
          
          <div className="max-h-40 overflow-y-auto pr-1">
            {calibratedConfigRows.map(row => (
              <div key={row.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="p-2 border rounded-md w-24"
                  value={row.input}
                  onChange={(e) => updateRow('calibrated', row.id, 'input', e.target.value)}
                  placeholder="Input"
                />
                <input
                  type="text"
                  className="p-2 border rounded-md w-24"
                  value={row.address}
                  onChange={(e) => updateRow('calibrated', row.id, 'address', e.target.value)}
                  placeholder="Address"
                />
                <input
                  type="text"
                  className="p-2 border rounded-md w-24"
                  value={row.value}
                  onChange={(e) => updateRow('calibrated', row.id, 'value', e.target.value)}
                  placeholder="Value"
                />
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => addRow('calibrated')}
                  aria-label="Add row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => startEditing('calibrated', row.id)}
                  aria-label="Edit row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => deleteRow('calibrated', row.id)}
                  aria-label="Delete row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Error Config */}
        <div className="mb-4 border rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium">Error Config</h4>
          </div>
          
          <div className="flex mb-4">
            <div className="flex items-center mr-2">
              <span className="text-sm mr-2 text-gray-600">Kích hoạt</span>
              {/* <Switch 
                enabled={errorConfigEnabled} 
                onChange={() => handleConfigToggle('error', !errorConfigEnabled)} 
              /> */}
              <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
            </div>
            <input
              type="text"
              className="p-2 border rounded-md mr-2 w-24"
              placeholder="Priority"
              value={errorPriority}
              onChange={(e) => setErrorPriority(e.target.value)}
            />
            <input
              type="text"
              className="p-2 border rounded-md mr-2 w-24"
              placeholder="Input"
              disabled
            />
            <input
              type="text"
              className="p-2 border rounded-md mr-2 w-24"
              placeholder="Address"
              disabled
            />
            <input
              type="text"
              className="p-2 border rounded-md w-24"
              placeholder="Value"
              disabled
            />
            <button 
              className="ml-2 p-1 text-gray-500 hover:text-gray-700"
              onClick={() => addRow('error')}
              aria-label="Add row"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
          
          <div className="max-h-40 overflow-y-auto pr-1">
            {errorConfigRows.map(row => (
              <div key={row.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="p-2 border rounded-md w-24"
                  value={row.input}
                  onChange={(e) => updateRow('error', row.id, 'input', e.target.value)}
                  placeholder="Input"
                />
                <input
                  type="text"
                  className="p-2 border rounded-md w-24"
                  value={row.address}
                  onChange={(e) => updateRow('error', row.id, 'address', e.target.value)}
                  placeholder="Address"
                />
                <input
                  type="text"
                  className="p-2 border rounded-md w-24"
                  value={row.value}
                  onChange={(e) => updateRow('error', row.id, 'value', e.target.value)}
                  placeholder="Value"
                />
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => addRow('error')}
                  aria-label="Add row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => startEditing('error', row.id)}
                  aria-label="Edit row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => deleteRow('error', row.id)}
                  aria-label="Delete row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateControlComponent;

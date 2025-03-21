import React, { useState } from 'react';
import Switch from '../switch';
// Define interfaces for data types
interface DateTimeTableRow {
  id: number;
  name: string;
  startDateTime: string;
  endDateTime: string;
  value: string;
  noise: string;
}

interface ValueStateRow {
  id: number;
  stateName: string;
  value: string;
  noise: string;
  accel: string;
  time: string;
  delay: string;
  cf: string;
}

interface StateTimeTableRow {
  id: number;
  eventName: string;
  activation: string;
  startDate: string;
  endDate: string;
  state: string;
}

interface SimulationComponentProps {
  // Add any props if needed
  onValueChange?: (field: string, value: string) => void;
  onRowAdd?: (tableType: 'dateTime' | 'valueState' | 'stateTime', row: any) => void;
  onRowDelete?: (tableType: 'dateTime' | 'valueState' | 'stateTime', id: number) => void;
}

const Simulation: React.FC<SimulationComponentProps> = ({
  onValueChange,
  onRowAdd,
  onRowDelete
}) => {
  // State for toggle switches
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [dateTimeTableEnabled, setDateTimeTableEnabled] = useState<boolean>(true);
  
  // State for dropdown selections
  const [method, setMethod] = useState<string>('Value On-Off');
  const [valueStateDropdown, setValueStateDropdown] = useState<string>('State');
  
  // State for value control
  const [upperValue, setUpperValue] = useState<string>('Upper');
  const [noiseValue, setNoiseValue] = useState<string>('9600');
  
  // Sample data for Date Time Table
  const [dateTimeTableData, setDateTimeTableData] = useState<DateTimeTableRow[]>(
    Array(10).fill(null).map((_, index) => ({
      id: index + 1,
      name: 'Bật bơm',
      startDateTime: '*/*/8 10:00:00',
      endDateTime: '*/*/8 10:00:00',
      value: '10',
      noise: '0.1'
    }))
  );
  
  // Sample data for Value State
  const [valueStateData, setValueStateData] = useState<ValueStateRow[]>([
    {
      id: 1,
      stateName: 'On',
      value: 'On Value',
      noise: 'On Noise',
      accel: 'On Accel',
      time: 'On Time',
      delay: 'On Delay',
      cf: 'On CF'
    },
    {
      id: 2,
      stateName: 'Off',
      value: 'Off Value',
      noise: 'Off Noise',
      accel: 'Off Accel',
      time: 'Off Time',
      delay: 'Off Delay',
      cf: 'Off CF'
    },
    {
      id: 3,
      stateName: 'State Name',
      value: 'Off Value',
      noise: 'Off Noise',
      accel: 'Off Accel',
      time: 'Off Time',
      delay: 'Off Delay',
      cf: 'Off CF'
    }
  ]);
  
  // Sample data for State Time Table
  const [stateTimeTableData, setStateTimeTableData] = useState<StateTimeTableRow[]>(
    Array(2).fill(null).map((_, index) => ({
      id: index + 1,
      eventName: 'Event Name',
      activation: 'Activation',
      startDate: 'Start Date',
      endDate: 'End Date',
      state: 'State'
    }))
  );
  
  // Function to handle adding a new row to Date Time Table
  const handleAddDateTimeRow = () => {
    const newRow: DateTimeTableRow = {
      id: dateTimeTableData.length + 1,
      name: 'Bật bơm',
      startDateTime: '*/*/8 10:00:00',
      endDateTime: '*/*/8 10:00:00',
      value: '10',
      noise: '0.1'
    };
    setDateTimeTableData([...dateTimeTableData, newRow]);
    if (onRowAdd) {
      onRowAdd('dateTime', newRow);
    }
  };
  
  // Function to handle adding a new row to Value State
  const handleAddValueStateRow = () => {
    const newRow: ValueStateRow = {
      id: valueStateData.length + 1,
      stateName: 'New State',
      value: 'Value',
      noise: 'Noise',
      accel: 'Accel',
      time: 'Time',
      delay: 'Delay',
      cf: 'CF'
    };
    setValueStateData([...valueStateData, newRow]);
    if (onRowAdd) {
      onRowAdd('valueState', newRow);
    }
  };
    const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        return () => setter(prev => !prev);
    };
  // Function to handle adding a new row to State Time Table
  const handleAddStateTimeRow = () => {
    const newRow: StateTimeTableRow = {
      id: stateTimeTableData.length + 1,
      eventName: 'Event Name',
      activation: 'Activation',
      startDate: 'Start Date',
      endDate: 'End Date',
      state: 'State'
    };
    setStateTimeTableData([...stateTimeTableData, newRow]);
    if (onRowAdd) {
      onRowAdd('stateTime', newRow);
    }
  };
  
  // Function to handle deleting a row from Date Time Table
  const handleDeleteDateTimeRow = (id: number) => {
    setDateTimeTableData(dateTimeTableData.filter(row => row.id !== id));
    if (onRowDelete) {
      onRowDelete('dateTime', id);
    }
  };
  
  // Function to handle deleting a row from Value State
  const handleDeleteValueStateRow = (id: number) => {
    setValueStateData(valueStateData.filter(row => row.id !== id));
    if (onRowDelete) {
      onRowDelete('valueState', id);
    }
  };
  
  // Function to handle deleting a row from State Time Table
  const handleDeleteStateTimeRow = (id: number) => {
    setStateTimeTableData(stateTimeTableData.filter(row => row.id !== id));
    if (onRowDelete) {
      onRowDelete('stateTime', id);
    }
  };
  
  // Function to handle input changes
  const handleInputChange = (field: string, value: string) => {
    if (onValueChange) {
      onValueChange(field, value);
    }
  };
  
  // Toggle switch component
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
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">1. CO2</h2>
        <h2 className="text-xl font-bold">Simulation</h2>
      </div>
      
      {/* Main toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">Kích hoạt</span>
        <div className="flex items-center">
        <div className="flex items-center gap-40">
          {/* <label className="text-sm font-medium">Kích hoạt</label> */}
          <Switch checked={isEnabled} onChange={handleToggle(setIsEnabled)} />
        </div>
          <button 
            className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={() => copyToClipboard(isEnabled ? 'Enabled' : 'Disabled')}
            aria-label="Copy status"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Method dropdown */}
      <div className="flex items-center justify-between mb-4">
        {/* Bọc label và select trong một div để đưa chúng lại gần nhau */}
        <div className="flex items-center gap-28">
            <span className="text-sm font-medium">Phương pháp</span>
            <div className="relative">
            <select 
                className="appearance-none bg-white border rounded-lg p-2 pr-4 w-96"
                value={method}
                onChange={(e) => {
                setMethod(e.target.value);
                handleInputChange('method', e.target.value);
                }}
            >
                <option value="Value On-Off">Value On-Off</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            </div>
        </div>
        {/* Giữ nguyên vị trí của button copy */}
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

      
      {/* Date Time Table Section */}
      <h3 className="text-md font-medium mb-4">Date Time Table</h3>
      <div className="flex mb-1">
        {["Name State", "Start Date Time", "End Date Time", "Value", "Noise"].map((label, index) => (
            <div key={index} className="w-1/6 px-1">
            <div className="bg-white border rounded-md p-1 text-center text-xs font-medium flex items-center justify-center">
                {label}
            </div>
            </div>
        ))}
        <div className="w-12 flex justify-center items-center">
            <button 
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={handleAddDateTimeRow}
            aria-label="Add row"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            </button>
        </div>
        </div>

        {/* Table Body */}
        <div className="max-h-60 overflow-y-auto mb-4 rounded-lg scrollbar-hide">
        {dateTimeTableData.map((row) => (
            <div key={row.id} className="flex mb-1 items-center p-1">
            {["name", "startDateTime", "endDateTime", "value", "noise"].map((field, index) => (
                <div key={index} className="w-1/6 px-1">
                <input
                    type="text"
                    className="w-full p-1.5 border rounded-md text-sm shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={row[field as keyof DateTimeTableRow]} 
                    onChange={(e) => {
                    const updatedData = dateTimeTableData.map(item => 
                        item.id === row.id ? { ...item, [field]: e.target.value } : item
                    );
                    setDateTimeTableData(updatedData);
                    handleInputChange(`dateTime_${row.id}_${field}`, e.target.value);
                    }}
                />
                </div>
            ))}
            <div className="w-12 flex justify-center items-center space-x-1">
                <button 
                className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => copyToClipboard(JSON.stringify(row))}
                aria-label="Copy row"
                >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                </button>
                <button 
                className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => handleDeleteDateTimeRow(row.id)}
                aria-label="Delete row"
                >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                </button>
            </div>
            </div>
        ))}
      </div>
      
      {/* Value Control Section */}
      <div className="mb-6 border-t pt-4">
        <h3 className="text-md font-medium mb-4">Value Control</h3>
        <div className="flex mb-2">
          <div className="w-1/4 px-1">
            <div className="text-sm text-gray-600">Value</div>
          </div>
          <div className="w-1/4 px-1">
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={upperValue}
              onChange={(e) => {
                setUpperValue(e.target.value);
                handleInputChange('upperValue', e.target.value);
              }}
            />
          </div>
          <div className="w-1/4 px-1">
            <div className="text-sm text-gray-600">Noise</div>
          </div>
          <div className="w-1/4 px-1">
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={noiseValue}
              onChange={(e) => {
                setNoiseValue(e.target.value);
                handleInputChange('noiseValue', e.target.value);
              }}
            />
          </div>
          <div className="w-12 flex justify-center items-center">
            <button 
              className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
              onClick={() => copyToClipboard(`Value: ${upperValue}, Noise: ${noiseValue}`)}
              aria-label="Copy value control"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Value State Section */}
      <div className="mb-6 border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-medium">Value State (On Off)</h3>
          <div className="flex items-center">
            <div className="relative">
              <select 
                className="appearance-none bg-white border rounded-md p-2 pr-8 w-32"
                value={valueStateDropdown}
                onChange={(e) => {
                  setValueStateDropdown(e.target.value);
                  handleInputChange('valueStateDropdown', e.target.value);
                }}
              >
                <option value="State">State</option>
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
              onClick={() => copyToClipboard(valueStateDropdown)}
              aria-label="Copy value state dropdown"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Value State Table - Scrollable */}
        <div className="max-h-60 overflow-y-auto mb-4 border rounded-lg shadow-md">
                <div className="w-12 flex justify-center items-center">
                <button
                    className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={handleAddValueStateRow}
                    aria-label="Add row"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>
                </div>

            {/* Table Body */}
            {valueStateData.map((row) => (
                <div key={row.id} className="flex mb-1 items-center p-1">
                {["stateName", "value", "noise", "accel", "time", "delay", "cf"].map((field) => (
                    <div key={field} className="w-1/8 px-1">
                    <input
                        type="text"
                        className="w-full p-1.5 border rounded-md text-sm shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={row[field as keyof ValueStateRow]}
                        onChange={(e) => {
                        const updatedData = valueStateData.map(item =>
                            item.id === row.id ? { ...item, [field]: e.target.value } : item
                        );
                        setValueStateData(updatedData);
                        handleInputChange(`valueState_${row.id}_${field}`, e.target.value);
                        }}
                    />
                    </div>
                ))}
                <div className="w-12 flex justify-center items-center space-x-1">
                    <button
                    className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={() => {
                        const rowData = JSON.stringify(row);
                        copyToClipboard(rowData);
                    }}
                    aria-label="Copy row"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    </button>
                    <button
                    className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={() => handleDeleteValueStateRow(row.id)}
                    aria-label="Delete row"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    </button>
                </div>
                </div>
            ))}
            </div>
            </div>

      
      {/* Date time table for state Section */}
      <div className="mb-6 border-t pt-4">
        <h3 className="text-md font-medium mb-2">Date time table for state</h3>
        
        {/* State Time Table - Scrollable */}
        <div className="max-h-60 overflow-y-auto border rounded-lg shadow-md scrollbar-hide">
            {/* Table Body */}
            {stateTimeTableData.map((row, index) => (
                <div key={row.id} className="flex mb-1 items-center p-1">
                <div className="w-8 text-center text-sm">{index + 1}.</div>

                {["eventName", "activation", "startDate", "endDate", "state"].map((field) => (
                    <div key={field} className="w-1/6 px-1">
                    <input
                        type="text"
                        className="w-full p-1.5 border rounded-md text-sm shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={row[field as keyof StateTimeTableRow]}
                        onChange={(e) => {
                        const updatedData = stateTimeTableData.map(item =>
                            item.id === row.id ? { ...item, [field]: e.target.value } : item
                        );
                        setStateTimeTableData(updatedData);
                        handleInputChange(`stateTime_${row.id}_${field}`, e.target.value);
                        }}
                    />
                    </div>
                ))}

                <div className="w-12 flex justify-center items-center space-x-1">
                    <button
                    className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={handleAddStateTimeRow}
                    aria-label="Add row"
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    </button>
                    <button
                    className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={() => handleDeleteStateTimeRow(row.id)}
                    aria-label="Delete row"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    </button>
                </div>
                </div>
            ))}
            </div>
        
      </div>
    </div>
  );
};

export default Simulation;

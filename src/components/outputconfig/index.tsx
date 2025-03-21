import React, { useState, useEffect } from 'react';

interface OutputConfigProps {
  // Add any props if needed
  onConfigChange?: (enabled: boolean) => void;
  onValueChange?: (field: string, value: string) => void;
  initialValues?: {
    [key: string]: string | boolean;
  };
}

const OutputConfigComponent: React.FC<OutputConfigProps> = ({ 
  onConfigChange, 
  onValueChange,
  initialValues = {} 
}) => {
  // State for toggle switches
  const [mainEnabled, setMainEnabled] = useState<boolean>(
    initialValues.mainEnabled !== undefined ? Boolean(initialValues.mainEnabled) : true
  );
  const [outputLimitEnabled, setOutputLimitEnabled] = useState<boolean>(
    initialValues.outputLimitEnabled !== undefined ? Boolean(initialValues.outputLimitEnabled) : true
  );
  
  // State for dropdown selections
  const [inputType, setInputType] = useState<string>(
    typeof initialValues.inputType === 'string' ? initialValues.inputType : 'Calib Value'
  );
  const [modbusProtocol, setModbusProtocol] = useState<string>(
    typeof initialValues.modbusProtocol === 'string' ? initialValues.modbusProtocol : 'Modbus TCP/IP'
  );
  const [dataType, setDataType] = useState<string>(
    typeof initialValues.dataType === 'string' ? initialValues.dataType : 'int16'
  );
  const [modbusType, setModbusType] = useState<string>(
    typeof initialValues.modbusType === 'string' ? initialValues.modbusType : 'holding'
  );
  
  // State for calibration points
  const [setPoint1Input, setSetPoint1Input] = useState<string>(
    typeof initialValues.setPoint1Input === 'string' ? initialValues.setPoint1Input : '0'
  );
  const [setPoint1Output, setSetPoint1Output] = useState<string>(
    typeof initialValues.setPoint1Output === 'string' ? initialValues.setPoint1Output : '820'
  );
  const [setPoint2Input, setSetPoint2Input] = useState<string>(
    typeof initialValues.setPoint2Input === 'string' ? initialValues.setPoint2Input : '1000'
  );
  const [setPoint2Output, setSetPoint2Output] = useState<string>(
    typeof initialValues.setPoint2Output === 'string' ? initialValues.setPoint2Output : '4000'
  );
  
  // State for Modbus TCP/IP settings
  const [ipAddress, setIpAddress] = useState<string>(
    typeof initialValues.ipAddress === 'string' ? initialValues.ipAddress : '0'
  );
  const [port, setPort] = useState<string>(
    typeof initialValues.port === 'string' ? initialValues.port : '820'
  );
  const [slaveId, setSlaveId] = useState<string>(
    typeof initialValues.slaveId === 'string' ? initialValues.slaveId : '0'
  );
  const [address, setAddress] = useState<string>(
    typeof initialValues.address === 'string' ? initialValues.address : '0'
  );
  const [timeout, setTimeout] = useState<string>(
    typeof initialValues.timeout === 'string' ? initialValues.timeout : '1'
  );
  
  // State for output limits
  const [lowerLimit, setLowerLimit] = useState<string>(
    typeof initialValues.lowerLimit === 'string' ? initialValues.lowerLimit : '1'
  );
  const [lowerSaturation, setLowerSaturation] = useState<string>(
    typeof initialValues.lowerSaturation === 'string' ? initialValues.lowerSaturation : '1'
  );
  const [lowerNoise, setLowerNoise] = useState<string>(
    typeof initialValues.lowerNoise === 'string' ? initialValues.lowerNoise : '0.01'
  );
  const [upperLimit, setUpperLimit] = useState<string>(
    typeof initialValues.upperLimit === 'string' ? initialValues.upperLimit : '100'
  );
  const [upperSaturation, setUpperSaturation] = useState<string>(
    typeof initialValues.upperSaturation === 'string' ? initialValues.upperSaturation : '100'
  );
  const [upperNoise, setUpperNoise] = useState<string>(
    typeof initialValues.upperNoise === 'string' ? initialValues.upperNoise : '0.01'
  );
  
  // State for validation errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Validation function
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'setPoint1Input':
      case 'setPoint1Output':
      case 'setPoint2Input':
      case 'setPoint2Output':
      case 'port':
      case 'slaveId':
      case 'address':
      case 'timeout':
      case 'lowerLimit':
      case 'upperLimit':
      case 'lowerSaturation':
      case 'upperSaturation':
        if (!/^-?\d*\.?\d*$/.test(value)) {
          return 'Must be a number';
        }
        break;
      case 'ipAddress':
        if (!/^(\d{1,3}\.){0,3}\d{1,3}$/.test(value)) {
          return 'Invalid IP format';
        }
        break;
      case 'lowerNoise':
      case 'upperNoise':
        if (!/^-?\d*\.?\d*$/.test(value)) {
          return 'Must be a number';
        }
        if (parseFloat(value) < 0) {
          return 'Must be non-negative';
        }
        break;
    }
    return '';
  };
  
  // Handle toggle changes
  const handleMainToggle = () => {
    const newValue = !mainEnabled;
    setMainEnabled(newValue);
    if (onConfigChange) {
      onConfigChange(newValue);
    }
  };
  
  const handleOutputLimitToggle = () => {
    const newValue = !outputLimitEnabled;
    setOutputLimitEnabled(newValue);
    if (onValueChange) {
      onValueChange('outputLimitEnabled', newValue.toString());
    }
  };
  
  // Handle input changes with validation
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value);
    
    // Validate the field
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    if (onValueChange && !error) {
      onValueChange(field, value);
    }
  };
  
  // Handle select changes
  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setter(value);
    if (onValueChange) {
      onValueChange(field, value);
    }
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
        // Could add a toast notification here
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };
  
  // Get all current values as an object
  const getAllValues = () => {
    return {
      mainEnabled,
      outputLimitEnabled,
      inputType,
      modbusProtocol,
      dataType,
      modbusType,
      setPoint1Input,
      setPoint1Output,
      setPoint2Input,
      setPoint2Output,
      ipAddress,
      port,
      slaveId,
      address,
      timeout,
      lowerLimit,
      lowerSaturation,
      lowerNoise,
      upperLimit,
      upperSaturation,
      upperNoise
    };
  };
  
  // Export configuration as JSON
  const exportConfig = () => {
    const config = getAllValues();
    const configJson = JSON.stringify(config, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'co2_output_config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Validate all fields on initial load
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};
    const fields = [
      'setPoint1Input', 'setPoint1Output', 'setPoint2Input', 'setPoint2Output',
      'ipAddress', 'port', 'slaveId', 'address', 'timeout',
      'lowerLimit', 'lowerSaturation', 'lowerNoise',
      'upperLimit', 'upperSaturation', 'upperNoise'
    ];
    
    fields.forEach(field => {
      const value = getAllValues()[field as keyof ReturnType<typeof getAllValues>];
      if (typeof value === 'string') {
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    
    setErrors(newErrors);
  }, []);
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">1. CO2</h2>
        <h2 className="text-xl font-bold">Output Config</h2>
      </div>
      
      {/* Main toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Kích hoạt</span>
        <div className="flex items-center">
          <ToggleSwitch 
            enabled={mainEnabled} 
            onChange={handleMainToggle} 
          />
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
      
      {/* Set point input type */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Set point input type</span>
        <div className="flex items-center">
          <div className="relative">
            <select 
              className="appearance-none bg-white border rounded-md p-2 pr-8 w-64"
              value={inputType}
              onChange={handleSelectChange(setInputType, 'inputType')}
            >
              <option value="Calib Value">Calib Value</option>
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
            onClick={() => copyToClipboard(inputType)}
            aria-label="Copy input type"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Set Point 1 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-1">
          <span className="text-sm text-gray-600">Set Point 1 Input</span>
        </div>
        <div className="col-span-1">
          <input 
            type="text" 
            className={`w-full p-2 border rounded-md ${errors.setPoint1Input ? 'border-red-500' : ''}`}
            value={setPoint1Input}
            onChange={handleInputChange(setSetPoint1Input, 'setPoint1Input')}
          />
          {errors.setPoint1Input && (
            <p className="text-red-500 text-xs mt-1">{errors.setPoint1Input}</p>
          )}
        </div>
        <div className="col-span-1">
          <span className="text-sm text-gray-600">Set Point 1 Output</span>
        </div>
        <div className="col-span-1">
          <input 
            type="text" 
            className={`w-full p-2 border rounded-md ${errors.setPoint1Output ? 'border-red-500' : ''}`}
            value={setPoint1Output}
            onChange={handleInputChange(setSetPoint1Output, 'setPoint1Output')}
          />
          {errors.setPoint1Output && (
            <p className="text-red-500 text-xs mt-1">{errors.setPoint1Output}</p>
          )}
        </div>
      </div>
      
      {/* Set Point 2 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-1">
          <span className="text-sm text-gray-600">Set Point 2 Input</span>
        </div>
        <div className="col-span-1">
          <input 
            type="text" 
            className={`w-full p-2 border rounded-md ${errors.setPoint2Input ? 'border-red-500' : ''}`}
            value={setPoint2Input}
            onChange={handleInputChange(setSetPoint2Input, 'setPoint2Input')}
          />
          {errors.setPoint2Input && (
            <p className="text-red-500 text-xs mt-1">{errors.setPoint2Input}</p>
          )}
        </div>
        <div className="col-span-1">
          <span className="text-sm text-gray-600">Set Point 2 Output</span>
        </div>
        <div className="col-span-1">
          <input 
            type="text" 
            className={`w-full p-2 border rounded-md ${errors.setPoint2Output ? 'border-red-500' : ''}`}
            value={setPoint2Output}
            onChange={handleInputChange(setSetPoint2Output, 'setPoint2Output')}
          />
          {errors.setPoint2Output && (
            <p className="text-red-500 text-xs mt-1">{errors.setPoint2Output}</p>
          )}
        </div>
      </div>
      
      {/* Giao thức */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Giao thức</span>
        <div className="flex items-center">
          <div className="relative">
            <select 
              className="appearance-none bg-white border rounded-md p-2 pr-8 w-64"
              value={modbusProtocol}
              onChange={handleSelectChange(setModbusProtocol, 'modbusProtocol')}
            >
              <option value="Modbus TCP/IP">Modbus TCP/IP</option>
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
            onClick={() => copyToClipboard(modbusProtocol)}
            aria-label="Copy protocol"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Modbus TCP/IP Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-4">Modbus TCP/IP</h3>
        
        {/* IP and Port */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-1">
            <span className="text-sm text-gray-600">IP</span>
          </div>
          <div className="col-span-1">
            <input 
              type="text" 
              className={`w-full p-2 border rounded-md ${errors.ipAddress ? 'border-red-500' : ''}`}
              value={ipAddress}
              onChange={handleInputChange(setIpAddress, 'ipAddress')}
            />
            {errors.ipAddress && (
              <p className="text-red-500 text-xs mt-1">{errors.ipAddress}</p>
            )}
          </div>
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Port</span>
          </div>
          <div className="col-span-1">
            <input 
              type="text" 
              className={`w-full p-2 border rounded-md ${errors.port ? 'border-red-500' : ''}`}
              value={port}
              onChange={handleInputChange(setPort, 'port')}
            />
            {errors.port && (
              <p className="text-red-500 text-xs mt-1">{errors.port}</p>
            )}
          </div>
        </div>
        
        {/* Slave ID and Type */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Slave ID</span>
          </div>
          <div className="col-span-1">
            <input 
              type="text" 
              className={`w-full p-2 border rounded-md ${errors.slaveId ? 'border-red-500' : ''}`}
              value={slaveId}
              onChange={handleInputChange(setSlaveId, 'slaveId')}
            />
            {errors.slaveId && (
              <p className="text-red-500 text-xs mt-1">{errors.slaveId}</p>
            )}
          </div>
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Type</span>
          </div>
          <div className="col-span-1 relative">
            <select 
              className="w-full p-2 border rounded-md appearance-none"
              value={modbusType}
              onChange={handleSelectChange(setModbusType, 'modbusType')}
            >
              <option value="holding">holding</option>
              <option value="input">input</option>
              <option value="coil">coil</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Address and Timeout */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Address</span>
          </div>
          <div className="col-span-1">
            <input 
              type="text" 
              className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : ''}`}
              value={address}
              onChange={handleInputChange(setAddress, 'address')}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Timeout</span>
          </div>
          <div className="col-span-1">
            <input 
              type="text" 
              className={`w-full p-2 border rounded-md ${errors.timeout ? 'border-red-500' : ''}`}
              value={timeout}
              onChange={handleInputChange(setTimeout, 'timeout')}
            />
            {errors.timeout && (
              <p className="text-red-500 text-xs mt-1">{errors.timeout}</p>
            )}
          </div>
        </div>
        
        {/* Datatype */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Datatype</span>
          </div>
          <div className="col-span-1 relative">
            <select 
              className="w-full p-2 border rounded-md appearance-none"
              value={dataType}
              onChange={handleSelectChange(setDataType, 'dataType')}
            >
              <option value="int16">int16</option>
              <option value="uint16">uint16</option>
              <option value="int32">int32</option>
              <option value="uint32">uint32</option>
              <option value="float">float</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Output Limit Section */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium">Output Limit</h3>
          <div className="flex items-center">
            <span className="text-sm mr-2 text-gray-600">Kích hoạt</span>
            <ToggleSwitch 
              enabled={outputLimitEnabled} 
              onChange={handleOutputLimitToggle} 
            />
            <button 
              className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              onClick={() => copyToClipboard(outputLimitEnabled ? 'Enabled' : 'Disabled')}
              aria-label="Copy output limit status"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Limit */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Limit</span>
          </div>
          <div className="col-span-5">
            <input 
              type="text" 
              className={`w-full p-2 border rounded-md ${errors.lowerLimit ? 'border-red-500' : ''}`}
              value={lowerLimit}
              onChange={handleInputChange(setLowerLimit, 'lowerLimit')}
              disabled={!outputLimitEnabled}
            />
            {errors.lowerLimit && (
              <p className="text-red-500 text-xs mt-1">{errors.lowerLimit}</p>
            )}
          </div>
        </div>
        
        {/* Lower Section */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium">Lower</span>
          </div>
          
          <div className="grid grid-cols-6 gap-4 mb-4 pl-4">
            <div className="col-span-1">
              <span className="text-sm text-gray-600">Saturation</span>
            </div>
            <div className="col-span-5 flex items-center">
              <input 
                type="text" 
                className={`w-full p-2 border rounded-md ${errors.lowerSaturation ? 'border-red-500' : ''}`}
                value={lowerSaturation}
                onChange={handleInputChange(setLowerSaturation, 'lowerSaturation')}
                disabled={!outputLimitEnabled}
              />
              {errors.lowerSaturation && (
                <p className="text-red-500 text-xs mt-1">{errors.lowerSaturation}</p>
              )}
              <button 
                className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => copyToClipboard(lowerSaturation)}
                aria-label="Copy lower saturation"
                disabled={!outputLimitEnabled}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-4 mb-4 pl-4">
            <div className="col-span-1">
              <span className="text-sm text-gray-600">Noise</span>
            </div>
            <div className="col-span-5">
              <input 
                type="text" 
                className={`w-full p-2 border rounded-md ${errors.lowerNoise ? 'border-red-500' : ''}`}
                value={lowerNoise}
                onChange={handleInputChange(setLowerNoise, 'lowerNoise')}
                disabled={!outputLimitEnabled}
              />
              {errors.lowerNoise && (
                <p className="text-red-500 text-xs mt-1">{errors.lowerNoise}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Limit */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          <div className="col-span-1">
            <span className="text-sm text-gray-600">Limit</span>
          </div>
          <div className="col-span-5">
            <input 
              type="text" 
              className={`w-full p-2 border rounded-md ${errors.upperLimit ? 'border-red-500' : ''}`}
              value={upperLimit}
              onChange={handleInputChange(setUpperLimit, 'upperLimit')}
              disabled={!outputLimitEnabled}
            />
            {errors.upperLimit && (
              <p className="text-red-500 text-xs mt-1">{errors.upperLimit}</p>
            )}
          </div>
        </div>
        
        {/* Upper Section */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium">Upper</span>
          </div>
          
          <div className="grid grid-cols-6 gap-4 mb-4 pl-4">
            <div className="col-span-1">
              <span className="text-sm text-gray-600">Saturation</span>
            </div>
            <div className="col-span-5 flex items-center">
              <input 
                type="text" 
                className={`w-full p-2 border rounded-md ${errors.upperSaturation ? 'border-red-500' : ''}`}
                value={upperSaturation}
                onChange={handleInputChange(setUpperSaturation, 'upperSaturation')}
                disabled={!outputLimitEnabled}
              />
              {errors.upperSaturation && (
                <p className="text-red-500 text-xs mt-1">{errors.upperSaturation}</p>
              )}
              <button 
                className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => copyToClipboard(upperSaturation)}
                aria-label="Copy upper saturation"
                disabled={!outputLimitEnabled}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-4 mb-4 pl-4">
            <div className="col-span-1">
              <span className="text-sm text-gray-600">Noise</span>
            </div>
            <div className="col-span-5">
              <input 
                type="text" 
                className={`w-full p-2 border rounded-md ${errors.upperNoise ? 'border-red-500' : ''}`}
                value={upperNoise}
                onChange={handleInputChange(setUpperNoise, 'upperNoise')}
                disabled={!outputLimitEnabled}
              />
              {errors.upperNoise && (
                <p className="text-red-500 text-xs mt-1">{errors.upperNoise}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Export button */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={exportConfig}
        >
          Export Configuration
        </button>
      </div>
    </div>
  );
};

export default OutputConfigComponent;

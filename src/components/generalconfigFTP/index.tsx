import React, { useState } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const FTPgeneral = () => {
  const [isKichHoatEnabled, setIsKichHoatEnabled] = useState<boolean>(true);
  const [isServerCheckEnabled, setIsServerCheckEnabled] = useState<boolean>(true);

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


  const InputField = ({ label, defaultValue }: { label: string, defaultValue: string }) => (
    <div className="grid grid-cols-3 items-center gap-1 mb-2">
      <span className="text-xs font-medium col-span-1 whitespace-nowrap">{label}</span>
      <input 
        type="text" 
        className="border rounded p-2 w-full text-sm col-span-2 break-words"
        defaultValue={defaultValue}
      />
    </div>
  );

  const SwitchField = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div className="grid grid-cols-3 items-center gap-1 mb-2">
      <span className="text-xs font-medium col-span-1 whitespace-nowrap">{label}</span>
      <div className="col-span-2">
        <Switch checked={checked} onChange={onChange} />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">1. FTP 1</h2>
        <span className="text-xl font-medium">General</span>
      </div>

      <div className="space-y-6">
        <SwitchField label="Kích Hoạt" checked={isKichHoatEnabled} onChange={() => setIsKichHoatEnabled(!isKichHoatEnabled)} />
        <SwitchField label="Kiểm tra trạng thái của server" checked={isServerCheckEnabled} onChange={() => setIsServerCheckEnabled(!isServerCheckEnabled)} />

        <InputField label="IP" defaultValue="103.149.86.230" />
        <InputField label="Port" defaultValue="1" />
        <InputField label="User" defaultValue="Giếng 1" />
        <InputField label="Password" defaultValue="1" />
        <InputField label="Note" defaultValue="Input này được dùng để đo lường các thông số mực nước và đang được bảo trì" />
        <InputField label="Format gửi" defaultValue="TXT - TT-10 BTMNT" />
        <InputField label="Sub Folder Format" defaultValue="/(Year)/(Month)/(Day)" />
        <InputField label="Send Time (second)" defaultValue="5" />
        <InputField label="Timeout (second)" defaultValue="5" />
        <InputField label="Round Decimal" defaultValue="2" />

        <div className="mt-8">
          <h3 className="text-xs font-medium mb-4">Gửi bù tất cả các file chưa được gửi</h3>
          <SwitchField label="Kích Hoạt" checked={true} onChange={() => {}} />
          <InputField label="Interval Time (Hours)" defaultValue="24" />
        </div>

        <div className="mt-8">
          <h3 className="text-xs font-medium mb-4">Gửi bù file chưa gửi được trong khoảng thời gian gần nhất</h3>
          <SwitchField label="Kích Hoạt" checked={true} onChange={() => {}} />
          <InputField label="Kiểm tra trong khoảng thời gian (Minutes)" defaultValue="30" />
          <InputField label="Interval Time (Hours)" defaultValue="24" />
        </div>
      </div>
    </div>
  );
};

export default FTPgeneral;

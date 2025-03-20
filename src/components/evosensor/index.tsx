import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Calendar, Download } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SensorChart() {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());
  const [timeInterval, setTimeInterval] = useState("2m");

  const uData1 = [10, 50, 30, 70, 50, 90];
  const uData2 = [20, 60, 40, 80, 60, 100];
  const uData3 = [30, 70, 50, 90, 70, 110];
  const xLabels = ["Technology", "Car Brands", "Airlines", "Energy", "Technology", "Car Brands"];

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "2022",
        data: uData1,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointBorderColor: "#3b82f6",
        pointRadius: 4,
      },
      {
        label: "2023",
        data: uData2,
        borderColor: "#ec4899",
        backgroundColor: "rgba(236, 72, 153, 0.2)",
        pointBorderColor: "#ec4899",
        pointRadius: 4,
      },
      {
        label: "2024",
        data: uData3,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        pointBorderColor: "#8b5cf6",
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="p-4 w-[900px] bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold shadow-md">Thông tin cảm biến</h2>
        <button className="bg-black text-white px-4 py-1 rounded text-sm">Biểu đồ</button>
      </div>
      <div className="h-[400px] w-full">
        <Line data={data} />
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 bg-gray-200 rounded">Previous</button>
          <span className="px-2 py-1 bg-black text-white rounded">1</span>
          <span>2 ... 68</span>
          <button className="px-2 py-1 bg-gray-200 rounded">Next</button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-600 w-4 h-4" />
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="w-[140px] bg-gray-100 text-xs p-1 rounded border border-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="text-gray-600 w-4 h-4" />
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              className="w-[140px] bg-gray-100 text-xs p-1 rounded border border-gray-300 focus:outline-none"
            />
          </div>

          <select
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
            className="w-[60px] bg-gray-100 text-xs p-1 rounded border border-gray-300 focus:outline-none"
          >
            <option value="1m">1m</option>
            <option value="2m">2m</option>
            <option value="5m">5m</option>
          </select>

          <button className="bg-black text-white px-4 py-1 rounded flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>
    </div>
  );
}

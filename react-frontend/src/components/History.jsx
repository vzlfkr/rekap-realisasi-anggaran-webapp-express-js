import React, { useEffect, useState } from "react";
import LeftMenu from "./menus/LeftMenu";

// Helper function to format the timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', options); // e.g., 13 September 2024
  const formattedTime = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }); // e.g., 06:10

  return `${formattedDate} Pukul ${formattedTime}`;
};

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch("http://localhost:5000/history");
        const data = await response.json();
        setHistoryData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch history data:", error);
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
      <LeftMenu />
      <div className="pt-10 pr-10 h-32 rounded-lg lg:col-span-4">
        <div className="pr-10 bg-white">
          <h2 className="mb-11 text-3xl font-bold text-gray-900">
            History Perubahan Data Anggaran
          </h2>
        </div>

        {/* Scrollable table container */}
        <div className="mt-[3%] h-[44rem] overflow-y-auto rounded-lg shadow-lg border">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right sticky top-0 bg-white">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Tanggal & Waktu
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Detail
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {historyData.map((history) => (
                <tr key={history.id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {formatTimestamp(history.timestamp)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {history.details}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {history.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;

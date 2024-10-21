import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LeftMenu from "./menus/LeftMenu";

const ListAmbilAnggaran = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/anggarans")
      .then((response) => {
        const filteredItems = response.data.filter(
          (item) => item.deletedAt === null
        );
        setData(filteredItems);
        setFilteredData(filteredItems); // Set both data and filteredData
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery) {
      const searchResults = data.filter((item) =>
        item.kodeRekening.includes(searchQuery)
      );
      setFilteredData(searchResults);
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchQuery, data]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adds dots every three digits
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // New handler for the "Ambil Anggaran" functionality
  const handleAmbilAnggaran = (id) => {
    // Navigate to a new page where the user can input how much to take
    navigate(`/ambil/${id}`);
  };

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
      <LeftMenu />
      <div className="pt-10 pr-10 h-32 rounded-lg lg:col-span-4">
        <div className="pr-10 bg-white">
          <h2 className="mb-11 text-3xl font-bold text-gray-900">
            Ambil Anggaran Tersedia
          </h2>
          <div className="flex justify-between items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm w-64"
                placeholder="Cari Kode Rekening"
              />
              <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 12.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 111.414-1.414l3 3zm-4.95 5.664A8 8 0 1116 8a8 8 0 01-8.657 9.957z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[3%] rounded-lg border border-gray-200">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Kode Rekening
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Uraian
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Koefisien
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Satuan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Harga
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    PPN
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Jumlah
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {item.kodeRekening}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {item.uraian}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {formatNumber(item.koefisien)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {item.satuan}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        Rp {formatNumber(item.harga)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {item.ppn}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 text-center">
                        Rp {formatNumber(item.jumlah)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 justify-center flex">
                        <button
                          className="mr-2 text-blue-600 hover:text-blue-900"
                          onClick={() => handleAmbilAnggaran(item.id)}
                        >
                          Ambil Anggaran
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-2">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAmbilAnggaran;

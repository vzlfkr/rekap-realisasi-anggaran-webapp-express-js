import React, { useState } from "react";
import LeftMenu from "./menus/LeftMenu";
import { useNavigate } from "react-router-dom";

const AddAnggaran = () => {
  const [formData, setFormData] = useState({
    kodeRekening: "",
    uraian: "",
    koefisien: "",
    satuan: "",
    harga: "",
    ppn: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      // Convert koefisien, harga, and ppn to integers
      const convertedData = {
        ...formData,
        koefisien: parseInt(formData.koefisien, 10),
        harga: parseInt(formData.harga, 10),
        ppn: parseInt(formData.ppn, 10),
      };

      const response = await fetch("http://localhost:5000/anggarans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the request
        },
        body: JSON.stringify(convertedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Anggaran created:", result);
        navigate("/anggarans"); // Redirect after successful submission
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create anggaran");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to create anggaran");
    }
  };

  // Handle cancel button (navigate back)
  const handleCancel = () => {
    navigate("/anggarans"); // Go back to the Anggaran list
  };

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
      <LeftMenu />
      <div className="pt-10 pr-10 h-32 rounded-lg lg:col-span-4">
        <div className="pr-10 bg-white">
          <h2 className="mb-11 text-3xl font-bold text-gray-900">Tambah Anggaran*</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kode Rekening (Contoh: 5.4.6.7887)
            </label>
            <input
              type="text"
              name="kodeRekening"
              value={formData.kodeRekening}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Uraian (Contoh: Pembelian Komputer)
            </label>
            <input
              type="text"
              name="uraian"
              value={formData.uraian}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Koefisien
            </label>
            <input
              type="number"
              name="koefisien"
              value={formData.koefisien}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Satuan (Contoh: Units, Items, dll)
            </label>
            <input
              type="text"
              name="satuan"
              value={formData.satuan}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PPN (%) *Masukan 0 jika tidak ada PPN* 
            </label>
            <input
              type="number"
              name="ppn"
              value={formData.ppn}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnggaran;

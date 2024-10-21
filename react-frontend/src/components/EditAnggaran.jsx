import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LeftMenu from "./menus/LeftMenu";

const EditAnggaran = () => {
  const { id } = useParams(); // Get the anggaran ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    kodeRekening: "",
    uraian: "",
    koefisien: 0,
    satuan: "",
    harga: 0,
    ppn: 0,
  });

  const [error, setError] = useState("");

  // Fetch the existing anggaran details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/anggarans/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Get edit data: ",  response.data);
        setFormData(response.data); // Set the fetched data in the form
      })
      .catch((error) => {
        console.error("Error fetching anggaran:", error);
        setError("Failed to fetch anggaran data.");
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "koefisien" || name === "harga" || name === "ppn"
        ? parseFloat(value) // Convert numeric inputs to float
        : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      ...formData,
      koefisien: parseInt(formData.koefisien), // Ensure koefisien is an integer
      harga: parseInt(formData.harga), // Ensure harga is an integer
      ppn: parseFloat(formData.ppn), // PPN can be float
    };
  
    try {
      await axios.put(`http://localhost:5000/anggarans/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Anggaran updated successfully!");
      navigate("/"); // Redirect back to the homepage
    } catch (error) {
      console.error("Error updating anggaran:", error);
      setError("Failed to update anggaran.");
    }
  };

//   Handle Cancel
  const handleCancel = () => {
    navigate("/"); // Navigate back to the homepage
  };

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
  <LeftMenu />
  <div className="pt-10 pr-10 h-32 rounded-lg lg:col-span-4">
    <div className="pr-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="mb-11 text-3xl font-bold text-gray-900">Edit Anggaran</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="kodeRekening"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Kode Rekening
            </label>
            <input
              type="text"
              name="kodeRekening"
              value={formData.kodeRekening}
              onChange={handleChange}
              placeholder="Kode Rekening"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="uraian"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Uraian
            </label>
            <input
              type="text"
              name="uraian"
              value={formData.uraian}
              onChange={handleChange}
              placeholder="Uraian"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="koefisien"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Koefisien
            </label>
            <input
              type="number"
              name="koefisien"
              value={formData.koefisien}
              onChange={handleChange}
              placeholder="Koefisien"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="satuan"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Satuan
            </label>
            <input
              type="text"
              name="satuan"
              value={formData.satuan}
              onChange={handleChange}
              placeholder="Satuan"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="harga"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Harga
            </label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              placeholder="Harga"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="ppn"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              PPN
            </label>
            <input
              type="number"
              step="0.01"
              name="ppn"
              value={formData.ppn}
              onChange={handleChange}
              placeholder="PPN"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default EditAnggaran;

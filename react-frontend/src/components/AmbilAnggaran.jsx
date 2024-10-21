import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeftMenu from './menus/LeftMenu';

const AmbilAnggaran = () => {
  const { id } = useParams(); // Get the anggaran ID from the URL
  const navigate = useNavigate();
  const [anggaran, setAnggaran] = useState(null);
  const [ambilKoefisien, setAmbilKoefisien] = useState(0);
  const [error, setError] = useState("");

  // Fetch the anggaran details by ID with Authorization
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/anggarans/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAnggaran(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch anggaran data.');
      });
  }, [id]);

  // Handle form submission with Authorization
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Fetch the JWT token from localStorage
    try {
      await axios.put(`http://localhost:5000/anggarans/ambil/${id}`, { ambilKoefisien }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Anggaran updated successfully.');
      navigate('/'); // Redirect to the homepage or wherever appropriate
    } catch (error) {
      setError('Failed to update anggaran.');
    }
  };

  // If no data is available yet, show a loading message
  if (!anggaran) return <div>Loading...</div>;

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/ambil');
  };

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
      <LeftMenu />
      <div className="pt-10 pr-10 h-32 rounded-lg lg:col-span-4">
        <div className="pr-10 bg-white">
          <h2 className="mb-11 text-3xl font-bold text-gray-900">Ambil Anggaran</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              
              <div>
                <label htmlFor="kodeRekening" className="block text-sm font-medium text-gray-700">Kode Rekening</label>
                <input
                  type="text"
                  name="kodeRekening"
                  value={anggaran.kodeRekening}
                  disabled
                  className="border rounded-lg px-4 py-2 bg-gray-200"
                  placeholder="Kode Rekening"
                />
              </div>

              <div>
                <label htmlFor="uraian" className="block text-sm font-medium text-gray-700">Uraian</label>
                <input
                  type="text"
                  name="uraian"
                  value={anggaran.uraian}
                  disabled
                  className="border rounded-lg px-4 py-2 bg-gray-200"
                  placeholder="Uraian"
                />
              </div>

              <div>
                <label htmlFor="koefisien" className="block text-sm font-medium text-gray-700">Koefisien Tersedia</label>
                <input
                  type="number"
                  name="koefisien"
                  value={anggaran.koefisien}
                  disabled
                  className="border rounded-lg px-4 py-2 bg-gray-200"
                  placeholder="Koefisien Tersedia"
                />
              </div>

              <div>
                <label htmlFor="satuan" className="block text-sm font-medium text-gray-700">Satuan</label>
                <input
                  type="text"
                  name="satuan"
                  value={anggaran.satuan}
                  disabled
                  className="border rounded-lg px-4 py-2 bg-gray-200"
                  placeholder="Satuan"
                />
              </div>

              <div>
                <label htmlFor="ambilKoefisien" className="block text-sm font-medium text-gray-700">Koefisien yang Diambil</label>
                <input
                  type="number"
                  min="1"
                  max={anggaran.koefisien}
                  name="ambilKoefisien"
                  value={ambilKoefisien}
                  onChange={(e) => setAmbilKoefisien(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                  placeholder="Koefisien yang Diambil"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ambil Anggaran
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
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

export default AmbilAnggaran;

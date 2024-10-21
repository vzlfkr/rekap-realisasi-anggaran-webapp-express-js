import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftMenu from "./menus/LeftMenu";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    nip: "",
    email: "",
    imageUrl: "", // Image URL from the backend
  });
  const [imageFile, setImageFile] = useState(null); // To hold the uploaded image file
  const [initialData, setInitialData] = useState(null); // To hold the initial data for reset
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user profile data from the correct endpoint
    axios
      .get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setFormData(response.data);
        setInitialData(response.data); // Store initial data for reset
      })
      .catch((error) => {
        setError("Failed to fetch profile data");
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle cancel: reset form to initial state
  const handleCancel = () => {
    setFormData(initialData); // Reset to initial form data
    setImageFile(null); // Reset image selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    
    // Handle fullName and email normally
    data.append("fullName", formData.fullName.trim()); // Assuming fullName cannot be null
    data.append("email", formData.email.trim()); // Assuming email cannot be null
    
    // Handle nip safely: if it's null or empty, append null; otherwise, trim it
    data.append("nip", formData.nip ? formData.nip.trim() : null);
  
    if (imageFile) {
      data.append("image", imageFile); // Add image file to form data
    }
  
    try {
      await axios.put("http://localhost:5000/profile", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        },
      });
      alert("Profile updated successfully!");
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
      <LeftMenu />
      <div className="pt-10 pr-10 h-32 rounded-lg lg:col-span-4">
        <div className="grid max-w-2xl mx-auto mt-8 bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Profil Pengguna</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
              src={formData.imageUrl ? `http://localhost:5000${formData.imageUrl}` : "/images/profilePlaceholder.svg"}
              alt="Profile"
            />
            <div className="flex flex-col space-y-5 sm:ml-8">
              <label className="relative cursor-pointer bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                <span>Pilih Gambar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
              {imageFile && <p className="text-sm text-gray-600">{imageFile.name}</p>}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-indigo-900"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="nip"
                  className="block mb-2 text-sm font-medium text-indigo-900"
                >
                  NIK atau NIP (Opsional)
                </label>
                <input
                  type="text"
                  name="nip"
                  value={formData.nip}
                  onChange={handleChange}
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Masukkan NIK atau NIP Anda"
                />
              </div>
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-indigo-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

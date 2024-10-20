import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detects the current route
  const { logout } = useAuth();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    imageUrl: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fetch current user data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, []);

  return (
    <div className="h-32 rounded-lg bg-gray-200">
      <div className="flex h-screen flex-col justify-between border-e border-t bg-white">
        <div className="px-4 py-6">
          <span className="grid h-10 w-32 place-content-center">
            <img
              className="object-contain w-[40%]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Coat_of_arms_of_Bali.svg/1024px-Coat_of_arms_of_Bali.svg.png"
              alt="Logo Bali"
            />
          </span>
          <ul className="mt-6 space-y-1">
            <li>
              <a
                href="/"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                  location.pathname === "/" ||
                  location.pathname.startsWith("/anggarans")
                    ? "bg-gray-100 text-gray-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                List Anggaran
              </a>
            </li>
            <li>
              <a
                href="/ambil"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                  location.pathname === "/ambil" ||
                  location.pathname.startsWith("/anggarans")
                    ? "bg-gray-100 text-gray-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                Ambil Anggaran
              </a>
            </li>
            <li>
              <a
                href="/history"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                  location.pathname === "/history"
                    ? "bg-gray-100 text-gray-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                History Perubahan Anggaran
              </a>
            </li>
            <li>
              <details
                className="group [&_summary::-webkit-details-marker]:hidden"
                open={location.pathname === "/profile"}
              >
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Akun </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="/profile"
                      className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                        location.pathname === "/profile"
                          ? "bg-gray-100 text-gray-700"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      Profil Akun
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-red-300 [text-align:_inherit] hover:bg-gray-100 hover:text-red-600"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="/profile"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt="Profile"
              src={
                userData.imageUrl
                  ? `http://localhost:5000${userData.imageUrl}`
                  : "/images/profilePlaceholder.svg"
              }
              className="size-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">{userData.fullName}</strong>
                <span>{userData.email}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;

import React from "react";

const Home = () => {
  return (
    <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
      <div className="h-32 rounded-lg bg-gray-200">
        <div className="flex h-screen flex-col justify-between border-e border-t bg-white">
          <div className="px-4 py-6">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              Logo
            </span>

            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href="/"
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Anggaran
                </a>
              </li>

              <li>
                <a
                  href="/history"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  History Perubahan Anggaran
                </a>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
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
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <a
                        href="/profile"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Profil Akun
                      </a>
                    </li>

                    <li>
                      <form action="#">
                        <button
                          type="submit"
                          className="w-full rounded-lg px-4 py-2 text-sm font-medium text-red-300 [text-align:_inherit] hover:bg-gray-100 hover:text-red-600"
                        >
                          Log Out
                        </button>
                      </form>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a
              href="#"
              className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="size-10 rounded-full object-cover"
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">Eric Frusciante</strong>

                  <span> eric@frusciante.com </span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="pt-10 pr-10 h-32 rounded-lg lg:col-span-4">
        {/* Search Bar, Header, and Breadcrumbs Section */}
        <div className="pr-10 bg-white">
          {/* Header Text */}
          <h2 className="mb-11 text-3xl font-bold text-gray-900">
            Data Realisasi Anggaran
          </h2>

          {/* Search Bar and Breadcrumbs Section */}
          <div className="flex justify-between items-center">
            {/* Left Side: Search Bar */}
            <div className="relative">
              <input
                type="text"
                className="border rounded-lg px-4 py-2 text-sm w-64"
                placeholder="Search..."
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
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

            {/* Right Side: Breadcrumbs */}
            <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
              <ol className="inline-flex space-x-1">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    Home
                  </a>
                </li>
                <li className="before:content-['/'] before:px-2">
                  <span className="text-gray-400">Anggaran</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mt-[3%] rounded-lg border border-gray-200">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Date of Birth
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Role
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Salary
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    John Doe
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    24/05/1995
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Web Developer
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $120,000
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Jane Doe
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    04/11/1980
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Web Designer
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $100,000
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Gary Barlow
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    24/05/1995
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Singer
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $20,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
            <ol className="flex justify-end gap-1 text-xs font-medium">
              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  1
                </a>
              </li>

              <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

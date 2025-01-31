import React, { useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiLogOut, BiSolidCategory } from "react-icons/bi";
import { SiBrandfolder } from "react-icons/si";
import { FaCar, FaCity } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdAccountCircle, MdModelTraining } from "react-icons/md";





const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  const url = useLocation()
  const activePage = url.pathname.split("/")[1];
  console.log(activePage);

  const navigate = useNavigate();


  const [image, setImage] = useState(null);

  // Rasm yuklash funksiyasi
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const logout = () => {
    localStorage.removeItem("TOKEN");
    navigate("login");
  };

  const changeToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={changeToggle}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img
                  src="/realauto-2.jpg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex w-[40px] h-[40px] justify-center items-center">
                      <label className="relative cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <div className="w-[40px] h-[40px] rounded-full border-2 border-green-500 overflow-hidden flex items-center justify-center  bg-gray-100">
                          {image ? (
                            <img
                              src={image}
                              alt="Uploaded"
                              className="w-full h-[40px] rounded-full object-cover"
                            />
                          ) : (
                            <MdAccountCircle className="text-[48px]" />
                          )}
                        </div>
                      </label>
                    </div>
                  </button>
                </div>

                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          toggle ? "-translate-x-full" : ""
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="categories"
                className={`flex items-center ${
                  "categories" === activePage ? "bg-gray-300" : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <BiSolidCategory
                  className={`text-[24px] text-gray-500 ${
                    "categories" === activePage ? "text-gray-900" : ""
                  } group-hover:text-gray-900`}
                />
                <span className="ms-3">Categories</span>
              </a>
            </li>
            <li>
              <a
                href="brands"
                className={`flex items-center ${
                  "brands" === activePage ? "bg-gray-300" : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <SiBrandfolder
                  className={`text-[24px] text-gray-500 ${
                    "brands" === activePage ? "text-gray-900" : ""
                  } group-hover:text-gray-900`}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Brands</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </a>
            </li>
            <li>
              <a
                href="cities"
                className={`flex items-center ${
                  "cities" === activePage ? "bg-gray-300" : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <FaCity
                  className={`text-[24px] text-gray-500 ${
                    "cities" === activePage ? "text-gray-900" : ""
                  } group-hover:text-gray-900`}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Cities</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="locations"
                className={`flex items-center ${
                  "locations" === activePage ? "bg-gray-300" : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <FaMapLocationDot
                  className={`text-[24px] text-gray-500 ${
                    "locations" === activePage ? "text-gray-900" : ""
                  } group-hover:text-gray-900`}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Locations</span>
              </a>
            </li>
            <li>
              <a
                href="cars"
                className={`flex items-center ${
                  "cars" === activePage ? "bg-gray-300" : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <FaCar
                  className={`text-[24px] text-gray-500 ${
                    "cars" === activePage ? "text-gray-900" : ""
                  } group-hover:text-gray-900`}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Cars</span>
              </a>
            </li>
            <li>
              <a
                href="models"
                className={`flex items-center ${
                  "models" === activePage ? "bg-gray-300" : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <MdModelTraining
                  className={`text-[24px] text-gray-500 ${
                    "models" === activePage ? "text-gray-900" : ""
                  } group-hover:text-gray-900`}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Models</span>
              </a>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex cursor-pointer  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
              >
                <BiLogOut
                  className={`text-[24px] text-gray-500  group-hover:text-gray-900`}
                />

                <span className=" ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

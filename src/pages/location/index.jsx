import axios from "axios";
import React, { useEffect, useState } from "react";

const LocationPage = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const token = localStorage.getItem("TOKEN");

    try {
      const res = await axios.get("https://realauto.limsa.uz/api/locations");
      setLocation(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  console.log(location);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="w-full ">
              <th scope="col" className="px-6 py-3">
                LocationPhoto
              </th>
              <th scope="col" className="px-6 py-3">
                LocationName
              </th>
              <th scope="col" className="px-6 py-3">
                LocationText
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {location?.map((location) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="w-20 h-20 overflow-hidden rounded-[8px]  cursor-pointer flex items-center">
                    <img
                      className="w-full rounded-[8px] object-cover object-center"
                      src={`https://realauto.limsa.uz/api/uploads/images/${location?.image_src}`}
                      alt="image"
                    />
                  </div>
                </th>
                <td className="px-6 py-4">{location?.name}</td>
                <td className="px-6 py-4">{location?.text}</td>
                <td className="flex flex-col mt-[30px] gap-[10px]">
                  <button
                    href="#"
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    href="#"
                    className="font-medium cursor-pointer pl-[20px] text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LocationPage;

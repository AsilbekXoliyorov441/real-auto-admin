import axios from "axios";
import React, { useEffect, useState } from "react";

const ModelsPage = () => {
  const [model, setModel] = useState(null);

  const getModel = async () => {
    const token = localStorage.getItem("TOKEN");

    try {
      const res = await axios.get("https://realauto.limsa.uz/api/models");
      const brandRes = await axios.get("https://realauto.limsa.uz/api/brands");
      console.log(brandRes.data.data);

      setModel(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  useEffect(() => {
    getModel();
  }, []);
  console.log(model);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="w-full ">
              <th scope="col" className="px-6 py-3">
                ModelName
              </th>
              <th scope="col" className="px-6 py-3">
                BrandName
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {model?.map((mod) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{mod?.name}</td>
                <td className="px-6 py-4">{mod?.brand_title}</td>
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

export default ModelsPage;

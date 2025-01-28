import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState(null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(""); // Saralash turi (A-Z yoki Z-A)


  const searchCategories = categories?.filter((el) =>
    el.name_en.toString().toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const sorted = searchCategories?.sort((a, b) => {
    if (sortType === "az") {
      return a.name_en?.localeCompare(b.name_en);
    } 
    else if(sortType === "za") {
      return b.name_en?.localeCompare(a.name_en);
    } else{
      return a.name_en?.localeCompare(b.name_en);
    }
  });

  const handleSort = (e) => {
    setSortType(e.target.value)
  };

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("TOKEN");
      const ApiUrl = "https://realauto.limsa.uz/api/categories";

      try {
        const { data: res } = await axios.get(ApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res?.data);
      } catch {
        console.error("Xato yuz berdi", error.response?.data || error.message);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-[20px] mt-[20px] mb-[20px]">
        <select
          onChange={handleSort}
          className="max-w-[120px] rounded-[2px] cursor-pointer w-full bg-gray-100 p-[3px] outline-none"
          name=""
          id=""
        >
          <option value="">Sorting name</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
        <input
          onChange={handleSearchValue}
          placeholder="Searching categories..."
          className="max-w-[400px] w-full  outline-none border rounded-[4px] p-[3px] pl-[10px] border-gray-200"
          type="search"
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                CategoryPhoto
              </th>
              <th scope="col" className="px-6 py-3">
                EngName
              </th>
              <th scope="col" className="px-6 py-3">
                RuName
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted?.map((category, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-16 h-16 rounded-[8px] object-cover md:w-22 md:h-22"
                    src={`https://realauto.limsa.uz/api/uploads/images/${category?.image_src}`}
                    alt="image"
                  />
                </th>
                <td className="px-6 py-4">{category.name_en}</td>
                <td className="px-6 py-4">{category.name_ru}</td>
                <td className="px-6 py-4">
                  <button>edit</button>
                  <button>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;

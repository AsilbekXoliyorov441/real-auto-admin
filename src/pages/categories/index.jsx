import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoClose } from "react-icons/io5";


const CategoriesPage = () => {
  const [categories, setCategories] = useState(null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [warnModal, setWarnModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [photo, setPhoto] = useState("");
  const formData = new FormData();
  const [refresh, setRefresh] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editData, setEditData] = useState(null);
  const [closeImgEditModal , setCloseImgEditModal] = useState(true);

  formData.append("name_en", nameEn);
  formData.append("name_ru", nameRu);
  formData.append("images", photo);

  const callback = () => {
    setRefresh(!refresh);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader?.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const searchCategories = categories?.filter((el) =>
    el.name_en.toString().toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const sorted = searchCategories?.sort((a, b) => {
    if (sortType === "az") {
      return a.name_en?.localeCompare(b.name_en);
    } else if (sortType === "za") {
      return b.name_en?.localeCompare(a.name_en);
    } else {
      return a.name_en?.localeCompare(b.name_en);
    }
  });

  const handleSort = (e) => {
    setSortType(e.target.value);
  };
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

  useEffect(() => {
    getData();
  }, []);

  const deleteCategory = async (id) => {
    const token = localStorage.getItem("TOKEN");
    console.log(token);
    console.log(id);
    try {
      await axios.delete(`https://realauto.limsa.uz/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      callback();
      setWarnModal(false);
      toast.success("Deleted this category");
    } catch {
      toast.error("Error");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("TOKEN");

    try {
      {
        selectedCategory
          ? await axios.put(
              `https://realauto.limsa.uz/api/categories/${selectedCategory}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          : await axios.post(
              `https://realauto.limsa.uz/api/categories`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
      }
      toast.success("Ma'lumot muvaffaqiyatli jo‘natildi!");
      getData();
      setAddModal(false);
      setCloseImgEditModal(true)
      setNameEn("");
      setNameRu("");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setImagePreview(null);
      setSelectedCategory(null);
    }
  };

  useEffect(() => {
    submit();
  }, []);

  const editCategory = async (category) => {
    setEditData(category);
    setSelectedCategory(category?.id);
    setNameEn(category?.name_en);
    setNameRu(category?.name_ru);
    closeImgEditModal(true)

    // try {
    //   const res = await axios.get(
    //     `https://realauto.limsa.uz/api/categories/${id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(res?.data?.data.name_en);
    //   setEditData(res?.data?.data);
    //   setNameEn(editData?.name_en);
    //   setNameRu(editData?.name_ru);
    //   // setPhoto(editData?.image_src);
    //   console.log(nameEn, nameRu);
    // } catch {}
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-between gap-[20px] mt-[20px] mb-[20px]">
          <span
            className="block text-white  bg-blue-700   focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {`All Categories: ${sorted?.length}`}
          </span>
          <select
            onChange={handleSort}
            className="max-w-[130px] rounded-[2px] cursor-pointer w-full bg-gray-100 p-[3px] outline-none"
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
          <button
            onClick={() => setAddModal(true)}
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="block flex-1 md:flex-none text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Add Category
          </button>
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
                    <div className="w-20 h-20  cursor-pointer flex items-center">
                      <img
                        className="w-full rounded-[8px] object-cover object-center"
                        src={`https://realauto.limsa.uz/api/uploads/images/${category?.image_src}`}
                        alt="image"
                      />
                    </div>
                  </th>
                  <td className="px-6 py-4">{category.name_en}</td>
                  <td className="px-6 py-4">{category.name_ru}</td>
                  <td className="px-6 py-4  flex items-center  gap-[5px]  mt-[10%]">
                    <button
                      onClick={() => {
                        setSelectedCategory(category?.id),
                          setAddModal(true),
                          editCategory(category);
                      }}
                      className="cursor-pointer transition-all border-[3px] border-transparent hover:border-blue-400 rounded-[4px]"
                    >
                      <img src="/edit.svg" alt="edit" />
                    </button>
                    <button
                      onClick={() => setWarnModal(true)}
                      className="cursor-pointer transition-all border-[3px] border-transparent hover:border-red-400 rounded-[4px]"
                    >
                      <img src="/delete.svg" alt="delete" />
                    </button>
                    {warnModal ? (
                      <div
                        onClick={() => setWarnModal(false)}
                        id="popup-modal"
                        tabindex="-1"
                        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                      >
                        <div className="relative bg-red-100 rounded-[8px] p-4 w-full max-w-md max-h-full">
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"
                          >
                            <button
                              onClick={() => setWarnModal(false)}
                              type="button"
                              className="absolute cursor-pointer top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                              data-modal-hide="popup-modal"
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                              <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this product?
                              </h3>
                              <button
                                onClick={() => deleteCategory(category.id)}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                              >
                                Yes, I'm sure
                              </button>
                              <button
                                onClick={() => setWarnModal(false)}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                No, cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {addModal ? (
          <div
            onClick={() => {
              setAddModal(false),
                setSelectedCategory(null),
                setNameEn(""),
                setNameRu(""),
                setPhoto("");
              setCloseImgEditModal(true);
            }}
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gray-200 rounded-lg shadow-sm dark:bg-gray-700"
              >
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedCategory ? "Editing category" : "Adding category"}
                  </h3>
                  <button
                    onClick={() => {
                      setAddModal(false),
                        setSelectedCategory(null),
                        setNameEn(""),
                        setNameRu(""),
                        setPhoto("");
                      setCloseImgEditModal(true);
                    }}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form onSubmit={submit} className="space-y-4" action="#">
                    <div>
                      <label
                        for="en-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        English name
                      </label>
                      <input
                        onChange={(e) => setNameEn(e?.target?.value)}
                        type="text"
                        name="en-name"
                        id="en-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="english name"
                        value={nameEn}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="ru-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Russian name
                      </label>
                      <input
                        onChange={(e) => setNameRu(e?.target?.value)}
                        type="text"
                        name="ru-name"
                        value={nameRu}
                        id="ru-name"
                        placeholder="russian name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Upload photo
                      </label>
                      {imagePreview ? (
                        <>
                          <button
                            className={imagePreview ? "absolute right-[10px] top-[30px] cursor-pointer rounded-[4px] bg-red-700" : "hidden"}
                            onClick={() => {
                              setCloseImgEditModal(false),
                                setImagePreview(null);
                            }}
                          >
                            <IoClose className="text-[32px] text-white" />
                          </button>
                          <img src={imagePreview} alt="imagePreview" />
                        </>
                      ) : selectedCategory ? (
                        <>
                          <button
                            className={closeImgEditModal ? "absolute right-[10px] top-[30px] cursor-pointer rounded-[4px] bg-red-700" : "hidden"}
                            onClick={() => setCloseImgEditModal(false)}
                          >
                            <IoClose className="text-[32px] text-white" />
                          </button>
                          <img
                            className={closeImgEditModal ? "" : "hidden"}
                            src={`https://realauto.limsa.uz/api/uploads/images/${editData?.image_src}`}
                            alt=""
                          />
                          <input
                            onChange={(e) => {
                              setPhoto(e?.target?.files?.[0]),
                                handleFileChange(e);
                            }}
                            type="file"
                            name="photo"
                            id="photo"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${closeImgEditModal ? "hidden" : ""}`}
                            required
                          />
                        </>
                      ) : (
                        <input
                          onChange={(e) => {
                            setPhoto(e?.target?.files?.[0]),
                              handleFileChange(e);
                          }}
                          type="file"
                          name="photo"
                          id="photo"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {selectedCategory ? "Save category" : "Add Category"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CategoriesPage;

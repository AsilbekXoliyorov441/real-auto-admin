import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ModelsPage = () => {
  const [model, setModel] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [changeModal, setChangeModal] = useState(false);
  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [selectedBrand , setSelectedBrand] = useState();

  const formData = new FormData();

  formData.append("name", name);
  formData.append("brand_id", brandName);

  const openModal = () => {
    setChangeModal(true);
  };

  const closeModal = () => {
    setChangeModal(false);
    setSelectedBrand(null);
    setName("")
    setBrandName("")
  };

  const getBrand = async () => {
    const res = await axios.get("https://realauto.limsa.uz/api/brands");
    setBrandData(res?.data?.data);
  };

  useEffect(() => {
    getBrand();
  }, []);

  const getModel = async () => {
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

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("TOKEN");
    try {
      
      {selectedBrand
        ? await axios.put(`https://realauto.limsa.uz/api/models/${selectedBrand}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await axios.post("https://realauto.limsa.uz/api/models", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      }

      {selectedBrand
        ? toast.success("Model muvaffaqiyatli o'zgartirildi")
        : toast.success("Model muvaffaqiyatli qo'shildi");}
      getModel();
      closeModal();
    } catch {
      toast.error("Error");
    }
  };

  useEffect(() => {
    submit();
  }, []);

  const editModal = (mod) => {
    setSelectedBrand(mod?.id);
    openModal();
    setName(mod?.name);
    setBrandName(mod?.brand_id)
  }

  const deleteModel = async(mod) => {
    const token = localStorage.getItem("TOKEN")
    try{
      await axios.delete(`https://realauto.limsa.uz/api/models/${mod?.id}` , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    getModel();
    toast.success(`Deleted ${mod?.name} model`)
    }catch{
      toast.error("Error")
    }
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between px-[10px]">
          <button className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            All Models {model?.length}
          </button>
          <button
            onClick={openModal}
            type="button"
            className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Add Model
          </button>
        </div>
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
              <tr
                key={mod?.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{mod?.name}</td>
                <td className="px-6 py-4">{mod?.brand_title}</td>
                <td className="flex flex-col mt-[30px] gap-[10px]">
                  <button
                    onClick={() => {openModal , editModal(mod)}}
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteModel(mod)}
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
      {changeModal ? (
        <div
          onClick={closeModal}
          className="fixed modal w-[100%] h-[100%] flex items-center justify-center top-0 left-0 z-[100]"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="max-w-[500px] w-full bg-gray-400 p-[30px] rounded-[8px] mx-auto "
          >
            <form
              onSubmit={submit}
              className="max-w-[500px] w-full bg-gray-400 p-[30px] rounded-[8px] mx-auto "
            >
              <div className="mb-5">
                <label
                  for="modelName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Model Name
                </label>
                <input
                  onChange={(e) => setName(e?.target?.value)}
                  type="text"
                  value={name}
                  id="modelName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name Model"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  for="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Brand
                </label>
                <select
                value={brandName}
                  onChange={(e) => setBrandName(e?.target?.value)}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {" "}
                  <option selected>Choose Brand</option>
                  {brandData?.map((brand) => (
                    <option value={brand?.id}>{brand?.title}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {selectedBrand ? "Save Model"  :"Add Model"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default ModelsPage;

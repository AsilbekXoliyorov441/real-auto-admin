import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

const BrandsPage = () => {
  const [brandData, setBrandData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [editData, setEditData] = useState(null);
  const [closeButton, setCloseButton] = useState(true);



  console.log(selectedBrand);
  console.log(photo);

  console.log(brandData);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("images", photo);


  const editBrands = (brand) => {
    setSelectedBrand(brand?.id);
    setTitle(brand?.title);
    setEditData(brand);
    setPhoto(brand?.image_src);
    setCloseButton(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("TOKEN");
    try {
      {
        selectedBrand
          ? await axios.put(
              `https://realauto.limsa.uz/api/brands/${selectedBrand}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          : await axios.post(`https://realauto.limsa.uz/api/brands`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      }
      {selectedBrand ?       toast.success("Brand muvaffaqiyatli saqlandi") :   toast.success("Brand muvaffaqiyatli qo'shildi")}
      setOpenModal(false);
      setSelectedBrand(null);
      setTitle("");
      setImagePreview(null);
      getBrands();
    } catch(error) {
      console.error(error);
    }
  };

  const deleteBrand = async (brand) => {
    const token = localStorage.getItem("TOKEN");

    console.log(brand?.id);

    try {
      await axios.delete(`https://realauto.limsa.uz/api/brands/${brand?.id}` , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Deleted ${brand?.title}`);
    } catch {
      toast.error("Error , please try again later");
    }
  };


  const getBrands = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/brands");
      setBrandData(res?.data?.data);
    } catch {
      axios.error(res.error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);
  console.log(brandData);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between px-[10px]">
          <button className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            All Brands {brandData?.length}
          </button>
          <button
            onClick={() => setOpenModal(true)}
            type="button"
            className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Add Brand
          </button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="w-full ">
              <th scope="col" className="px-6 py-3">
                BrandLogo
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
            {brandData?.map((brand) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="w-20 h-20 overflow-hidden rounded-[8px]  cursor-pointer flex items-center">
                    <img
                      className="w-full rounded-[8px] object-cover object-center"
                      src={`https://realauto.limsa.uz/api/uploads/images/${brand?.image_src}`}
                      alt="image"
                    />
                  </div>
                </th>
                <td className="px-6 py-4">{brand?.title}</td>
                <td className="flex flex-col mt-[30px] gap-[10px]">
                  <button
                    onClick={() => {
                      editBrands(brand), setOpenModal(true);
                    }}
                    href="#"
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBrand(brand)}
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

      {openModal ? (
        <div
          onClick={(e) => {
            setOpenModal(false),
              setSelectedBrand(null),
              setTitle(""),
              setImagePreview(null);
          }}
          className="fixed modal z-[100] top-0 left-0 h-[100%] mb-[30px] w-[100%] flex items-center justify-center px-[20px]"
        >
          <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-[600px] w-full mx-auto">
            <form
              onSubmit={submit}
              className="max-w-[600px] w-full mx-auto bg-gray-400 p-[50px] rounded-[8px]"
            >
              <div className="mb-5">
                <label
                  for="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand Name
                </label>
                <input
                  onChange={(e) => setTitle(e?.target?.value)}
                  value={title}
                  type="text"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload photo
                </label>

                <input
                  onChange={(e) => setPhoto(e?.target?.files?.[0])}
                  type="file"
                  id="photo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {selectedBrand ? "Save Changes" : "Add Brand"}
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

export default BrandsPage;

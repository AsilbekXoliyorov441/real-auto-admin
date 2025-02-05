import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const LocationPage = () => {
  const [location, setLocation] = useState(null);
  const [changeModal, setChangeModal] = useState(false);
  const [name, setName] = useState("");
  const [ slug , setSlug] = useState("")
  const [text , setText] = useState("")
  const [photo, setPhoto] = useState("");
  const [selectedLocation , setSelectedLocation] = useState(null);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("slug" , slug);
  formData.append("text" ,text)
  formData.append("images", photo);

  console.log(name , slug , text , photo);

  const closeModal = () => {
    setSelectedLocation(null)
    setChangeModal(false);
    setName("")
    setText("")
    setSlug("")
    setPhoto("")
  };

  const openModal = () => {
    setChangeModal(true);
  };

  const getLocation = async () => {
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

  const submit = async (e) => {
    const token = localStorage.getItem("TOKEN");
    e.preventDefault();
    try {
      {selectedLocation
        ? await axios.put(
            `https://realauto.limsa.uz/api/locations/${selectedLocation}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await axios.post(
            "https://realauto.limsa.uz/api/locations",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      }
      toast.success("Malumot muvaffaqiyatli qo'shildi");
      getLocation()
      closeModal();
    } catch {
      toast.error("Error,please check and try again");
    }
  };

  useEffect(() => {
    submit();
  } , [])


  const editLocation = (loc) => {
    setSelectedLocation(loc?.id);
    openModal();
    setName(loc?.name)
    setText(loc?.text)
    setSlug(loc?.slug)
    setPhoto(loc?.photo)
  }

  const deleteLocation = async(item) => {
    const token = localStorage.getItem("TOKEN")
    try{
      await axios.delete(`https://realauto.limsa.uz/api/locations/${item?.id}` , {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(`${item?.name} location is deleted`);
      getLocation()
    }catch{
      toast.error("Error")
    }
  }

  console.log(location);
  return (
    <div className="relative">
      <div className="flex justify-between px-[10px]">
        <button className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
          All Locations {location?.length}
        </button>
        <button
          onClick={openModal}
          type="button"
          className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
        >
          Add Location
        </button>
      </div>
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
            {location?.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="w-20 h-20 overflow-hidden rounded-[8px]  cursor-pointer flex items-center">
                    <img
                      className="w-full rounded-[8px] object-cover object-center"
                      src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                      alt="image"
                    />
                  </div>
                </th>
                <td className="px-6 py-4">{item?.name}</td>
                <td className="px-6 py-4">{item?.text}</td>
                <td className="flex flex-col mt-[30px] gap-[10px]">
                  <button
                    onClick={() => editLocation(item)}
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLocation(item)}
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
          onClick={() => closeModal()}
          className="fixed modal w-[100%] h-[100%] flex justify-center items-center z-[100] top-0 left-0"
        >
          <form
            onSubmit={(e) => submit(e)}
            onClick={(e) => {
              openModal(), e.stopPropagation();
            }}
            className="max-w-[500px] w-full bg-gray-400 p-[40px] rounded-[8px] mx-auto"
          >
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location Name
              </label>
              <input
                onChange={(e) => setName(e?.target?.value)}
                value={name}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Location name"
                required
              />
            </div>
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location Slug
              </label>
              <input
                onChange={(e) => setSlug(e?.target?.value)}
                value={slug}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Location slug"
                required
              />
            </div>
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location Text
              </label>
              <input
                onChange={(e) => setText(e?.target?.value)}
                value={text}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Location text"
                required
              />
            </div>
            <div className="mb-5">
              <label
                for="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location Photo
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {selectedLocation ? "Save Location" : "Add Location"}
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default LocationPage;

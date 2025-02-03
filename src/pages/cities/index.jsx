import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const CitiesPage = () => {
  const [cities, setCities] = useState(null);
  const [changeModal, setChangeModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");


  const formData = new FormData();
  formData.append("name", name);
  formData.append("image_src", photo);
  formData.append("text", text);


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

  const editCities = async(cities) => {
    openModal();
    setName(cities?.name)
    setText(cities?.text)
    setPhoto(cities?.image_src)
    setSelectedCity(cities?.id)
    console.log(cities);
  }

  const getCities = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/cities");
      setCities(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    console.log(selectedCity);
    const token = localStorage.getItem("TOKEN");
    try {
      {selectedCity
        ? await axios.put(`https://realauto.limsa.uz/api/cities/${selectedCity}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await axios.post("https://realauto.limsa.uz/api/cities", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      }
      {
        selectedCity
          ? toast.success("City muvaffaqiyatli saqlandi")
          : toast.success("City muvaffaqiyatli qo'shildi");
      }
      closeModal();
      getCities();
    } catch {
      toast.error("ERROR , Please check again and send later")
    }
  };


  const deleteCity = async(id) => {
    const token = localStorage.getItem("TOKEN")
    try{
          await axios.delete(`https://realauto.limsa.uz/api/cities/${id}` , {
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
               toast.success("Deleted this city");
               getCities();

    }catch{
      toast.error("Error")
    }
  }

  const openModal = () => {
    setChangeModal(true);
  };

  const closeModal = () => {
    setChangeModal(false);
    setSelectedCity(null)
    setName("")
    setText("")
    setPhoto("")
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between px-[10px]">
          <button className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            All Cities {cities?.length}
          </button>
          <button
            onClick={openModal}
            type="button"
            className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Add City
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="w-full ">
              <th scope="col" className="px-6 py-3">
                CitiesPhoto
              </th>
              <th scope="col" className="px-6 py-3">
                CitiesName
              </th>
              <th scope="col" className="px-6 py-3">
                CitiesText
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cities?.map((city) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="w-20 h-20 overflow-hidden rounded-[8px]  cursor-pointer flex items-center">
                    <img
                      className="w-full rounded-[8px] object-cover object-center"
                      src={`https://realauto.limsa.uz/api/uploads/images/${city?.image_src}`}
                      alt="image"
                    />
                  </div>
                </th>
                <td className="px-6 py-4">{city?.name}</td>
                <td className="px-6 py-4">{city?.text}</td>
                <td className="flex flex-col mt-[30px] gap-[10px]">
                  <button
                    onClick={() => {openModal() , editCities(city)}}
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                  onClick={() => deleteCity(city?.id)}
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

        
        {changeModal ? 
      <div onClick={closeModal} className="fixed w-[100%] modal h-[100%] z-[100] flex items-center justify-center top-0 left-0 px-[20px]">
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            class="max-w-[500px] rounded-[8px] bg-gray-400 p-[40px] w-full mx-auto"
          >
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CityName
              </label>
              <input
                onChange={(e) => setName(e?.target?.value)}
                type="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="City Name"
                value={name}
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Text
              </label>
              <input
                onChange={(e) => setText(e?.target?.value)}
                type="text"
                id="text"
                placeholder="text"
                value={text}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {selectedCity ? 
             <img src={`https://realauto.limsa.uz/api/uploads/images/${photo}`} alt="" />  :""
          }
            {imagePreview ? (
              <img
                className="w-full h-[250px] object-contain flex bg-gray-900 mb-[20px] rounded-[6px]"
                src={imagePreview}
                alt="da"
              />
            ) : (
              ""
            )}
            <input
              onChange={(e) => {
                setPhoto(e?.target?.files?.[0]), handleFileChange(e);
              }}
              type="file"
              accept="image/*"
              name="photo"
              id="photo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg w-full mt-[20px] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div> : ""  
      }
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CitiesPage;

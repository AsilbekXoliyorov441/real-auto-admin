import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";

const CarsPage = () => {
  const [car, setCar] = useState(null);
  const [changeModal, setChangeModal] = useState(false);
  const [brandData, setBrandData] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [editCarData, setEditCarData] = useState(null)

  // const [color, setColor] = useState("");
  // const [year, setYear] = useState(null);
  // const [seconds, setSeconds] = useState(null);
  // const [maxSpeed, setMaxSpeed] = useState(null);
  // const [maxPeople, setMaxPeople] = useState(null);
  // const [transmission, setTransmission] = useState("");
  // const [motor, setMotor] = useState("");
  // const [driveSide, setDriveSide] = useState("");
  // const [petrol, setPetrol] = useState("");
  // const [limitPerday, setLimitPerday] = useState(null);
  // const [deposit, setDeposit] = useState(null);
  // const [premiumProtection, setPremiumProtection] = useState(null);
  // const [priceInAED, setPriceInAED] = useState(null);
  // const [priceInUSD, setPriceInUSD] = useState(null);
  // const [priceInAEDSale, setPriceInAEDSale] = useState(null);
  // const [priceInUSDSale, setPriceInUSDSale] = useState(null);
  // const [inclusive, setInclusive] = useState(false);
  // const [cover, setCover] = useState("");
  // const [image1, setImage1] = useState("");
  // const [image2, setImage2] = useState("");
  // const [brandTitle, setBrandTitle] = useState("");
  // const [modelTitle, setModelTitle] = useState("");
  // const [cityTitle, setCityTitle] = useState("");
  // const [categoryTitle, setCategoryTitle] = useState("");
  // const [locationTitle, setLocationTitle] = useState("");

  console.log(brandData, modelData, cityData, categoryData, locationData);

  const formData = new FormData();

  console.log(formData);

  formData.append("color", document.getElementById("color")?.value);
  formData.append("year", document.getElementById("year")?.value);
  formData.append("seconds", document.getElementById("seconds")?.value);
  formData.append("max_speed", document.getElementById("maxSpeed")?.value);
  formData.append("max_people", document.getElementById("maxPeople")?.value);
  formData.append(
    "transmission",
    document.getElementById("transmission")?.value
  );
  formData.append("motor", document.getElementById("motor")?.value);
  formData.append("drive_side", document.getElementById("driveSide")?.value);
  formData.append("petrol", document.getElementById("petrol")?.value);
  formData.append("limitperday", document.getElementById("limitPerDay")?.value);
  formData.append("deposit", document.getElementById("deposit")?.value);
  formData.append(
    "premium_protection",
    document.getElementById("premiumProtection")?.value
  );
  formData.append("price_in_aed", document.getElementById("priceInAED")?.value);
  formData.append(
    "price_in_usd",
    document.getElementById("priceInAEDSale")?.value
  );
  formData.append(
    "price_in_aed_sale",
    document.getElementById("priceInAEDSale")?.value
  );
  formData.append(
    "price_in_usd_sale",
    document.getElementById("priceInUSDSale")?.value
  );
  formData.append("inclusive", document.getElementById("Inclusive")?.checked);
  formData.append("cover", document.getElementById("cover")?.files[0]);
  formData.append("images", document.getElementById("image1")?.files[0]);
  formData.append("images", document.getElementById("image2")?.files[0]);
  formData.append("brand_id", document.getElementById("brand")?.value);
  formData.append("model_id", document.getElementById("model")?.value);
  formData.append("city_id", document.getElementById("city")?.value);
  formData.append("category_id", document.getElementById("category")?.value);
  formData.append("location_id", document.getElementById("location")?.value);

  const openModal = () => {
    setChangeModal(true);
  };

  const closeModal = () => {
    setChangeModal(false);
    setSelectedCar(null)
  };

  const getCar = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/cars");
      setCar(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  const getBrand = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/brands");
      setBrandData(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  const getModel = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/models");
      setModelData(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  const getCity = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/cities");
      setCityData(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/categories");
      setCategoryData(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  const getLocation = async () => {
    try {
      const res = await axios.get("https://realauto.limsa.uz/api/locations");
      setLocationData(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  useEffect(() => {
    getCar();
    getBrand();
    getModel();
    getCategory();
    getLocation();
    getCity();
  }, []);

  const submit = async (e) => {
    const formData = new FormData();

    formData.append("color", document.getElementById("color")?.value);
    formData.append("year", document.getElementById("year")?.value);
    formData.append("seconds", document.getElementById("seconds")?.value);
    formData.append("max_speed", document.getElementById("maxSpeed")?.value);
    formData.append("max_people", document.getElementById("maxPeople")?.value);
    formData.append(
      "transmission",
      document.getElementById("transmission")?.value
    );
    formData.append("motor", document.getElementById("motor")?.value);
    formData.append("drive_side", document.getElementById("driveSide")?.value);
    formData.append("petrol", document.getElementById("petrol")?.value);
    formData.append(
      "limitperday",
      document.getElementById("limitPerDay")?.value
    );
    formData.append("deposit", document.getElementById("deposit")?.value);
    formData.append(
      "premium_protection",
      document.getElementById("premiumProtection")?.value
    );
    formData.append(
      "price_in_aed",
      document.getElementById("priceInAED")?.value
    );
    formData.append(
      "price_in_usd",
      document.getElementById("priceInAEDSale")?.value
    );
    formData.append(
      "price_in_aed_sale",
      document.getElementById("priceInAEDSale")?.value
    );
    formData.append(
      "price_in_usd_sale",
      document.getElementById("priceInUSDSale")?.value
    );
    formData.append("inclusive", document.getElementById("Inclusive")?.checked);
    formData.append("cover", document.getElementById("cover")?.files[0]);
    formData.append("images", document.getElementById("image1")?.files[0]);
    formData.append("images", document.getElementById("image2")?.files[0]);
    formData.append("brand_id", document.getElementById("brand")?.value);
    formData.append("model_id", document.getElementById("model")?.value);
    formData.append("city_id", document.getElementById("city")?.value);
    formData.append("category_id", document.getElementById("category")?.value);
    formData.append("location_id", document.getElementById("location")?.value);

    e.preventDefault();
    const token = localStorage.getItem("TOKEN");
    try {
      {
        selectedCar
          ? await axios.put(
              `https://realauto.limsa.uz/api/cars/${selectedCar}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
          : await axios.post("https://realauto.limsa.uz/api/cars", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
      }
      {
        selectedCar
          ? toast.success("Car maulumoti muvaffaqiyatli o'zgartirildi")
          : toast.success("Car maulumoti muvaffaqiyatli qo'shildi");
      }
      closeModal();
      setSelectedCar(null);
      getCar();
    } catch (error) {
      toast.error("Error");
      console.error(error);
    }
  };

  const deleteCar = async (car) => {
    const token = localStorage.getItem("TOKEN");
    try {
      await axios.delete(`https://realauto.limsa.uz/api/cars/${car?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("deleted car");
      getCar();
    } catch {
      toast.error("Error");
    }
  };

  const editCar = (car) => {
    setEditCarData(car)
    setSelectedCar(car?.id);
    openModal();
  };

  console.log(car);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between px-[10px]">
          <button className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            All Cars {car?.length}
          </button>
          <button
            onClick={openModal}
            type="button"
            className="text-white cursor-pointer mt-[20px] mb-[20px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Add Car
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="w-full ">
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                CarName
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                100km/h
              </th>
              <th scope="col" className="px-6 py-3">
                MaxSpeed
              </th>
              <th scope="col" className="px-6 py-3">
                Maxpeople
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>

              <th scope="col" className="px-6 py-3">
                TwoDays Price
              </th>
              <th scope="col" className="px-6 py-3">
                Deposit
              </th>
              <th scope="col" className="px-6 py-3">
                DriveSide
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {car?.map((car) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="car w-20 h-20 overflow-hidden rounded-[8px]  cursor-pointer flex items-center">
                    <Swiper
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper"
                      loop={true}
                    >
                      {car?.car_images?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="w-20 h-20 overflow-hidden rounded-[8px]  cursor-pointer flex items-center">
                            <img
                              className="w-full rounded-[8px] object-cover object-center"
                              src={`https://realauto.limsa.uz/api/uploads/images/${item?.image?.src}`}
                              alt="image"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </th>
                <td className="px-6 py-4">{car?.brand?.title}</td>
                <td className="px-6 py-4">{car?.color}</td>
                <td className="px-6 py-4">{car?.year}</td>
                <td className="px-6 py-4">{car?.seconds} sekund</td>
                <td className="px-6 py-4">{car?.max_speed} km/h</td>
                <td className="px-6 py-4">{car?.max_people}</td>
                <td className="px-6 py-4">${car?.price_in_usd}</td>
                <td className="px-6 py-4">{car?.two_days_price} USD</td>
                <td className="px-6 py-4">{car?.deposit} %</td>
                <td className="px-6 py-4">{car?.drive_side}</td>

                <td className="flex flex-col mt-[30px] gap-[10px]">
                  <button
                    onClick={() => editCar(car)}
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCar(car)}
                    className="font-medium cursor-pointer pl-[20px] text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {changeModal ? (
          <div
            onClick={closeModal}
            className="modal fixed top-0 left-0 flex items-center z-[100] w-[100%] h-[100%]"
          >
            <div className="mx-auto" onClick={(e) => e?.stopPropagation()}>
              <form
                onSubmit={submit}
                class="flex flex-wrap max-w-[1200px] p-[30px] rounded-[8px] w-full bg-gray-200 gap-[30px] mx-auto"
              >
                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.color : ""}
                    id="color"
                    type="text"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="text">Color</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.year : ""}
                    type="number"
                    name="floating_email"
                    id="year"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="number">Year</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.seconds : ""}
                    type="number"
                    name="floating_email"
                    id="seconds"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="Seconds">Seconds</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.max_speed : ""}
                    type="number"
                    name="floating_email"
                    id="maxSpeed"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="max-speed">Max-speed</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.max_people : ""}
                    type="number"
                    name="floating_email"
                    id="maxPeople"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="max-people">Max-people</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.transmission : ""}
                    type="text"
                    name="floating_email"
                    id="transmission"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="Transmission">Transmission</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.motor : ""}
                    type="text"
                    name="floating_email"
                    id="motor"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="motor">Motor</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.drive_side : ""}
                    type="text"
                    name="floating_email"
                    id="driveSide"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="drive">Drive side</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.petrol : ""}
                    type="text"
                    name="floating_email"
                    id="petrol"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="petrol">Petrol</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.limitperday : ""}
                    type="number"
                    name="floating_email"
                    id="limitPerDay"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="limit-per-day">Limitperday</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.deposit : ""}
                    type="number"
                    name="floating_email"
                    id="deposit"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="deposit">Deposit</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={
                      selectedCar ? editCarData?.premium_protection : ""
                    }
                    type="number"
                    name="floating_email"
                    id="premiumProtection"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="Premiumprotection">Premium Protection</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.price_in_aed : ""}
                    type="number"
                    name="floating_email"
                    id="priceInAED"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price-aed">Price in AED</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={selectedCar ? editCarData?.price_in_usd : ""}
                    type="number"
                    name="floating_email"
                    id="priceInUSD"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price in usd">Price in USD</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={
                      selectedCar ? editCarData?.price_in_aed_sale : ""
                    }
                    type="number"
                    name="floating_email"
                    id="priceInAEDSale"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price-aed-sale">Price in AED sale</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    defaultValue={
                      selectedCar ? editCarData?.price_in_aed_sale : ""
                    }
                    type="number"
                    name="floating_email"
                    id="priceInUSDSale"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price-in-usd-sale">Price in USD sale</label>
                </div>

                <div class="relative flex items-center justify-center z-0 w-full max-w-[200px] mb-[5px] group">
                  <input
                    defaultValue={selectedCar ? editCarData?.inclusive : ""}
                    type="checkbox"
                    name="floating_email"
                    id="Inclusive"
                    className="w-[24px]"
                    placeholder=" "
                    required
                  />
                  <label for="Inclusive">Inclusive</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    type="file"
                    name="floating_email"
                    id="cover"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="cover">Cover</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    type="file"
                    name="floating_email"
                    id="image1"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="image1">Image 1</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    type="file"
                    name="floating_email"
                    id="image2"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="image-2">Image 2</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <select
                    defaultValue={selectedCar ? brandData?.title : ""}
                    id="brand"
                  >
                    {brandData?.map((br, i) => (
                      <option key={i} value={br.id}>
                        {br.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <select
                    id="model"
                    defaultValue={selectedCar ? editCarData?.value : ""}
                  >
                    {modelData?.map((md, i) => (
                      <option key={i} value={md.id}>
                        {md.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <select
                    id="city"
                    defaultValue={selectedCar ? editCarData?.price_in_aed : ""}
                  >
                    {cityData?.map((ct, i) => (
                      <option key={i} value={ct?.id}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <select
                    id="category"
                    // onChange={(e) => setCategoryTitle(e?.target?.value)}
                    //  value={categoryTitle}
                  >
                    {categoryData?.map((categ, i) => (
                      <option key={i} value={categ.id}>
                        {categ.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <select
                    // onChange={(e) => setLocationTitle(e?.target?.value)}
                    //  value={locationTitle}
                    id="location"
                  >
                    {locationData?.map((loc, i) => (
                      <option key={i} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CarsPage;

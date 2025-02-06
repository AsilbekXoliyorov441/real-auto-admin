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

  const [color, setColor] = useState("");
  const [year, setYear] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [maxSpeed, setMaxSpeed] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);
  const [transmission, setTransmission] = useState("");
  const [motor, setMotor] = useState("");
  const [driveSide, setDriveSide] = useState("");
  const [petrol, setPetrol] = useState("");
  const [limitPerday, setLimitPerday] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const [premiumProtection, setPremiumProtection] = useState(null);
  const [priceInAED, setPriceInAED] = useState(null);
  const [priceInUSD, setPriceInUSD] = useState(null);
  const [priceInAEDSale, setPriceInAEDSale] = useState(null);
  const [priceInUSDSale, setPriceInUSDSale] = useState(null);
  const [inclusive, setInclusive] = useState(false);
  const [cover, setCover] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [brandTitle, setBrandTitle] = useState("");
  const [modelTitle, setModelTitle] = useState("");
  const [cityTitle, setCityTitle] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [locationTitle, setLocationTitle] = useState("");

  const [brandData, setBrandData] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  console.log(brandData , modelData , cityData , categoryData , locationData);

  const formData = new FormData();

  console.log(formData);

  formData.append("color", color);
  formData.append("year", year);
  formData.append("seconds", seconds);
  formData.append("max_speed", maxSpeed);
  formData.append("max_people", maxPeople);
  formData.append("transmission", transmission);
  formData.append("motor", motor);
  formData.append("drive_side", driveSide);
  formData.append("petrol", petrol);
  formData.append("limitperday", limitPerday);
  formData.append("deposit", deposit);
  formData.append("premium_protection", premiumProtection);
  formData.append("price_in_aed", priceInAED);
  formData.append("price_in_usd", priceInUSD);
  formData.append("price_in_aed_sale", priceInAEDSale);
  formData.append("price_in_usd_sale", priceInUSDSale);
  formData.append("inclusive", inclusive);
  formData.append("cover", cover);
  formData.append("images", image1);
  formData.append("images", image2);
  formData.append("brand_id", brandTitle);
  formData.append("model_id", modelTitle);
  formData.append("city_id", cityTitle);
  formData.append("category_id", categoryTitle);
  formData.append("location_id", locationTitle);

  const openModal = () => {
    setChangeModal(true);
  };

  const closeModal = () => {
    setChangeModal(false);
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
  }, []);

  useEffect(() => {
    getBrand();
  }, []);
  useEffect(() => {
    getModel();
  }, []);
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    getCity();
  }, []);


  const submit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("TOKEN")
    try{
       await axios.post("https://realauto.limsa.uz/api/cars" , formData , {
        headers:{
          Authorization: `Bearer ${token}`
        }
       });
       toast.success("Car maulumoti muvaffaqiyatli qo'shildi")
    }catch{
      toast.error("Error")
    }
  }


  const deleteCar = async(car) => {
    const token = localStorage.getItem("TOKEN")
    try{
    await axios.delete(`https://realauto.limsa.uz/api/cars/${car?.id}` , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("deleted car");
    getCar();

    }catch{
      toast.error("Error")
    }
  }

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
                CarPhotos
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
                SecondsIn100km/h
              </th>
              <th scope="col" className="px-6 py-3">
                MaxSpeed
              </th>
              <th scope="col" className="px-6 py-3">
                Maxpeople
              </th>
              <th scope="col" className="px-6 py-3">
                Motor
              </th>
              <th scope="col" className="px-6 py-3">
                Petrol
              </th>
              <th scope="col" className="px-6 py-3">
                PremiumProtection
              </th>
              <th scope="col" className="px-6 py-3">
                Price_in_aed
              </th>
              <th scope="col" className="px-6 py-3">
                Price_in_aed_sale
              </th>
              <th scope="col" className="px-6 py-3">
                Price_in_usd
              </th>
              <th scope="col" className="px-6 py-3">
                Price_in_sale
              </th>
              <th scope="col" className="px-6 py-3">
                FourDaysPrice
              </th>
              <th scope="col" className="px-6 py-3">
                ThreeDaysPrice
              </th>
              <th scope="col" className="px-6 py-3">
                TwoDaysPrice
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
                <td className="px-6 py-4">{car?.motor}</td>
                <td className="px-6 py-4">{car?.petrol}</td>
                <td className="px-6 py-4">{car?.premium_protection}</td>
                <td className="px-6 py-4">{car?.price_in_aed}</td>
                <td className="px-6 py-4">{car?.price_in_aed_sale}</td>
                <td className="px-6 py-4">{car?.price_in_usd}</td>
                <td className="px-6 py-4">{car?.price_in_usd_sale}</td>
                <td className="px-6 py-4">{car?.four_days_price} USD</td>
                <td className="px-6 py-4">{car?.three_days_price} USD</td>
                <td className="px-6 py-4">{car?.two_days_price} USD</td>
                <td className="px-6 py-4">{car?.deposit} %</td>
                <td className="px-6 py-4">{car?.drive_side}</td>

                <td className="flex flex-col mt-[30px] gap-[10px]">
                  <button
                    href="#"
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
              class="flex flex-wrap max-w-[1200px] p-[30px] rounded-[8px] w-full bg-gray-200 gap-[30px] mx-auto">
                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setColor(e?.target?.value)}
                    // value={color}
                    type="text"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="text">Color</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setYear(e?.target?.value)}
                    // value={year}
                    type="number"
                    name="floating_email"
                    id="number"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="number">Year</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setSeconds(e?.target?.value)}
                    // value={seconds}
                    type="number"
                    name="floating_email"
                    id="Seconds"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="Seconds">Seconds</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setMaxSpeed(e?.target?.value)}
                    // value={maxSpeed}
                    type="number"
                    name="floating_email"
                    id="max-speed"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="max-speed">Max-speed</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setMaxPeople(e?.target?.value)}
                    // value={maxPeople}
                    type="number"
                    name="floating_email"
                    id="max-people"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="max-people">Max-people</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setTransmission(e?.target?.value)}
                    // value={transmission}
                    type="text"
                    name="floating_email"
                    id="Transmission"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="Transmission">Transmission</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setMotor(e?.target?.value)}
                    // value={motor}
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
                    onChange={() => setDriveSide(e?.target?.value)}
                    // value={driveSide}
                    type="text"
                    name="floating_email"
                    id="drive"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="drive">Drive side</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setPetrol(e?.target?.value)}
                    // value={petrol}
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
                    onChange={() => setLimitPerday(e?.target?.value)}
                    // value={limitPerday}
                    type="number"
                    name="floating_email"
                    id="limit-per-day"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="limit-per-day">Limitperday</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setDeposit(e?.target?.value)}
                    // value={deposit}
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
                    onChange={() => setPremiumProtection(e?.target?.value)}
                    // value={premiumProtection}
                    type="number"
                    name="floating_email"
                    id="Premiumprotection"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="Premiumprotection">Premium Protection</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setPriceInAED(e?.target?.value)}
                    // value={priceInAED}
                    type="number"
                    name="floating_email"
                    id="price-aed"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price-aed">Price in AED</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setPriceInUSD(e?.target?.value)}
                    // value={priceInUSD}
                    type="number"
                    name="floating_email"
                    id="price in usd"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price in usd">Price in USD</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setPriceInAEDSale(e?.target?.value)}
                    // value={priceInAEDSale}
                    type="number"
                    name="floating_email"
                    id="price-aed-sale"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price-aed-sale">Price in AED sale</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <input
                    onChange={() => setPriceInUSDSale(e?.target?.value)}
                    // value={priceInUSDSale}
                    type="number"
                    name="floating_email"
                    id="price-in-usd-sale"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="price-in-usd-sale">Price in USD sale</label>
                </div>

                <div class="relative flex items-center justify-center z-0 w-full max-w-[200px] mb-[5px] group">
                  <input
                    onClick={() => setInclusive(!inclusive)}
                    // value={inclusive}
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
                    onChange={() => setCover(e?.target?.files?.[0])}
                    // value={cover}
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
                    onChange={() => setImage1(e?.target?.files?.[0])}
                    // value={image1}
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
                    onChange={() => setImage2(e?.target?.files?.[0])}
                    // value={image2}
                    type="file"
                    name="floating_email"
                    id="image-2"
                    className="max-w-[200px] px-[10px] w-full outline-none border-1 rounded-[3px]"
                    placeholder="Enter"
                    required
                  />
                  <label for="image-2">Image 2</label>
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <select
                     onChange={(e) => setBrandTitle(e?.target?.value)}
                    //  value={brandTitle}
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
                     onChange={(e) => setModelTitle(e?.target?.value)}
                    //  value={modelTitle}
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
                     onChange={(e) => setCityTitle(e?.target?.value)}
                    //  value={cityTitle}
                  >
                    {cityData?.map((ct, i) => (
                      <option key={i} value={ct.id}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                  
                </div>

                <div class="relative z-0 w-full max-w-[200px] mb-5 group">
                  <select
                     onChange={(e) => setCategoryTitle(e?.target?.value)}
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
                     onChange={(e) => setLocationTitle(e?.target?.value)}
                    //  value={locationTitle}
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
      <ToastContainer/>
    </div>
  );
};

export default CarsPage;

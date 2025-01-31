import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation } from "swiper/modules";

const CarsPage = () => {
  const [car, setCar] = useState(null);

  

  const getCar = async () => {
    const token = localStorage.getItem("TOKEN");

    try {
      const res = await axios.get("https://realauto.limsa.uz/api/cars");
      setCar(res?.data?.data);
    } catch {
      console.error(res.error);
    }
  };

  useEffect(() => {
    getCar();
  }, []);
  console.log(car);



  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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

export default CarsPage;

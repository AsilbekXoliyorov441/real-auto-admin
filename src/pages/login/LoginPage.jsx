import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://realauto.limsa.uz/api/auth/signin",
        {
          phone_number: number,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

        console.log(data);


      localStorage.setItem("TOKEN", data.data.tokens.accessToken.token);
      localStorage.setItem("Message", data.success);

      toast.success("Success");
      navigate("/categories");
    } catch (error) {
      toast.error("Error");
      navigate("/login");
    }
  };

  login();


  useEffect(() => {
    login();
  });

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] px-[20px]">
      <video className="fixed w-[100%] object-cover h-[100%]" autoPlay muted loop playsInline>
        <source
          src="/vedios/Ultimate Supercar Showroom in Dubai - Dourado Luxury Cars!.mp4"
          type="video/mp4"
        />
      </video>
      <form
        className="flex relative z-[10px] flex-col  p-[30px] form-bg rounded-[8px] max-w-[468px] w-full"
        onSubmit={login}
      >
        <h1 className="text-center text-[48px] font-bold mb-[30px] text-white">
          Login
        </h1>
        <label
          className="mb-[2px] cursor-pointer text-white text-[18px] font-bold"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          required
          className="outline-none border mb-[15px] bg-white border-white rounded-[2px] p-[5px] text-[18px] w-full text-blue-950"
          onChange={(e) => setNumber(e.target.value)}
          type="number"
          placeholder="Raqam kiriting"
        />
        <label
          className="mb-[2px] cursor-pointer text-white text-[18px] font-bold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          required
          className="outline-none mb-[40px] border bg-white border-white rounded-[2px] p-[5px]  text-blue-950 text-[18px] w-full"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password kiriting"
        />
        <button
          className="outline-none border cursor-pointer bg-orange-600 border-white rounded-[2px] p-[5px] text-white text-[18px] w-full mb-[30px]"
          type="submit"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;

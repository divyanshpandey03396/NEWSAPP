import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  });

  const login = async () => {
    try {
      const payload = { email, password };
      setLoading(true);
      const result = await axios.post("api/users/login", payload);
      console.log(result.data);
      toast("Login Successful!", "success");
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(result.data));
      navigate("/home");
    } catch (err) {
      console.log(err.response);
      toast("Something went wrong, please try again!");
      setLoading(false);
    }
  };

  const register = async () => {
    try {
      const payload = { email, password, name };
      setLoading(true);
      await axios.post("api/users/register", payload);
      toast("Registration successful, Please login!", "success");
      setLoading(false);
      setShowRegisterForm(false);
      setName("");
      setEmail("");
      setPassword("");
      setShowLoginForm(true);
    } catch (err) {
      console.log(err.response);
      toast("Something went wrong, please try again!");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center sm:flex-col">
      {loading && <Spinner />}
      <div
        className={`w-1/2 px-10 space-y-5 sm:w-screen ${
          (showLoginForm || showRegisterForm) && "sm:hidden"
        }`}
      >
        <h1>
          <b className="text-[#2b8f74] text-8xl">SHEY</b>{" "}
          <b className="text-8xl text-gray-700">NEWS</b>{" "}
        </h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit rem laboriosam, iure dignissimos illum ipsam suscipit
          ducimus doloremque. Sit repudiandae, labore eum rem saepe perspiciatis
          est eos ullam enim nam?
        </p>
        <div className="space-x-5 my-5 text-white">
          <button
            className="bg-gray-500 px-10 py-3"
            onClick={() => {
              setShowLoginForm(true);
              setShowRegisterForm(false);
            }}
          >
            LOGIN
          </button>
          <button
            className="bg-[#2b8f74] px-10 py-3"
            onClick={() => {
              setShowRegisterForm(true);
              setShowLoginForm(false);
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
      <div className="w-1/2 sm:w-screen">
        {!showLoginForm && !showRegisterForm && (
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_2LdLki.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        )}
        {showLoginForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                LOGIN
              </h1>
              <input
                type="email"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={login}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        )}
        {showRegisterForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                REGISTER
              </h1>
              <input
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-white"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={register}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {(showLoginForm || showRegisterForm) && (
        <AiOutlineCloseCircle
          className="absolute top-5 right-5 z-10 hover:bg-gray-600 hover:rounded-full hover:text-white"
          size={30}
          color="gray"
          cursor="pointer"
          onClick={() => {
            setShowLoginForm(false);
            setShowRegisterForm(false);
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;

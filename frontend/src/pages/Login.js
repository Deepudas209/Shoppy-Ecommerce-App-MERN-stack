import React, { useState, useContext } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApiOne from "../common";
import { toast } from 'react-toastify';
import Context from "../context";


const Login = () => {
  const [showThePassword, setShowThePassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const { fetchUserdetails, fetchUserAddToCart } = useContext(Context)
  // console.log("generalContext", generalContext.fetchUserdetails())

  // data storing
  const handleFormDataOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // login submit
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const dataResponse = await fetch(SummaryApiOne.signIn.url,{
      method: SummaryApiOne.signIn.method,
      credentials: "include",
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/")
      fetchUserdetails()
      fetchUserAddToCart()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }
  console.log("data",data);
  return (
    // login page container
    <section id="login">
      <div className="mx-auto container p-6">
        <div className="bg-pink-100 p-8 w-full max-w-sm mx-auto shadow-md rounded-3xl">
          {/* login icon */}
          <div className='text-7xl text-green-700 mx-auto flex items-center justify-center'>
            <FaRegCircleUser />
          </div>

          {/* login form */}
          <form className="pt-6 flex flex-col justify-center gap-2" onSubmit={handleFormSubmit}>
            <div className="grid">
              <label className='font-semibold text-lg'>Email : </label>
              <div className="bg-white p-3 flex rounded-3xl">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleFormDataOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className='font-semibold text-lg'>Password : </label>
              <div className="bg-white p-3 flex rounded-3xl">
                <input
                  type={showThePassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleFormDataOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />

                {/* password icons */}
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowThePassword((prev) => !prev)}
                >
                  <span>{showThePassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit m-2 ml-auto hover:underline font-semibold text-blue-500 hover:text-red-500"
              >
                Forgot Password
              </Link>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-1">
              Login
            </button>
          </form>
          <p className="font-normal my-5">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-blue-500 hover:underline hover:text-red-500 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

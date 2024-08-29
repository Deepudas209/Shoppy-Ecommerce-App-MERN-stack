import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApiOne from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConformPassword,setShowConformPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    conformPassword: "",
    profilePic: ""
  });
  const navigate = useNavigate()

  // data storing
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // profile photo uload method
  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
    // console.log("file",imagePic)
    setData((prev) =>{
      return{
        ...prev,
      profilePic: imagePic,
      }
    })
    
  }

  // login submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(data.password === data.conformPassword){
      // console.log("SummaryApiOne.SignUp.url",SummaryApiOne.SignUp.url)
      
    const dataResponse = await fetch(SummaryApiOne.SignUp.url,{
      method: SummaryApiOne.SignUp.method,
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/login")
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
    
    console.log("data",dataApi)
    }else{
      toast.error("please check password and conform password")
      // console.log("please check password and conform password")
    }
    
  }
  // console.log("data",data);

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          {/* signup icon and profile pic upload */}
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
            <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
              Upload Photo
            </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          {/* login form */}
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* input fields name,email,password,conform password */}
          <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 p-2 rounded-full">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2 rounded-full">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex rounded-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                {/* password icons */}
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Conform Password : </label>
              <div className="bg-slate-100 p-2 flex rounded-full">
                <input
                  type={showConformPassword ? "text" : "password"}
                  placeholder="Enter conform password"
                  name="conformPassword"
                  value={data.conformPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                {/* password icons */}
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConformPassword((prev) => !prev)}
                >
                  <span>{showConformPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              sign up
            </button>
          </form>
          <p className="my-5">
            Already have account ?{ " " }
            <Link
              to={"/login"}
              className="text-blue-800 hover:underline hover:text-red-700"
            >
               Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp

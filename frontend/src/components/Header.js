import React, { useContext, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApiOne from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)
  // console.log("user header", user);
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  // console.log("searchInput", searchInput?.search.split("=")[1])
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApiOne.logout_user.url, {
      method: SummaryApiOne.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  // console.log("Header add to cart count", context)

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }
  }
  return (
    // fixed----------
    <header className="h-16 shadow-md bg-slate-200 w-full z-40 fixed">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">

        {/* header icon */}
        <Link to={"/"}>
        <div className='flex items-center justify-center p-4 cursor-pointer'>
          <div className='text-5xl text-green-700 shadow-md'>
          <FaCartShopping />
          </div>
        <div className=''>
            <p className='text-3xl font-bold text-green-700'>Shoppy</p>
        </div>
        </div>
      </Link>

        {/* search bar and icon */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-3 bg-white">
          <input
            type="text"
            placeholder="search products here!"
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-green-700 flex items-center justify-center rounded-r-full text-white">
            <IoSearchSharp />
          </div>
        </div>

        {/* user icon and cart icon */}
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {
              user?._id && (
                <div className="text-3xl text-green-700 cursor-pointer relative flex justify-center" onClick={() => setMenuDisplay(prev => !prev)}>
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
              )
            }

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {
                    user?.role === ROLE.ADMIN && (
                      <Link
                    to={"/admin-panel/all-products"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(prev => !prev)}
                  >
                    Admin Panel
                  </Link>
                    )
                  }
                  <Link
                  to={'/order'}
                  className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                  onClick={() => setMenuDisplay(prev => !prev)}
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>
          {
            user?._id && (
          <Link to={'/cart'} className="text-2xl text-green-700 relative">
            <span>
              <FaCartShopping />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">{context?.cartProductCount}</p>
            </div>
          </Link>
            )
          }

          {/* login and logout button */}
          <div>
            {/* login button linking to login page */}
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full font-semibold text-white bg-green-700 hover:bg-green-800"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full font-semibold text-white bg-green-700 hover:bg-green-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

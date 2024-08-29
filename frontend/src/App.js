import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react"
import SummaryApiOne from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const fetchUserdetails = async () => {
    const dataResponse = await fetch(SummaryApiOne.current_user.url,{
      method: SummaryApiOne.current_user.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log("data-user", dataResponse)
  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApiOne.addToCartProductCount.url,{
      method: SummaryApiOne.addToCartProductCount.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json()
    // console.log("dataApi", dataApi)
    setCartProductCount(dataApi?.data?.count)
  }
  useEffect(() => {
    fetchUserdetails()
    fetchUserAddToCart()
  },[])
  return (
    <>
    <Context.Provider value={{
      fetchUserdetails, // user details fetch
      cartProductCount, //current user add to cart
      fetchUserAddToCart
    }}>
    <ToastContainer
    position='top-center'
    />
    <Header />
    <main className='min-h-[calc(100vh-120px)] pt-16'>
    <Outlet />
    </main>
    <Footer />
    </Context.Provider>
    </>
  );
}

export default App;

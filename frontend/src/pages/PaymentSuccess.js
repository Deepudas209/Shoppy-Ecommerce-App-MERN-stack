import React from 'react'
import { MdDone } from "react-icons/md";
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className='bg-slate-200 m-2 rounded w-full max-w-md mx-auto flex justify-center items-center flex-col p-4'>
        <div className='bg-green-600 shadow-2xl rounded-full w-40 h-40 flex items-center justify-center'>
        <MdDone className='text-8xl text-white font-extrabold' />
        </div>
        <p className='text-green-600 mt-8 font-bold text-xl'>Payment Successfully</p>
        <Link to={'/order'} className='p-2 px-4 rounded-3xl font-semibold text-orange-600 hover:bg-orange-500 hover:text-white mt-5 border-2 border-orange-500'>Let's See Order</Link>
    </div>
  )
}

export default PaymentSuccess

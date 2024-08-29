import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'
import VerticalCartProduct from '../components/VerticalCartProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <HorizontalCartProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCartProduct category={"camera"} heading={"Camera & Photography"} />
      <BannerProduct />
      <VerticalCartProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCartProduct category={"mobiles"} heading={"Best Mobiles"} />
    </div>
  )
}

export default Home

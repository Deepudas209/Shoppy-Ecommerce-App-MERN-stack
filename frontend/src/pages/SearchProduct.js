import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApiOne from '../common'
import VerticalCart from '../components/VerticalCart'

const SearchProduct = () => {
  // const queryOne = useParams()
  // console.log("queryOne", queryOne);
    const query = useLocation()
    console.log("query", query.search)

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    
    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApiOne.searchProduct.url + query.search)
        const dataResponse = await response.json()
        setLoading(false)
        setData(dataResponse.data)
        // console.log("responseData", dataResponse)
    }
    useEffect(() => {
      fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading...</p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>
      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No data found...</p>
        )
      }
      {
        data.length !== 0 && !loading && (
              <VerticalCart loading={loading} data={data}/>
        )
      }
    </div>
  )
}

export default SearchProduct

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Home() {


  let { addCart ,setCartCount} = useContext(CartContext)
  let baseUrl = "https://ecommerce.routemisr.com"
  let [productList, setProductList] = useState([])
  useEffect(() => {
    let link = document.querySelectorAll(".page-item a")
    link.forEach((el) => {
      el.addEventListener("click", function (e) {
        console.log(e.target.innerText);
        let page = e.target.innerText
        getAllProduct(page)

      })
    })

    getAllProduct()
  }, [])
  async function getAllProduct(page = 1) {
    $(".loading").fadeIn()
    let { data } = await axios.get(`${baseUrl}/api/v1/products/?page=${page}`)
    setProductList(data.data)
    console.log(data.data);
    $(".loading").fadeOut(1000)
  }

  async function addDataToCart(id) {
    let { data } = await addCart(id)
    if (data.status == 'success') {
      setCartCount(data.numOfCartItems)
      toast.success(data.message)
    }else{
      toast.error("Error")
    }
    console.log(data.data);
  }
  return (
    <>
    <Helmet>
    
      <title>Home</title>
    </Helmet>
      <Toaster />
      <MainSlider />
      <CategorySlider />
      <div className='my-5 position-relative'>
        <div className='loading position-fixed top-0 end-0 bottom-0 start-0 bg-white'>
          <i className='fa-solid fa-spinner fa-spin fa-5x'></i>
        </div>
        <div className='row g-3 '>

          {productList.map((product) => {
            return <div key={product._id} className='col-md-2'>
              <div className='product cursor-pointer'>
                <Link to={'/ProductDetails/' + product._id}>
                  <img src={product.imageCover} className='w-100' alt="" />
                  <p className='text-main'>{product.category.name}</p>
                  <h6>{product.title.split(" ").slice(0, 2).join(" ")}</h6>
                  <div className='d-flex justify-content-between'>
                    <span>{product.price}EGP</span>
                    <span>
                      <i className='fa-solid fa-star rating-color'></i>
                      {product.ratingsAverage}
                    </span>
                  </div>

                </Link>
                <button onClick={() => addDataToCart(product._id)} className='btn btn-success my-2 d-block w-100'>Add Cart</button>
              </div>
            </div>
          })}
        </div>

        <nav className='d-flex justify-content-center py-2' aria-label="Page navigation example">
          <ul className="pagination ">

            <li className="page-item"><a className="page-link" >1</a></li>
            <li className="page-item"><a className="page-link" >2</a></li>

          </ul>
        </nav>


      </div>

    </>
  )
}

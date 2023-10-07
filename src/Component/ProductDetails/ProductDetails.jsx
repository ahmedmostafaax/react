import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function ProductDetails() {
    let baseUrl = "https://ecommerce.routemisr.com"
    let [productDetails, setProduct] = useState(null)
    let { id } = useParams()

    useEffect(() => {
        getDetails()
    }, [])
    async function getDetails() {
        let { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`)
        setProduct(data.data)
        console.log(data.data);
    }
    function changeImage(e) {

        let imgSrc = $(e.target).attr("src")
        $("#myImg").attr("src", imgSrc)
    }
    console.log(id);
    return (
        <div className='row my-5 align-items-center'>
            {productDetails ? <>
                <div className='col-md-4'>
                    <OwlCarousel className='owl-theme' dots={false}   items={1} loop  >

                        {productDetails.images.map((el) => {
                            return <div class='item'>
                                <img src={el} className='w-100' alt="" />
                            </div>
                        })}


                    </OwlCarousel>
                </div>
                <div className='col-md-8'>
                    <h2>{productDetails.title}</h2>
                    <p className='text-muted'>{productDetails.description}</p>
                    <p className='text-main'>{productDetails.category.name}</p>
                    <div className='d-flex my-3 justify-content-between'>
                        <span>{productDetails.price}EGP</span>
                        <span>
                            <i className='fa-solid fa-star rating-color'></i>
                            {productDetails.ratingsAverage}
                        </span>
                    </div>

                    <button className='w-100 btn btn-success'>Add To Cart</button>
                </div>
            </> : ''}
        </div>
    )
}









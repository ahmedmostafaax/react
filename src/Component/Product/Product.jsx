import React, { useContext } from 'react'
import { Counter } from '../../Context/CounterContext'
import { NameContext } from '../../Context/NameContext'
import { Helmet } from 'react-helmet'

export default function Product() {


  return (
    <div>
      <Helmet>

        <title>Products</title>
      </Helmet>

      Product
    </div>
  )
}

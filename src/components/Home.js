import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import Product from './Product'

function Home() {
  return (
    <div className="home" >
      <img
        className="home__image"
        alt=""
        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg"
      />

      <div className="home__row">
        <Product
          id="1"
          title="DualShock 4 Wireless Controller for PlayStation 4 - Magma Red"
          price={645999}
          rating={4}
          image="https://m.media-amazon.com/images/I/41kaOFDXzSL._AC_SY200_.jpg"
        />
        <Product
          id="2"
          title="Oculus Quest All-in-one VR Gaming Headset – 64GB"
          price={375999}
          rating={2}
          image="https://m.media-amazon.com/images/I/31pEe2taIPL._AC_SY200_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="3"
          title="Xbox Wireless Controller - Black"
          price={349999}
          rating={3}
          image="https://m.media-amazon.com/images/I/41LO2OX6pRL._AC_SY200_.jpg"
        />
        <Product
          id="4"
          title="Final Fantasy VII Remake - PlayStation 4 Deluxe Edition"
          price={445999}
          rating={5}
          image="https://m.media-amazon.com/images/I/41fVBsNMNmL._AC_SY200_.jpg"
        />
        <Product
          id="5"
          title="Oculus Rift S PC-Powered VR Gaming Headset"
          price={3955000}
          rating={4}
          image="https://m.media-amazon.com/images/I/31i3tpuXxxL._AC_SY200_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="6"
          title="Playstation 4 Pro"
          price={4955560}
          rating={5}
          image="https://m.media-amazon.com/images/I/31qwualUaLL._AC_SY200_.jpg"
        />

      </div>
    </div>
  )
}

export default Home

import React from 'react'
import { useStateValue } from '../StateProvider'
import '../css/Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout() {
    const [state] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                    alt=""
                    src="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2020/img/Warehouse_Deals/XCM_Manual_ORIGIN_1258835_1326209_US_AW_us_warehouse_deals_us_en_3313893_1500x120_en_US.jpg"
                />
                {state.basket?.length === 0 ? (
                    <div>
                        <h3>Hello, {!state.user ? 'Guest' : state.user?.email}</h3>
                        <h2>Your Shopping Basket is empty</h2>
                    </div>
                ) : (
                        <div>
                            <h2 className="checkout__title">Your Shopping Basket</h2>
                            {state.basket.map((item) => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                        </div>
                    )}
            </div>

            {state.basket.length > 0 && (
                <div className="checkout__right">
                    <Subtotal />
                </div>
            )}
        </div>
    )
}

export default Checkout

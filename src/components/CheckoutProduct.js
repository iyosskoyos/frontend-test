import React from 'react'
import '../css/CheckoutProduct.css'
import { useStateValue } from '../StateProvider'

function CheckoutProduct(props) {
    const [state, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: props.id
        })
    }
    return (
        <div className="checkoutProduct">
            <img
                className='checkoutProduct__image'
                alt=""
                src={props.image}
            />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{props.title}</p>

                <p className="checkoutProduct__price">
                    <small>Rp</small>
                    <strong>{props.price}</strong>
                </p>

                <div className="checkout__rating">
                    {
                        Array(props.rating).fill().map(() => (<span role="img" aria-label="Star">⭐</span>))
                    }
                </div>
                {!props.hideButton && (
                    <button onClick={removeFromBasket}>Remove from basket</button>
                )}

            </div>
        </div>
    )
}

export default CheckoutProduct

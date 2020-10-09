import React from 'react'
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

function ProductDetail(props) {
    const [state, dispatch] = useStateValue()
    console.log(props);
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: props.location.data.id,
                title: props.location.data.title,
                image: props.location.data.image,
                price: props.location.data.price,
                rating: props.location.data.rating
            }
        })
    }
    return (
        <div className="checkout">
            <img className='checkoutProduct__image'
                src={props.location.data.image} alt="" />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{props.location.data.title}</p>
                <p className="checkoutProduct__price">
                    <small>Rp</small>
                    <strong>{props.location.data.price}</strong>
                </p>
                <div className="checkout__rating">
                    {
                        Array(props.location.data.rating).fill().map(() => (<span role="img" aria-label="Star">⭐</span>))
                    }
                </div>
                <div className="div__productDesc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem recusandae amet aut a? Debitis fuga quod dignissimos vel aut expedita harum amet nemo perspiciatis impedit. Rerum praesentium dolorem temporibus quam?
                 </div>
                <button onClick={addToBasket} className="btn btn-primary">Add to Basket</button>
            </div>
        </div>
    )
}

export default withRouter(ProductDetail)
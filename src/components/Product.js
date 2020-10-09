import React, { useEffect } from 'react'
import { Link, Route } from 'react-router-dom';
import '../css/Product.css'
import { useStateValue } from '../StateProvider'
import Header from './Header';
import ProductDetail from './ProductDetail';

function Product(props) {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: props.id,
                title: props.title,
                image: props.image,
                price: props.price,
                rating: props.rating
            }
        })
    }

    return (
        <div className="product" >
            <Link to={{
                pathname: `/${props.id}`,
                data: props
            }} className="product__link">
                <div className="product__info">
                    <p>{props.title}</p>
                    <p className="product__price">
                        <small>Rp</small>
                        <strong>{props.price},00</strong>
                    </p>
                    <div className="product__rating">
                        {
                            Array(props.rating).fill().map(() => (<span role="img" aria-label="Star">⭐</span>))
                        }
                    </div>
                </div>
                <img src={props.image} alt="" />
            </Link>

            <button onClick={addToBasket} className="btn btn-primary">Add to Basket</button>
        </div >
    )
}

export default Product

import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import '../css/Payment.css'
import { useStateValue } from '../StateProvider'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from './axios'
import Select from 'react-select'
import { db } from '../firebase';
import $ from 'jquery'

function Payment() {
    const [state, dispatch] = useStateValue();
    const history = useHistory()

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(true)
    const [selectedProvince, setSelectedProvince] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedCityName, setSelectedCityName] = useState(null)
    const [selectedCourier, setSelectedCourier] = useState(null)
    const [weight, setWeight] = useState(null)
    const [ongkir, setOngkir] = useState("")
    const [province, setProvince] = useState([])
    const [city, setCity] = useState([])

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const optionsCity = async () => {
            await axios.get("/provinsi")
                .then(res => {
                    console.log(res);
                    setProvince(res.data.rajaongkir.results)
                })
                .catch(e => {
                    console.log(e);
                })
                .then(() => {
                })
        }
        optionsCity()
    }, [])

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expect the total in a currencies subunit
                url: `/payments/create?total=${getBasketTotal(state.basket) * 100}`
            })

            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [state.basket])

    console.log('Secret', clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then((res) => {
            //paymentIntent = payment confirmation
            console.log("Payment Intent", res);

            db.collection('users').doc(state.user?.uid)
                .collection('orders').doc(res.paymentIntent.id).set({
                    basket: state.basket,
                    amount: res.paymentIntent.amount,
                    created: res.paymentIntent.created
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: "EMPTY_BASKET"
            })

            history.replace('/orders')
        })
    }

    const handleChange = (e) => {
        //Listen for changes in the CardElement
        // and display errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")
    }

    const getCity = async (e) => {
        console.log(e);
        await axios.get(`/kota/${e.value}`)
            .then(res => {
                console.log(res);
                setCity(res.data.rajaongkir.results)
            })
            .catch(e => {
                console.log(e);
            })
            .then(() => {
                setSelectedProvince(e.value)
            })
    }

    const optionsCourier = [
        { value: 'jne', label: 'JNE' },
        { value: 'pos', label: 'Pos' },
        { value: 'tiki', label: 'Tiki' },
    ]

    const provinsi = province.map(res => {
        const result = { value: res.province_id, label: res.province }
        return result
    })

    const kota = city.map(res => {
        const result = { value: res.city_id, label: res.city_name }
        return result
    })

    const setDataCity = (e) => {
        setSelectedCityName(e.label)
        setSelectedCity(e.value)
    }

    const cekOngkir = async () => {
        await axios.get(`/ongkos/${23}/${selectedCity}/${weight}/${selectedCourier}`)
            .then(res => {
                console.log(res);
                setOngkir(res.data.rajaongkir.results[0])
            })
            .catch(e => {
                console.log(e);
            })
            .then(() => {

            })
    }

    console.log(ongkir);

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout"> {state.basket?.length} items</Link>)
                </h1>
                {/* Payment section - delivery address */}
                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{state.user?.email}</p>

                        <div className="payment__selectContainer">
                            <Select
                                className="payment__select"
                                options={provinsi}
                                onChange={getCity}
                                placeholder="Province"
                            />

                            <Select
                                className="payment__select"
                                options={kota}
                                placeholder="City"
                                onChange={setDataCity}
                            />

                            <input className="payment__select" onChange={e => setWeight(e.target.value)} placeholder="Berat dalam gram" type="text" />

                            <Select
                                className="payment__select"
                                options={optionsCourier}
                                placeholder="Courier"
                                onChange={e => setSelectedCourier(e.value)}
                            />

                        </div>

                        {selectedCity && weight && selectedCourier && (
                            <div className="payment__ongkir">
                                <p className="payment__ongkirTitle">Ongkir dari Bandung ke {selectedCityName}</p>
                                <button onClick={cekOngkir}>Cek Ongkir</button>
                                <p className="payment__ongkirCourier">{ongkir?.name}</p>
                                {ongkir.costs?.map(cost => (
                                    <p className="payment__ongkirDetail">{cost.service} {`Rp${cost.cost[0].value}`} {cost.cost[0].etd} days</p>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
                {/* Payment section - Review Items */}
                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
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
                </div>


                {/* Payment section - payment method */}
                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe */}
                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(state.basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    prefix={"Rp"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment

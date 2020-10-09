import React from 'react'
import '../css/Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../StateProvider'
import { getBasketTotal } from '../reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
  const history = useHistory()
  const [state, dispatch] = useStateValue()

  const handleCheckout = (e) => {
    if (state.user) {
      history.push('/payment')
    } else {
      history.push('/login')
    }
  }

  return (
    <div className="subtotal">

      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({state.basket.length} items):<strong> {`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        // decimalScale={2}
        prefix={"Rp"}
        thousandSeparator={true}
        value={getBasketTotal(state.basket)}
        displayType={"text"}
      />
      <button onClick={handleCheckout}>
        Proceed to Checkout
            </button>
    </div>
  )
}

export default Subtotal

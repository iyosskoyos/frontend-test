import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Checkout from './components/Checkout';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders';
import ProductDetail from './components/ProductDetail';

const promise = loadStripe(
  "pk_test_51HYSUxBQ41B1NYWve6QqC60mhVBPXQ3WAW0H6VlawSSTVOZaSi6BsKi4qFIrmBgEv3Y0mSd6JsCcCzlfII77oEQc007BEAvGB0"
)

function App() {
  const [state, dispatch] = useStateValue()

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
    return () => {
      unsubsribe()
    }
  }, [])

  console.log(state.user);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact={true} path="/:productId">
            <Header />
            <ProductDetail name="woi" />
          </Route>
          <Route path='/'>
            <Header />
            <Home name="Yosua"></Home>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

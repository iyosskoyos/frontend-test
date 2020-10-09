import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Header.css"
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {
    const [state] = useStateValue();
    console.log(state);

    const login = () => {
        if (state.user) {
            auth.signOut();
        }
    }

    return (
        <nav className='header'>
            <Link to="/">
                <img
                    alt=""
                    className="header__logo"
                    src='http://pngimg.com/uploads/amazon/amazon_PNG25.png' />
            </Link>

            {/* search box */}
            <div className="header__search">
                <input type='text' className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>

            {/* 3 link */}
            <div className="header__nav">
                <Link to={!state.user && "/login"} className="header__link">
                    <div onClick={login} className="header__option">
                        <span className="header__optionLineOne">Hello {!state.user ? 'Guest' : state.user?.email}</span>
                        <span className="header__optionLineTwo">{state.user ? 'Sign Out' : "Sign in"}</span>
                    </div>
                </Link>

                <Link to="/orders" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>

                <Link to="/" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>
                </Link>

                <Link to="/checkout" className="header__link">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{state.basket?.length}</span>
                    </div>
                </Link>
            </div>

        </nav>
    )
}

export default Header

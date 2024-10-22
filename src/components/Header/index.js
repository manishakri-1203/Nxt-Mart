import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'
import {TbLogout2} from 'react-icons/tb'
import {CiHome, CiShoppingCart} from 'react-icons/ci'

import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {activeTab, setActiveTab} = useContext(CartContext)
  const homeTab = activeTab === 'Home' ? 'active-tab' : ''
  const cartTab = activeTab === 'Cart' ? 'active-tab' : ''

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header-container">
      <div className="header-lg-container">
        <Link to="/" className="logo-link" onClick={() => setActiveTab('Home')}>
          <img
            src="https://res.cloudinary.com/demx1ym4x/image/upload/v1720351664/Logo_2_prtq9w.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <div className="nav-items-container">
          <Link
            to="/"
            className="nav-link"
            onClick={() => setActiveTab('Home')}
          >
            <p className={`tab ${homeTab}`}>Home</p>
          </Link>
          <Link
            to="/cart"
            className="nav-link"
            onClick={() => setActiveTab('Cart')}
          >
            <p className={`tab ${cartTab}`}>Cart</p>
          </Link>
          <div className="logout-button-container">
            <TbLogout2 size="20" color="#333333" onClick={onClickLogout} />
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="header-sm-container">
        <Link to="/" onClick={() => setActiveTab('Home')}>
          <CiHome
            size="24"
            color={activeTab === 'Home' ? '#088c03' : '#333333'}
          />
        </Link>
        <Link to="/cart" onClick={() => setActiveTab('Cart')}>
          <CiShoppingCart
            size="24"
            color={activeTab === 'Cart' ? '#088c03' : '#333333'}
          />
        </Link>
        <button type="button" className="logout-sm-btn" onClick={onClickLogout}>
          <TbLogout2 size="22" color="#333333" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)

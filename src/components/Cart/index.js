import {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {IoCheckmarkCircleOutline} from 'react-icons/io5'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, setActiveTab} = useContext(CartContext)
  const history = useHistory()
  const [isCheckout, setIsCheckout] = useState(false)

  const onCheckout = () => {
    setIsCheckout(true)
  }

  const onReturnHome = () => {
    setActiveTab('Home')
    history.push('/')
  }

  const renderSuccessView = () => (
    <>
      {isCheckout ? (
        <div className="cart-summary-container">
          <IoCheckmarkCircleOutline size={40} color="#088C03" />
          <h1 className="cart-summary-heading">Payment Successful</h1>
          <p className="cart-summary-text">Thank you for ordering.</p>
          <p className="cart-summary-text">
            Your payment is successfully completed.
          </p>

          <button
            type="button"
            className="cart-summary-btn"
            onClick={onReturnHome}
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        <>
          <div className="cart-success-container">
            <h1 className="items-heading">Items</h1>
            <h1 className="mobile-items-heading">Items({cartList.length})</h1>
            <div className="cart-container">
              <ul className="cart-list">
                {cartList.map(item => (
                  <CartItem key={item.id} productDetails={item} />
                ))}
              </ul>
              <CartSummary onCheckout={onCheckout} />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )

  const renderEmptyCart = () => (
    <>
      <div className="cart-empty-container">
        <img
          src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269990/nxtMart/ybmj9lvlw4hayzbwyy6x.png"
          alt="empty cart"
          className="empty-cart-img"
        />
        <p className="cart-empty-text">Your cart is empty</p>
      </div>
      <Footer />
    </>
  )
  return (
    <>
      <Header />
      <div>
        {cartList.length === 0 ? renderEmptyCart() : renderSuccessView()}
      </div>
    </>
  )
}

export default Cart

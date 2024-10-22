import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = props => {
  const {onCheckout} = props
  const {cartList} = useContext(CartContext)

  const renderPrice = () => {
    const totalAmount = cartList.reduce(
      (accu, item) => accu + item.price.slice(1) * item.count,
      0,
    )
    return totalAmount
  }

  const onClickCheckout = () => {
    onCheckout()
  }

  return (
    <div className="cart-checkout-container">
      <p className="price-total">Total ({cartList.length} items) : </p>
      <p className="price-total" data-testid="total-price">
        {`₹ ${renderPrice()}`}
      </p>
      <button type="button" onClick={onClickCheckout} className="checkout-btn">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary

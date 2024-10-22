import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {productDetails} = props
  const {is, name, image, price, weight, count: quantity} = productDetails
  const {incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)

  const onIncrement = () => {
    incrementCartItemQuantity(productDetails, quantity + 1)
  }

  const onDecrement = () => {
    decrementCartItemQuantity(productDetails, quantity - 1)
  }

  return (
    <>
      <li className="cart-item" data-testid="cartItem">
        <div className="cart-item-container">
          <div className="cart-details">
            <img src={image} alt={name} className="cart-img" />
            <div className="cart-item-details">
              <p className="cart-item-name">{name}</p>
              <p className="cart-item-weight">{weight}</p>
              <p className="cart-item-price">{price}</p>
            </div>
          </div>
          <div className="cart-btn-container">
            <button
              type="button"
              onClick={onDecrement}
              className="cart-control-btn"
              data-testid="decrement-quantity"
            >
              -
            </button>
            <p className="cart-quantity" data-testid="item-quantity">
              {quantity}
            </p>
            <button
              type="button"
              onClick={onIncrement}
              className="cart-control-btn"
              data-testid="increment-quantity"
            >
              +
            </button>
          </div>
        </div>
      </li>
      <hr />
    </>
  )
}

export default CartItem

import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'
import './index.css'

const ProductItem = props => {
  const {itemDetails} = props
  //console.log(itemDetails)
  const {price, name, image, weight} = itemDetails
  const [quantity, setQuantity] = useState(0)
  const {incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)

  const onIncrement = () => {
    setQuantity(prevquan => prevquan + 1)
    incrementCartItemQuantity(itemDetails, quantity + 1)
  }

  const onDecrement = () => {
    setQuantity(prevquan => prevquan - 1)
    decrementCartItemQuantity(itemDetails, quantity - 1)
  }

  return (
    <li className="product-item" data-testid="product">
      <img src={image} alt={name} className="product-img" />
      <p className="name">{name}</p>
      <div className="details-container">
        <div className="product-details">
          <p className="weight">{weight}</p>
          <p className="price">{price}</p>
        </div>
        {quantity === 0 && (
          <button
            type="button"
            data-testid="add-button"
            className="add-button"
            onClick={onIncrement}
          >
            Add
          </button>
        )}
        {quantity !== 0 && (
          <div className="quantity-container">
            <button
              type="button"
              data-testid="decrement-count"
              onClick={onDecrement}
              className="control-btn"
            >
              -
            </button>
            <button
              type="button"
              data-testid="active-count"
              className="control-btn"
            >
              {quantity}
            </button>
            <button
              type="button"
              data-testid="increment-count"
              onClick={onIncrement}
              className="control-btn"
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default ProductItem

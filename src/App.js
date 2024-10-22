import {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [activeTab, setActiveTab] = useState('Home')

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartData')) || []
    if (storedCartItems === undefined) {
      setCartList([])
    } else {
      setCartList(storedCartItems)
    }

    const returnActiveId = JSON.parse(localStorage.getItem('activeId')) || ''
    setActiveTab(returnActiveId)
  }, [])

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
    localStorage.setItem('activeId', JSON.stringify(activeTab))
  }, [cartList, activeTab])

  const incrementCartItemQuantity = (product, quantity) => {
    const isAlreadyExists = cartList.find(item => item.id === product.id)

    if (!isAlreadyExists) {
      const newProduct = {...product, count: quantity}
      setCartList(prev => [...prev, newProduct])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.id === product.id ? {...item, count: quantity} : item,
        ),
      )
    }
  }

  const decrementCartItemQuantity = (product, quantity) => {
    setCartList(prev =>
      prev
        .map(item =>
          item.id === product.id ? {...item, count: quantity} : item,
        )
        .filter(item => item.count > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        activeTab,
        setActiveTab,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App

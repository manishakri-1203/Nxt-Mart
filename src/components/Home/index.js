import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import CategoryItems from '../CategoryItems'
import CategorySmItems from '../CategorySmItems'
import Product from '../Product'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [productsData, setProductsData] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  const onChangeCategory = name => {
    setActiveCategory(name)
  }

  const getProductsData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      setProductsData(fetchedData.categories)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#088C03" height={50} width={50} />
    </div>
  )

  const onClickRetry = () => {
    getProductsData()
  }

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/demx1ym4x/image/upload/v1727951927/Group_7519_f6kizi.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something went wrong.</h1>
      <p className="failure-description">We are having some trouble.</p>
      <button type="button" className="retry-button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <>
      <CategorySmItems
        productsData={productsData}
        activeCategory={activeCategory}
        onChangeCategory={onChangeCategory}
      />
      <div className="category-product-items">
        <CategoryItems
          productsData={productsData}
          activeCategory={activeCategory}
          onChangeCategory={onChangeCategory}
        />
        <Product productsData={productsData} />
      </div>
      <Footer />
    </>
  )

  const renderHomeProductsView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  return (
    <>
      <Header />
      {renderHomeProductsView()}
    </>
  )
}

export default Home

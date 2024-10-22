import './index.css'
import ProductItem from '../ProductItem'

const Product = props => {
  const {productsData} = props
  // console.log(productsData)
  return (
    <>
      <ul className="categories-name-list">
        {productsData.map(item => (
          <li key={item.name} id={item.name} className="category-name-item">
            <p className="category-name">{item.name} &gt;</p>
            <ul className="product-list">
              {item.products.map(eachItem => (
                <ProductItem key={eachItem.id} itemDetails={eachItem} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Product

import {FaCartShopping} from 'react-icons/fa6'
import './index.css'

const CategorySmItems = props => {
  const {productsData, activeCategory, onChangeCategory} = props
  const bgColor = activeCategory === 'all' ? 'btn-color' : null
  const iconColor = activeCategory === 'all' ? 'icon-color' : null
  const textColor = activeCategory === 'all' ? 'active-text' : null

  return (
    <nav className="categories-header">
      <ul className="category-sm-list">
        <li
          key="all"
          className="category-sm-item"
          onClick={() => onChangeCategory('all')}
        >
          <a href="#Fruits & Vegetables" className="category-sm-link">
            <button
              type="button"
              aria-label="All Categories"
              className={`icon-btn ${bgColor}`}
            >
              <FaCartShopping size={20} className={`icon ${iconColor}`} />
            </button>
            <p className={`text ${textColor}`}>All</p>
          </a>
        </li>
        {productsData.map(item => {
          const bgColor = activeCategory === item.name ? 'btn-color' : null
          const iconColor = activeCategory === item.name ? 'icon-color' : null
          const textColor = activeCategory === item.name ? 'active-text' : null

          return (
            <li
              key={item.name}
              className="category-sm-item"
              onClick={() => onChangeCategory(item.name)}
            >
              <a href={`#${item.name}`} className="category-sm-link">
                <button
                  type="button"
                  aria-label={`Category ${item.name}`}
                  className={`icon-btn ${bgColor}`}
                >
                  <FaCartShopping size={20} className={`icon ${iconColor}`} />
                </button>
                <p className={`text ${textColor}`}>{item.name}</p>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategorySmItems

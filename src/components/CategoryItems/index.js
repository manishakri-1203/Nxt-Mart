import './index.css'

const CategoryItems = props => {
  const {productsData, activeCategory, onChangeCategory} = props
  const values = activeCategory === 'all' ? 'active-category' : null
  const activeLink = activeCategory === 'all' ? 'active-link' : null

  return (
    <div className="category-container">
      <h1 className="category-heading">Categories</h1>
      <ul className="category-list">
        <li key="all" className="category-item">
          <button
            type="button"
            className={`category-btn ${values}`}
            onClick={() => onChangeCategory('all')}
          >
            <a
              href="#Fruits & Vegetables"
              className={`category-link ${activeLink}`}
            >
              All
            </a>
          </button>
        </li>
        {productsData.map(item => {
          const colorValue =
            activeCategory === item.name ? 'active-category' : null
          const activeLink = activeCategory === item.name ? 'active-link' : null
          return (
            <li key={item.name} className="category-item">
              <button
                type="button"
                onClick={() => onChangeCategory(item.name)}
                className={`category-btn ${colorValue}`}
              >
                <a
                  href={`#${item.name}`}
                  className={`category-link ${activeLink}`}
                >
                  {item.name}
                </a>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryItems

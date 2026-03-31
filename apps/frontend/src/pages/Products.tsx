import { useEffect, useState, useMemo } from 'react';
import type { Product } from '@nykaa-monorepo/types';
import '../App.css'; 

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    fetch('http://localhost:3001/all-products')
      .then(res => res.json())
      .then(data => setProducts(data.products || data));

  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    // console.log('Filtering products with:', result,{ searchTerm, selectedCategory, sortBy });
    if (searchTerm) {
      result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory.toLowerCase());
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category.charAt(0).toUpperCase() + p.category.slice(1)))], [products]);

  return (
    <div className="products-page-layout">
      {/* Sidebar */}
      <aside className="filters-sidebar no-scrollbar">
        <h3>Filters</h3>
        <div className="filter-group">
          <p style={{fontWeight: 'bold', fontSize: '12px', color: '#888', marginBottom: '15px'}}>CATEGORY</p>
          {categories.map(cat => (
            <label key={cat} className="filter-label">
              <input 
                type="radio" 
                name="category" 
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="products-main-content">
        <div className="top-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <span style={{fontSize: '14px', color: '#888'}}>{filteredProducts.length} items found</span>
            <select className="search-input" style={{width: 'auto'}} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popularity">Sort by: Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-item-card">
              {product.discountPercentage > 10 && <span className="offer-badge">OFFER</span>}
              <div className="image-container">
                <img src={product.thumbnail} alt={product.title} className="product-image" />
              </div>
              <div className="product-info" style={{textAlign: 'left'}}>
                <p className="brand-name">{product.brand}</p>
                <h3 className="product-title line-clamp-1">{product.title}</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px'}}>
                  <span className="price">₹{Math.round(product.price * 83)}</span>
                  <span style={{color: '#27ae60', fontSize: '11px'}}>{product.discountPercentage}% Off</span>
                </div>
                <p style={{fontSize: '12px', color: '#f1c40f', marginTop: '5px'}}>★ {product.rating}</p>
              </div>
              <button className="add-to-bag-btn">ADD TO BAG</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
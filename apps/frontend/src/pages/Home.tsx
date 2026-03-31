
import { useEffect, useState } from 'react';
import '../App.css'; // CSS file import karna mat bhoolna

const Home = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="home-page">
      {/* Banner */}
      <header className="hero-banner">
        <div className="hero-content">
          <h1>Luxe Edit</h1>
          <p>A spectacular assortment of minimal yet alluring styles.</p>
          <button className="explore-btn">EXPLORE MORE</button>
        </div>
        <img 
          src="https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp" 
          alt="Luxury Makeup" 
          style={{ height: '90%' }}
        />
      </header>

      {/* Categories */}
      <main className="container home-container">
        {data && Object.keys(data).map((category) => (
          <section key={category} className="category-section">
            <div className="category-header">
              <h2>{category.toUpperCase()}</h2>
              <a href="#" style={{ color: '#ff0050', fontWeight: 'bold', textDecoration: 'none' }}>VIEW ALL →</a>
            </div>

            {/* Flexbox Row */}
            <div className="product-flex">
              {data[category].map((product: any) => (
                <div key={product.id} className="product-card">
                  <div className="image-container">
                    <img src={product.thumbnail} alt={product.title} className="product-image" />
                  </div>
                  <div className="product-info">
                    <p className="brand-name">{product.brand || 'Nykaa'}</p>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="price">₹{Math.round(product.price * 83)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Home;
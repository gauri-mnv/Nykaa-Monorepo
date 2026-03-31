
import { UserCircleIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import '../App.css'; 

export default function Navbar() {
  return (
    <nav className="main-nav">
      {/* Left: Logo & Links */}
      <div className="nav-left">
        <Link to="/" className="logo">NYKAA</Link>
        <div className="nav-links">
          <Link to="/products">CATEGORIES</Link>
          <span>BRANDS</span>
          <span>OFFERS</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="nav-center">
        <div className="search-icon-wrapper">
          <MagnifyingGlassIcon className="nav-icon" style={{width: '18px', height: '18px'}} />
        </div>
        <input
          type="text"
          placeholder="Search on Nykaa"
          className="nav-search-input"
        />
      </div>

      {/* Right: Account & Cart */}
      <div className="nav-right">
        <div className="nav-icon-item">
          <UserCircleIcon className="nav-icon" />
          <span>Account</span>
        </div>
        
        <Link to="/cart" className="nav-icon-item">
          <ShoppingBagIcon className="nav-icon" />
          <span>Bag</span>
          <span className="cart-badge">0</span>
        </Link>
      </div>
    </nav>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo.png';
import soilKingIcon from '../assets/soilkingicon.png';
import wellnessIcon from '../assets/wellnessicon.png';
import masalasSpicesIcon from '../assets/masalas and spices.png';
import riceIcon from '../assets/rice.png';
import appalamIcon from '../assets/appalam.png';
import pasteIcon from '../assets/paste.png';

export default function Navbar(){
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'brands' | 'products' | null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // 'soil-king' | 'wellness' | null
  const leaveTimeoutRef = useRef(null);

  // Check if current route matches brands or products
  const isBrandsActive = location.pathname.startsWith('/brands');
  const isProductsActive = location.pathname.startsWith('/products') || location.pathname.startsWith('/product');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown')) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handleMouseEnter = (name) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = null;
    setOpenDropdown(name);
  };
  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };
  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(v => !v);
    if (!isMobileMenuOpen) setOpenDropdown(null);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenSubmenu(null);
  };
  const handleLogoClick = (e) => {
    closeMobileMenu();
    // If already on home page, prevent navigation and scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on another page, navigate to home and scroll to top after navigation
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  // lock body scroll when the sheet is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => { if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current); };
  }, []);

  return (
    <header className={`navbar-wrap ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          {/* left: logo */}
          <Link to="/" className="brand" onClick={handleLogoClick} aria-label="UBC Home">
            <img src={logo} alt="UBC" />
          </Link>

          {/* center: nav links */}
          <nav
            className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}
            aria-label="Primary"
            id="primary-navigation"
          >
            <NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink>

            <div
              className={`dropdown ${isBrandsActive ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('brands')}
              onMouseLeave={handleMouseLeave}
            >
              <span onClick={(e) => toggleDropdown('brands', e)} className={`dropdown-trigger ${isBrandsActive ? 'active' : ''}`}>
                Our Brands ▾
              </span>
              <div
                className={`menu brands-menu ${openDropdown === 'brands' ? 'open' : ''}`}
                onMouseEnter={() => handleMouseEnter('brands')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/brands/soil-king" className="brand-item" onClick={closeMobileMenu}>
                  <img src={soilKingIcon} alt="Soil King" className="brand-icon" />
                  <span>Soil King</span>
                </Link>
                <Link to="/brands/wellness" className="brand-item" onClick={closeMobileMenu}>
                  <img src={wellnessIcon} alt="Wellness" className="brand-icon" />
                  <span>Wellness</span>
                </Link>
              </div>
            </div>

            <div
              className={`dropdown ${isProductsActive ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <span onClick={(e) => toggleDropdown('products', e)} className={`dropdown-trigger ${isProductsActive ? 'active' : ''}`}>
                Products ▾
              </span>
              <div
                className={`menu brands-menu ${openDropdown === 'products' ? 'open' : ''}`}
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Soil King Brand */}
                <div className={`brand-item-with-submenu ${openSubmenu === 'soil-king' ? 'submenu-open' : ''}`}>
                  <Link 
                    to="/products?brand=soil-king"
                    className="brand-item brand-header"
                    onClick={(e) => {
                      closeMobileMenu();
                    }}
                    onMouseEnter={() => setOpenSubmenu('soil-king')}
                  >
                    <img src={soilKingIcon} alt="Soil King" className="brand-icon" />
                    <span>Soil King</span>
                  </Link>
                  <div className={`submenu ${openSubmenu === 'soil-king' ? 'open' : ''}`}>
                    <NavLink to="/products?brand=soil-king&category=masalas" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={masalasSpicesIcon} alt="Masalas" className="brand-icon" />
                        <span>Masalas</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=soil-king&category=masalas-spices" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={masalasSpicesIcon} alt="Masalas & Spices" className="brand-icon" />
                        <span>Masalas & Spices</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=soil-king&category=rice" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={riceIcon} alt="Rice" className="brand-icon" />
                        <span>Rice</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=soil-king&category=appalams" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={appalamIcon} alt="Appalams & Crisps" className="brand-icon" />
                        <span>Appalams & Crisps</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=soil-king&category=pastes" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={pasteIcon} alt="Pastes & Ready Mix" className="brand-icon" />
                        <span>Pastes & Ready Mix</span>
                      </div>
                    </NavLink>
                  </div>
                </div>

                {/* Wellness Brand */}
                <div className={`brand-item-with-submenu ${openSubmenu === 'wellness' ? 'submenu-open' : ''}`}>
                  <Link 
                    to="/products?brand=wellness"
                    className="brand-item brand-header"
                    onClick={(e) => {
                      closeMobileMenu();
                    }}
                    onMouseEnter={() => setOpenSubmenu('wellness')}
                  >
                    <img src={wellnessIcon} alt="Wellness" className="brand-icon" />
                    <span>Wellness</span>
                  </Link>
                  <div className={`submenu ${openSubmenu === 'wellness' ? 'open' : ''}`}>
                    <NavLink to="/products?brand=wellness&category=masalas" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={masalasSpicesIcon} alt="Premium Masalas" className="brand-icon" />
                        <span>Premium Masalas</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=wellness&category=masalas-spices" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={masalasSpicesIcon} alt="Spice Collection" className="brand-icon" />
                        <span>Spice Collection</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=wellness&category=rice" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={riceIcon} alt="Organic Rice" className="brand-icon" />
                        <span>Organic Rice</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=wellness&category=appalams" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={appalamIcon} alt="Healthy Snacks" className="brand-icon" />
                        <span>Healthy Snacks</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=wellness&category=spices" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={masalasSpicesIcon} alt="Pure Spices" className="brand-icon" />
                        <span>Pure Spices</span>
                      </div>
                    </NavLink>
                    <NavLink to="/products?brand=wellness&category=pastes" className="submenu-item" onClick={closeMobileMenu}>
                      <div className="submenu-item-content">
                        <img src={pasteIcon} alt="Organic Pastes" className="brand-icon" />
                        <span>Organic Pastes</span>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <NavLink to="/contact" onClick={closeMobileMenu}>Contact Us</NavLink>
            <NavLink to="/careers" onClick={closeMobileMenu}>Careers</NavLink>
            
            {/* Mobile CTA - only visible in hamburger menu */}
            <Link to="/products" className="btn cta mobile-cta" onClick={closeMobileMenu}>Explore Products</Link>
          </nav>

          {/* right: single CTA - desktop only */}
          <Link to="/products" className="btn cta desktop-cta">Explore Products</Link>

          {/* hamburger */}
          <button
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="primary-navigation"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

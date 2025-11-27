import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Categories.css';
import '../pages/Brands.css';
import SectionTag from './SectionTag';
import soilKingIcon from '../assets/soilkingicon.png';
import wellnessIcon from '../assets/wellnessicon.png';

/* ✅ Assets — update paths/names to match your project */
import imgPastes from '../assets/paste.png';
import imgSpices from '../assets/spices.png';
import imgMasalasAndSpices from '../assets/masalas and spices.png'; // Masalas & Spices
import imgMasalas from '../assets/masalas.png';                      // Masalas (only)
import imgRice from '../assets/rice.png';
import imgAppalams from '../assets/appalam.png';

// Category chips for different brands
const chipsByBrand = {
  'All': [
    'All',
    'Masalas & Spices',
    'Rice',
    'Appalams & Crisps',
    'Pastes & Ready Mix',
  ],
  'soil-king': [
    'All',
    'Masalas',
    'Masalas & Spices',
    'Rice',
    'Appalams & Crisps',
    'Pastes & Ready Mix',
  ],
  'wellness': [
    'All',
    'Premium Masalas',
    'Spice Collection',
    'Organic Rice',
    'Healthy Snacks',
    'Pure Spices',
    'Organic Pastes',
  ],
};

const brands = [
  { id: 'All', name: 'All Brands', icon: null },
  { id: 'soil-king', name: 'Soil King', icon: soilKingIcon },
  { id: 'wellness', name: 'Wellness', icon: wellnessIcon },
];

/**
 * Product categories for both brands
 * Soil King: Traditional, authentic products
 * Wellness: Health-focused, premium products
 */
const CATEGORIES = [
  // ========== SOIL KING PRODUCTS ==========
  {
    id: 'masalas',
    title: 'Masalas',
    subtitle: 'Authentic blends for every dish',
    img: imgMasalas,
    chip: 'Masalas',
    href: '/products?category=masalas&brand=soil-king',
    brand: 'soil-king',
  },
  {
    id: 'rice',
    title: 'Rice',
    subtitle: 'Fragrant grains, rich in tradition',
    img: imgRice,
    chip: 'Rice',
    href: '/products?category=rice&brand=soil-king',
    brand: 'soil-king',
  },
  {
    id: 'appalams',
    title: 'Appalams & Crisps',
    subtitle: 'Crispy delights for every meal',
    img: imgAppalams,
    chip: 'Appalams & Crisps',
    href: '/products?category=appalams&brand=soil-king',
    brand: 'soil-king',
  },
  {
    id: 'pastes',
    title: 'Pastes & Ready Mix',
    subtitle: 'Pure flavors, ready to use',
    img: imgPastes,
    chip: 'Pastes & Ready Mix',
    href: '/products?category=pastes&brand=soil-king',
    brand: 'soil-king',
  },
  {
    id: 'soil-king-masalas-spices',
    title: 'Masalas & Spices',
    subtitle: 'Complete collection of authentic blends',
    img: imgMasalasAndSpices,
    chip: 'Masalas & Spices',
    href: '/products?category=masalas-spices&brand=soil-king',
    brand: 'soil-king',
  },
  
  // ========== WELLNESS PRODUCTS ==========
  // Premium Masalas Category
  {
    id: 'wellness-masalas',
    title: 'Premium Masala Blend',
    subtitle: 'Organic blends for healthy living',
    img: imgMasalas,
    chip: 'Premium Masalas',
    href: '/products?category=masalas&brand=wellness',
    brand: 'wellness',
  },
  
  // Organic Rice Category
  {
    id: 'wellness-rice',
    title: 'Organic White Rice',
    subtitle: 'Premium grains for wellness',
    img: imgRice,
    chip: 'Organic Rice',
    href: '/products?category=rice&brand=wellness',
    brand: 'wellness',
  },
  
  // Healthy Snacks Category
  {
    id: 'wellness-appalams-3',
    title: 'Wellness Crisps',
    subtitle: 'Light and healthy crispy snacks',
    img: imgAppalams,
    chip: 'Healthy Snacks',
    href: '/products?category=appalams&brand=wellness',
    brand: 'wellness',
  },
  
  // Pure Spices Category
  {
    id: 'wellness-spices-2',
    title: 'Organic Turmeric',
    subtitle: 'Pure golden spice for wellness',
    img: imgSpices,
    chip: 'Pure Spices',
    href: '/products?category=spices&brand=wellness',
    brand: 'wellness',
  },
  
  // Organic Pastes Category
  {
    id: 'wellness-pastes',
    title: 'Organic Paste Mix',
    subtitle: 'Natural pastes for wholesome meals',
    img: imgPastes,
    chip: 'Organic Pastes',
    href: '/products?category=pastes&brand=wellness',
    brand: 'wellness',
  },
];

// Map URL category parameter to chip name based on brand
const getChipFromCategory = (category, brand) => {
  if (!category) return 'All';
  
  const categoryMap = {
    'soil-king': {
      'masalas': 'Masalas',
      'masalas-spices': 'Masalas & Spices',
      'rice': 'Rice',
      'appalams': 'Appalams & Crisps',
      'pastes': 'Pastes & Ready Mix',
    },
    'wellness': {
      'masalas': 'Premium Masalas',
      'masalas-spices': 'Spice Collection',
      'rice': 'Organic Rice',
      'appalams': 'Healthy Snacks',
      'spices': 'Pure Spices',
      'pastes': 'Organic Pastes',
    },
  };
  
  return categoryMap[brand]?.[category] || 'All';
};

// Map chip name to URL category parameter based on brand
const getCategoryFromChip = (chip, brand) => {
  if (!chip || chip === 'All') return null;
  
  const categoryMap = {
    'soil-king': {
      'Masalas': 'masalas',
      'Masalas & Spices': 'masalas-spices',
      'Rice': 'rice',
      'Appalams & Crisps': 'appalams',
      'Pastes & Ready Mix': 'pastes',
    },
    'wellness': {
      'Premium Masalas': 'masalas',
      'Spice Collection': 'masalas-spices',
      'Organic Rice': 'rice',
      'Healthy Snacks': 'appalams',
      'Pure Spices': 'spices',
      'Organic Pastes': 'pastes',
    },
  };
  
  return categoryMap[brand]?.[chip] || null;
};

export default function Categories({ selectedBrand: initialBrand = 'All', initialCategory = null }){
  const navigate = useNavigate();
  // Map initial category to chip name
  const initialChip = initialCategory ? getChipFromCategory(initialCategory, initialBrand) : 'All';
  const [active, setActive] = React.useState(initialChip);
  const [selectedBrand, setSelectedBrand] = React.useState(initialBrand);

  // Get category chips based on selected brand
  const chips = chipsByBrand[selectedBrand] || chipsByBrand['All'];

  // Update selectedBrand when initialBrand prop changes (from URL)
  React.useEffect(() => {
    setSelectedBrand(initialBrand);
  }, [initialBrand]);

  // Update active category when initialCategory changes from URL
  React.useEffect(() => {
    if (initialCategory && selectedBrand === initialBrand) {
      const mappedChip = getChipFromCategory(initialCategory, selectedBrand);
      const currentChips = chipsByBrand[selectedBrand] || chipsByBrand['All'];
      if (currentChips.includes(mappedChip)) {
        setActive(mappedChip);
      }
    }
  }, [initialCategory, initialBrand, selectedBrand]);

  // Reset active category when brand changes (if current category doesn't exist for new brand)
  React.useEffect(() => {
    const currentChips = chipsByBrand[selectedBrand] || chipsByBrand['All'];
    if (!currentChips.includes(active)) {
      setActive('All');
    }
  }, [selectedBrand, active]);

  const visible = React.useMemo(() => {
    let filtered = CATEGORIES;
    
    // Filter by brand if selected
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(c => c.brand === selectedBrand);
    }
    
    // Filter by category if selected
    if (active !== 'All') {
      filtered = filtered.filter(c => c.chip === active);
    }
    
    return filtered;
  }, [active, selectedBrand]);

  return (
    <section id="products" className="section categories-section" aria-labelledby="categories-heading">
      <div className="container">
        <SectionTag label="★ CATEGORIES" />
        <h2 id="categories-heading">
          Explore our finest products<br/>crafted <span className="playfair-text">for</span> everyday flavor
        </h2>

        {/* Brand Filter Buttons */}
        <div className="brands-buttons-wrapper">
          {brands.map(brand => (
            <button
              key={brand.id}
              className={`brand-button ${selectedBrand === brand.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedBrand(brand.id);
                // Reset category to 'All' when brand changes
                const newChips = chipsByBrand[brand.id] || chipsByBrand['All'];
                if (!newChips.includes(active)) {
                  setActive('All');
                }
                // Update URL to reflect brand change
                if (brand.id === 'All') {
                  navigate('/products');
                } else {
                  navigate(`/products?brand=${brand.id}`);
                }
              }}
              role="tab"
              aria-selected={selectedBrand === brand.id}
              aria-controls="categories-grid"
            >
              {brand.icon && (
                <img 
                  src={brand.icon} 
                  alt={brand.name} 
                  className="brand-button-icon"
                />
              )}
              <span>{brand.name}</span>
            </button>
          ))}
        </div>

        {/* Category Filter Buttons */}
        <div className="categories-buttons-wrapper">
          {chips.map(c => (
            <button
              key={c}
              className={`category-button ${active === c ? 'active' : ''}`}
              onClick={() => {
                setActive(c);
                // Update URL to reflect category change
                const categoryParam = getCategoryFromChip(c, selectedBrand);
                if (c === 'All') {
                  if (selectedBrand === 'All') {
                    navigate('/products');
                  } else {
                    navigate(`/products?brand=${selectedBrand}`);
                  }
                } else if (categoryParam) {
                  navigate(`/products?brand=${selectedBrand}&category=${categoryParam}`);
                }
              }}
              role="tab"
              aria-selected={active === c}
              aria-controls="categories-grid"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Category Cards - Show only when "All" is selected */}
        {active === 'All' && (
          <div id="categories-grid" className="grid grid-3 cards" role="region" aria-live="polite">
            {visible.map(item => (
              <div
                key={item.id}
                className="category-card"
                aria-label={`${item.title} – ${item.subtitle}. Know More`}
              >
                <div className="category-card-head">
                  <img src={item.img} alt={item.title} />
                </div>

                <div className="category-card-bar">
                  <div className="category-text">
                    <h3 className="category-title">{item.title}</h3>
                    <p className="category-subtitle">{item.subtitle}</p>
                  </div>
                  <Link 
                    to={`/product/${item.id}`}
                    className="know-more-btn"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products List - Show when a specific category is filtered */}
        {active !== 'All' && visible.length > 0 && (
          <div className="products-list-section">
            <h3 className="products-list-title">Products in {active}</h3>
            <div className="brand-prod-row">
              {visible.map(item => (
                <article key={item.id} className="brand-prod-card">
                  <div className="brand-prod-media">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="brand-prod-body">
                    <div className="brand-prod-header">
                      <div className="brand-prod-text-container">
                        <h3 className="brand-prod-name">{item.title}</h3>
                        <p className="brand-prod-blurb">{item.subtitle}</p>
                      </div>
                      <Link to={`/product/${item.id}`} className="chip-link">
                        Know More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="center">
          <a href="/products" className="btn" aria-label="Explore all products">Explore Products</a>
        </div>
      </div>
    </section>
  );
}

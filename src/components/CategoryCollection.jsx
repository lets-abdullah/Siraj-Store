import { useState } from 'react';
import { LayoutGrid, List, Heart, Eye, ShoppingBag, X, RotateCcw } from 'lucide-react';

export default function CategoryCollection({
  productsList,
  wishlist,
  onToggleWishlist,
  onNavigateToPdp,
  onAddToCart,
  selectedMainCategory = 'All',
  setSelectedMainCategory,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  currency
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [qvQuantity, setQvQuantity] = useState(1);
  const [qvSelectedSize, setQvSelectedSize] = useState('');

  // Handle resets
  const handleResetFilters = () => {
    if (setSelectedMainCategory) setSelectedMainCategory('All');
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedSize('All');
    setPriceRange(8000);
  };

  const sizesList = ["9-12M", "1-2Y", "3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y", "15-16Y"];

  // Filtering Logic - Strict separation between Females (Adult Women) and Kids (Children only)
  const filteredProducts = productsList.filter(product => {
    // 1. Strict Main Category check
    // Females: Adult Women only (department: Females, gender: Women)
    // Kids: Children only (department: Kids, gender: Girls or Boys)
    // A girls' product must NEVER appear in Females
    if (selectedMainCategory === 'Females') {
      if (product.department !== 'Females' && product.gender !== 'Women') {
        return false;
      }
    } else if (selectedMainCategory === 'Kids') {
      if (product.department !== 'Kids' && product.gender !== 'Girls' && product.gender !== 'Boys') {
        return false;
      }
    }

    // 2. Category check
    if (selectedCategory === 'Wishlist') {
      if (!wishlist.includes(product.id)) return false;
    } else if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }

    // 3. Gender check
    if (selectedGender !== 'All' && product.gender !== selectedGender) {
      return false;
    }

    // 4. Size check
    if (selectedSize !== 'All' && !product.sizes.includes(selectedSize)) {
      return false;
    }

    // 5. Price check
    if (product.price > priceRange) {
      return false;
    }

    return true;
  });

  const getPrice = (price) => {
    if (currency === 'PKR') {
      return `Rs. ${price.toLocaleString()}`;
    }
    return `$ ${(price / 280).toFixed(2)}`;
  };

  const handleQuickViewOpen = (product, e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setQvQuantity(1);
    setQvSelectedSize('');
  };

  const handleQuickViewAdd = () => {
    if (!qvSelectedSize) {
      alert("Please select a size first!");
      return;
    }
    onAddToCart(quickViewProduct, qvSelectedSize, qvQuantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="w-full min-h-screen bg-luxury-cream py-8 px-4 md:px-8">
      {/* breadcrumb */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between border-b border-[#F0EAE1] pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-sans tracking-[0.2em] text-luxury-gold uppercase block mb-1">SIRAJ Collection</span>
          <h2 className="font-serif text-2xl md:text-3xl text-luxury-dark font-semibold">
            {selectedCategory === 'Wishlist' 
              ? 'Your Luxury Wishlist' 
              : selectedMainCategory === 'Females'
                ? `Females Collection (Adult Women) ${selectedCategory !== 'All' ? `• ${selectedCategory}` : ''}`
                : selectedMainCategory === 'Kids'
                  ? `Kids Collection (Children Only) ${selectedCategory !== 'All' ? `• ${selectedCategory}` : ''}`
                  : `${selectedCategory === 'All' ? 'All Collections' : `${selectedCategory} Collection`}`}
          </h2>
          <span className="text-xs font-sans text-gray-500 font-light mt-1 block">
            Showing {filteredProducts.length} luxury products {selectedMainCategory === 'Females' ? '(Adult Women Only)' : selectedMainCategory === 'Kids' ? '(Children Only)' : ''}
          </span>
        </div>

        {/* View Mode & Filter Summary */}
        <div className="flex items-center gap-4">
          {/* Active filter pills */}
          <div className="hidden lg:flex items-center gap-2">
            {(selectedMainCategory !== 'All' || selectedCategory !== 'All' || selectedGender !== 'All' || selectedSize !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-wider text-gray-500 hover:text-luxury-gold transition-colors border border-gray-200 px-3 py-1.5 rounded-full"
              >
                <RotateCcw className="w-3 h-3" /> Clear Filters
              </button>
            )}
          </div>

          <div className="flex items-center border border-[#E5DCD0] rounded-sm bg-white p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-sm ${viewMode === 'grid' ? 'bg-[#F9F5EC] text-luxury-gold' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-sm ${viewMode === 'list' ? 'bg-[#F9F5EC] text-luxury-gold' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* 1. FILTER SIDEBAR */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8 bg-luxury-cream lg:sticky lg:top-28 lg:max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
          {/* Gender Filter (Dynamically tailored to category to guarantee strict separation) */}
          <div className="border-b border-[#F0EAE1] pb-6">
            <h3 className="font-serif text-sm text-luxury-dark font-bold mb-4 tracking-wide uppercase">
              {selectedMainCategory === 'Females' ? 'Department' : selectedMainCategory === 'Kids' ? 'Kids Filter' : 'Department & Gender'}
            </h3>
            <div className="flex flex-col gap-2.5">
              {selectedMainCategory === 'Females' ? (
                <label className="flex items-center gap-3 cursor-pointer group text-xs text-gray-600 hover:text-luxury-gold">
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === 'All' || selectedGender === 'Women'}
                    onChange={() => setSelectedGender('Women')}
                    className="w-4 h-4 accent-luxury-gold cursor-pointer"
                  />
                  <span className="font-sans font-medium text-luxury-dark">Adult Women Only</span>
                </label>
              ) : selectedMainCategory === 'Kids' ? (
                <>
                  {[
                    { key: 'All', label: 'All Kids (Boys & Girls)' },
                    { key: 'Girls', label: 'Girls Only' },
                    { key: 'Boys', label: 'Boys Only' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer group text-xs text-gray-600 hover:text-luxury-gold">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === item.key}
                        onChange={() => setSelectedGender(item.key)}
                        className="w-4 h-4 accent-luxury-gold cursor-pointer"
                      />
                      <span className="font-sans font-light tracking-wide">{item.label}</span>
                    </label>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { key: 'All', label: 'All' },
                    { key: 'Women', label: 'Females (Adult Women)' },
                    { key: 'Girls', label: 'Kids (Girls)' },
                    { key: 'Boys', label: 'Kids (Boys)' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer group text-xs text-gray-600 hover:text-luxury-gold">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === item.key}
                        onChange={() => {
                          setSelectedGender(item.key);
                          if (item.key === 'Women') {
                            if (setSelectedMainCategory) setSelectedMainCategory('Females');
                          } else if (item.key === 'Girls' || item.key === 'Boys') {
                            if (setSelectedMainCategory) setSelectedMainCategory('Kids');
                          } else {
                            if (setSelectedMainCategory) setSelectedMainCategory('All');
                          }
                        }}
                        className="w-4 h-4 accent-luxury-gold cursor-pointer"
                      />
                      <span className="font-sans font-light tracking-wide">{item.label}</span>
                    </label>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Sizing Filter Grid */}
          <div className="border-b border-[#F0EAE1] pb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-sm text-luxury-dark font-bold tracking-wide uppercase">
                {selectedMainCategory === 'Females' ? 'Women Sizes' : selectedMainCategory === 'Kids' ? 'Kids Age Sizes' : 'Sizes'}
              </h3>
              {selectedSize !== 'All' && (
                <button
                  onClick={() => setSelectedSize('All')}
                  className="text-[10px] font-sans text-gray-400 hover:text-luxury-gold underline"
                >
                  Reset
                </button>
              )}
            </div>

            {selectedMainCategory === 'Females' ? (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedSize('All')}
                  className={`py-2 px-1 text-[11px] font-sans border rounded-sm transition-all text-center ${selectedSize === 'All' ? 'bg-luxury-dark text-white border-luxury-dark font-bold' : 'bg-white hover:border-luxury-gold text-gray-600 border-[#E5DCD0]'}`}
                >
                  All Sizes
                </button>
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 px-1 text-[11px] font-sans border rounded-sm transition-all text-center ${selectedSize === s ? 'bg-luxury-gold text-white border-luxury-gold font-bold' : 'bg-white hover:border-luxury-gold text-gray-600 border-[#E5DCD0]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : selectedMainCategory === 'Kids' ? (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedSize('All')}
                  className={`py-2 px-1 text-[11px] font-sans border rounded-sm transition-all text-center ${selectedSize === 'All' ? 'bg-luxury-dark text-white border-luxury-dark font-bold' : 'bg-white hover:border-luxury-gold text-gray-600 border-[#E5DCD0]'}`}
                >
                  All Sizes
                </button>
                {sizesList.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 px-1 text-[11px] font-sans border rounded-sm transition-all text-center ${selectedSize === s ? 'bg-luxury-gold text-white border-luxury-gold font-bold' : 'bg-white hover:border-luxury-gold text-gray-600 border-[#E5DCD0]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-[10px] font-sans text-gray-400 font-semibold block mb-1.5 uppercase tracking-wider">Women Sizes</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["XS", "S", "M", "L", "XL"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-1.5 px-2.5 text-[10px] font-sans border rounded-sm transition-all text-center ${selectedSize === s ? 'bg-luxury-gold text-white border-luxury-gold font-bold' : 'bg-white hover:border-luxury-gold text-gray-600 border-[#E5DCD0]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-sans text-gray-400 font-semibold block mb-1.5 uppercase tracking-wider">Kids Age Brackets</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {sizesList.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-1.5 px-1 text-[10px] font-sans border rounded-sm transition-all text-center ${selectedSize === s ? 'bg-luxury-gold text-white border-luxury-gold font-bold' : 'bg-white hover:border-luxury-gold text-gray-600 border-[#E5DCD0]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="border-b border-[#F0EAE1] pb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-sm text-luxury-dark font-bold tracking-wide uppercase">Max Price</h3>
              <span className="text-xs font-sans text-luxury-gold font-bold">{getPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="25000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-luxury-gold cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 font-sans">
              <span>Min: Rs. 2,000</span>
              <span>Max: Rs. 25,000</span>
            </div>
          </div>

          {/* Categories Hierarchy - Strictly Separated */}
          <div className="pb-6">
            <h3 className="font-serif text-sm text-luxury-dark font-bold mb-4 tracking-wide uppercase">Categories</h3>
            
            {/* Master Option: All Collections */}
            <div className="mb-3">
              <button
                onClick={() => {
                  if (setSelectedMainCategory) setSelectedMainCategory('All');
                  setSelectedCategory('All');
                  setSelectedGender('All');
                  setSelectedSize('All');
                }}
                className={`text-left text-xs font-sans font-semibold py-1.5 transition-all hover:text-luxury-gold w-full flex items-center justify-between ${selectedMainCategory === 'All' && selectedCategory === 'All' && selectedGender === 'All' ? 'text-luxury-gold font-bold' : 'text-luxury-dark'}`}
              >
                <span>All Collections</span>
                <span className="text-[10px] text-gray-400">({productsList.length})</span>
              </button>
            </div>

            {/* Main Category 1: Females (Adult Women only - NO kids or girls clothing) */}
            <div className="mb-4 bg-white/70 p-3 rounded-sm border border-[#E5DCD0]/60 shadow-xs">
              <button
                onClick={() => {
                  if (setSelectedMainCategory) setSelectedMainCategory('Females');
                  setSelectedGender('Women');
                  setSelectedCategory('All');
                  setSelectedSize('All');
                }}
                className={`text-left text-xs font-sans font-bold tracking-wider uppercase py-1 transition-all hover:text-luxury-gold w-full flex items-center justify-between ${selectedMainCategory === 'Females' && selectedCategory === 'All' ? 'text-luxury-gold' : 'text-luxury-dark'}`}
              >
                <span>1. Females</span>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold bg-luxury-cream px-1.5 py-0.5 border border-[#E5DCD0]/60 rounded-xs">Adult Women</span>
              </button>
              
              <div className="flex flex-col gap-1.5 mt-2 pl-2.5 border-l-2 border-luxury-gold/40">
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Females');
                    setSelectedGender('Women');
                    setSelectedCategory('All');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Females' && selectedCategory === 'All' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • All Females
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Females');
                    setSelectedGender('Women');
                    setSelectedCategory('Luxury Eastern Wear');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Females' && selectedCategory === 'Luxury Eastern Wear' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • Luxury Eastern Wear
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Females');
                    setSelectedGender('Women');
                    setSelectedCategory('Summer Lawn & Pret');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Females' && selectedCategory === 'Summer Lawn & Pret' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • Summer Lawn & Pret
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Females');
                    setSelectedGender('Women');
                    setSelectedCategory('Formal / Festive Suits');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Females' && selectedCategory === 'Formal / Festive Suits' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • Formal / Festive Suits
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Females');
                    setSelectedGender('Women');
                    setSelectedCategory('New Arrivals');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Females' && selectedCategory === 'New Arrivals' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • New Arrivals (Females)
                </button>
              </div>
            </div>

            {/* Main Category 2: Kids (Children only - Boys + Girls) */}
            <div className="bg-white/70 p-3 rounded-sm border border-[#E5DCD0]/60 shadow-xs">
              <button
                onClick={() => {
                  if (setSelectedMainCategory) setSelectedMainCategory('Kids');
                  setSelectedCategory('All');
                  setSelectedGender('All');
                  setSelectedSize('All');
                }}
                className={`text-left text-xs font-sans font-bold tracking-wider uppercase py-1 transition-all hover:text-luxury-gold w-full flex items-center justify-between ${selectedMainCategory === 'Kids' && selectedCategory === 'All' ? 'text-luxury-gold' : 'text-luxury-dark'}`}
              >
                <span>2. Kids</span>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold bg-luxury-cream px-1.5 py-0.5 border border-[#E5DCD0]/60 rounded-xs">Children Only</span>
              </button>
              
              <div className="flex flex-col gap-1.5 mt-2 pl-2.5 border-l-2 border-luxury-gold/40">
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Kids');
                    setSelectedCategory('All');
                    setSelectedGender('All');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Kids' && selectedCategory === 'All' && selectedGender === 'All' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • All Kids (Boys & Girls)
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Kids');
                    setSelectedCategory("Girls Suit (Summer '26)");
                    setSelectedGender('Girls');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Kids' && selectedCategory === "Girls Suit (Summer '26)" ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • Girls Suits & Frocks
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Kids');
                    setSelectedCategory("Boys Suit (Summer '26)");
                    setSelectedGender('Boys');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Kids' && selectedCategory === "Boys Suit (Summer '26)" ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • Boys Suits
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Kids');
                    setSelectedCategory('Eastern Wear');
                    setSelectedGender('All');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Kids' && selectedCategory === 'Eastern Wear' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • Kids Eastern Wear
                </button>
                <button
                  onClick={() => {
                    if (setSelectedMainCategory) setSelectedMainCategory('Kids');
                    setSelectedCategory('New Arrivals');
                    setSelectedGender('All');
                    setSelectedSize('All');
                  }}
                  className={`text-left text-[11px] font-sans py-0.5 transition-colors hover:text-luxury-gold ${selectedMainCategory === 'Kids' && selectedCategory === 'New Arrivals' ? 'text-luxury-gold font-bold' : 'text-gray-600'}`}
                >
                  • New Arrivals (Kids)
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* 2. PRODUCT GRID / LIST */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="w-full py-20 text-center flex flex-col items-center justify-center bg-[#F9F5EC] border border-[#E5DCD0]/60 rounded-md">
              <span className="font-serif text-lg text-gray-500 mb-2">No luxury items match your filters</span>
              <p className="text-xs text-gray-400 font-sans mb-6">Try clearing some filtering attributes to explore the rest.</p>
              <button
                onClick={handleResetFilters}
                className="bg-luxury-dark text-white text-xs font-sans uppercase tracking-widest font-bold py-3 px-6 rounded-sm hover:bg-luxury-gold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6"
              : "flex flex-col gap-6"
            }>
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                const hasDiscount = product.discount > 0;

                return (
                  <div
                    key={product.id}
                    onClick={() => onNavigateToPdp(product)}
                    className={`group bg-white border border-[#E5DCD0]/40 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-6 p-4 md:p-6' : ''}`}
                  >
                    {/* Product Image Panel */}
                    <div className={`relative overflow-hidden bg-[#F9F5EC] flex items-center justify-center ${viewMode === 'list' ? 'w-full md:w-56 h-56 shrink-0' : 'h-80'}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[0.8s] ease-out"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/400x500/f3eee5/1e1a17?text=SIRAJ";
                        }}
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {hasDiscount && (
                          <span className="bg-luxury-dark text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                            -{product.discount}% OFF
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="bg-luxury-gold text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                            Best Seller
                          </span>
                        )}
                      </div>

                      {/* Wishlist toggle overlay button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2 bg-white/90 hover:bg-white hover:scale-110 rounded-full shadow-md transition-all duration-300 z-10 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                        aria-label="Add to wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      {/* Quick View Button overlay on hover */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={(e) => handleQuickViewOpen(product, e)}
                          className="bg-white/95 hover:bg-luxury-dark hover:text-white text-gray-800 text-[11px] font-sans uppercase tracking-widest font-bold py-2.5 px-4.5 rounded-sm shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300"
                        >
                          <Eye className="w-3.5 h-3.5" /> Quick View
                        </button>
                      </div>
                    </div>

                    {/* Product Details Panel */}
                    <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1 mb-1">
                          <span className="text-[10px] font-sans tracking-widest uppercase text-luxury-gold font-semibold">
                            {product.department === 'Females' ? 'Females (Women)' : `Kids • ${product.gender}`} • {product.category}
                          </span>
                          {/* Stars */}
                          <div className="flex items-center text-[10px] text-amber-500 font-sans gap-0.5">
                            ★ <span>{product.rating}</span>
                          </div>
                        </div>

                        <h4 className="font-serif text-luxury-dark font-semibold text-sm group-hover:text-luxury-gold transition-colors line-clamp-1 mb-2">
                          {product.name}
                        </h4>

                        {viewMode === 'list' && (
                          <p className="text-xs font-sans text-gray-500 font-light mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Size indicator dots */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.sizes.slice(0, 5).map((size) => {
                            const isOos = product.outOfStockSizes.includes(size);
                            return (
                              <span
                                key={size}
                                className={`text-[9px] px-1.5 py-0.5 border rounded-sm font-sans select-none ${isOos ? 'text-gray-300 border-gray-100 line-through bg-gray-50' : 'text-gray-600 border-[#E5DCD0] bg-white'}`}
                              >
                                {size}
                              </span>
                            );
                          })}
                          {product.sizes.length > 5 && (
                            <span className="text-[9px] px-1 bg-[#F9F5EC] border border-[#E5DCD0] text-luxury-gold font-bold rounded-sm">
                              +{product.sizes.length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="flex items-center justify-between border-t border-[#F0EAE1]/80 pt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-sans font-bold text-luxury-dark">
                            {getPrice(product.price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-[11px] font-sans text-gray-400 line-through font-light">
                              {getPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToPdp(product);
                          }}
                          className="text-[10px] uppercase font-sans tracking-widest font-bold text-luxury-gold hover:text-luxury-dark transition-colors"
                        >
                          View Details &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* 3. QUICK VIEW DRAWER (SLIDE-OVER FROM RIGHT) */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-luxury-dark/60 backdrop-blur-sm flex justify-end">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-lg bg-luxury-cream h-full shadow-2xl p-6 relative flex flex-col justify-between overflow-y-auto animate-slide-left border-l border-[#E5DCD0]"
          >
            <div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close Quick View"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mt-4 mb-2">
                Quick View Product
              </span>

              <div className="grid grid-cols-2 gap-4 border-b border-[#F0EAE1] pb-6 mb-6">
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-48 object-cover rounded-sm border border-gray-100 bg-[#F9F5EC]"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x300/f3eee5/1e1a17?text=SIRAJ";
                  }}
                />
                <div>
                  <h3 className="font-serif text-luxury-dark font-semibold text-lg leading-tight mb-2">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base font-sans font-bold text-luxury-dark">
                      {getPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.discount > 0 && (
                      <span className="text-xs font-sans text-gray-400 line-through">
                        {getPrice(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-sans text-gray-500 font-light leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>
              </div>

              {/* Sizing selection */}
              <div className="mb-6">
                <span className="text-xs font-sans text-gray-500 font-medium block mb-2">
                  Select Size <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((size) => {
                    const isOos = quickViewProduct.outOfStockSizes.includes(size);
                    const isSelected = qvSelectedSize === size;

                    return (
                      <button
                        key={size}
                        disabled={isOos}
                        onClick={() => setQvSelectedSize(size)}
                        className={`px-3 py-2 text-xs font-sans border rounded-sm transition-all ${isOos ? 'text-gray-300 border-gray-100 bg-gray-50 cursor-not-allowed line-through' : isSelected ? 'bg-luxury-dark text-white border-luxury-dark font-semibold' : 'bg-white border-[#E5DCD0] text-gray-700 hover:border-luxury-gold'}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="text-xs font-sans text-gray-500 font-medium block mb-2">Quantity</span>
                <div className="flex items-center border border-[#E5DCD0] rounded-sm w-28 bg-white overflow-hidden shadow-inner">
                  <button
                    onClick={() => setQvQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 text-gray-500 hover:bg-[#F9F5EC] transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-sans text-luxury-dark font-semibold select-none">
                    {qvQuantity}
                  </span>
                  <button
                    onClick={() => setQvQuantity(prev => prev + 1)}
                    className="px-3 py-1.5 text-gray-500 hover:bg-[#F9F5EC] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleQuickViewAdd}
                className="w-full group flex items-center justify-center gap-2 bg-luxury-dark text-white hover:bg-luxury-gold text-xs font-sans uppercase tracking-widest font-bold py-4 rounded-sm shadow-md transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

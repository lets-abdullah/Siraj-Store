import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCollection from './components/CategoryCollection';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import PolicyPages from './components/PolicyPages';
import Footer from './components/Footer';
import UserPanel from './components/UserPanel';
import { products } from './data/products';
import { Truck, RotateCcw, ShieldCheck, Headphones, Heart, Eye, Check } from 'lucide-react';

export default function App() {
  // Global States
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'pdp' | 'checkout' | 'reviews' | 'exchange-policy' | 'how-to-order'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState('PKR');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Filter States (passed down to CategoryCollection)
  const [selectedMainCategory, setSelectedMainCategory] = useState('All'); // 'All' | 'Females' | 'Kids'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [priceRange, setPriceRange] = useState(35000);

  // Quick View State for Homepage
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [qvSelectedSize, setQvSelectedSize] = useState('');
  const [qvQuantity, setQvQuantity] = useState(1);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Sync scroll on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Auth Operations
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage('user-panel');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  // Cart operations
  const handleAddToCart = (product, size, qty = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += qty;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            selectedSize: size,
            quantity: qty,
            image: product.images[0]
          }
        ];
      }
    });
  };

  const handleUpdateCartQty = (productId, size, newQty) => {
    if (newQty < 1) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId) => {
    setWishlist((prevList) => {
      if (prevList.includes(productId)) {
        return prevList.filter((id) => id !== productId);
      } else {
        return [...prevList, productId];
      }
    });
  };

  // Filter setters (called by header navigation)
  const handleFilterMainCategory = (mainCat = 'All', subCat = 'All', gender = 'All') => {
    setSelectedMainCategory(mainCat);
    setSelectedCategory(subCat);
    setSelectedGender(gender);
    setSelectedSize('All');
  };

  const handleFilterSize = (size) => {
    setSelectedSize(size);
    setSelectedCategory('All');
    setSelectedGender('All');
    if (["XS", "S", "M", "L", "XL"].includes(size)) {
      setSelectedMainCategory('Females');
    } else if (size !== 'All') {
      setSelectedMainCategory('Kids');
    }
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSize('All');
    if (['Luxury Eastern Wear', 'Summer Lawn & Pret', 'Formal / Festive Suits'].includes(category)) {
      setSelectedMainCategory('Females');
      setSelectedGender('Women');
    } else if (["Girls Suit (Summer '26)", "Boys Suit (Summer '26)"].includes(category)) {
      setSelectedMainCategory('Kids');
      setSelectedGender(category.includes('Girls') ? 'Girls' : 'Boys');
    }
  };

  const handleFilterGender = (gender) => {
    setSelectedGender(gender);
    setSelectedCategory('All');
    setSelectedSize('All');
    if (gender === 'Women') {
      setSelectedMainCategory('Females');
    } else if (gender === 'Girls' || gender === 'Boys') {
      setSelectedMainCategory('Kids');
    } else {
      setSelectedMainCategory('All');
    }
  };

  // Search autocomplete selection handler
  const handleSearchSelect = (product) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 5);
    });
    setCurrentPage('pdp');
  };

  // Currency helper
  const getPrice = (price) => {
    if (currency === 'PKR') {
      return `Rs. ${price.toLocaleString()}`;
    }
    return `$ ${(price / 280).toFixed(2)}`;
  };

  // Newsletter submission validator
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterError('');
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  // Quick View helpers for Homepage cards
  const handleOpenQuickView = (product, e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setQvSelectedSize('');
    setQvQuantity(1);
  };

  const handleQuickViewAdd = () => {
    if (!qvSelectedSize) {
      alert("Please select a size first!");
      return;
    }
    handleAddToCart(quickViewProduct, qvSelectedSize, qvQuantity);
    setQuickViewProduct(null);
    setCartOpen(true);
  };

  // Navigate to PDP helper
  const handleNavigateToPdp = (product) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 5);
    });
    setCurrentPage('pdp');
  };

  // Fetch bestsellers & clearance items for Home Page
  const bestSellers = products.filter(p => p.isBestSeller);
  const clearanceItems = products.filter(p => p.isClearance);

  return (
    <div className="min-h-screen bg-luxury-cream flex flex-col font-sans antialiased text-luxury-dark">
      {/* GLOBAL HEADER */}
      <Header
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onNavigate={setCurrentPage}
        onOpenCart={() => setCartOpen(true)}
        onSearchSelect={handleSearchSelect}
        activePage={currentPage}
        onFilterSize={handleFilterSize}
        onFilterCategory={handleFilterCategory}
        onFilterGender={handleFilterGender}
        onFilterMainCategory={handleFilterMainCategory}
        selectedMainCategory={selectedMainCategory}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* CORE ROUTING */}
      <main className="grow">
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* HERO CAROUSEL */}
            <Hero
              onNavigate={setCurrentPage}
              onFilterGender={handleFilterGender}
              onFilterCategory={handleFilterCategory}
              onFilterMainCategory={handleFilterMainCategory}
            />

            {/* VALUE PROPOSITION BANNER (4-column minimalist banner) */}
            <section className="py-12 bg-white border-b border-[#F0EAE1]">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center p-2">
                  <div className="w-12 h-12 rounded-full bg-[#F9F5EC] flex items-center justify-center text-luxury-gold mb-4 border border-[#E5DCD0]/30 shadow-inner">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-luxury-dark uppercase tracking-wider">Free Shipping</h4>
                  <p className="text-[11px] font-sans text-gray-500 mt-1 font-light leading-relaxed">Across Pakistan on all orders above PKR 5,000</p>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <div className="w-12 h-12 rounded-full bg-[#F9F5EC] flex items-center justify-center text-luxury-gold mb-4 border border-[#E5DCD0]/30 shadow-inner">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-luxury-dark uppercase tracking-wider">Premium Support</h4>
                  <p className="text-[11px] font-sans text-gray-500 mt-1 font-light leading-relaxed">24/7 client concierge support via direct WhatsApp line</p>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <div className="w-12 h-12 rounded-full bg-[#F9F5EC] flex items-center justify-center text-luxury-gold mb-4 border border-[#E5DCD0]/30 shadow-inner">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-luxury-dark uppercase tracking-wider">30-Day Return</h4>
                  <p className="text-[11px] font-sans text-gray-500 mt-1 font-light leading-relaxed">Hassle-free sizing exchanges and return pick-ups</p>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <div className="w-12 h-12 rounded-full bg-[#F9F5EC] flex items-center justify-center text-luxury-gold mb-4 border border-[#E5DCD0]/30 shadow-inner">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-luxury-dark uppercase tracking-wider">100% Secure Checkout</h4>
                  <p className="text-[11px] font-sans text-gray-500 mt-1 font-light leading-relaxed">PEV verified secure order routing with SSL encryption</p>
                </div>
              </div>
            </section>

            {/* SUMMER CLEARANCE SALE FEATURE SECTION (3-column discount layout) */}
            <section className="py-16 md:py-20 bg-luxury-cream border-b border-[#F0EAE1]">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                  <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-gold font-bold uppercase block mb-1">Seasonal Markdown</span>
                  <h2 className="font-serif text-3xl text-luxury-dark font-semibold">Summer Clearance Sale</h2>
                  <p className="text-xs text-gray-500 font-sans mt-2 font-light">Exquisite kids wear on limited clearance discounts before the upcoming Autumn drop.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {clearanceItems.map((product) => {
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleNavigateToPdp(product)}
                        className="group bg-white border border-[#E5DCD0]/45 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
                      >
                        {/* Image Container with Hover zoom */}
                        <div className="relative h-96 overflow-hidden bg-[#F9F5EC] flex items-center justify-center">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover object-top origin-top transform scale-100 group-hover:scale-105 transition-transform duration-[0.9s] ease-out"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/400x500/f3eee5/1e1a17?text=Clearance+Item";
                            }}
                          />
                          {/* Discount tag */}
                          <span className="absolute top-4 left-4 bg-luxury-dark text-luxury-beige text-[10px] font-sans font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase z-10">
                            -{product.discount}% OFF
                          </span>
                          {/* Wishlist toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist(product.id);
                            }}
                            className={`absolute top-4 right-4 p-2 bg-white/95 rounded-full shadow-md z-10 transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            aria-label="Add to wishlist"
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Product Detail */}
                        <div className="p-5 text-left grow flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
                              {product.gender} • {product.category}
                            </span>
                            <h3 className="font-serif text-sm font-semibold text-luxury-dark group-hover:text-luxury-gold transition-colors line-clamp-1 mb-2">
                              {product.name}
                            </h3>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-[#F0EAE1]/70 pt-3 mt-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-sans font-bold text-luxury-dark">
                                {getPrice(product.price)}
                              </span>
                              <span className="text-[11px] font-sans text-gray-400 line-through font-light">
                                {getPrice(product.originalPrice)}
                              </span>
                            </div>
                            <span className="text-[10px] font-sans text-luxury-gold font-bold uppercase tracking-wider group-hover:underline">
                              Shop Deal &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* BEST SELLER GRID (4-column responsive layout) */}
            <section className="py-16 md:py-20 bg-white border-b border-[#F0EAE1]">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                  <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-gold font-bold uppercase block mb-1">Trending Classics</span>
                  <h2 className="font-serif text-3xl text-luxury-dark font-semibold">Best Seller Collection</h2>
                  <p className="text-xs text-gray-500 font-sans mt-2 font-light">Verified parent favorites, featuring our most comfortable premium stitched fabrics.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.map((product) => {
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleNavigateToPdp(product)}
                        className="group bg-luxury-cream border border-[#E5DCD0]/35 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
                      >
                        {/* Image Panel */}
                        <div className="relative h-80 overflow-hidden bg-[#F9F5EC] flex items-center justify-center">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover object-top origin-top transform scale-100 group-hover:scale-105 transition-transform duration-[0.8s] ease-out"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/300x400/f3eee5/1e1a17?text=Best+Seller";
                            }}
                          />
                          {/* Wishlist */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist(product.id);
                            }}
                            className={`absolute top-3.5 right-3.5 p-2 bg-white/95 rounded-full shadow-md z-10 transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            aria-label="Add to wishlist"
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                          </button>
                          
                          {/* Quick View Button */}
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                              onClick={(e) => handleOpenQuickView(product, e)}
                              className="bg-white hover:bg-luxury-dark hover:text-white text-gray-800 text-[10px] font-sans uppercase tracking-widest font-bold py-2 px-3.5 rounded-sm shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                            >
                              <Eye className="w-3.5 h-3.5" /> Quick View
                            </button>
                          </div>
                        </div>

                        {/* Product Detail */}
                        <div className="p-4.5 text-left grow flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
                              {product.gender} • {product.category}
                            </span>
                            <h3 className="font-serif text-xs font-semibold text-luxury-dark group-hover:text-luxury-gold transition-colors line-clamp-1 mb-3">
                              {product.name}
                            </h3>
                            
                            {/* Short Size Matrix preview */}
                            <div className="flex gap-1 mb-4 flex-wrap">
                              {product.sizes.slice(0, 4).map((size) => (
                                <span
                                  key={size}
                                  className="text-[8px] font-sans px-1 py-0.5 border border-gray-200 bg-white text-gray-500 rounded-sm"
                                >
                                  {size}
                                </span>
                              ))}
                              {product.sizes.length > 4 && (
                                <span className="text-[8px] font-sans px-1 py-0.5 bg-[#F9F5EC] text-luxury-gold font-bold rounded-sm">
                                  +{product.sizes.length - 4} More
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-[#F0EAE1]/80 pt-3">
                            <span className="text-xs font-sans font-bold text-luxury-dark">
                              {getPrice(product.price)}
                            </span>
                            <span className="text-[10px] font-sans text-gray-400 font-light group-hover:text-luxury-gold transition-colors">
                              View Details &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* NEWSLETTER SIGNUP (premiumcentered subscription banner) */}
            <section className="py-16 bg-[#F9F5EC] border-b border-[#E5DCD0]/60">
              <div className="max-w-2xl mx-auto px-6 text-center">
                <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mb-2">Exclusive Circle</span>
                <h2 className="font-serif text-2xl md:text-3xl text-luxury-dark font-semibold mb-3">Subscribe & Receive 10% Off</h2>
                <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-md mx-auto mb-8 font-light">
                  Join the SIRAJ private mailing registry to receive first previews of seasonal lookbooks, exclusive discounts, and private events.
                </p>

                {newsletterSuccess ? (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-sans font-bold rounded-sm flex items-center justify-center gap-1.5 animate-fade-in">
                    <Check className="w-4 h-4 text-green-600" />
                    Your subscription is verified! Check your inbox for the 10% discount voucher.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 max-w-md mx-auto">
                    <div className="flex border border-[#DED4C7] rounded-sm bg-white overflow-hidden shadow-inner">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterError(''); }}
                        placeholder="Enter email address"
                        className="flex-1 py-3 px-4 text-xs text-luxury-dark focus:ring-0 focus:outline-none font-sans"
                      />
                      <button
                        type="submit"
                        className="bg-luxury-dark hover:bg-luxury-gold text-white text-[11px] font-sans uppercase tracking-widest font-bold px-6 transition-colors"
                      >
                        Join Registry
                      </button>
                    </div>
                    {newsletterError && (
                      <span className="text-[10px] text-red-500 text-left font-sans pl-1">{newsletterError}</span>
                    )}
                  </form>
                )}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'shop' && (
          <CategoryCollection
            productsList={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToPdp={handleNavigateToPdp}
            onAddToCart={handleAddToCart}
            selectedMainCategory={selectedMainCategory}
            setSelectedMainCategory={setSelectedMainCategory}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            currency={currency}
          />
        )}

        {currentPage === 'pdp' && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            currency={currency}
            onNavigate={setCurrentPage}
            recentlyViewedProducts={recentlyViewed
              .filter(id => id !== selectedProduct.id)
              .map(id => products.find(p => p.id === id))
              .filter(Boolean)}
            onProductClick={handleNavigateToPdp}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout
            cartItems={cart}
            onClearCart={handleClearCart}
            onNavigate={setCurrentPage}
            currency={currency}
          />
        )}

        {currentPage === 'user-panel' && (
          <UserPanel
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            wishlistCount={wishlist.length}
            currency={currency}
          />
        )}

        {(currentPage === 'reviews' || currentPage === 'exchange-policy' || currentPage === 'how-to-order') && (
          <PolicyPages
            view={currentPage}
            onNavigate={setCurrentPage}
          />
        )}
      </main>

      {/* GLOBAL SLIDING CART DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          setCurrentPage('checkout');
        }}
        currency={currency}
      />

      {/* GLOBAL FOOTER */}
      <Footer onNavigate={setCurrentPage} />

      {/* HOME PAGE QUICK VIEW DRAWER (Homepage scope specific overlay) */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-luxury-dark/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-luxury-cream h-full shadow-2xl p-6 relative flex flex-col justify-between overflow-y-auto border-l border-[#E5DCD0]">
            <div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>

              <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mt-4 mb-2">
                Quick View Product
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#F0EAE1] pb-6 mb-6">
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-48 object-cover rounded-sm border border-gray-150 bg-[#F9F5EC]"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x300/f3eee5/1e1a17?text=BR";
                  }}
                />
                <div className="text-left">
                  <h3 className="font-serif text-luxury-dark font-semibold text-base leading-tight mb-2">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base font-sans font-bold text-luxury-dark">
                      {getPrice(quickViewProduct.price)}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-gray-500 font-light leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>
              </div>

              {/* Sizing selection */}
              <div className="mb-6 text-left">
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
                        className={`px-2.5 py-1.5 text-xs font-sans border rounded-sm transition-all ${isOos ? 'text-gray-300 border-gray-100 bg-gray-50 cursor-not-allowed line-through' : isSelected ? 'bg-luxury-dark text-white border-luxury-dark font-semibold' : 'bg-white border-[#E5DCD0] text-gray-700 hover:border-luxury-gold'}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6 text-left">
                <span className="text-xs font-sans text-gray-500 font-medium block mb-2">Quantity</span>
                <div className="flex items-center border border-[#E5DCD0] rounded-sm w-28 bg-white overflow-hidden shadow-inner">
                  <button
                    onClick={() => setQvQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 text-gray-500 hover:bg-[#F9F5EC] transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-sans text-luxury-dark font-semibold">
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
                className="w-full bg-luxury-dark text-white hover:bg-luxury-gold text-xs font-sans uppercase tracking-widest font-bold py-4 rounded-sm shadow-md transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X } from 'lucide-react';
import { products } from '../data/products';

export default function Header({
  cartCount,
  wishlistCount,
  onNavigate,
  onOpenCart,
  onSearchSelect,
  activePage,
  onFilterSize,
  onFilterCategory,
  onFilterGender,
  onFilterMainCategory,
  selectedMainCategory = 'All',
  currency,
  setCurrency
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFemalesOpen, setIsMobileFemalesOpen] = useState(false);
  const [isMobileKidsOpen, setIsMobileKidsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState(null);
  const searchInputRef = useRef(null);

  // Predictive search logic with strict separation
  const predictiveResults = useMemo(() => {
    if (searchQuery.trim().length <= 1) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => {
      if (q === 'females' || q === 'female' || q === 'women' || q === 'woman') {
        return p.department === 'Females' || p.gender === 'Women';
      }
      if (q === 'kids' || q === 'kid' || q === 'children' || q === 'child') {
        return p.department === 'Kids' || p.gender === 'Girls' || p.gender === 'Boys';
      }
      if (q === 'girls' || q === 'girl') {
        return p.department === 'Kids' && p.gender === 'Girls';
      }
      if (q === 'boys' || q === 'boy') {
        return p.department === 'Kids' && p.gender === 'Boys';
      }

      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        (p.department && p.department.toLowerCase().includes(q))
      );
    }).slice(0, 6);
  }, [searchQuery]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const sizes = [
    { label: "Baby (9M - 2Y)", values: ["9-12M", "1-2Y"] },
    { label: "Toddler (3Y - 6Y)", values: ["3-4Y", "5-6Y"] },
    { label: "Kids (7Y - 12Y)", values: ["7-8Y", "9-10Y", "11-12Y"] },
    { label: "Teens (13Y - 16Y)", values: ["13-14Y", "15-16Y"] }
  ];

  const handleSizeClick = (size) => {
    onFilterSize(size);
    onNavigate('shop');
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    if (onFilterMainCategory) {
      onFilterMainCategory('All', category, 'All');
    } else {
      onFilterCategory(category);
    }
    onNavigate('shop');
    setIsMobileMenuOpen(false);
  };

  const handleFemalesClick = (subCat = 'All') => {
    if (onFilterMainCategory) {
      onFilterMainCategory('Females', subCat, 'Women');
    } else {
      onFilterGender('Women');
      onFilterCategory(subCat);
    }
    onNavigate('shop');
    setIsMobileMenuOpen(false);
    setActiveMega(null);
  };

  const handleKidsClick = (subCat = 'All', gender = 'All') => {
    if (onFilterMainCategory) {
      onFilterMainCategory('Kids', subCat, gender);
    } else {
      onFilterGender(gender);
      onFilterCategory(subCat);
    }
    onNavigate('shop');
    setIsMobileMenuOpen(false);
    setActiveMega(null);
  };

  const handleShopAllClick = () => {
    if (onFilterMainCategory) {
      onFilterMainCategory('All', 'All', 'All');
    } else {
      onFilterCategory('All');
      onFilterGender('All');
    }
    onFilterSize('All');
    onNavigate('shop');
    setIsMobileMenuOpen(false);
    setActiveMega(null);
  };

  return (
    <header className="w-full relative z-40 bg-luxury-cream">
      {/* 1. TOP BAR ANNOUNCEMENT MARQUEE */}
      <div className="w-full bg-luxury-dark text-luxury-beige text-xs font-sans tracking-[0.15em] py-2.5 overflow-hidden flex items-center border-b border-[#322C28]">
        <div className="flex-1 overflow-hidden relative h-4">
          <div className="animate-marquee inline-block whitespace-nowrap absolute">
            <span>✨ SIRAJ LUXURY COUTURE • UP TO 40% OFF ON EASTERN WEAR & CLEARANCE • FREE SHIPPING ON ORDERS ABOVE PKR 5,000 • FEMALES & KIDS BOUTIQUE EXCELLENCE ✨ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>✨ SIRAJ LUXURY COUTURE • UP TO 40% OFF ON EASTERN WEAR & CLEARANCE • FREE SHIPPING ON ORDERS ABOVE PKR 5,000 • FEMALES & KIDS BOUTIQUE EXCELLENCE ✨ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 px-4 md:px-8 border-l border-[#322C28] text-[#E5DCD0]">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent border-none text-[11px] font-medium font-sans cursor-pointer focus:ring-0 focus:outline-none pr-1"
          >
            <option value="PKR" className="text-gray-800">PKR (Rs.)</option>
            <option value="USD" className="text-gray-800">USD ($)</option>
          </select>
        </div>
      </div>

      {/* 2. LOGO AREA (CENTERED) */}
      <div className="w-full py-6 md:py-8 flex justify-center items-center relative border-b border-[#F0EAE1]">
        {/* Mobile Menu Button - Left Aligned in Logo Area */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="absolute left-4 md:hidden p-2 text-[#3A2F2B] hover:text-luxury-gold transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center Logo */}
        <div
          onClick={() => { onNavigate('home'); }}
          className="cursor-pointer group flex flex-col items-center gap-1"
        >
          <img
            src="/logo.jpg"
            alt="SIRAJ Logo"
            className="h-16 md:h-22 object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://placehold.co/180x80/fdfbf7/1e1a17?text=SIRAJ";
            }}
          />
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-luxury-gold font-semibold mt-1">
            Luxury Fashion • Females & Kids
          </span>
        </div>

        {/* Right utility panel (Static on desktop, hidden/condensed on mobile) */}
        <div className="absolute right-4 md:right-8 flex items-center gap-1.5 md:gap-3 text-[#3A2F2B]">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:text-luxury-gold hover:scale-105 transition-all duration-300"
            aria-label="Search items"
          >
            <Search className="w-5 h-5 md:w-5.5 md:h-5.5" />
          </button>

          <button
            onClick={() => onNavigate('user-panel')}
            className="hidden md:flex items-center gap-1 p-2 hover:text-luxury-gold transition-all duration-300"
            title="My Account"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => { onNavigate('shop'); onFilterCategory('Wishlist'); }}
            className="p-2 hover:text-luxury-gold hover:scale-105 transition-all duration-300 relative"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5 md:w-5.5 md:h-5.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-gold text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="p-2 hover:text-luxury-gold hover:scale-105 transition-all duration-300 relative group/cart"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 md:w-5.5 md:h-5.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-dark text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans font-bold group-hover/cart:bg-luxury-gold transition-colors">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. STICKY MAIN NAVIGATION BAR: HOME | NEW ARRIVALS | FEMALES | KIDS | REVIEWS | SHOP ALL */}
      <nav className="hidden md:block w-full sticky top-0 bg-luxury-cream/95 backdrop-blur-md border-b border-[#EBE3D7]/70 shadow-sm z-30 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-8 py-4">
          <button
            onClick={() => onNavigate('home')}
            className={`cursor-pointer text-xs uppercase font-sans tracking-[0.2em] font-medium transition-all duration-300 hover:text-luxury-gold ${activePage === 'home' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-[#3A2F2B]'}`}
          >
            Home
          </button>

          <button
            onClick={() => handleCategoryClick('New Arrivals')}
            className="cursor-pointer text-xs uppercase font-sans tracking-[0.2em] font-medium text-[#3A2F2B] hover:text-luxury-gold transition-colors"
          >
            New Arrivals
          </button>

          {/* 1. FEMALES Mega / Dropdown (Adult Women only) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMega('females')}
            onMouseLeave={() => setActiveMega(null)}
          >
            <button
              onClick={() => handleFemalesClick('All')}
              className={`cursor-pointer text-xs uppercase font-sans tracking-[0.2em] font-medium hover:text-luxury-gold flex items-center gap-1 py-1 transition-colors ${activePage === 'shop' && selectedMainCategory === 'Females' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-[#3A2F2B]'}`}
            >
              Females <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeMega === 'females' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-2 z-50 animate-fade-in">
                <div className="bg-luxury-cream border border-[#E5DCD0] shadow-2xl p-5 rounded-sm flex flex-col gap-3">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-bold border-b border-[#F0EAE1] pb-2">
                    Females (Women)
                  </div>
                  <button onClick={() => handleFemalesClick('All')} className="cursor-pointer text-left text-xs uppercase tracking-wider font-semibold hover:text-luxury-gold text-luxury-dark transition-colors">
                    All Females
                  </button>
                  <button onClick={() => handleFemalesClick('Luxury Eastern Wear')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                    Luxury Eastern Wear
                  </button>
                  <button onClick={() => handleFemalesClick('Summer Lawn & Pret')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                    Summer Lawn & Pret
                  </button>
                  <button onClick={() => handleFemalesClick('Formal / Festive Suits')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                    Formal / Festive Suits
                  </button>
                  <button onClick={() => handleFemalesClick('New Arrivals')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                    New Arrivals
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. KIDS Mega / Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMega('kids')}
            onMouseLeave={() => setActiveMega(null)}
          >
            <button
              onClick={() => handleKidsClick('All')}
              className={`cursor-pointer text-xs uppercase font-sans tracking-[0.2em] font-medium hover:text-luxury-gold flex items-center gap-1 py-1 transition-colors ${activePage === 'shop' && selectedMainCategory === 'Kids' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-[#3A2F2B]'}`}
            >
              Kids <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeMega === 'kids' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-110 pt-2 z-50 animate-fade-in">
                <div className="bg-luxury-cream border border-[#E5DCD0] shadow-2xl p-6 rounded-sm grid grid-cols-2 gap-6">
                  {/* Column 1: Kids Categories */}
                  <div className="flex flex-col gap-2.5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-bold border-b border-[#F0EAE1] pb-2 mb-1">
                      Kids Categories
                    </div>
                    <button onClick={() => handleKidsClick('All')} className="cursor-pointer text-left text-xs uppercase tracking-wider font-semibold hover:text-luxury-gold text-luxury-dark transition-colors">
                      All Kids
                    </button>
                    <button onClick={() => handleKidsClick("Girls Suit (Summer '26)", 'Girls')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                      Girls Suits & Frocks
                    </button>
                    <button onClick={() => handleKidsClick("Boys Suit (Summer '26)", 'Boys')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                      Boys Suits
                    </button>
                    <button onClick={() => handleKidsClick('Eastern Wear', 'All')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                      Kids Eastern Wear
                    </button>
                    <button onClick={() => handleKidsClick('New Arrivals', 'All')} className="cursor-pointer text-left text-xs uppercase tracking-wider hover:text-luxury-gold text-[#3A2F2B] transition-colors">
                      New Arrivals (Kids)
                    </button>
                  </div>

                  {/* Column 2: Kids Sizing & Age Brackets */}
                  <div className="flex flex-col gap-2 border-l border-[#F0EAE1] pl-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-bold border-b border-[#F0EAE1] pb-2 mb-1">
                      Shop By Age Bracket
                    </div>
                    {sizes.map((grp, i) => (
                      <div key={i} className="flex flex-col mb-1">
                        <span className="text-[10px] font-sans font-bold tracking-wider text-luxury-dark">
                          {grp.label}
                        </span>
                        <div className="flex gap-1.5 mt-0.5">
                          {grp.values.map((s, idx) => (
                            <button
                              key={idx}
                              onClick={() => { handleSizeClick(s); setActiveMega(null); }}
                              className="cursor-pointer text-[10px] font-sans text-gray-500 hover:text-luxury-gold bg-white border border-[#E5DCD0] px-1.5 py-0.5 rounded-sm transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('reviews')}
            className={`cursor-pointer text-xs uppercase font-sans tracking-[0.2em] font-medium transition-all duration-300 hover:text-luxury-gold ${activePage === 'reviews' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-[#3A2F2B]'}`}
          >
            Reviews
          </button>

          <button
            onClick={handleShopAllClick}
            className={`cursor-pointer text-xs uppercase font-sans tracking-[0.2em] font-medium transition-all duration-300 hover:text-luxury-gold ${activePage === 'shop' && selectedMainCategory === 'All' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-[#3A2F2B]'}`}
          >
            Shop All
          </button>
        </div>
      </nav>

      {/* 4. PREDICTIVE SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-luxury-dark/70 backdrop-blur-md z-50 flex flex-col items-center justify-start pt-24 px-4 md:px-0">
          <div className="w-full max-w-2xl bg-luxury-cream rounded-md shadow-2xl p-6 relative border border-[#E5DCD0] animate-slide-up">
            <button
              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close search overlay"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-serif text-lg text-luxury-dark mb-4 text-center">Search SIRAJ Collection</h3>
            <div className="relative flex items-center border border-[#DED4C7] rounded-sm bg-white overflow-hidden shadow-inner">
              <Search className="w-5 h-5 text-gray-400 ml-3.5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by category, 'Females', 'Kids', 'Eastern Wear'..."
                className="w-full py-3.5 px-3 text-sm text-luxury-dark focus:ring-0 focus:outline-none font-sans"
              />
            </div>

            {/* Predictive search live results */}
            <div className="mt-4 max-h-72 overflow-y-auto">
              {predictiveResults.length > 0 ? (
                <div>
                  <h4 className="text-[10px] uppercase font-sans tracking-widest text-luxury-gold font-bold mb-2">Live Suggestions</h4>
                  <div className="divide-y divide-gray-100">
                    {predictiveResults.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSearchSelect(p);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="py-3 flex items-center gap-4 cursor-pointer hover:bg-[#F9F5EC] transition-colors px-2 rounded-sm"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-sm border border-gray-100" />
                        <div className="flex-1 flex flex-col">
                          <span className="text-xs font-sans text-luxury-dark font-semibold">{p.name}</span>
                          <span className="text-[10px] font-sans text-gray-500">
                            {p.department === 'Females' ? 'Females (Women)' : `Kids • ${p.gender}`} • {p.category}
                          </span>
                        </div>
                        <div className="text-xs font-sans font-bold text-luxury-dark">
                          {currency === 'PKR' ? `Rs. ${p.price.toLocaleString()}` : `$ ${(p.price / 280).toFixed(2)}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchQuery.trim().length > 1 ? (
                <div className="text-center py-6 text-xs font-sans text-gray-400">
                  No matching premium items found for "{searchQuery}"
                </div>
              ) : (
                <div className="py-4">
                  <h4 className="text-[10px] uppercase font-sans tracking-widest text-gray-400 font-bold mb-2.5">Suggested Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Females', 'Kids', 'Luxury Eastern Wear', 'Kids Eastern Wear', 'Girls Suit', 'Boys Suit'].map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchQuery(tag)}
                        className="text-xs font-sans px-3 py-1.5 bg-[#F9F5EC] border border-[#E5DCD0] rounded-full hover:border-luxury-gold hover:text-luxury-gold transition-all text-gray-600"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. MOBILE DRAWER NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-luxury-dark/60 backdrop-blur-sm md:hidden flex justify-start">
          <div className="w-4/5 max-w-xs bg-luxury-cream h-full shadow-2xl p-6 relative flex flex-col justify-between overflow-y-auto animate-fade-in">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800"
              aria-label="Close Mobile Menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-8 flex flex-col gap-6">
              {/* Brand Logo in Drawer */}
              <div className="flex flex-col items-start border-b border-[#F0EAE1] pb-4 mb-2">
                <img src="/logo.jpg" alt="SIRAJ" className="h-12 object-contain" />
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-semibold mt-1">Luxury Fashion • Females & Kids</span>
              </div>

              {/* Main links */}
              <div className="flex flex-col gap-3 font-sans text-sm font-semibold tracking-wider text-[#3A2F2B]">
                <button
                  onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
                  className="text-left py-1 hover:text-luxury-gold transition-colors border-b border-[#F0EAE1]/30 pb-2"
                >
                  Home
                </button>
                <button
                  onClick={() => handleCategoryClick('New Arrivals')}
                  className="text-left py-1 hover:text-luxury-gold transition-colors border-b border-[#F0EAE1]/30 pb-2"
                >
                  New Arrivals
                </button>

                {/* Females Accordion (Adult Women only) */}
                <div className="border-b border-[#F0EAE1]/30 pb-2">
                  <div
                    onClick={() => setIsMobileFemalesOpen(!isMobileFemalesOpen)}
                    className="flex items-center justify-between py-1 cursor-pointer hover:text-luxury-gold transition-colors"
                  >
                    <span>Females (Adult Women)</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMobileFemalesOpen ? 'rotate-180 text-luxury-gold' : ''}`} />
                  </div>
                  {isMobileFemalesOpen && (
                    <div className="flex flex-col gap-2 pl-3 pt-2 pb-1 text-xs font-normal text-gray-600 animate-fade-in">
                      <button onClick={() => handleFemalesClick('All')} className="text-left hover:text-luxury-gold py-0.5">
                        • All Females
                      </button>
                      <button onClick={() => handleFemalesClick('Luxury Eastern Wear')} className="text-left hover:text-luxury-gold py-0.5">
                        • Luxury Eastern Wear
                      </button>
                      <button onClick={() => handleFemalesClick('Summer Lawn & Pret')} className="text-left hover:text-luxury-gold py-0.5">
                        • Summer Lawn & Pret
                      </button>
                      <button onClick={() => handleFemalesClick('Formal / Festive Suits')} className="text-left hover:text-luxury-gold py-0.5">
                        • Formal / Festive Suits
                      </button>
                      <button onClick={() => handleFemalesClick('New Arrivals')} className="text-left hover:text-luxury-gold py-0.5">
                        • New Arrivals
                      </button>
                    </div>
                  )}
                </div>

                {/* Kids Accordion (Children only) */}
                <div className="border-b border-[#F0EAE1]/30 pb-2">
                  <div
                    onClick={() => setIsMobileKidsOpen(!isMobileKidsOpen)}
                    className="flex items-center justify-between py-1 cursor-pointer hover:text-luxury-gold transition-colors"
                  >
                    <span>Kids (Children Only)</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMobileKidsOpen ? 'rotate-180 text-luxury-gold' : ''}`} />
                  </div>
                  {isMobileKidsOpen && (
                    <div className="flex flex-col gap-2 pl-3 pt-2 pb-1 text-xs font-normal text-gray-600 animate-fade-in">
                      <button onClick={() => handleKidsClick('All')} className="text-left hover:text-luxury-gold py-0.5">
                        • All Kids
                      </button>
                      <button onClick={() => handleKidsClick("Girls Suit (Summer '26)", 'Girls')} className="text-left hover:text-luxury-gold py-0.5">
                        • Girls Suits & Frocks
                      </button>
                      <button onClick={() => handleKidsClick("Boys Suit (Summer '26)", 'Boys')} className="text-left hover:text-luxury-gold py-0.5">
                        • Boys Suits
                      </button>
                      <button onClick={() => handleKidsClick('Eastern Wear', 'All')} className="text-left hover:text-luxury-gold py-0.5">
                        • Kids Eastern Wear
                      </button>
                      <button onClick={() => handleKidsClick('New Arrivals', 'All')} className="text-left hover:text-luxury-gold py-0.5">
                        • New Arrivals (Kids)
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => { onNavigate('reviews'); setIsMobileMenuOpen(false); }}
                  className="text-left py-1 hover:text-luxury-gold transition-colors border-b border-[#F0EAE1]/30 pb-2"
                >
                  Reviews
                </button>
                <button
                  onClick={() => { onNavigate('user-panel'); setIsMobileMenuOpen(false); }}
                  className="text-left py-1 hover:text-luxury-gold transition-colors border-b border-[#F0EAE1]/30 pb-2"
                >
                  My Account
                </button>
                <button
                  onClick={handleShopAllClick}
                  className="text-left py-1 hover:text-luxury-gold transition-colors border-b border-[#F0EAE1]/30 pb-2"
                >
                  Shop All
                </button>
              </div>

              {/* Nested Sizes Bracket */}
              <div className="mt-2">
                <span className="text-[10px] uppercase font-sans tracking-widest text-gray-400 font-bold block mb-2.5">
                  Shop By Sizes
                </span>
                <div className="flex flex-wrap gap-2">
                  {["9-12M", "1-2Y", "3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y", "15-16Y"].map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSizeClick(s)}
                      className="text-xs font-sans px-2.5 py-1 bg-[#F9F5EC] border border-[#E5DCD0] rounded-sm hover:border-luxury-gold hover:text-luxury-gold transition-all text-[#3A2F2B]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer block in Mobile Drawer */}
            <div className="mt-12 border-t border-[#F0EAE1] pt-6 flex flex-col gap-3">
              <button
                onClick={() => { onNavigate('reviews'); setIsMobileMenuOpen(false); }}
                className="text-left text-xs text-[#3A2F2B] hover:text-luxury-gold flex items-center gap-1.5"
              >
                <User className="w-4 h-4" /> Customer Reviews Wall
              </button>
              <div className="text-[11px] font-sans text-gray-400">
                Hotline: +92 300 6545678
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

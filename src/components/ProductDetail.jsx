import { useState } from 'react';
import { Heart, ShoppingBag, Send, AlertCircle, CheckCircle, Info, Truck, RefreshCw } from 'lucide-react';
import { products } from '../data/products';

export default function ProductDetail({
  product,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  currency,
  onNavigate,
  recentlyViewedProducts = [],
  onProductClick
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [successAddToCart, setSuccessAddToCart] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState('description'); // 'description' | 'fabric' | 'care'

  // Question Form State
  const [questionForm, setQuestionForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [questionSent, setQuestionSent] = useState(false);

  // Hover Magnifier Zoom State
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center', transform: 'scale(1)' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.2)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)'
    });
  };

  if (!product) return null;

  // Calculate related products (strictly same department: Females or Kids, exclude current)
  const relatedProducts = products
    .filter(p => p.department === product.department && p.id !== product.id)
    .slice(0, 4);

  const isWishlisted = wishlist.includes(product.id);
  const hasDiscount = product.discount > 0;

  const getPrice = (price) => {
    if (currency === 'PKR') {
      return `Rs. ${price.toLocaleString()}`;
    }
    return `$ ${(price / 280).toFixed(2)}`;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    setSuccessAddToCart(true);
    setTimeout(() => setSuccessAddToCart(false), 2500);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setQuestionForm(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSendQuestion = (e) => {
    e.preventDefault();
    const errors = {};
    if (!questionForm.name.trim()) errors.name = "Name is required";
    if (!questionForm.email.trim() || !/\S+@\S+\.\S+/.test(questionForm.email)) errors.email = "Valid email is required";
    if (!questionForm.phone.trim()) errors.phone = "Phone number is required";
    if (!questionForm.message.trim()) errors.message = "Message cannot be empty";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setQuestionSent(true);
    setTimeout(() => {
      setQuestionSent(false);
      setIsQuestionOpen(false);
      setQuestionForm({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <div className="w-full bg-luxury-cream py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('shop')}
          className="text-xs uppercase font-sans tracking-widest text-luxury-gold hover:text-luxury-dark mb-8 flex items-center gap-1.5 transition-colors font-semibold"
        >
          &larr; Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* 1. LEFT GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div 
              className="relative h-[60vh] md:h-[68vh] flex items-center justify-center self-start max-w-max overflow-hidden rounded-sm cursor-zoom-in border border-gray-100/50 bg-luxury-cream"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                style={zoomStyle}
                className="max-h-full w-auto object-contain transition-transform duration-100 ease-out"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x700/f3eee5/1e1a17?text=SIRAJ";
                }}
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-luxury-dark text-white text-[11px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10 shadow-md">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 bg-[#F9F5EC] border rounded-sm overflow-hidden transition-all duration-300 shrink-0 ${activeImageIndex === idx ? 'border-luxury-gold shadow-md scale-102' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/100x100/f3eee5/1e1a17?text=BR";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 2. RIGHT STICKY INFO COLUMN */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col">
            <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-gold font-bold uppercase mb-2 block">
              {product.department === 'Females' ? 'Females (Women)' : `Kids • ${product.gender}`} Collection • {product.category}
            </span>
            <h1 className="font-serif text-luxury-dark text-2xl md:text-3xl font-semibold leading-tight mb-3">
              {product.name}
            </h1>

            {/* Stars & Reviews */}
            <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-[#F0EAE1]">
              <div className="flex items-center text-xs text-amber-500 font-sans gap-0.5">
                ★ ★ ★ ★ ★ <span className="text-gray-600 font-medium ml-1.5">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-400 font-sans">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-sans font-bold text-luxury-dark">
                {getPrice(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm font-sans text-gray-400 line-through font-light">
                    {getPrice(product.originalPrice)}
                  </span>
                  <span className="text-[10px] font-sans bg-pastel-peach text-[#D84B20] px-2 py-0.5 rounded-sm font-bold uppercase">
                    SAVE {getPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Sizing Matrix */}
            <div className="mb-6 pb-6 border-b border-[#F0EAE1]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-sans text-gray-500 font-bold uppercase tracking-wider">
                  Select Size <span className="text-red-500">*</span>
                </span>
                <button
                  onClick={() => onNavigate('exchange-policy')}
                  className="text-[10px] font-sans text-luxury-gold hover:underline uppercase tracking-wider font-semibold"
                >
                  Size Chart Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isOos = product.outOfStockSizes.includes(size);
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      disabled={isOos}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-sans border rounded-sm transition-all text-center ${isOos ? 'text-gray-300 border-gray-100 bg-gray-50 cursor-not-allowed line-through' : isSelected ? 'bg-luxury-dark text-white border-luxury-dark font-semibold' : 'bg-white border-[#E5DCD0] text-gray-700 hover:border-luxury-gold'}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="flex items-center gap-3.5 mb-6">
              {/* Quantity */}
              <div className="flex items-center border border-[#E5DCD0] rounded-sm w-28 bg-white overflow-hidden shadow-inner h-12.5">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 text-gray-500 hover:bg-[#F9F5EC] transition-colors h-full"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-sans text-luxury-dark font-semibold select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 text-gray-500 hover:bg-[#F9F5EC] transition-colors h-full"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 group flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-widest font-bold py-4 rounded-sm shadow-md transition-all duration-300 h-12.5 ${successAddToCart ? 'bg-green-600 text-white' : 'bg-luxury-dark text-white hover:bg-luxury-gold'}`}
              >
                {successAddToCart ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Added Successfully!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              {/* Add to Wishlist */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 border rounded-sm transition-all duration-300 h-12.5 flex items-center justify-center ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-[#E5DCD0] text-gray-400 hover:text-red-500 hover:border-red-200 bg-white'}`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Ask a Question Link */}
            <button
              onClick={() => setIsQuestionOpen(true)}
              className="text-left text-xs font-sans text-luxury-gold hover:text-luxury-dark font-semibold uppercase tracking-wider mb-8 flex items-center gap-1.5 self-start"
            >
              <Info className="w-3.5 h-3.5" /> Ask a Question about this Suit
            </button>

            {/* Accordion Specs */}
            <div className="border border-[#E5DCD0]/60 rounded-sm overflow-hidden bg-white mb-6">
              {/* Product description header */}
              <button
                onClick={() => setAccordionOpen(prev => prev === 'description' ? '' : 'description')}
                className="w-full py-3.5 px-4 text-left text-xs font-sans font-bold uppercase tracking-wider text-luxury-dark bg-luxury-cream border-b border-[#E5DCD0]/60 flex justify-between items-center"
              >
                <span>Product Backstory</span>
                <span>{accordionOpen === 'description' ? '−' : '+'}</span>
              </button>
              {accordionOpen === 'description' && (
                <div className="p-4 text-xs font-sans text-gray-600 leading-relaxed font-light">
                  {product.description}
                </div>
              )}

              {/* Fabric details header */}
              <button
                onClick={() => setAccordionOpen(prev => prev === 'fabric' ? '' : 'fabric')}
                className="w-full py-3.5 px-4 text-left text-xs font-sans font-bold uppercase tracking-wider text-luxury-dark bg-luxury-cream border-b border-[#E5DCD0]/60 flex justify-between items-center"
              >
                <span>Fabric & Materials</span>
                <span>{accordionOpen === 'fabric' ? '−' : '+'}</span>
              </button>
              {accordionOpen === 'fabric' && (
                <div className="p-4 text-xs font-sans text-gray-600 leading-relaxed font-light">
                  <strong>Material:</strong> {product.fabric}<br />
                  <strong>Season Suitability:</strong> Summer '26 Collection.<br />
                  Made from high-twist loops that offer supreme elasticity and sweat-absorption.
                </div>
              )}

              {/* Care instructions header */}
              <button
                onClick={() => setAccordionOpen(prev => prev === 'care' ? '' : 'care')}
                className="w-full py-3.5 px-4 text-left text-xs font-sans font-bold uppercase tracking-wider text-luxury-dark bg-luxury-cream flex justify-between items-center"
              >
                <span>Care Instructions</span>
                <span>{accordionOpen === 'care' ? '−' : '+'}</span>
              </button>
              {accordionOpen === 'care' && (
                <div className="p-4 text-xs font-sans text-gray-600 leading-relaxed font-light">
                  {product.care}
                </div>
              )}
            </div>

            {/* Fast Delivery Info */}
            <div className="grid grid-cols-2 gap-4 bg-[#F9F5EC] p-4 rounded-sm border border-[#E5DCD0]/50 text-left">
              <div className="flex gap-2.5">
                <Truck className="w-5 h-5 text-luxury-gold shrink-0" />
                <div>
                  <h4 className="text-[11px] font-sans font-bold uppercase text-luxury-dark">Free Delivery</h4>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5">Across Pakistan on orders above Rs. 5,000</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <RefreshCw className="w-5 h-5 text-luxury-gold shrink-0" />
                <div>
                  <h4 className="text-[11px] font-sans font-bold uppercase text-luxury-dark">30 Days Return</h4>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5">Easy returns and exchange policies</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* You May Also Like Section */}
        <section className="mt-20 pt-16 border-t border-[#F0EAE1]/85">
          <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mb-1">
            Boutique Recommendations
          </span>
          <h3 className="font-serif text-xl md:text-2xl text-luxury-dark font-semibold mb-8">
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <div 
                key={p.id}
                onClick={() => { onProductClick(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group cursor-pointer flex flex-col justify-between bg-white border border-[#E5DCD0]/35 rounded-sm p-3 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-[#F9F5EC] rounded-sm flex items-center justify-center border border-gray-100">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[0.8s] ease-out" />
                </div>
                <div className="pt-3 text-left">
                  <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-0.5">
                    {p.department === 'Females' ? 'Females (Women)' : `Kids • ${p.gender}`} • {p.category}
                  </span>
                  <h4 className="font-serif text-xs font-semibold text-luxury-dark group-hover:text-luxury-gold transition-colors truncate">{p.name}</h4>
                  <span className="text-xs font-sans font-bold text-luxury-dark mt-1 block">{getPrice(p.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Viewed Section */}
        {recentlyViewedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#F0EAE1]/85">
            <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mb-1">
              Your Session History
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-luxury-dark font-semibold mb-8">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewedProducts.map(p => (
                <div 
                  key={p.id}
                  onClick={() => { onProductClick(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group cursor-pointer flex flex-col justify-between bg-white border border-[#E5DCD0]/35 rounded-sm p-3 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-[#F9F5EC] rounded-sm flex items-center justify-center border border-gray-100">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[0.8s] ease-out" />
                  </div>
                  <div className="pt-3 text-left">
                    <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-0.5">
                      {p.department === 'Females' ? 'Females (Women)' : `Kids • ${p.gender}`} • {p.category}
                    </span>
                    <h4 className="font-serif text-xs font-semibold text-luxury-dark group-hover:text-luxury-gold transition-colors truncate">{p.name}</h4>
                    <span className="text-xs font-sans font-bold text-luxury-dark mt-1 block">{getPrice(p.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 3. ASK A QUESTION MODAL POPUP */}
      {isQuestionOpen && (
        <div className="fixed inset-0 bg-luxury-dark/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-luxury-cream rounded-md shadow-2xl p-6 border border-[#E5DCD0] animate-slide-up relative">
            <h3 className="font-serif text-luxury-dark text-lg font-bold mb-1">Ask a Question</h3>
            <p className="text-xs text-gray-500 font-sans mb-5">Our premium concierge desk will reply to you within 2-4 hours.</p>

            {questionSent ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                <h4 className="font-serif text-sm font-semibold text-luxury-dark">Message Transmitted</h4>
                <p className="text-xs text-gray-400 font-sans mt-1">Thank you. We have received your query about {product.name}.</p>
              </div>
            ) : (
              <form onSubmit={handleSendQuestion} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={questionForm.name}
                    onChange={handleFormChange}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={questionForm.email}
                    onChange={handleFormChange}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {formErrors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={questionForm.phone}
                    onChange={handleFormChange}
                    placeholder="+92 300 0000000"
                    className="w-full px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                  />
                  {formErrors.phone && (
                    <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Your Message</label>
                  <textarea
                    name="message"
                    rows="3"
                    value={questionForm.message}
                    onChange={handleFormChange}
                    placeholder="Enter question about measurements, stock, embroidery details..."
                    className="w-full px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm resize-none"
                  />
                  {formErrors.message && (
                    <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {formErrors.message}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setIsQuestionOpen(false)}
                    className="px-4 py-2 border border-[#E5DCD0] text-[#3A2F2B] text-xs font-sans uppercase tracking-wider font-semibold rounded-sm hover:bg-[#F9F5EC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-luxury-dark text-white hover:bg-luxury-gold text-xs font-sans uppercase tracking-wider font-bold rounded-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

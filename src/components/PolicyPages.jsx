import { useState } from 'react';
import { Star, CheckCircle, HelpCircle, ArrowRight, ShieldCheck, Mail, ShoppingBag } from 'lucide-react';

export default function PolicyPages({ view, onNavigate }) {
  // 1. REVIEWS WALL STATE
  const [reviewsList, setReviewsList] = useState([
    { id: 1, name: "Ayesha Khan", rating: 5, date: "2026-05-20", comment: "Amazing stitching and premium packaging! The slub cotton is extremely soft and perfect for the Lahore summer heat. Ordered 3-4Y for my daughter and fits perfectly.", fit: "Fits True to Size" },
    { id: 2, name: "Bilal Ahmed", rating: 4, date: "2026-05-18", comment: "The sky blue boys kameez is beautiful. Buttons are high quality, stitching is clean. Deducted 1 star because shipping took 4 days to Karachi, but worth the wait.", fit: "Fits True to Size" },
    { id: 3, name: "Maria Zain", rating: 5, date: "2026-05-15", comment: "Very impressed by the Minecraft Terry lounge suit. Usually kids clothes shrink after one wash, but this material is thick, high-end, and hasn't lost its print at all.", fit: "Fits Slightly Large" },
    { id: 4, name: "Dr. Farah", rating: 5, date: "2026-05-10", comment: "The hand embroidery on the peach suit is absolutely stunning. Reminds me of boutique designer wear. Will definitely buy again from Summer '26 collection.", fit: "Fits True to Size" }
  ]);

  const [starFilter, setStarFilter] = useState('All');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', fit: 'Fits True to Size' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("Please fill in your name and comment.");
      return;
    }
    const review = {
      id: reviewsList.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      fit: newReview.fit
    };
    setReviewsList(prev => [review, ...prev]);
    setReviewSubmitted(true);
    setNewReview({ name: '', rating: 5, comment: '', fit: 'Fits True to Size' });
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 2000);
  };

  const filteredReviews = starFilter === 'All'
    ? reviewsList
    : reviewsList.filter(r => r.rating === Number(starFilter));

  const averageRating = (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1);

  // VIEW RENDERS
  if (view === 'exchange-policy') {
    return (
      <div className="w-full bg-luxury-cream py-16 px-4 md:px-8 text-left animate-fade-in">
        <div className="max-w-3xl mx-auto bg-white border border-[#E5DCD0]/70 p-8 md:p-12 rounded-sm shadow-xl">
          <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-gold font-bold uppercase mb-2 block">
            Exchange & Return Regulations
          </span>
          <h1 className="font-serif text-3xl text-luxury-dark font-semibold mb-6 pb-4 border-b border-[#F0EAE1]">
            Refund & Exchange Guidelines
          </h1>

          <div className="prose prose-sm text-xs font-sans text-gray-600 leading-relaxed font-light flex flex-col gap-6">
            <p className="text-sm text-luxury-dark font-normal">
              At SIRAJ, we take immense pride in crafting premium luxury kidswear and female couture. If you are not completely satisfied with your purchase, we facilitate a transparent, seamless exchange protocol.
            </p>

            <div className="flex gap-4 items-start bg-[#F9F5EC] p-4 rounded-sm border border-[#E5DCD0]/50">
              <ShieldCheck className="w-6 h-6 text-luxury-gold shrink-0" />
              <div>
                <h4 className="font-bold text-luxury-dark text-xs uppercase mb-1">Our Pledge: 30-Day Free Pickup Exchange</h4>
                <p className="text-[10.5px]">If the size does not fit your child, we will arrange our logistics partner to collect the exchange suit from your doorstep and deliver the replacement free of charge.</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-sm text-luxury-dark font-bold uppercase mb-2">1. Terms of Exchange</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Exchanges are processed within <strong>30 days</strong> of the invoice delivery date.</li>
                <li>The item must be unused, unwashed, with tags attached, and in its original premium packaging box.</li>
                <li>Clearance Sale items are eligible for size exchange only (if stock permits), and are not subject to refund.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-sm text-luxury-dark font-bold uppercase mb-2">2. Processing Refund</h3>
              <p className="mb-2">If you prefer a complete refund instead of exchange, we will issue a store voucher or transfer directly to your bank account within 3 working days of receiving back the item.</p>
              <p>Refund requests can be initiated by emailing us at <strong className="text-luxury-dark">support@brandsriver.com</strong> or sending WhatsApp to <strong className="text-luxury-gold">+92 300 6545678</strong>.</p>
            </div>

            <div>
              <h3 className="font-serif text-sm text-luxury-dark font-bold uppercase mb-2">3. Damaged or Defective Suits</h3>
              <p>Every dress is inspected double-blind. In the rare case of loose embroidery threads or color bleeding, contact us immediately and we will send a fresh piece along with a complimentary apology gift.</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#F0EAE1] flex justify-between items-center">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-luxury-dark text-white text-[11px] font-sans uppercase tracking-widest font-bold py-3.5 px-6 rounded-sm hover:bg-luxury-gold transition-colors"
            >
              Explore Shop Collection
            </button>
            <span className="text-[10px] text-gray-400 font-sans font-light">SIRAJ Premium Guarantee</span>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'how-to-order') {
    return (
      <div className="w-full bg-luxury-cream py-16 px-4 md:px-8 text-left animate-fade-in">
        <div className="max-w-4xl mx-auto bg-white border border-[#E5DCD0]/70 p-8 md:p-12 rounded-sm shadow-xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-gold font-bold uppercase mb-2 block">
              Concierge Tutorial
            </span>
            <h1 className="font-serif text-3xl text-luxury-dark font-semibold">How to Place Your Order</h1>
            <p className="text-xs text-gray-500 font-sans mt-2">A simple, step-by-step visual workflow for shopping at SIRAJ.</p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 relative">
            {/* Step 1 */}
            <div className="border border-[#E5DCD0]/50 p-6 rounded-sm bg-luxury-cream hover:border-luxury-gold transition-all relative flex flex-col justify-between">
              <span className="absolute top-3 right-3 text-2xl font-serif text-luxury-gold opacity-40 font-bold">01</span>
              <div>
                <ShoppingBag className="w-8 h-8 text-luxury-dark mb-4" />
                <h3 className="font-serif text-sm font-semibold text-luxury-dark mb-2">Select & Fit</h3>
                <p className="text-[11px] font-sans text-gray-500 leading-relaxed font-light">Explore our Premium collections. Select your child's age-bracket size in the interactive PDP, then add to bag.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-[#E5DCD0]/50 p-6 rounded-sm bg-luxury-cream hover:border-luxury-gold transition-all relative flex flex-col justify-between">
              <span className="absolute top-3 right-3 text-2xl font-serif text-luxury-gold opacity-40 font-bold">02</span>
              <div>
                <HelpCircle className="w-8 h-8 text-luxury-dark mb-4" />
                <h3 className="font-serif text-sm font-semibold text-luxury-dark mb-2">Check Details</h3>
                <p className="text-[11px] font-sans text-gray-500 leading-relaxed font-light">Use our live "Ask a Question" modal on any product detail page if you need customized chest/length measurements.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-[#E5DCD0]/50 p-6 rounded-sm bg-luxury-cream hover:border-luxury-gold transition-all relative flex flex-col justify-between">
              <span className="absolute top-3 right-3 text-2xl font-serif text-luxury-gold opacity-40 font-bold">03</span>
              <div>
                <CheckCircle className="w-8 h-8 text-luxury-dark mb-4" />
                <h3 className="font-serif text-sm font-semibold text-luxury-dark mb-2">Fill Shipment</h3>
                <p className="text-[11px] font-sans text-gray-500 leading-relaxed font-light">Go to checkout. Enter address and phone. Select Cash on Delivery (COD) or mobile wallets. Apply discount vouchers.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border border-[#E5DCD0]/50 p-6 rounded-sm bg-luxury-cream hover:border-luxury-gold transition-all relative flex flex-col justify-between">
              <span className="absolute top-3 right-3 text-2xl font-serif text-luxury-gold opacity-40 font-bold">04</span>
              <div>
                <Mail className="w-8 h-8 text-luxury-dark mb-4" />
                <h3 className="font-serif text-sm font-semibold text-luxury-dark mb-2">Get Dispatched</h3>
                <p className="text-[11px] font-sans text-gray-500 leading-relaxed font-light">Receive instant order tracking via WhatsApp. Your premium package will arrive in 2-4 working days.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-[#F9F5EC] p-6 rounded-sm border border-[#E5DCD0]/50 text-left">
            <div>
              <h4 className="font-serif text-sm text-luxury-dark font-semibold mb-1">Need Assistance?</h4>
              <p className="text-xs text-gray-500 font-sans">Our support desk is active 24/7 on WhatsApp for premium customers.</p>
            </div>
            <a
              href="https://wa.me/923006545678"
              target="_blank"
              rel="noreferrer"
              className="bg-luxury-dark text-white text-xs font-sans uppercase tracking-widest font-bold py-3 px-6 rounded-sm hover:bg-luxury-gold transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: REVIEWS WALL
  return (
    <div className="w-full bg-luxury-cream py-12 px-4 md:px-8 text-left animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase mb-2 block">
          Client Feedback wall
        </span>
        <h1 className="font-serif text-3xl text-luxury-dark font-semibold mb-8">
          SIRAJ Customer Reviews
        </h1>

        {/* Aggregate Ratings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-center bg-white border border-[#E5DCD0]/60 p-6 md:p-8 rounded-sm shadow-sm">
          
          {/* average score */}
          <div className="text-center border-b md:border-b-0 md:border-r border-[#F0EAE1] pb-6 md:pb-0">
            <span className="text-5xl font-sans font-bold text-luxury-dark">{averageRating}</span>
            <span className="text-xs text-gray-400 font-sans block mt-1">out of 5 stars</span>
            <div className="flex justify-center text-luxury-gold text-sm mt-2">
              ★★★★★
            </div>
            <span className="text-[10.5px] font-sans text-gray-500 block mt-2">Based on {reviewsList.length} verified reviews</span>
          </div>

          {/* filter selectors */}
          <div className="flex flex-col gap-2.5 px-0 md:px-6">
            <span className="text-xs font-sans font-bold text-gray-500 uppercase tracking-wide">Filter reviews:</span>
            <div className="flex flex-wrap gap-2">
              {['All', '5', '4', '3'].map((star) => (
                <button
                  key={star}
                  onClick={() => setStarFilter(star)}
                  className={`text-xs font-sans px-3.5 py-1.5 border rounded-sm transition-all ${starFilter === star ? 'bg-luxury-gold text-white border-luxury-gold font-semibold' : 'bg-white text-gray-600 border-[#E5DCD0] hover:border-gray-400'}`}
                >
                  {star === 'All' ? 'All Reviews' : `${star} Stars`}
                </button>
              ))}
            </div>
          </div>

          {/* Write a review button */}
          <div className="text-center md:text-right">
            <button
              onClick={() => setShowReviewForm(prev => !prev)}
              className="bg-luxury-dark hover:bg-luxury-gold text-white text-xs font-sans uppercase tracking-widest font-bold py-3.5 px-6 rounded-sm shadow-md transition-colors"
            >
              Write A Review
            </button>
          </div>

        </div>

        {/* Slide-open Write Review Form */}
        {showReviewForm && (
          <div className="bg-[#F9F5EC] border border-[#E5DCD0]/60 p-6 rounded-sm mb-10 text-left animate-slide-up max-w-xl">
            <h3 className="font-serif text-sm font-semibold text-luxury-dark mb-1">Add Your Feedback</h3>
            <p className="text-[11px] text-gray-500 font-sans mb-4">Your reviews help us refine our premium collections.</p>

            {reviewSubmitted ? (
              <div className="py-6 text-center text-green-700 text-xs font-sans font-bold flex flex-col items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" /> Thank you! Your review was successfully added to the wall.
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Your Name</label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Zara Ali"
                      className="px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Size Rating Fit</label>
                    <select
                      value={newReview.fit}
                      onChange={(e) => setNewReview(prev => ({ ...prev, fit: e.target.value }))}
                      className="px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm focus:ring-0 focus:outline-none"
                    >
                      <option value="Fits True to Size">Fits True to Size</option>
                      <option value="Fits Slightly Small">Fits Slightly Small</option>
                      <option value="Fits Slightly Large">Fits Slightly Large</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Select Rating Star</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm focus:ring-0 focus:outline-none w-28"
                  >
                    <option value="5">★★★★★ (5)</option>
                    <option value="4">★★★★☆ (4)</option>
                    <option value="3">★★★☆☆ (3)</option>
                    <option value="2">★★☆☆☆ (2)</option>
                    <option value="1">★☆☆☆☆ (1)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Your Review Details</label>
                  <textarea
                    rows="3"
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Describe the fabric quality, stitching, sizing adjustments..."
                    className="px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-luxury-dark hover:bg-luxury-gold text-white text-[11px] font-sans uppercase tracking-widest font-bold py-3.5 rounded-sm transition-all shadow-sm"
                >
                  Submit verified Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Listing */}
        <div className="flex flex-col gap-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-10 font-sans text-xs text-gray-400">
              No reviews available matching star level "{starFilter}".
            </div>
          ) : (
            filteredReviews.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-[#E5DCD0]/45 p-6 rounded-sm shadow-sm flex flex-col gap-3 relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-luxury-dark">{r.name}</h4>
                    <span className="text-[10px] text-gray-400 font-sans block mt-0.5">{r.date}</span>
                  </div>
                  {/* stars */}
                  <div className="flex items-center text-luxury-gold text-xs font-sans">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>

                <p className="text-xs font-sans text-gray-600 leading-relaxed font-light">
                  "{r.comment}"
                </p>

                <div className="flex justify-between items-center border-t border-[#F0EAE1]/80 pt-3 mt-1 text-[10px] font-sans">
                  <span className="text-green-700 font-bold flex items-center gap-1">
                    ✓ Verified Buyer
                  </span>
                  <span className="text-gray-400">
                    Fit details: <strong className="text-gray-600 font-bold">{r.fit}</strong>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import { HelpCircle, ShieldCheck, Mail, ShoppingBag } from 'lucide-react';

export default function PolicyPages({ view, onNavigate }) {
  // 1. EXCHANGE & RETURN REGULATIONS
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
                <p className="text-[10.5px]">If the size does not fit your child or you need a different fit, we will arrange our logistics partner to collect the exchange garment from your doorstep and deliver the replacement free of charge.</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-sm text-luxury-dark font-bold uppercase mb-2">1. Terms of Exchange</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Exchanges are processed within <strong>30 days</strong> of the invoice delivery date.</li>
                <li>The item must be unused, unwashed, with tags attached, and in its original premium packaging box.</li>
                <li>Clearance Sale items are eligible for size exchange only (if stock permits), and are not subject to cash refund.</li>
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
              className="bg-luxury-dark text-white text-[11px] font-sans uppercase tracking-widest font-bold py-3.5 px-6 rounded-sm hover:bg-luxury-gold transition-colors cursor-pointer"
            >
              Explore Shop Collection
            </button>
            <span className="text-[10px] text-gray-400 font-sans font-light">SIRAJ Premium Guarantee</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. HOW TO ORDER
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
              <p className="text-[11px] font-sans text-gray-500 leading-relaxed font-light">Explore our Premium collections. Select your size in the interactive PDP, then add to bag.</p>
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
              <ShieldCheck className="w-8 h-8 text-luxury-dark mb-4" />
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
            className="bg-luxury-dark text-white text-xs font-sans uppercase tracking-widest font-bold py-3 px-6 rounded-sm hover:bg-luxury-gold transition-colors cursor-pointer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

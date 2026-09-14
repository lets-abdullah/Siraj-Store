import { PhoneCall, Calendar } from 'lucide-react';

export default function Footer({ onNavigate, activePage = 'home' }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId) => {
    if (activePage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-luxury-dark text-[#E5DCD0] pt-16 pb-8 border-t border-[#322C28]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left mb-12">
        
        {/* Column 1: Brand Backstory */}
        <div className="flex flex-col gap-4">
          <div 
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer group flex items-center gap-2 self-start"
          >
            <img 
              src="/logo-transparent.png" 
              alt="SIRAJ Logo" 
              className="h-12 object-contain filter invert brightness-200" 
              onError={(e) => {
                e.target.src = "/logo.jpg";
              }}
            />
          </div>
          <p className="text-[11.5px] font-sans leading-relaxed font-light text-gray-400">
            SIRAJ is Pakistan's premier boutique luxury fashion house for females and kids. Reimagining couture with pure fabrics, bespoke craftsmanship, and timeless tailoring designed to last.
          </p>
          <span className="text-[10px] font-sans tracking-[0.2em] text-luxury-gold font-bold uppercase mt-1">
            SIRAJ LUXURY COUTURE
          </span>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-sm text-luxury-beige font-semibold tracking-wider uppercase border-b border-[#322C28] pb-2">
            Boutique Services
          </h4>
          <div className="flex flex-col gap-2.5 text-xs font-sans text-gray-400">
            <button onClick={() => handleLinkClick('home')} className="text-left hover:text-luxury-gold transition-colors cursor-pointer">
              Home Page
            </button>
            <button onClick={() => handleLinkClick('shop')} className="text-left hover:text-luxury-gold transition-colors cursor-pointer">
              Shop Collections
            </button>
            <button onClick={() => handleScrollToSection('customer-reviews')} className="text-left hover:text-luxury-gold transition-colors cursor-pointer">
              Customer Reviews
            </button>
            <button onClick={() => handleScrollToSection('faq-section')} className="text-left hover:text-luxury-gold transition-colors cursor-pointer">
              Frequently Asked Questions (FAQ)
            </button>
            <button onClick={() => handleLinkClick('exchange-policy')} className="text-left hover:text-luxury-gold transition-colors cursor-pointer">
              30-Day Exchange & Return Policy
            </button>
            <button onClick={() => handleLinkClick('how-to-order')} className="text-left hover:text-luxury-gold transition-colors cursor-pointer">
              How to Place Order
            </button>
          </div>
        </div>

        {/* Column 3: Office Timings */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-sm text-luxury-beige font-semibold tracking-wider uppercase border-b border-[#322C28] pb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-luxury-gold" /> Office Timings
          </h4>
          <div className="flex flex-col gap-2.5 text-xs font-sans text-gray-400 leading-relaxed font-light">
            <p>
              <strong className="text-[#E5DCD0]">Monday — Saturday:</strong><br />
              10:00 AM — 06:00 PM
            </p>
            <p className="border-l-2 border-luxury-gold pl-2.5 bg-[#2A2420] py-1 rounded-r-sm text-[11px]">
              <strong className="text-luxury-gold block">Friday Prayer Break:</strong>
              1:00 PM — 2:30 PM (Closed)
            </p>
            <p className="text-[10px] text-gray-500">Sunday: Closed</p>
          </div>
        </div>

        {/* Column 4: Contact & Hotlines */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-sm text-luxury-beige font-semibold tracking-wider uppercase border-b border-[#322C28] pb-2 flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-luxury-gold" /> Support Desk
          </h4>
          <div className="flex flex-col gap-2.5 text-xs font-sans">
            <a 
              href="tel:+923006545678" 
              className="text-gray-400 hover:text-luxury-gold transition-colors font-semibold"
            >
              Hotline: +92 300 6545678
            </a>
            <span className="text-[10px] font-sans text-gray-500">Concierge Active Mon-Sat 10am-6pm.</span>

            {/* Social icons */}
            <div className="flex gap-3.5 mt-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-[#2A2420] text-gray-400 hover:text-luxury-gold hover:bg-[#3E342E] rounded-sm transition-all shadow-sm flex items-center justify-center"
                aria-label="Facebook Link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.1-1.2 1-1.2h3V2h-3.8c-3.4 0-4.2 1.6-4.2 3.8V8z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-[#2A2420] text-gray-400 hover:text-luxury-gold hover:bg-[#3E342E] rounded-sm transition-all shadow-sm flex items-center justify-center"
                aria-label="Instagram Link"
              >
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-[#2A2420] text-gray-400 hover:text-luxury-gold hover:bg-[#3E342E] rounded-sm transition-all shadow-sm flex items-center justify-center"
                aria-label="YouTube Link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.53 12 3.53 12 3.53s-7.53 0-9.388.525a3.003 3.003 0 0 0-2.11 2.108C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.47 12 20.47 12 20.47s7.53 0 9.388-.525a3.003 3.003 0 0 0 2.11-2.108C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/923006545678" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-[#2A2420] text-gray-400 hover:text-green-500 hover:bg-[#3E342E] rounded-sm transition-all shadow-sm flex items-center justify-center"
                aria-label="WhatsApp Link"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.276 3.508 8.48-.005 6.66-5.342 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.793 1.45 5.432 0 9.854-4.417 9.858-9.848.002-2.63-1.023-5.101-2.871-6.953C16.581 1.95 14.11.928 11.48.927c-5.436 0-9.86 4.417-9.863 9.848-.001 1.737.457 3.432 1.328 4.937L1.89 20.1l4.757-1.246-.001.3zM17.476 14.3c-.326-.163-1.93-.953-2.229-1.062-.299-.109-.517-.163-.734.163-.217.327-.84.109-1.03.327-.19.218-.38.245-.707.082-.326-.163-1.379-.508-2.628-1.622-.972-.867-1.628-1.939-1.819-2.265-.19-.327-.02-.504.143-.666.147-.146.326-.38.489-.571.163-.19.217-.327.326-.545.109-.217.054-.408-.027-.571-.082-.163-.734-1.77-.993-2.427-.27-.648-.545-.558-.748-.558-.19 0-.408-.009-.625-.009-.218 0-.571.082-.87.408-.299.327-1.14 1.116-1.14 2.723 0 1.608 1.169 3.159 1.328 3.377.163.218 2.3 3.511 5.572 4.922.778.336 1.385.537 1.859.688.783.249 1.497.214 2.06.13.627-.094 1.93-.79 2.2-1.514.269-.724.269-1.345.19-1.474-.079-.13-.298-.211-.624-.374z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-8 border-t border-[#322C28] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500">
        <span>© {currentYear} SIRAJ LUXURY COUTURE. All Rights Reserved.</span>
        <div className="flex gap-4.5">
          <button onClick={() => handleLinkClick('exchange-policy')} className="hover:underline cursor-pointer">
            Terms & Return
          </button>
          <span>•</span>
          <button onClick={() => handleScrollToSection('faq-section')} className="hover:underline cursor-pointer">
            FAQ
          </button>
        </div>
      </div>
    </footer>
  );
}

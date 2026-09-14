import { useState } from 'react';
import { ChevronDown, ShoppingBag, Truck, RotateCcw, Ruler, CreditCard, PackageCheck, Headphones } from 'lucide-react';

const faqItems = [
  {
    id: 'orders',
    icon: ShoppingBag,
    question: "How do I place an order online?",
    answer: "Browse our curated Female Couture or Kids collections, select your desired size from the interactive product page, and click 'Add to Bag'. Open your shopping cart drawer to review selected garments, then proceed to secure checkout where you enter your delivery address, contact information, and payment choice."
  },
  {
    id: 'delivery',
    icon: Truck,
    question: "What is your delivery timeframe across Pakistan?",
    answer: "All orders are safely packed in bespoke boutique boxes and dispatched from our atelier. Standard courier transit takes 2 to 4 working days to major cities across Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, and Multan). Remote and suburban locations may require 1 additional business day."
  },
  {
    id: 'shipping',
    icon: PackageCheck,
    question: "Do you offer free nationwide shipping?",
    answer: "Yes, we provide complimentary Free Shipping on all orders of PKR 5,000 and above across Pakistan. For orders below PKR 5,000, a nominal standard shipping fee of PKR 250 is applied at checkout."
  },
  {
    id: 'returns',
    icon: RotateCcw,
    question: "What is your return and exchange policy?",
    answer: "We offer a 30-day hassle-free doorstep pickup exchange service. If a size does not fit or you wish to exchange an unworn garment, we arrange our courier partner to collect the item from your doorstep and deliver the replacement. Items must be unworn, unwashed, with original tags intact in their luxury box. Refunds are processed within 3 working days via store voucher or direct bank transfer upon receiving the garment. Note: Clearance items are eligible for size exchange only."
  },
  {
    id: 'sizing',
    icon: Ruler,
    question: "How do I choose the right size for females and kids?",
    answer: "For women's luxury pret and festive suits, we offer standard sizes: XS, S, M, L, and XL. For kids, our collections are categorized by age brackets: Baby (9M–2Y), Toddler (3Y–6Y), Kids (7Y–12Y), and Teens (13Y–16Y). Each garment page includes precise chest, shoulder, and length measurements. If you require custom adjustments, you can also consult our concierge team directly on WhatsApp."
  },
  {
    id: 'payments',
    icon: CreditCard,
    question: "What payment methods do you accept?",
    answer: "We offer multiple secure payment channels for your convenience: Cash on Delivery (COD) across Pakistan, Direct Online Bank Transfer, and Instant Mobile Wallets (JazzCash & Easypaisa)."
  },
  {
    id: 'tracking',
    icon: Headphones,
    question: "How can I track my order status?",
    answer: "Once your order has been packaged and handed over to our courier partner, you will receive an instant dispatch notification with a live tracking number via WhatsApp and SMS. You can also contact our concierge desk directly at +92 300 6545678 (Monday–Saturday, 10:00 AM – 6:00 PM) for real-time shipment status."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState('orders');

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-20 bg-white border-b border-[#F0EAE1] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-gold font-bold uppercase block mb-2">
            Client Assistance
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-px bg-luxury-gold/50 mx-auto my-3" />
          <p className="text-xs text-gray-500 font-sans font-light leading-relaxed">
            Clear guidelines on placing orders, doorstep delivery, exchanges, sizing brackets, and secure payments.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="divide-y divide-[#F0EAE1] border-y border-[#F0EAE1]">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const Icon = item.icon;

            return (
              <div key={item.id} className="transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-5 flex items-center justify-between text-left gap-4 cursor-pointer group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                      isOpen
                        ? 'bg-luxury-gold text-white'
                        : 'bg-[#F9F5EC] text-luxury-gold group-hover:bg-[#F3EBE0]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`font-serif text-sm md:text-base transition-colors ${
                      isOpen
                        ? 'text-luxury-dark font-semibold'
                        : 'text-[#3A2F2B] font-medium group-hover:text-luxury-gold'
                    }`}>
                      {item.question}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-luxury-gold' : 'text-gray-400 group-hover:text-luxury-dark'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Accordion Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-11 pr-4 text-xs font-sans text-gray-600 leading-relaxed font-light">
                    <p className="bg-[#FAF7F2] p-4 rounded-sm border-l-2 border-luxury-gold">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 text-center bg-[#F9F5EC] border border-[#E5DCD0]/60 rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-sm font-semibold text-luxury-dark">
              Have an unanswered question?
            </h4>
            <p className="text-[11px] font-sans text-gray-500 font-light mt-0.5">
              Our client concierge desk is available Monday to Saturday, 10:00 AM to 6:00 PM.
            </p>
          </div>
          <a
            href="https://wa.me/923006545678"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-luxury-dark hover:bg-luxury-gold text-white text-[11px] font-sans uppercase tracking-widest font-bold py-3 px-6 rounded-sm transition-colors shrink-0 shadow-xs"
          >
            Direct WhatsApp Concierge
          </a>
        </div>
      </div>
    </section>
  );
}

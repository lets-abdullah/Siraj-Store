import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function Hero({ onNavigate, onFilterGender, onFilterCategory, onFilterMainCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/women_eastern_1.png",
      title: "Royal Emerald Couture '26",
      subtitle: "Step into regal opulence with our signature raw silk festive ensemble. Featuring intricate gold tilla embroidery, hand-set sequence embellishments, and a flowing chiffon dupatta crafted for timeless elegance.",
      tag: "FEMALES LUXURY COUTURE",
      edition: "Festive Pret '26",
      highlights: [
        "100% Pure Raw Silk & Chiffon Dupatta",
        "Hand-Embellished Zari & Sequence Motifs",
        "Available in Standard Women Sizes XS — XL"
      ],
      imgPos: "object-top"
    },
    {
      image: "/women_lawn_1.png",
      title: "Mehrunisa Luxury Lawn '26",
      subtitle: "A celebration of modern femininity crafted from breathable luxury jacquard lawn. Adorned with delicate schiffli cutwork lace borders and complemented by a bespoke digital pure silk printed dupatta.",
      tag: "WOMEN'S PRET & LAWN",
      edition: "Summer Capsule",
      highlights: [
        "Ultra-Breathable Soft Slub Jacquard Lawn",
        "Intricate Schiffli Cutwork Scalloped Borders",
        "Includes Premium Silk Finished Dupatta"
      ],
      imgPos: "object-top"
    },
    {
      image: "/girls_eastern_1.png",
      title: "The Heritage Eastern Kids",
      subtitle: "Timeless traditional silhouettes re-imagined for your little ones. Designed with skin-friendly slub cotton and finished with elegant threadwork embroidery that keeps children comfortable through family celebrations.",
      tag: "KIDS EASTERN COLLECTION",
      edition: "Boutique Kids",
      highlights: [
        "Gentle Hypoallergenic Organic Cotton Lining",
        "Pre-Shrunk & Colorfast Festive Fabric",
        "Tailored for Kids Ages 9 Months to 16 Years"
      ],
      imgPos: "object-center"
    },
    {
      image: "/boys_suit_1.png",
      title: "Kids Summer Clearance '26",
      subtitle: "Reimagine everyday playtime comfort with our seasonal clearance edit. Premium lightweight linen-cotton shorts and breathable co-ord sets designed for all-day ease and active outdoor adventures.",
      tag: "UP TO 40% OFF KIDS",
      edition: "Limited Markdown",
      highlights: [
        "Up to 40% Off on Verified Seasonal Favorites",
        "Lightweight Breathable Pure Linen Blends",
        "Durable Multi-Stitched Activewear Construction"
      ],
      imgPos: "object-top"
    },
    {
      image: "/girls_western_1.png",
      title: "Blossom Tiered Edits (Kids)",
      subtitle: "Inspired by blooming summer gardens, this tiered frock edit features soft floral pastels, flutter ruffle sleeves, and mother-of-pearl buttons. Tailored with lightweight airy cotton to keep your little princess cool, graceful, and happy.",
      tag: "NEW ARRIVALS (KIDS)",
      edition: "Fresh Drop",
      highlights: [
        "100% Breathable Summer Pure Cotton",
        "Delicate Botanical Prints with Flutter Ruffles",
        "Soft Inner Lining for All-Day Play Comfort"
      ],
      imgPos: "object-center"
    },
    {
      image: "/boys_eastern_1.png",
      title: "Azadi Kids Celebration",
      subtitle: "Commemorate national heritage with pride and grace. Dress your little ones in our emerald green and crisp white festive kurtas, tailored with contrast collar stitch details and mother-of-pearl buttons.",
      tag: "AZADI FLAT 14% OFF",
      edition: "Heritage Edition",
      highlights: [
        "Commemorative Green & Crisp White Palette",
        "Embroidered Collar & Cuff Accents",
        "Breathable Wash-and-Wear Cotton Fabric"
      ],
      imgPos: "object-top"
    },
    {
      image: "/products/girls_eastern_rosewood.jpg",
      title: "Eid Festive Ghararas (Kids)",
      subtitle: "Make special family festivities unforgettable with our handcrafted girls' gharara suits. Featuring gold gota patti work, lustrous raw silk flare, and lightweight dupattas tailored for youthful elegance.",
      tag: "KIDS FESTIVE SPECIALS",
      edition: "Heirloom Edit",
      highlights: [
        "Lustrous Raw Silk Flare with Gold Gota Borders",
        "Lightweight Dupatta with Finished Lace Trims",
        "Comfortable Elastic Waistband for Easy Movement"
      ],
      imgPos: "object-top"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleCta = (type) => {
    if (type === 'Females') {
      if (onFilterMainCategory) onFilterMainCategory('Females', 'All', 'Women');
      else {
        onFilterGender('Women');
        onFilterCategory('All');
      }
    } else {
      if (onFilterMainCategory) onFilterMainCategory('Kids', 'All', 'All');
      else {
        onFilterGender('All');
        onFilterCategory('All');
      }
    }
    onNavigate('shop');
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[620px] md:h-[86vh] md:min-h-[640px] md:max-h-[800px] overflow-hidden bg-linear-to-br from-luxury-cream via-[#FAF6F0] to-[#F3EEE5] border-b border-[#F0EAE1]">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Centered bounded container: fixes excessive whitespace on wide screens */}
          <div className="max-w-6xl xl:max-w-7xl mx-auto w-full h-full px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between py-5 md:py-0 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            
            {/* Text Content Block */}
            <div className="w-full md:w-7/12 lg:w-3/5 flex flex-col justify-center text-center md:text-left order-2 md:order-1 select-none shrink-0">
              
              {/* Top Tag */}
              <div className="mb-1.5 md:mb-3">
                <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.26em] font-bold text-luxury-gold inline-block">
                  {slide.tag}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-luxury-dark font-semibold leading-[1.16] mb-2 sm:mb-2.5 md:mb-3.5 animate-slide-up">
                {slide.title}
              </h1>

              {/* Detailed Subtitle / Description */}
              <p className="text-xs sm:text-[13px] md:text-sm font-sans text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed mb-4 sm:mb-5 md:mb-7 font-light line-clamp-3 md:line-clamp-none">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 mb-3 sm:mb-4 md:mb-5">
                <button
                  onClick={() => handleCta('Females')}
                  className="cursor-pointer group flex items-center gap-1.5 sm:gap-2 bg-luxury-dark text-white hover:bg-luxury-gold text-[11px] sm:text-xs font-sans uppercase tracking-widest font-bold py-2.5 px-4 sm:py-3 sm:px-6 md:py-3.5 md:px-7 rounded-sm shadow-md transition-all duration-300"
                >
                  Shop Females <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleCta('Kids')}
                  className="cursor-pointer group flex items-center gap-1.5 sm:gap-2 bg-white text-luxury-dark hover:text-luxury-gold border border-luxury-dark hover:border-luxury-gold text-[11px] sm:text-xs font-sans uppercase tracking-widest font-bold py-2.5 px-4 sm:py-3 sm:px-6 md:py-3.5 md:px-7 rounded-sm transition-all duration-300 shadow-2xs"
                >
                  Shop Kids
                </button>
              </div>

              {/* Trust Assurance Strip */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 text-[9.5px] sm:text-[10.5px] font-sans text-gray-500 font-light border-t border-[#E5DCD0]/60 pt-2.5 md:pt-3">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-luxury-gold shrink-0" /> Free Nationwide Delivery above PKR 5,000
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-luxury-gold shrink-0" /> 30-Day Doorstep Exchange
                </span>
              </div>
            </div>

            {/* Asymmetrical Image Block: responsive height and proper aspect ratio */}
            <div className="w-full md:w-5/12 lg:w-2/5 flex items-center justify-center order-1 md:order-2 shrink-0">
              <div className="w-44 h-56 sm:w-52 sm:h-64 md:w-full md:max-w-105 lg:max-w-115 md:h-[84%] md:max-h-135 relative rounded-[26px_65px_32px_80px] md:rounded-[40px_180px_50px_220px] overflow-hidden border-2 border-white shadow-2xl bg-white/40 flex items-center justify-center group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover ${slide.imgPos || 'object-top'} transform scale-100 group-hover:scale-105 transition-transform duration-[4s] ease-out origin-top`}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600/f3eee5/1e1a17?text=SIRAJ+Collection";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-luxury-dark p-2.5 rounded-full shadow-md z-20 hover:scale-110 transition-all duration-300 border border-gray-100 hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-luxury-dark p-2.5 rounded-full shadow-md z-20 hover:scale-110 transition-all duration-300 border border-gray-100 hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-6 sm:left-10 md:left-14 lg:left-20 flex items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer h-1.5 transition-all duration-500 rounded-full ${
              index === currentSlide ? 'w-8 bg-luxury-gold' : 'w-2 bg-luxury-dark/30 hover:bg-luxury-dark/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

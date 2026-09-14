import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function Hero({ onNavigate, onFilterGender, onFilterCategory, onFilterMainCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/women_eastern_1.png",
      title: "Royal Emerald Couture '26",
      subtitle: "Exquisite hand-embellished raw silk and formal festive attire tailored exclusively for adult women.",
      tag: "FEMALES LUXURY COUTURE",
      ctaGirls: "Shop Females",
      ctaBoys: "Shop Kids",
      bgColor: "bg-[#F7ECE4]",
      textColor: "text-[#3E2E25]",
      imgPos: "object-top"
    },
    {
      image: "/women_lawn_1.png",
      title: "Mehrunisa Luxury Lawn '26",
      subtitle: "Breathtaking schiffli cutwork and digital pure silk dupattas designed for the refined modern woman.",
      tag: "WOMEN'S PRET & LAWN",
      ctaGirls: "Shop Females",
      ctaBoys: "Shop Kids",
      bgColor: "bg-[#FDF6F0]",
      textColor: "text-[#3B2C24]",
      imgPos: "object-top"
    },
    {
      image: "/girls_eastern_1.png",
      title: "The Heritage Eastern Kids",
      subtitle: "Exquisite hand-embellished kurtas and traditional outfits tailored in organic linen and soft slub cotton.",
      tag: "KIDS EASTERN COLLECTION",
      ctaGirls: "Shop Females",
      ctaBoys: "Shop Kids",
      bgColor: "bg-[#F7ECE4]",
      textColor: "text-[#3E2E25]",
      imgPos: "object-center"
    },
    {
      image: "/boys_suit_1.png",
      title: "Kids Summer Clearance '26",
      subtitle: "Reimagine comfort. Premium linen-cotton shorts and lightweight sets featuring unique, breathable fabrics.",
      tag: "UP TO 40% OFF KIDS",
      ctaGirls: "Shop Females",
      ctaBoys: "Shop Kids",
      bgColor: "bg-[#E6ECE7]",
      textColor: "text-[#273B29]",
      imgPos: "object-top"
    },
    {
      image: "/girls_western_1.png",
      title: "Blossom Tiered Edits (Kids)",
      subtitle: "Soft pastels and playful structures designed to endure the active joy of childhood.",
      tag: "NEW ARRIVALS (KIDS)",
      ctaGirls: "Shop Females",
      ctaBoys: "Shop Kids",
      bgColor: "bg-[#ECE6EB]",
      textColor: "text-[#422C3A]",
      imgPos: "object-center"
    },
    {
      image: "/boys_eastern_1.png",
      title: "Azadi Kids Celebration",
      subtitle: "Commemorate freedom with grace. Dress your little ones in premium green and white themed festive kurtas and suits.",
      tag: "AZADI FLAT 14% OFF",
      ctaGirls: "Shop Females",
      ctaBoys: "Shop Kids",
      bgColor: "bg-[#E2EFE5]",
      textColor: "text-[#1C3B24]",
      imgPos: "object-top"
    },
    {
      image: "/products/girls_eastern_rosewood.jpg",
      title: "Eid Festive Ghararas (Kids)",
      subtitle: "Intricately detailed raw silk ghararas and premium gold embroidered kurtas tailored for special family festivities.",
      tag: "KIDS FESTIVE SPECIALS",
      ctaGirls: "Shop Females",
      ctaBoys: "Shop Kids",
      bgColor: "bg-[#F5EFE0]",
      textColor: "text-[#473B1B]",
      imgPos: "object-top"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
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
    <section className="relative w-full h-[85vh] min-h-125 md:h-[90vh] overflow-hidden bg-linear-to-br from-luxury-cream to-[#F3EEE5] border-b border-[#F0EAE1]">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Text Content Block */}
          <div className="w-full md:w-1/2 h-[45%] md:h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 text-left order-2 md:order-1 select-none">
            <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.3em] font-bold text-luxury-gold mb-3 md:mb-4 inline-block">
              {slide.tag}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-luxury-dark font-semibold leading-[1.15] mb-4 md:mb-6 animate-slide-up">
              {slide.title}
            </h1>
            <p className="text-xs md:text-sm font-sans text-gray-600 max-w-md leading-relaxed mb-6 md:mb-8 font-light">
              {slide.subtitle}
            </p>
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => handleCta('Females')}
                className="cursor-pointer group flex items-center gap-2 bg-luxury-dark text-white hover:bg-luxury-gold text-xs font-sans uppercase tracking-widest font-bold py-3.5 px-6 md:px-7 rounded-sm shadow-md transition-all duration-300"
              >
                Shop Females <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleCta('Kids')}
                className="cursor-pointer group flex items-center gap-2 bg-transparent text-luxury-dark hover:text-luxury-gold border border-luxury-dark hover:border-luxury-gold text-xs font-sans uppercase tracking-widest font-bold py-3.5 px-6 md:px-7 rounded-sm transition-all duration-300"
              >
                Shop Kids
              </button>
            </div>
          </div>

          {/* Asymmetrical Image block */}
          <div className="w-full md:w-1/2 h-[55%] md:h-full relative overflow-hidden order-1 md:order-2 flex items-center justify-center p-4 md:p-8 lg:p-12">
            <div className="w-full max-w-115 h-[92%] max-h-145 relative rounded-[30px_100px_40px_120px] md:rounded-[40px_180px_50px_220px] overflow-hidden border-2 border-white shadow-2xl bg-white/40 flex items-center justify-center group">
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
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-luxury-dark p-2.5 rounded-full shadow-md z-20 hover:scale-115 transition-all duration-300 border border-gray-100 hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-luxury-dark p-2.5 rounded-full shadow-md z-20 hover:scale-115 transition-all duration-300 border border-gray-100 hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-6 md:left-16 flex items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer h-1.5 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-8 bg-luxury-gold' : 'w-2 bg-luxury-dark/30 hover:bg-luxury-dark/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

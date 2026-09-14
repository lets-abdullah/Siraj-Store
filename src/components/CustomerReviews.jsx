import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: "Ayesha Khan",
    rating: 5,
    date: "May 2026",
    comment: "Amazing stitching and premium packaging! The slub cotton is extremely soft and perfect for the Lahore summer heat. Ordered 3-4Y for my daughter and fits perfectly.",
    fit: "Fits True to Size"
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    rating: 4,
    date: "May 2026",
    comment: "The sky blue boys kameez is beautiful. Buttons are high quality, stitching is clean. Deducted 1 star because shipping took 4 days to Karachi, but worth the wait.",
    fit: "Fits True to Size"
  },
  {
    id: 3,
    name: "Maria Zain",
    rating: 5,
    date: "May 2026",
    comment: "Very impressed by the Minecraft Terry lounge suit. Usually kids clothes shrink after one wash, but this material is thick, high-end, and hasn't lost its print at all.",
    fit: "Fits Slightly Large"
  },
  {
    id: 4,
    name: "Dr. Farah",
    rating: 5,
    date: "May 2026",
    comment: "The hand embroidery on the peach suit is absolutely stunning. Reminds me of boutique designer wear. Will definitely buy again from Summer '26 collection.",
    fit: "Fits True to Size"
  }
];

export default function CustomerReviews() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % reviewsData.length);
  };

  // Visible reviews for 3-column desktop layout (cyclic wrap)
  const visibleReviews = [
    reviewsData[startIndex],
    reviewsData[(startIndex + 1) % reviewsData.length],
    reviewsData[(startIndex + 2) % reviewsData.length]
  ];

  return (
    <section id="customer-reviews" className="py-20 bg-luxury-cream border-b border-[#F0EAE1] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-gold font-bold uppercase block mb-2">
            Client Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-semibold tracking-tight">
            Loved by Our Customers
          </h2>
          <div className="w-12 h-px bg-luxury-gold/50 mx-auto my-3" />
          <p className="text-xs text-gray-500 font-sans font-light leading-relaxed">
            Patron testimonials on our bespoke cuts, natural breathable fabrics, and enduring boutique stitching.
          </p>
        </div>

        {/* Carousel / Multi-column Layout */}
        <div className="relative">
          {/* Desktop 3-column view */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="bg-white border border-[#E5DCD0]/60 rounded-sm p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-luxury-gold" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? 'fill-current' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#E5DCD0] group-hover:text-luxury-gold transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs font-sans text-gray-600 leading-relaxed font-light italic mb-6">
                    "{review.comment}"
                  </p>
                </div>

                {/* Customer Information Footer */}
                <div className="border-t border-[#F0EAE1] pt-4 mt-auto">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-serif text-sm font-semibold text-luxury-dark tracking-wide">
                      {review.name}
                    </h4>
                    <span className="text-[10px] font-sans text-gray-400">
                      {review.date}
                    </span>
                  </div>
                  {review.fit && (
                    <span className="text-[10px] font-sans text-luxury-gold font-medium block mt-1">
                      {review.fit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-[#E5DCD0] bg-white text-luxury-dark hover:bg-luxury-gold hover:text-white hover:border-luxury-gold transition-colors shadow-xs cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {reviewsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStartIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    startIndex === i
                      ? 'w-6 bg-luxury-gold'
                      : 'w-2 bg-[#DED4C7] hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-[#E5DCD0] bg-white text-luxury-dark hover:bg-luxury-gold hover:text-white hover:border-luxury-gold transition-colors shadow-xs cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

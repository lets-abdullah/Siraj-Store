import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  currency
}) {
  if (!isOpen) return null;

  const FREE_SHIPPING_LIMIT = 5000;
  
  // Calculate Subtotal (assuming PKR price in database)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100);

  const getPrice = (price) => {
    if (currency === 'PKR') {
      return `Rs. ${price.toLocaleString()}`;
    }
    return `$ ${(price / 280).toFixed(2)}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-luxury-dark/60 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-luxury-cream h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E5DCD0] animate-slide-left"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#F0EAE1] flex justify-between items-center bg-luxury-cream">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-luxury-gold" />
            <h3 className="font-serif text-luxury-dark font-semibold text-lg">Your Bag ({cartItems.length})</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[#F9F5EC] rounded-full text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Tracker */}
        <div className="px-5 py-4 bg-[#F9F5EC] border-b border-[#F0EAE1]">
          {remainingForFreeShipping > 0 ? (
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-sans text-gray-600 font-medium">
                You are only <strong className="text-luxury-dark font-bold">{getPrice(remainingForFreeShipping)}</strong> away from <strong className="text-luxury-gold">FREE SHIPPING</strong>!
              </span>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-luxury-gold h-full rounded-full transition-all duration-700" 
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-sans text-green-700 font-bold flex items-center gap-1">
                🎉 Congratulations! You qualify for FREE SHIPPING across Pakistan.
              </span>
              <div className="w-full bg-green-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-green-600 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0EAE1]/80">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center select-none">
              <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
              <span className="font-serif text-luxury-dark text-sm font-semibold">Your shopping bag is empty</span>
              <p className="text-xs text-gray-400 font-sans mt-1 mb-6">Browse our Collections and add some premium suits.</p>
              <button 
                onClick={() => { onClose(); }} 
                className="bg-luxury-dark text-white text-xs font-sans uppercase tracking-widest font-bold py-3 px-6 rounded-sm hover:bg-luxury-gold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}`} className="py-4.5 flex gap-4 text-left">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-18 h-22 object-cover bg-[#F9F5EC] rounded-sm border border-gray-150 shrink-0"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/100x120/f3eee5/1e1a17?text=BR";
                  }}
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-sans text-luxury-dark font-bold line-clamp-1">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => onRemoveItem(item.id, item.selectedSize)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] font-sans text-gray-500 block mt-0.5">
                      Size Bracket: <strong className="text-luxury-gold">{item.selectedSize}</strong>
                    </span>
                    <span className="text-[11px] font-sans text-gray-600 block mt-1 font-semibold">
                      {getPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex justify-between items-center mt-2.5">
                    <div className="flex items-center border border-[#E5DCD0] rounded-sm bg-white overflow-hidden shadow-inner">
                      <button 
                        onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-[#F9F5EC] transition-colors"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-3 text-xs font-sans text-luxury-dark font-semibold select-none">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-[#F9F5EC] transition-colors"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    
                    {/* Item Total */}
                    <span className="text-xs font-sans text-luxury-dark font-bold">
                      {getPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal block */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#F0EAE1] bg-white flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm text-luxury-dark font-sans">
              <span className="font-semibold">Estimated Subtotal</span>
              <span className="font-bold text-base">{getPrice(subtotal)}</span>
            </div>
            
            <div className="text-[10px] text-gray-400 font-sans leading-normal text-left">
              Shipping & taxes calculated at checkout. PEV verified secure order pipeline.
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => { onClose(); }} 
                className="flex-1 py-3.5 border border-[#E5DCD0] text-[#3A2F2B] hover:bg-[#F9F5EC] text-xs font-sans uppercase tracking-widest font-bold rounded-sm transition-all"
              >
                Keep Shopping
              </button>
              <button 
                onClick={onCheckout}
                className="flex-1 group bg-luxury-dark hover:bg-luxury-gold text-white text-xs font-sans uppercase tracking-widest font-bold py-3.5 px-4 rounded-sm shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                Checkout <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

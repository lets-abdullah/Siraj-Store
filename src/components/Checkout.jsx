import { useState } from 'react';
import { ShoppingBag, ArrowLeft, Ticket, Check, AlertTriangle, Printer } from 'lucide-react';
import { couponCodes } from '../data/products';

export default function Checkout({
  cartItems,
  onClearCart,
  onNavigate,
  currency
}) {
  const [couponCode, setCouponCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState(null); // { code: '...', percent: 10 }
  const [couponError, setCouponError] = useState('');
  
  // Shipping form fields
  const [shippingForm, setShippingForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    province: 'Punjab',
    postalCode: '',
    phone: '',
    paymentMethod: 'cod'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  
  const discountAmount = activeDiscount ? Math.round((subtotal * activeDiscount.percent) / 100) : 0;
  const grandTotal = subtotal + shippingFee - discountAmount;

  const getPrice = (price) => {
    if (currency === 'PKR') {
      return `Rs. ${price.toLocaleString()}`;
    }
    return `$ ${(price / 280).toFixed(2)}`;
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (couponCodes[code] !== undefined) {
      setActiveDiscount({ code, percent: couponCodes[code] });
      setCouponCode('');
    } else {
      setCouponError('Invalid voucher code. Try WELCOME10 or SUMMER40.');
    }
  };

  const handleRemoveCoupon = () => {
    setActiveDiscount(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errors = {};
    if (!shippingForm.email.trim() || !/\S+@\S+\.\S+/.test(shippingForm.email)) errors.email = "Valid email is required";
    if (!shippingForm.firstName.trim()) errors.firstName = "First name is required";
    if (!shippingForm.lastName.trim()) errors.lastName = "Last name is required";
    if (!shippingForm.address.trim()) errors.address = "Address is required";
    if (!shippingForm.city.trim()) errors.city = "City is required";
    if (!shippingForm.phone.trim() || shippingForm.phone.length < 10) errors.phone = "Provide a valid phone number";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const orderNum = `BR-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrderDetails({
      orderNumber: orderNum,
      customerName: `${shippingForm.firstName} ${shippingForm.lastName}`,
      address: `${shippingForm.address}, ${shippingForm.apartment ? shippingForm.apartment + ', ' : ''}${shippingForm.city}`,
      phone: shippingForm.phone,
      payment: shippingForm.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : shippingForm.paymentMethod === 'bank' ? 'Direct Bank Transfer' : 'EasyPaisa/JazzCash Mobile Wallet',
      subtotal,
      shippingFee,
      discount: discountAmount,
      total: grandTotal,
      items: [...cartItems]
    });
    setOrderPlaced(true);
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderPlaced && placedOrderDetails) {
    return (
      <div className="w-full bg-luxury-cream py-16 px-4 flex justify-center items-center">
        <div className="w-full max-w-xl bg-white border border-[#E5DCD0] shadow-2xl p-8 rounded-sm text-left animate-fade-in">
          <div className="text-center pb-6 border-b border-[#F0EAE1] mb-6 flex flex-col items-center">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4 border border-green-200">
              <Check className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mb-1">
              Order Dispatched
            </span>
            <h2 className="font-serif text-2xl text-luxury-dark font-semibold">Thank You For Your Order!</h2>
            <p className="text-xs text-gray-500 font-sans mt-1">Your order number is <strong className="text-luxury-dark">{placedOrderDetails.orderNumber}</strong>. We've sent a WhatsApp receipt.</p>
          </div>

          <h3 className="text-xs font-sans uppercase font-bold text-gray-400 tracking-wider mb-3">Shipping & Logistics Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-xs font-sans text-luxury-dark bg-[#F9F5EC] p-4 rounded-sm border border-[#E5DCD0]/40 mb-6">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Recipient</span>
              <strong>{placedOrderDetails.customerName}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Phone Number</span>
              <strong>{placedOrderDetails.phone}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Shipping Destination</span>
              <strong>{placedOrderDetails.address}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Selected Payment</span>
              <strong>{placedOrderDetails.payment}</strong>
            </div>
          </div>

          <h3 className="text-xs font-sans uppercase font-bold text-gray-400 tracking-wider mb-3">Order Invoice</h3>
          <div className="flex flex-col gap-3.5 mb-6 divide-y divide-gray-150">
            {placedOrderDetails.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs font-sans text-luxury-dark pt-2 first:pt-0">
                <span>{item.name} <strong className="text-luxury-gold">x{item.quantity}</strong> ({item.selectedSize})</span>
                <span className="font-bold">{getPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#F0EAE1] pt-4.5 flex flex-col gap-2 text-xs font-sans text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{getPrice(placedOrderDetails.subtotal)}</span>
            </div>
            {placedOrderDetails.discount > 0 && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Discount Applied</span>
                <span>-{getPrice(placedOrderDetails.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Logistics (Shipping)</span>
              <span>{placedOrderDetails.shippingFee === 0 ? 'FREE' : getPrice(placedOrderDetails.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm text-luxury-dark font-bold border-t border-[#F0EAE1] pt-3">
              <span>Total Paid Amount</span>
              <span>{getPrice(placedOrderDetails.total)}</span>
            </div>
          </div>

          <div className="flex gap-3.5 mt-8 border-t border-[#F0EAE1] pt-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex-1 py-3.5 border border-[#E5DCD0] text-gray-800 text-xs font-sans uppercase tracking-widest font-bold hover:bg-[#F9F5EC] rounded-sm transition-all text-center"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-3.5 bg-luxury-dark hover:bg-luxury-gold text-white text-xs font-sans uppercase tracking-widest font-bold rounded-sm shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-luxury-cream py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate('shop')}
          className="text-xs uppercase font-sans tracking-widest text-luxury-gold hover:text-luxury-dark mb-8 flex items-center gap-1.5 transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Shop
        </button>

        {cartItems.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center bg-white border border-[#E5DCD0]/45 rounded-sm shadow-sm">
            <ShoppingBag className="w-14 h-14 text-gray-300 mb-3" />
            <h3 className="font-serif text-luxury-dark text-lg font-bold">Checkout is locked</h3>
            <p className="text-xs text-gray-400 font-sans mt-1.5 mb-6">Your shopping cart must have items before checking out.</p>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-luxury-dark hover:bg-luxury-gold text-white text-xs font-sans uppercase tracking-widest font-bold py-3.5 px-6 rounded-sm shadow-md transition-colors"
            >
              Go to Boutique Store
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* 1. LEFT COLUMN: SHIPPING & PAYMENTS FORM */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-7 flex flex-col gap-6 text-left">
              
              <div>
                <h3 className="font-serif text-lg text-luxury-dark font-semibold mb-4 border-b border-[#F0EAE1] pb-2">Customer & Shipping Information</h3>
                
                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Contact Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingForm.email}
                      onChange={handleInputChange}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                    />
                    {formErrors.email && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.email}</span>}
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans uppercase font-bold text-gray-500">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingForm.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                      />
                      {formErrors.firstName && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.firstName}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingForm.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                      />
                      {formErrors.lastName && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.lastName}</span>}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingForm.address}
                      onChange={handleInputChange}
                      placeholder="Street address, house number"
                      className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                    />
                    {formErrors.address && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.address}</span>}
                  </div>

                  {/* Apartment */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Apartment, Suite, Unit (Optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={shippingForm.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment #, floor, etc."
                      className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                    />
                  </div>

                  {/* City & Province & Zip */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans uppercase font-bold text-gray-500">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingForm.city}
                        onChange={handleInputChange}
                        placeholder="Lahore"
                        className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                      />
                      {formErrors.city && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.city}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Province</label>
                      <select
                        name="province"
                        value={shippingForm.province}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm focus:ring-0 focus:outline-none"
                      >
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Federal">Islamabad Capital</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingForm.postalCode}
                        onChange={handleInputChange}
                        placeholder="54000"
                        className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-sans uppercase font-bold text-gray-500">Mobile Phone (WhatsApp Active)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2.5 text-xs border border-[#E5DCD0] bg-white rounded-sm"
                    />
                    {formErrors.phone && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="font-serif text-lg text-luxury-dark font-semibold mb-4 border-b border-[#F0EAE1] pb-2">Select Payment Method</h3>
                
                <div className="flex flex-col gap-3">
                  {/* COD */}
                  <label className={`border p-4 rounded-sm flex items-center justify-between cursor-pointer transition-all ${shippingForm.paymentMethod === 'cod' ? 'border-luxury-gold bg-[#F9F5EC]' : 'border-[#E5DCD0] bg-white hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={shippingForm.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-luxury-gold"
                      />
                      <div>
                        <span className="text-xs font-sans font-bold text-luxury-dark block">Cash on Delivery (COD)</span>
                        <span className="text-[10px] text-gray-500 font-sans mt-0.5">Pay in cash when rider delivers the package.</span>
                      </div>
                    </div>
                  </label>

                  {/* Direct Bank Transfer */}
                  <label className={`border p-4 rounded-sm flex items-center justify-between cursor-pointer transition-all ${shippingForm.paymentMethod === 'bank' ? 'border-luxury-gold bg-[#F9F5EC]' : 'border-[#E5DCD0] bg-white hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={shippingForm.paymentMethod === 'bank'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-luxury-gold"
                      />
                      <div>
                        <span className="text-xs font-sans font-bold text-luxury-dark block">Direct Bank Transfer</span>
                        <span className="text-[10px] text-gray-500 font-sans mt-0.5">Send directly to Bank Alfalah: A/C 02334827103 (BR Brands).</span>
                      </div>
                    </div>
                  </label>

                  {/* EasyPaisa / JazzCash */}
                  <label className={`border p-4 rounded-sm flex items-center justify-between cursor-pointer transition-all ${shippingForm.paymentMethod === 'wallet' ? 'border-luxury-gold bg-[#F9F5EC]' : 'border-[#E5DCD0] bg-white hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={shippingForm.paymentMethod === 'wallet'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-luxury-gold"
                      />
                      <div>
                        <span className="text-xs font-sans font-bold text-luxury-dark block">EasyPaisa / JazzCash Mobile Wallet</span>
                        <span className="text-[10px] text-gray-500 font-sans mt-0.5">Transfer instantly to account: 0300-6545678.</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                className="w-full bg-luxury-dark hover:bg-luxury-gold text-white text-xs font-sans uppercase tracking-widest font-bold py-4 rounded-sm shadow-md transition-colors mt-4 h-13 flex items-center justify-center"
              >
                Place Secure Order &nbsp; ({getPrice(grandTotal)})
              </button>
            </form>

            {/* 2. RIGHT COLUMN: STICKY ORDER SUMMARY */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-[#E5DCD0] p-6 rounded-sm shadow-sm text-left">
              <h3 className="font-serif text-luxury-dark font-semibold text-base mb-4 border-b border-[#F0EAE1] pb-2">Order Cart Summary</h3>
              
              {/* Product item listings */}
              <div className="flex flex-col gap-4 border-b border-[#F0EAE1] pb-5 mb-5 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-15 object-cover rounded-sm border border-gray-100 bg-[#F9F5EC]"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/100x120/f3eee5/1e1a17?text=BR";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-sans font-bold text-luxury-dark truncate">{item.name}</h4>
                      <span className="text-[10px] font-sans text-gray-400 block mt-0.5">Size Bracket: {item.selectedSize}</span>
                      <span className="text-xs font-sans text-gray-600 block mt-0.5">{item.quantity} x {getPrice(item.price)}</span>
                    </div>
                    <span className="text-xs font-sans font-bold text-luxury-dark">{getPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Voucher apply coupon form */}
              <div className="border-b border-[#F0EAE1] pb-5 mb-5">
                <span className="text-[10px] font-sans uppercase font-bold text-gray-400 tracking-wider block mb-2">Discount Coupon Code</span>
                {activeDiscount ? (
                  <div className="bg-[#EAF5EC] border border-[#CDE5D2] rounded-sm p-3 flex justify-between items-center text-xs font-sans text-green-800">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Code <strong>{activeDiscount.code}</strong> Applied ({activeDiscount.percent}% discount)</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-gray-400 hover:text-red-500 font-bold ml-2"
                      title="Remove Discount"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Voucher code (e.g. WELCOME10)"
                        className="w-full px-3 py-2 text-xs border border-[#E5DCD0] bg-white rounded-sm uppercase tracking-wider"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-luxury-dark hover:bg-luxury-gold text-white text-[11px] font-sans uppercase tracking-widest font-bold px-4 rounded-sm shadow-sm transition-colors flex items-center gap-1"
                    >
                      <Ticket className="w-3.5 h-3.5" /> Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <span className="text-[10px] text-red-500 font-sans flex items-center gap-0.5 mt-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> {couponError}
                  </span>
                )}
              </div>

              {/* Order calculations */}
              <div className="flex flex-col gap-2.5 text-xs font-sans text-gray-600">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-luxury-dark">{getPrice(subtotal)}</span>
                </div>
                {activeDiscount && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Voucher Discount</span>
                    <span>-{getPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Logistics & Handling</span>
                  <span className="font-semibold text-luxury-dark">{shippingFee === 0 ? 'FREE' : getPrice(shippingFee)}</span>
                </div>

                <div className="border-t border-[#F0EAE1] pt-3.5 mt-2 flex justify-between items-baseline text-sm text-luxury-dark font-bold">
                  <span>Total Bill Amount</span>
                  <span className="text-base text-luxury-gold font-sans font-bold">{getPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-[#F9F5EC] border border-[#E5DCD0]/50 rounded-sm p-4 mt-6 text-left flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 font-sans leading-normal">
                  <strong>PEV Secure Order Pipeline:</strong> If you are not satisfied with the size, SIRAJ offers hassle-free replacement pickups within 30 days of purchase.
                </p>
              </div>

            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

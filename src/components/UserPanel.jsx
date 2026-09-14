import { useState } from 'react';
import { Lock, Mail, User, Phone, LogOut, ShoppingBag, MapPin, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function UserPanel({
  isLoggedIn,
  currentUser,
  onLogin,
  onLogout,
  onNavigate,
  wishlistCount,
  currency
}) {
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Login inputs
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  // Signup inputs
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  // Form errors
  const [errors, setErrors] = useState({});

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || 'Ahmad Ali',
    phone: currentUser?.phone || '+92 300 1234567',
    address: 'House 142, Block H-3, Johar Town',
    city: 'Lahore',
    province: 'Punjab'
  });

  const getPrice = (price) => {
    if (currency === 'PKR') {
      return `Rs. ${price.toLocaleString()}`;
    }
    return `$ ${(price / 280).toFixed(2)}`;
  };

  // Mock Orders History
  const mockOrders = [
    {
      id: "BR-98421",
      date: "2026-05-15",
      total: 7650,
      status: "Delivered",
      items: "Peach Garden Hand-Embroidered Eastern Suit x1, Classic Slate Linen Summer Suit Set x1"
    },
    {
      id: "BR-90321",
      date: "2026-04-10",
      total: 4200,
      status: "Delivered",
      items: "Sky Blue Premium Shalwar Kameez x1"
    }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!loginForm.email.trim() || !/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!loginForm.password || loginForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success login mock
    setFormSuccess(true);
    setTimeout(() => {
      onLogin({
        name: loginForm.email.split('@')[0].toUpperCase(),
        email: loginForm.email,
        phone: '+92 300 6545678'
      });
      setFormSuccess(false);
      setLoginForm({ email: '', password: '' });
    }, 1500);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!signupForm.name.trim()) newErrors.name = "Full name is required";
    if (!signupForm.email.trim() || !/\S+@\S+\.\S+/.test(signupForm.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!signupForm.phone.trim()) newErrors.phone = "Phone number is required";
    if (!signupForm.password || signupForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormSuccess(true);
    setTimeout(() => {
      onLogin({
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone
      });
      setFormSuccess(false);
      setSignupForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    }, 1500);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
  };

  // 1. LOGGED IN DASHBOARD
  if (isLoggedIn && currentUser) {
    return (
      <div className="w-full bg-luxury-cream py-12 px-4 md:px-8 text-left animate-fade-in">
        <div className="max-w-5xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-[#F0EAE1] pb-6 mb-8 gap-4">
            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mb-1">
                Customer Registry Panel
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-luxury-dark font-semibold">
                Assalam-o-Alaikum, {currentUser.name}!
              </h2>
              <p className="text-xs text-gray-500 font-sans font-light mt-1">Manage your order pipeline, shipment addresses, and details.</p>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-bold text-red-600 hover:text-red-700 bg-red-50 border border-red-150 px-4 py-2.5 rounded-sm self-start transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Col: Order History */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h3 className="font-serif text-lg text-luxury-dark font-semibold border-b border-[#F0EAE1]/80 pb-2">Your Orders Log</h3>
              
              {mockOrders.length === 0 ? (
                <div className="py-12 bg-white border border-[#E5DCD0]/40 rounded-sm text-center flex flex-col items-center">
                  <ShoppingBag className="w-10 h-10 text-gray-300 mb-2" />
                  <span className="text-xs font-sans text-gray-500">You haven't placed any orders yet.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {mockOrders.map(order => (
                    <div key={order.id} className="bg-white border border-[#E5DCD0]/50 p-5 rounded-sm shadow-sm">
                      <div className="flex justify-between items-center border-b border-[#F0EAE1]/70 pb-3 mb-3 text-xs font-sans">
                        <div>
                          <span className="text-gray-400">Order ID:</span> <strong className="text-luxury-dark">{order.id}</strong>
                        </div>
                        <span className="text-gray-400">{order.date}</span>
                      </div>
                      
                      <div className="text-xs font-sans text-luxury-dark leading-relaxed mb-3">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Stitched Suits</span>
                        {order.items}
                      </div>

                      <div className="flex justify-between items-center border-t border-[#F0EAE1]/70 pt-3 text-xs font-sans">
                        <div>
                          <span className="text-gray-400">Bill Total:</span> <strong className="text-luxury-dark font-bold">{getPrice(order.total)}</strong>
                        </div>
                        <span className="bg-[#EAF5EC] text-green-700 border border-[#CDE5D2] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Account / Shipping Profile */}
            <div className="flex flex-col gap-6 bg-white border border-[#E5DCD0]/60 p-6 rounded-sm shadow-sm">
              <h3 className="font-serif text-base text-luxury-dark font-semibold border-b border-[#F0EAE1]/80 pb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-luxury-gold" /> Shipping Details
              </h3>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSave} className="flex flex-col gap-4 text-xs font-sans">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                      className="px-3 py-2 border border-[#E5DCD0] rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Phone</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                      className="px-3 py-2 border border-[#E5DCD0] rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Address</label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm(p => ({ ...p, address: e.target.value }))}
                      className="px-3 py-2 border border-[#E5DCD0] rounded-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-gray-500">City</label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm(p => ({ ...p, city: e.target.value }))}
                        className="px-3 py-2 border border-[#E5DCD0] rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-gray-500">Province</label>
                      <input
                        type="text"
                        value={profileForm.province}
                        onChange={(e) => setProfileForm(p => ({ ...p, province: e.target.value }))}
                        className="px-3 py-2 border border-[#E5DCD0] rounded-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2.5 mt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 py-2.5 border border-[#E5DCD0] text-[#3A2F2B] font-bold rounded-sm uppercase tracking-wider text-[10px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-luxury-dark text-white hover:bg-luxury-gold font-bold rounded-sm uppercase tracking-wider text-[10px]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-4 text-xs font-sans">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Email Username</span>
                    <strong>{currentUser.email}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Contact Name</span>
                    <strong>{profileForm.name}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                    <strong>{profileForm.phone}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Shipping Address</span>
                    <strong>{profileForm.address}, {profileForm.city}, {profileForm.province}</strong>
                  </div>
                  
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full py-2.5 border border-[#E5DCD0] text-luxury-dark font-bold rounded-sm uppercase tracking-widest text-[10px] mt-2 hover:bg-[#F9F5EC] transition-all"
                  >
                    Edit Shipping Profile
                  </button>

                  <div className="border-t border-[#F0EAE1] pt-4.5 mt-2 flex justify-between items-center text-[11px]">
                    <span className="text-gray-500">Wishlist Counter:</span>
                    <button
                      onClick={() => { onNavigate('shop'); }}
                      className="text-luxury-gold font-bold hover:underline"
                    >
                      {wishlistCount} Premium Suits
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. LOGGED OUT AUTHENTICATION FORM
  return (
    <div className="w-full bg-luxury-cream py-16 px-4 flex justify-center items-center">
      <div className="w-full max-w-md bg-white border border-[#E5DCD0] shadow-2xl p-8 rounded-sm text-left animate-fade-in relative">
        {/* Success animation overlay */}
        {formSuccess && (
          <div className="absolute inset-0 bg-luxury-cream/90 z-20 flex flex-col items-center justify-center rounded-sm animate-fade-in">
            <CheckCircle className="w-14 h-14 text-green-500 mb-3 animate-bounce" />
            <h4 className="font-serif text-base font-semibold text-luxury-dark">Verification Successful</h4>
            <p className="text-xs text-gray-500 font-sans mt-1">Assalam-o-Alaikum! Loading your premium registry...</p>
          </div>
        )}

        <div className="text-center mb-8 border-b border-[#F0EAE1] pb-5">
          <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold font-bold uppercase block mb-1">
            Boutique Account Registry
          </span>
          <h2 className="font-serif text-2xl text-luxury-dark font-semibold">Join SIRAJ</h2>
          <p className="text-xs text-gray-500 font-sans mt-1">Unlock seamless checkout, order histories, and track details.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E5DCD0] mb-6">
          <button
            onClick={() => { setAuthTab('login'); setErrors({}); }}
            className={`flex-1 py-3 text-xs uppercase font-sans tracking-widest font-bold transition-all border-b-2 ${authTab === 'login' ? 'border-luxury-gold text-luxury-dark' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            Login Credentials
          </button>
          <button
            onClick={() => { setAuthTab('signup'); setErrors({}); }}
            className={`flex-1 py-3 text-xs uppercase font-sans tracking-widest font-bold transition-all border-b-2 ${authTab === 'signup' ? 'border-luxury-gold text-luxury-dark' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            Create Account
          </button>
        </div>

        {/* FORMS */}
        {authTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-xs font-sans">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-luxury-gold" /> Email Address
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(p => ({ ...p, email: e.target.value }))}
                placeholder="name@domain.com"
                className="w-full px-3 py-2.5 border border-[#E5DCD0] bg-white rounded-sm"
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-luxury-gold" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="******"
                  className="w-full px-3 py-2.5 border border-[#E5DCD0] bg-white rounded-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center mt-1">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                <input type="checkbox" className="w-3.5 h-3.5 accent-luxury-gold" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert("concierge desk: reset instructions sent to email!")}
                className="text-luxury-gold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-luxury-dark hover:bg-luxury-gold text-white text-xs font-sans uppercase tracking-widest font-bold py-3.5 rounded-sm shadow-md transition-colors mt-4 h-12"
            >
              Sign In to Dashboard
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4 text-xs font-sans">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-luxury-gold" /> Full Name
              </label>
              <input
                type="text"
                value={signupForm.name}
                onChange={(e) => setSignupForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Ahmad Ali"
                className="w-full px-3 py-2.5 border border-[#E5DCD0] bg-white rounded-sm"
              />
              {errors.name && (
                <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-luxury-gold" /> Email Address
              </label>
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm(p => ({ ...p, email: e.target.value }))}
                placeholder="name@domain.com"
                className="w-full px-3 py-2.5 border border-[#E5DCD0] bg-white rounded-sm"
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-luxury-gold" /> WhatsApp Mobile Phone
              </label>
              <input
                type="tel"
                value={signupForm.phone}
                onChange={(e) => setSignupForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+92 300 1234567"
                className="w-full px-3 py-2.5 border border-[#E5DCD0] bg-white rounded-sm"
              />
              {errors.phone && (
                <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-luxury-gold" /> Password
              </label>
              <input
                type="password"
                value={signupForm.password}
                onChange={(e) => setSignupForm(p => ({ ...p, password: e.target.value }))}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2.5 border border-[#E5DCD0] bg-white rounded-sm"
              />
              {errors.password && (
                <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-luxury-gold" /> Confirm Password
              </label>
              <input
                type="password"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Re-enter password"
                className="w-full px-3 py-2.5 border border-[#E5DCD0] bg-white rounded-sm"
              />
              {errors.confirmPassword && (
                <span className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-luxury-dark hover:bg-luxury-gold text-white text-xs font-sans uppercase tracking-widest font-bold py-3.5 rounded-sm shadow-md transition-colors mt-4 h-12"
            >
              Register Account Registry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

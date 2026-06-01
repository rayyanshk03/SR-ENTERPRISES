import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Bell, Trash2, Plus, Minus, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { contactInfo } from '../data/mock';

/**
 * SiteNav — the shared sticky frosted-glass navigation bar.
 * Contains interactive Shopping Cart (slide-over drawer) and Notification (dropdown).
 */
const SiteNav = ({ selectedCategory, setSelectedCategory, mobileMenuOpen, setMobileMenuOpen }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '🔥 Deal of the Day', message: 'ErgoMax Pro 5000 bulk dealer pricing has been automatically applied to your session!', time: '2 mins ago', unread: true },
    { id: 2, title: '🚚 Order Dispatched', message: 'Corporate order ID #SR-98421 has been loaded and dispatched from Shikrapur warehouse.', time: '1 hour ago', unread: true },
    { id: 3, title: '💼 Custom Chair Quote', message: 'Your customized executive chair blueprint is ready to download in Design Lab.', time: '3 hours ago', unread: false },
  ]);
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'ErgoMax Pro 5000', category: 'Office Chairs', price: 3499, qty: 1, color: 'Black', image: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=300&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Industrial Bubble Wrap', category: 'Packaging', price: 450, qty: 5, color: 'Standard', image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=300&auto=format&fit=crop&q=80' }
  ]);

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const handleCheckout = () => {
    const itemsText = cartItems.map(item => `- ${item.qty}x ${item.title} (${item.color}) - ₹${(item.price * item.qty).toLocaleString('en-IN')}`).join('\n');
    const msg = `Hi! I would like to place an order for the items in my cart:\n\n${itemsText}\n\n*Subtotal: ₹${cartSubtotal.toLocaleString('en-IN')}*\n\nPlease confirm delivery charges and dispatch schedule.`;
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <nav style={{ padding: '20px 40px' }}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => {
                setSelectedCategory(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-bold text-[#1D1D1F] logo-fade-in cursor-pointer flex-shrink-0"
            >
              SR Enterprises
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a
                href="#products"
                onClick={() => setSelectedCategory(null)}
                className="nav-slide-down text-[#1D1D1F] hover:text-[#6E6E73] text-[17px] font-medium"
              >
                Products
              </a>
              <a href="#why-us" className="nav-slide-down text-[#1D1D1F] hover:text-[#6E6E73] text-[17px] font-medium">
                Why Us
              </a>
              <a href="#factory" className="nav-slide-down text-[#1D1D1F] hover:text-[#6E6E73] text-[17px] font-medium">
                Factory
              </a>
              <a href="#testimonials" className="nav-slide-down text-[#1D1D1F] hover:text-[#6E6E73] text-[17px] font-medium">
                Reviews
              </a>
              <a href="#bulk-enquiry" className="nav-slide-down text-[#1D1D1F] hover:text-[#6E6E73] text-[17px] font-medium">
                Bulk Order
              </a>
              <a href="#contact" className="nav-slide-down text-[#1D1D1F] hover:text-[#6E6E73] text-[17px] font-medium">
                Contact
              </a>

              {/* Desktop Notification bell */}
              <div className="relative">
                <button
                  onClick={() => { setNotificationsOpen(!notificationsOpen); setCartOpen(false); }}
                  className="text-[#1D1D1F] hover:text-[#6E6E73] relative p-2 rounded-full hover:bg-gray-100 transition-all"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                  )}
                </button>

                {/* Notifications Dropdown Card */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                      <span className="font-bold text-sm text-gray-800">Notifications</span>
                      <button onClick={clearNotifications} className="text-xs text-blue-600 hover:underline">Mark all read</button>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-2.5 rounded-xl transition-all ${n.unread ? 'bg-blue-50/55 border-l-3 border-blue-500' : 'bg-transparent'}`}>
                          <div className="flex justify-between items-start gap-1">
                            <span className="font-bold text-xs text-gray-900 leading-tight">{n.title}</span>
                            <span className="text-[9px] text-gray-400 whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-gray-600 mt-1 leading-normal">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Cart Option */}
              <button
                onClick={() => { setCartOpen(true); setNotificationsOpen(false); }}
                className="text-[#1D1D1F] hover:text-[#6E6E73] relative p-2 rounded-full hover:bg-gray-100 transition-all"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={20} />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white ring-2 ring-white">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              <Button
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
                className="nav-slide-down bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full px-6 py-2.5 text-[17px] font-medium"
              >
                Order on WhatsApp
              </Button>
            </div>

            {/* Mobile Header Icons + hamburger */}
            <div className="flex items-center space-x-3 lg:hidden">
              {/* Mobile Bell */}
              <div className="relative">
                <button
                  onClick={() => { setNotificationsOpen(!notificationsOpen); setMobileMenuOpen(false); }}
                  className="text-[#1D1D1F] p-2 rounded-full hover:bg-gray-100"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>

                {/* Mobile Notification Popover */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 z-50 text-left">
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
                      <span className="font-bold text-xs text-gray-800">Notifications</span>
                      <button onClick={clearNotifications} className="text-[10px] text-blue-600 hover:underline">Mark read</button>
                    </div>
                    <div className="space-y-2.5 max-h-56 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-2 rounded-lg ${n.unread ? 'bg-blue-50/50' : 'bg-transparent'}`}>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[11px] text-gray-800">{n.title}</span>
                            <span className="text-[8px] text-gray-400">{n.time}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Cart */}
              <button
                onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}
                className="text-[#1D1D1F] relative p-2 rounded-full hover:bg-gray-100"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={20} />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                className="text-[#1D1D1F] p-2"
                onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setNotificationsOpen(false); }}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile hamburger navigation dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3.5 border-t border-gray-100 pt-3 animate-in fade-in duration-200">
              <a
                href="#products"
                onClick={() => { setSelectedCategory(null); setMobileMenuOpen(false); }}
                className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px] font-medium"
              >
                Products
              </a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px] font-medium">
                Why Us
              </a>
              <a href="#factory" onClick={() => setMobileMenuOpen(false)} className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px] font-medium">
                Factory
              </a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px] font-medium">
                Reviews
              </a>
              <a href="#bulk-enquiry" onClick={() => setMobileMenuOpen(false)} className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px] font-medium">
                Bulk Order
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px] font-medium">
                Contact
              </a>
              <Button
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full px-6 py-2.5 text-[17px] font-medium"
              >
                Order on WhatsApp
              </Button>
            </div>
          )}
        </nav>
      </header>

      {/* ── CART SIDE-DRAWER BACKDROP OVERLAY ── */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-[190] transition-opacity duration-300 animate-in fade-in"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* ── CART SIDE-DRAWER PANEL ── */}
      <div
        style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Geist', 'Outfit', sans-serif" }}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[200] flex flex-col transition-transform duration-300 ease-out transform ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={22} className="text-gray-900" />
            <h3 className="font-bold text-lg text-gray-900">Your Cart</h3>
            <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body (Items List) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center pb-12">
              <span className="text-4xl mb-4">🛒</span>
              <p className="text-gray-800 font-bold text-base mb-1">Your cart is empty</p>
              <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed">
                Add premium chairs or packaging materials to start your quote request.
              </p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/30">
                {/* Product Image */}
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                {/* Details Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 truncate leading-snug">{item.title}</h4>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{item.category}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {/* Variant info */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[11px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">
                      Color: {item.color}
                    </span>
                  </div>
                  {/* Qty & Price Row */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="p-1 text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800 min-w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-1 text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-xs text-gray-900">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Subtotal & WhatsApp checkout) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-600 font-medium">Estimated Subtotal</span>
              <span className="text-xl font-extrabold text-gray-900">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              *Taxes and logistics costs are calculated during order confirmation on WhatsApp.
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.35)] transition-all"
            >
              <MessageSquare size={16} /> Checkout on WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SiteNav;

import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, Layers, Shield, Feather, Package, Palette, Award } from 'lucide-react';
import { contactInfo } from '../data/mock';

const MAPS_LINK = `https://www.google.com/maps/place/SR+ENTERPRISES/@18.6924124,73.7936763,66466m/data=!3m1!1e3!4m10!1m2!2m1!1ssr+enterprises!3m6!1s0x3bc2d1a4b748ed33:0x9915d468ab93b13f!8m2!3d18.6924124!4d74.0985469`;

/* ── Data ───────────────────────────────────────────────────────── */
const variants = [
  {
    id: 1,
    name: 'PP Plastic Chair',
    price: '₹750',
    image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&auto=format&fit=crop&q=80',
    tag: 'Most Popular',
  },
  {
    id: 2,
    name: 'Cushioned Chair',
    price: '₹1,200',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&auto=format&fit=crop&q=80',
    tag: 'Premium',
  },
  {
    id: 3,
    name: 'Wooden Chair',
    price: '₹980',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
    tag: 'Classic',
  },
  {
    id: 4,
    name: 'Metal Frame Chair',
    price: '₹890',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&auto=format&fit=crop&q=80',
    tag: 'Heavy Duty',
  },
];

const features = [
  {
    icon: <Layers size={24} />,
    title: 'Stackable Design',
    desc: 'Stack up to 8 chairs high. Saves 70% floor space — perfect for multi-use classrooms and auditoriums.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Anti-Scratch Surface',
    desc: 'UV-treated polypropylene shell resists scratches, stains, and graffiti — built for daily school use.',
  },
  {
    icon: <Feather size={24} />,
    title: 'Lightweight Build',
    desc: 'Under 3.2 kg per chair. Students can move and rearrange without teacher assistance.',
  },
  {
    icon: <Package size={24} />,
    title: 'Bulk Order Friendly',
    desc: 'Minimum 20 units. Special pricing above 100 units. Delivered within 7 working days pan-India.',
  },
  {
    icon: <Palette size={24} />,
    title: 'Custom Colors Available',
    desc: 'Choose from 12 standard colors or request a custom RAL shade to match your school brand.',
  },
  {
    icon: <Award size={24} />,
    title: 'Classroom Certified',
    desc: 'Meets IS 4535 Indian standards. Load-tested to 120 kg. Safe for all age groups K–12.',
  },
];

/* ── Component ──────────────────────────────────────────────────── */
const SchoolChairsPage = ({ onBack }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const fontStyle = { fontFamily: "-apple-system, 'SF Pro Display', 'Geist', 'Outfit', sans-serif" };

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', ...fontStyle }}>

      {/* ── Top Nav ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'rgba(250,250,250,0.9)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '0 40px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#0071E3', fontSize: '15px', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Products
        </button>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>School Chairs</span>
        <div style={{ width: '80px' }} />
      </div>

      {/* ── Hero ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left — image */}
        <div style={{
          borderRadius: '32px', overflow: 'hidden',
          aspectRatio: '1 / 1',
          backgroundColor: '#F0F4FF',
          boxShadow: '0 12px 60px rgba(0,0,0,0.10)',
          position: 'relative',
        }}>
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&auto=format&fit=crop&q=85"
            alt="School Chairs in classroom"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          {/* Floating pill */}
          <div style={{
            position: 'absolute', bottom: '24px', left: '24px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '999px', padding: '10px 20px',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F' }}>In Stock — Ships in 5–7 days</span>
          </div>
        </div>

        {/* Right — info */}
        <div>
          {/* Pill label */}
          <div style={{ display: 'inline-block', backgroundColor: '#F0F4FF', color: '#2563EB', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', marginBottom: '20px' }}>
            School Chairs
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Built for Every<br />Classroom.
          </h1>
          <p style={{ fontSize: '20px', color: '#6E6E73', fontWeight: 400, marginBottom: '8px' }}>
            Durable, stackable, and designed for focus.
          </p>
          <p style={{ fontSize: '16px', color: '#8E8E93', lineHeight: 1.7, marginBottom: '36px', maxWidth: '440px' }}>
            From primary schools to college lecture halls — SR Enterprises delivers classroom seating that lasts 10+ years of daily use, at factory-direct pricing.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openWhatsApp(`Hi! I want to order School Chairs — ${selectedVariant.name}. Please share pricing.`)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: '#1D1D1F', color: '#fff',
                padding: '15px 28px', borderRadius: '14px',
                fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
            >
              <MessageCircle size={18} /> Order Directly
            </button>
            <button
              onClick={() => openWhatsApp(`Hi! I'm a dealer interested in bulk pricing for School Chairs.`)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: 'transparent', color: '#1D1D1F',
                padding: '15px 28px', borderRadius: '14px',
                fontSize: '16px', fontWeight: 600,
                border: '1.5px solid #1D1D1F', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5F5F7'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Phone size={18} /> Contact a Dealer
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['IS 4535 Certified', 'Pan-India Delivery', 'Min. 20 Units'].map(b => (
              <div key={b} style={{ backgroundColor: '#F5F5F7', borderRadius: '999px', padding: '7px 14px', fontSize: '12px', fontWeight: 600, color: '#6E6E73' }}>
                ✦ {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Variants Row ── */}
      <div style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E5EA', borderBottom: '1px solid #E5E5EA', padding: '48px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1D1D1F', marginBottom: '32px', letterSpacing: '-0.02em' }}>
            Choose your variant
          </h2>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
            {variants.map(v => (
              <div
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                style={{
                  flex: '0 0 200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#FAFAFA',
                  border: selectedVariant.id === v.id ? '2px solid #1D1D1F' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: selectedVariant.id === v.id ? '0 8px 28px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.05)',
                  transform: selectedVariant.id === v.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Image */}
                <div style={{ height: '140px', overflow: 'hidden', backgroundColor: '#F5F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
                  <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }} />
                </div>
                {/* Info */}
                <div style={{ padding: '16px' }}>
                  {/* Tag */}
                  <div style={{ fontSize: '10px', fontWeight: 700, color: selectedVariant.id === v.id ? '#1D1D1F' : '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {v.tag}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1D1D1F', marginBottom: '4px' }}>{v.name}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: selectedVariant.id === v.id ? '#1D1D1F' : '#6E6E73' }}>From {v.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Selected Variant CTA ── */}
      {selectedVariant && (
        <div style={{ backgroundColor: '#F5F5F7', padding: '28px 40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '13px', color: '#6E6E73', fontWeight: 500 }}>Selected: </span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1D1D1F' }}>{selectedVariant.name}</span>
              <span style={{ fontSize: '14px', color: '#6E6E73', marginLeft: '12px' }}>Starting {selectedVariant.price}/unit</span>
            </div>
            <button
              onClick={() => openWhatsApp(`Hi! I want to enquire about the "${selectedVariant.name}" school chair. Please share bulk pricing.`)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
            >
              <MessageCircle size={16} /> Enquire on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* ── Features Grid ── */}
      <div style={{ backgroundColor: '#fff', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#1D1D1F', textAlign: 'center', marginBottom: '60px', letterSpacing: '-0.025em' }}>
            Engineered for the classroom.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: '32px', borderRadius: '20px', backgroundColor: '#F5F5F7',
                  border: '1px solid transparent',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.border = '1px solid #E5E5EA';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.07)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#F5F5F7';
                  e.currentTarget.style.border = '1px solid transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ color: '#2563EB', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#6E6E73', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pricing Section ── */}
      <div style={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #E5E5EA', padding: '80px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#1D1D1F', textAlign: 'center', marginBottom: '48px', letterSpacing: '-0.025em' }}>
            Simple, transparent pricing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Direct Purchase */}
            <div style={{
              backgroundColor: '#fff', borderRadius: '24px', padding: '40px',
              border: '1px solid #E5E5EA',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Direct Purchase</div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em' }}>₹750<span style={{ fontSize: '18px', fontWeight: 500, color: '#8E8E93' }}>/unit</span></div>
                <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '4px' }}>MRP ₹1,200 · Save 37%</div>
              </div>
              <div style={{ borderTop: '1px solid #F5F5F7', paddingTop: '20px' }}>
                {[
                  'Minimum order: 20 units',
                  'PP Plastic variant included',
                  'Pan-India delivery 5–7 days',
                  'GST invoice included',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#1D1D1F' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="#059669" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => openWhatsApp('Hi! I want to order School Chairs directly. Please share pricing for 20+ units.')}
                style={{ width: '100%', backgroundColor: '#1D1D1F', color: '#fff', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1D1D1F'}
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </button>
            </div>

            {/* Dealer/Wholesale */}
            <div style={{
              backgroundColor: '#1D1D1F', borderRadius: '24px', padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column', gap: '20px',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Glow orb */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)' }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Dealer / Wholesale</div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#F5F5F7', letterSpacing: '-0.03em' }}>₹560<span style={{ fontSize: '18px', fontWeight: 500, color: '#6E6E73' }}>/unit</span></div>
                <div style={{ fontSize: '14px', color: '#6E6E73', marginTop: '4px' }}>Starting at 100+ units</div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                {[
                  'Minimum order: 100 units',
                  'All variants available',
                  'Dedicated account manager',
                  'Credit terms available',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#D1D1D6' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="#25D366" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => openWhatsApp('Hi! I want to become a dealer for SR Enterprises School Chairs. Please share the wholesale pricing and terms.')}
                style={{ width: '100%', backgroundColor: 'transparent', color: '#F5F5F7', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              >
                <Phone size={18} /> Become a Dealer
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ padding: '60px 40px', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #E5E5EA' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>SR Enterprises</p>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Questions? We're a WhatsApp away.
        </h2>
        <p style={{ fontSize: '16px', color: '#6E6E73', marginBottom: '28px' }}>
          Shikrapur, Pune · Mon–Sat 9 AM–7 PM
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => openWhatsApp('Hi! I need help with School Chair pricing.')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: '999px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </button>
          <button
            onClick={() => window.open(MAPS_LINK, '_blank')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', color: '#1D1D1F', padding: '14px 28px', borderRadius: '999px', fontSize: '16px', fontWeight: 600, border: '1.5px solid #1D1D1F', cursor: 'pointer' }}
          >
            Visit Showroom
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolChairsPage;

import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, Award, Shield, Palette, Layers, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { contactInfo } from '../data/mock';

/* ── Configuration Options ───────────────────────────────────────── */
const frames = [
  { id: 'wood', name: 'Wood Frame', desc: 'Premium teak frame with natural grain finish', addPrice: 1200 },
  { id: 'metal', name: 'Metal Frame', desc: 'Heavy-duty carbon steel frame', addPrice: 600 },
  { id: 'aluminium', name: 'Aluminium Frame', desc: 'Aviation-grade light & sleek frame', addPrice: 1000 },
  { id: 'steel', name: 'Stainless Steel Frame', desc: 'Carbon-polished corrosion-resistant steel', addPrice: 1500 },
  { id: 'poly', name: 'Polypropylene Frame', desc: 'High-impact structural polymer frame', addPrice: 500 },
];

const fabrics = [
  { id: 'leather', name: 'Premium Leather', desc: 'Full-grain breathable leather', addPrice: 1800, dotColor: '#5C4033' },
  { id: 'mesh', name: 'Ergonomic Mesh', desc: 'Highly breathable high-tension mesh', addPrice: 800, dotColor: '#334155' },
  { id: 'fabric', name: 'Classic Fabric', desc: 'Soft-touch durable woven fabric', addPrice: 400, dotColor: '#6B7280' },
  { id: 'velvet', name: 'Lux Velvet', desc: 'Ultra-soft premium velvet finish', addPrice: 1200, dotColor: '#800020' },
  { id: 'recycled', name: 'Eco-Recycled Fabric', desc: '100% PCR recycled ocean plastics weave', addPrice: 600, dotColor: '#2E8B57' },
  { id: 'linen', name: 'Breathable Linen', desc: 'Premium organic textured linen', addPrice: 1000, dotColor: '#D2B48C' },
];

const colors = [
  { name: 'Black', hex: '#1E1E1E' },
  { name: 'White', hex: '#FFFFFF', border: '#E5E5EA' },
  { name: 'Brown', hex: '#8B5A2B' },
  { name: 'Navy', hex: '#1D3557' },
  { name: 'Grey', hex: '#7F8C8D' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Sage Green', hex: '#879884' },
  { name: 'Maroon', hex: '#800000' },
];

const brandingOptions = [
  { id: 'none', name: 'No Branding', desc: 'Standard clean chair without custom logo/name', addPrice: 0 },
  { id: 'embroidered', name: 'Embroidered Logo', desc: 'Premium stitched logo on headrest / back', addPrice: 400 },
  { id: 'printed', name: 'Printed Brand Name', desc: 'High-durability printed logo or text', addPrice: 250 },
  { id: 'laser_plate', name: 'Laser Engraved Plate', desc: 'Sleek anodized plate on back support shell', addPrice: 600 },
];

const features = [
  {
    icon: <Sparkles size={24} />,
    title: 'Fully Bespoke',
    desc: 'Every detail made to order. Tailor the dimensions, materials, and support elements to your preference.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Premium Materials',
    desc: 'From teak wood to high-grade steel and full-grain leather — we source only premium raw materials.',
  },
  {
    icon: <Palette size={24} />,
    title: 'Logo Branding Available',
    desc: 'Get your company, school, or brand logo embroidered directly onto the headrest or back cushioning.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Bulk Corporate Orders',
    desc: 'Equip your entire office or campus. Tailored design consulting and special bulk wholesale pricing.',
  },
  {
    icon: <Clock size={24} />,
    title: 'Fast Turnaround',
    desc: 'Custom chairs manufactured and delivered to your doorstep within 10–14 working days.',
  },
  {
    icon: <Award size={24} />,
    title: 'Quality Certified',
    desc: 'Load-tested up to 150 kg and ISO-9001 certified. Engineered to last 10+ years of daily usage.',
  },
];

/* ── Component ──────────────────────────────────────────────────── */
const CustomChairsPage = ({ onBack }) => {
  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedBranding, setSelectedBranding] = useState(brandingOptions[0]);
  const [customText, setCustomText] = useState('');
  const [quantity, setQuantity] = useState(10); // Standard corporate custom starts higher usually, default to 10

  const fontStyle = { fontFamily: "-apple-system, 'SF Pro Display', 'Geist', 'Outfit', sans-serif" };

  // Calculate pricing
  const basePrice = 1500;
  const unitLowPrice = basePrice + selectedFrame.addPrice + selectedFabric.addPrice + selectedBranding.addPrice;
  const unitHighPrice = Math.round(unitLowPrice * 1.15);

  const totalLowPrice = unitLowPrice * quantity;
  const totalHighPrice = unitHighPrice * quantity;

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getCustomizationSummary = () => {
    return `Hi! I want to configure a Custom Chair:
- Frame: ${selectedFrame.name}
- Fabric: ${selectedFabric.name}
- Color: ${selectedColor.name}
- Branding: ${selectedBranding.name}${customText ? ` (${customText})` : ''}
- Quantity: ${quantity} units
Estimated Price: ₹${unitLowPrice.toLocaleString('en-IN')} - ₹${unitHighPrice.toLocaleString('en-IN')} per unit.`;
  };

  const handleScrollToBuilder = () => {
    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', ...fontStyle }}>
      
      {/* ── Sticky Top Nav ── */}
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
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>Custom Chairs</span>
        <div style={{ width: '80px' }} />
      </div>

      {/* ── Hero Section ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left Image */}
        <div style={{
          borderRadius: '32px', overflow: 'hidden',
          aspectRatio: '1 / 1',
          backgroundColor: '#F5F5F7',
          boxShadow: '0 12px 60px rgba(0,0,0,0.10)',
        }}>
          <img
            src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&auto=format&fit=crop&q=85"
            alt="Premium custom designer chair"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Right Info */}
        <div>
          <div style={{ display: 'inline-block', backgroundColor: '#F3E8FF', color: '#7E22CE', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', marginBottom: '20px' }}>
            Custom Chairs
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Your Vision.<br />Our Craft.
          </h1>
          <p style={{ fontSize: '20px', color: '#6E6E73', fontWeight: 400, marginBottom: '8px' }}>
            Bespoke seating solutions built to your exact specifications.
          </p>
          <p style={{ fontSize: '16px', color: '#8E8E93', lineHeight: 1.7, marginBottom: '36px', maxWidth: '460px' }}>
            Choose from premium fabrics, solid wood or sleek aluminium frames, and colors that reflect your corporate brand. Built by hand in Shikrapur, Pune.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleScrollToBuilder}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: '#1D1D1F', color: '#fff',
                padding: '15px 28px', borderRadius: '14px',
                fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
            >
              Start Customizing
            </button>
            <button
              onClick={() => openWhatsApp("Hi! I'm interested in talking to a design expert for custom corporate seating solutions.")}
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
              Talk to a Dealer
            </button>
          </div>
        </div>
      </div>

      {/* ── Configurator Section ── */}
      <section id="configurator" style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E5EA', borderBottom: '1px solid #E5E5EA', padding: '80px 40px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Design Lab</span>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#1D1D1F', marginTop: '6px', letterSpacing: '-0.025em' }}>Configure your custom build</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Steps - Left Panel (8 cols) */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Step 1: Choose Frame */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1D1D1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>1</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1D1D1F' }}>Choose Frame Material</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {frames.map(f => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFrame(f)}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        backgroundColor: selectedFrame.id === f.id ? '#FAFAFA' : '#fff',
                        border: selectedFrame.id === f.id ? '2px solid #1D1D1F' : '1px solid #E5E5EA',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '16px', color: '#1D1D1F', marginBottom: '6px' }}>{f.name}</div>
                      <div style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.4, marginBottom: '12px' }}>{f.desc}</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0071E3' }}>+₹{f.addPrice}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose Fabric */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1D1D1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>2</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1D1D1F' }}>Choose Fabric & Texture</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fabrics.map(fab => (
                    <div
                      key={fab.id}
                      onClick={() => setSelectedFabric(fab)}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        backgroundColor: selectedFabric.id === fab.id ? '#FAFAFA' : '#fff',
                        border: selectedFabric.id === fab.id ? '2px solid #1D1D1F' : '1px solid #E5E5EA',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: fab.dotColor, flexShrink: 0, boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '16px', color: '#1D1D1F', marginBottom: '2px' }}>{fab.name}</div>
                        <div style={{ fontSize: '12px', color: '#6E6E73', lineHeight: 1.3, marginBottom: '4px' }}>{fab.desc}</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0071E3' }}>+₹{fab.addPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Choose Color */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1D1D1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>3</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1D1D1F' }}>Choose Color</h3>
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {colors.map(col => (
                    <div
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: col.hex,
                          border: selectedColor.name === col.name ? '3px solid #0071E3' : (col.border ? `1px solid ${col.border}` : '1px solid transparent'),
                          padding: '3px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s',
                          transform: selectedColor.name === col.name ? 'scale(1.1)' : 'scale(1)',
                        }}
                      />
                      <span style={{ fontSize: '12px', fontWeight: selectedColor.name === col.name ? 700 : 500, color: '#1D1D1F' }}>{col.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4: Choose Quantity */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1D1D1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>4</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1D1D1F' }}>Choose Quantity</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #E5E5EA', backgroundColor: '#fff', fontSize: '20px', fontWeight: 600, cursor: 'pointer', color: '#1D1D1F' }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: '80px', height: '48px', borderRadius: '12px', border: '1px solid #E5E5EA', textAlign: 'center', fontSize: '18px', fontWeight: 700, color: '#1D1D1F', outline: 'none' }}
                  />
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #E5E5EA', backgroundColor: '#fff', fontSize: '20px', fontWeight: 600, cursor: 'pointer', color: '#1D1D1F' }}
                  >
                    +
                  </button>
                  <span style={{ fontSize: '14px', color: '#8E8E93', fontWeight: 500 }}>Min. Order: 1 unit</span>
                </div>
              </div>

              {/* Step 5: Choose Logo / Branding */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1D1D1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>5</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1D1D1F' }}>Add Custom Logo / Name</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {brandingOptions.map(b => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBranding(b)}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        backgroundColor: selectedBranding.id === b.id ? '#FAFAFA' : '#fff',
                        border: selectedBranding.id === b.id ? '2px solid #1D1D1F' : '1px solid #E5E5EA',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '16px', color: '#1D1D1F', marginBottom: '6px' }}>{b.name}</div>
                      <div style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.4, marginBottom: '12px' }}>{b.desc}</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0071E3' }}>
                        {b.addPrice === 0 ? 'Free' : `+₹${b.addPrice} / unit`}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedBranding.id !== 'none' && (
                  <div style={{ animation: 'imgFade 0.3s ease' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>
                      Specify Text or Logo Details
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. My Company Logo / Design details"
                      value={customText}
                      onChange={e => setCustomText(e.target.value)}
                      style={{
                        width: '100%',
                        height: '48px',
                        borderRadius: '12px',
                        border: '1px solid #E5E5EA',
                        padding: '0 16px',
                        fontSize: '15px',
                        color: '#1D1D1F',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#1D1D1F'}
                      onBlur={e => e.target.style.borderColor = '#E5E5EA'}
                    />
                  </div>
                )}
              </div>

            </div>

            {/* Config Summary - Right Sticky Panel (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-[80px]">
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #E5E5EA',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1D1D1F', marginBottom: '24px', borderBottom: '1px solid #F5F5F7', paddingBottom: '16px' }}>
                  Build Summary
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8E8E93', fontSize: '14px' }}>Frame</span>
                    <span style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '14px' }}>{selectedFrame.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8E8E93', fontSize: '14px' }}>Fabric</span>
                    <span style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '14px' }}>{selectedFabric.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8E8E93', fontSize: '14px' }}>Color</span>
                    <span style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '14px' }}>{selectedColor.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8E8E93', fontSize: '14px' }}>Branding</span>
                    <span style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '14px' }}>
                      {selectedBranding.name}{customText ? ` (${customText})` : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8E8E93', fontSize: '14px' }}>Quantity</span>
                    <span style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '14px' }}>{quantity} {quantity === 1 ? 'unit' : 'units'}</span>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F5F5F7', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimated Price</span>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#1D1D1F', margin: '4px 0 2px', letterSpacing: '-0.02em' }}>
                    ₹{unitLowPrice.toLocaleString('en-IN')} - ₹{unitHighPrice.toLocaleString('en-IN')}
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#8E8E93' }}> / unit</span>
                  </div>
                  {quantity > 1 && (
                    <div style={{ fontSize: '14px', color: '#6E6E73', fontWeight: 600 }}>
                      Total est. (x{quantity}): ₹{totalLowPrice.toLocaleString('en-IN')} - ₹{totalHighPrice.toLocaleString('en-IN')}
                    </div>
                  )}
                  <div style={{ fontSize: '11px', color: '#8E8E93', marginTop: '8px', lineHeight: 1.3 }}>
                    *Final price depends on branding, customization details, and location of delivery.
                  </div>
                </div>

                <button
                  onClick={() => openWhatsApp(getCustomizationSummary())}
                  style={{
                    width: '100%',
                    backgroundColor: '#1D1D1F', color: '#fff',
                    padding: '16px', borderRadius: '14px',
                    fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1D1D1F'}
                >
                  <MessageCircle size={18} /> Request Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <div style={{ backgroundColor: '#fff', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#1D1D1F', textAlign: 'center', marginBottom: '60px', letterSpacing: '-0.025em' }}>
            Built different. By design.
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
                <div style={{ color: '#7E22CE', marginBottom: '16px' }}>{f.icon}</div>
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
            Flexible solutions for custom setups.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Direct Custom Order */}
            <div style={{
              backgroundColor: '#fff', borderRadius: '24px', padding: '40px',
              border: '1px solid #E5E5EA',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Direct Custom Order</div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em' }}>₹2,500<span style={{ fontSize: '18px', fontWeight: 500, color: '#8E8E93' }}>/unit</span></div>
                <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '4px' }}>Starting unit price based on configuration</div>
              </div>
              <div style={{ borderTop: '1px solid #F5F5F7', paddingTop: '20px' }}>
                {[
                  'Lead time: 10–14 working days',
                  'Direct setup with design consulting',
                  'Doorstep delivery and assembly',
                  'Logo branding optional',
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
                onClick={() => openWhatsApp('Hi! I want to consult for a single/direct custom chair order.')}
                style={{ width: '100%', backgroundColor: '#1D1D1F', color: '#fff', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1D1D1F'}
              >
                <MessageCircle size={18} /> Request on WhatsApp
              </button>
            </div>

            {/* Corporate / Dealer Bulk */}
            <div style={{
              backgroundColor: '#1D1D1F', borderRadius: '24px', padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column', gap: '20px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,34,206,0.25), transparent 70%)' }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Corporate / Dealer Bulk</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#F5F5F7', letterSpacing: '-0.03em', marginTop: '6px' }}>Volume Discount</div>
                <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '8px' }}>MOQ: 50+ units for wholesale terms</div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                {[
                  'Significant discounts at scale',
                  'Dedicated workspace designers',
                  'Customized sample design process',
                  'Flexible payment/credit options',
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
                onClick={() => openWhatsApp('Hi! I am looking for corporate bulk customization for custom chairs.')}
                style={{ width: '100%', backgroundColor: 'transparent', color: '#F5F5F7', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              >
                <Phone size={18} /> Get a Quote
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ padding: '60px 40px', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #E5E5EA' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>SR Enterprises</p>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Have a unique idea in mind?
        </h2>
        <p style={{ fontSize: '16px', color: '#6E6E73', marginBottom: '28px' }}>
          Our manufacturing unit can custom produce any chair design. Let's build it together.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => openWhatsApp('Hi! I have a completely custom design drawing and want to manufacture custom chairs.')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: '999px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            <MessageCircle size={18} /> Direct WhatsApp Design Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomChairsPage;

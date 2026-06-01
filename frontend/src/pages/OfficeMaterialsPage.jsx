import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, Award, Layers, Shield, FileText, CheckCircle, Truck, Package } from 'lucide-react';
import { contactInfo } from '../data/mock';

/* ── Configuration Data ──────────────────────────────────────────── */
const variants = [
  {
    id: 'organizers',
    name: 'Desk Organizers',
    price: '₹320 / unit',
    priceVal: 320,
    unit: 'unit',
    moq: 20,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80',
    tag: 'Desktop Organization',
    specs: {
      category: 'Desktop Organizers & Trays',
      material: 'Premium Acrylic & Carbon Steel Mesh',
      qty: 'Individual pack / Box of 10 units',
      moq: '20 units',
      customization: 'Corporate logo laser etching or silk-screen print',
      dispatch: '3–5 working days'
    },
    directBuyMsg: 'Hi! I want to order Desk Organizers. Please share pricing and shipping details.',
    bulkRate: '₹260 / unit',
    bulkMoq: '100 units',
  },
  {
    id: 'stationery',
    name: 'Notepads & Stationery',
    price: '₹85 / piece',
    priceVal: 85,
    unit: 'piece',
    moq: 100,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=80',
    tag: 'Stationery',
    specs: {
      category: 'Notebooks, Pens & Letterheads',
      material: '80 GSM acid-free recycled eco-paper',
      qty: 'Pack of 50 pieces / Carton of 500 pieces',
      moq: '100 pieces',
      customization: 'Custom cover embossing & branding layouts',
      dispatch: '5–7 working days'
    },
    directBuyMsg: 'Hi! I want to order Branded Notepads & Stationery. Please share design templates.',
    bulkRate: '₹65 / piece',
    bulkMoq: '500 pieces',
  },
  {
    id: 'storage',
    name: 'Filing & Storage',
    price: '₹180 / file',
    priceVal: 180,
    unit: 'file',
    moq: 50,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&auto=format&fit=crop&q=80',
    tag: 'Document Filing',
    specs: {
      category: 'Ring Binders & Lever Arch Files',
      material: 'Recycled Polypropylene (PP) & Hardboard core',
      qty: 'Pack of 20 files / Box of 100 files',
      moq: '50 files',
      customization: 'Full wrap custom offset printing & spine labels',
      dispatch: '2–4 working days'
    },
    directBuyMsg: 'Hi! I want to order Lever Arch Files for document storage. Please share wholesale terms.',
    bulkRate: '₹140 / file',
    bulkMoq: '250 files',
  },
  {
    id: 'whiteboard',
    name: 'Whiteboard Supplies',
    price: '₹450 / kit',
    priceVal: 450,
    unit: 'kit',
    moq: 10,
    image: 'https://images.unsplash.com/photo-1541829011-831c26588101?w=400&auto=format&fit=crop&q=80',
    tag: 'Presentation',
    specs: {
      category: 'Markers, Erasers & Cleaning Fluid',
      material: 'Non-toxic low-odor ink & ABS plastic duster',
      qty: 'Presentation kits (4 markers, 1 magnetic duster, 1 cleaner spray)',
      moq: '10 kits',
      customization: 'Corporate logo printing on marker barrel & duster casing',
      dispatch: '2–3 working days'
    },
    directBuyMsg: 'Hi! I want to order Whiteboard Presentation Kits. Please share availability.',
    bulkRate: '₹370 / kit',
    bulkMoq: '50 kits',
  }
];

const features = [
  {
    icon: <Package size={24} />,
    title: 'Bulk Supply Ready',
    desc: 'Equip small offices to enterprise headquarters. High manufacturing capacities mean we can fulfill high-volume corporate orders seamlessly.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Custom Branding Available',
    desc: 'Enhance your workplace design language. We provide logo branding, silk screening, and color-matched solutions across all materials.',
  },
  {
    icon: <Award size={24} />,
    title: 'Premium Quality',
    desc: 'Tested for daily commercial wear and tear. Heavy-duty files, organizers, and writing materials built to handle modern corporate usage.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Pan-India Delivery',
    desc: 'Shipped efficiently from our Shikrapur, Pune hub. Quick logistics partnerships ensure your office supply closet is always full.',
  },
  {
    icon: <FileText size={24} />,
    title: 'Corporate Billing Supported',
    desc: 'Simplified procurement processes. Full GST compliance invoicing, corporate credit terms support, and dedicated purchase portal.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Consistent Stock',
    desc: 'Avoid supply shortages. We guarantee year-round availability of core office materials for our recurring corporate partners.',
  },
];

/* ── Component ──────────────────────────────────────────────────── */
const OfficeMaterialsPage = ({ onBack }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const fontStyle = { fontFamily: "-apple-system, 'SF Pro Display', 'Geist', 'Outfit', sans-serif" };

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
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
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>Office Materials</span>
        <div style={{ width: '80px' }} />
      </div>

      {/* ── Hero Section ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left Visual */}
        <div style={{
          borderRadius: '32px', overflow: 'hidden',
          aspectRatio: '1 / 1',
          backgroundColor: '#F5F5F7',
          boxShadow: '0 12px 60px rgba(0,0,0,0.10)',
        }}>
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=85"
            alt="Clean modern desk setup with folders and stationery"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Right Details */}
        <div>
          <div style={{ display: 'inline-block', backgroundColor: '#F3F4F6', color: '#374151', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', marginBottom: '20px' }}>
            Office Materials
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Equip Every<br />Workspace.
          </h1>
          <p style={{ fontSize: '20px', color: '#6E6E73', fontWeight: 400, marginBottom: '8px' }}>
            Everything your office needs, delivered in bulk.
          </p>
          <p style={{ fontSize: '16px', color: '#8E8E93', lineHeight: 1.7, marginBottom: '36px', maxWidth: '460px' }}>
            Direct factory procurement of durable desk organizers, custom-branded notebooks, presentation whiteboards, and high-volume document storage. Seamless corporate ordering.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openWhatsApp(selectedVariant.directBuyMsg)}
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
              Order Directly
            </button>
            <button
              onClick={() => openWhatsApp("Hi! We are seeking customized office materials supply contracts for our corporate hubs.")}
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
              Contact a Dealer
            </button>
          </div>
        </div>
      </div>

      {/* ── Variants Row ── */}
      <div style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E5EA', borderBottom: '1px solid #E5E5EA', padding: '48px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1D1D1F', marginBottom: '32px', letterSpacing: '-0.02em' }}>
            Choose collection
          </h2>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
            {variants.map(v => (
              <div
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                style={{
                  flex: '0 0 220px',
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
                <div style={{ height: '140px', overflow: 'hidden', backgroundColor: '#F5F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Details */}
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: selectedVariant.id === v.id ? '#1D1D1F' : '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {v.tag}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1D1D1F', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: selectedVariant.id === v.id ? '#1D1D1F' : '#6E6E73' }}>{v.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Technical Specifications Table ── */}
      <section id="tech-specs" style={{ backgroundColor: '#fff', padding: '80px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="text-center mb-12">
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Technical Specifications</span>
            <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#1D1D1F', marginTop: '6px', letterSpacing: '-0.02em' }}>{selectedVariant.name}</h3>
          </div>

          <div style={{ borderTop: '1px solid #E5E5EA' }}>
            {[
              { label: 'Category', val: selectedVariant.specs.category },
              { label: 'Material', val: selectedVariant.specs.material },
              { label: 'Available Quantities', val: selectedVariant.specs.qty },
              { label: 'Minimum Order Qty (MOQ)', val: selectedVariant.specs.moq },
              { label: 'Customization Options', val: selectedVariant.specs.customization },
              { label: 'Standard Dispatch Time', val: selectedVariant.specs.dispatch }
            ].map((spec, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  padding: '24px 0',
                  borderBottom: '1px solid #E5E5EA', // Hairline dividers
                  gap: '24px',
                }}
                className="grid-cols-1 sm:grid-cols-[260px_1fr]"
              >
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>{spec.label}</div>
                <div style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.5 }}>{spec.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <div style={{ backgroundColor: '#fff', padding: '80px 40px', borderTop: '1px solid #E5E5EA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#1D1D1F', textAlign: 'center', marginBottom: '60px', letterSpacing: '-0.025em' }}>
            Designed for productivity.
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
                <div style={{ color: '#1D1D1F', marginBottom: '16px' }}>{f.icon}</div>
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
            Flexible procurement plans.
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
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em' }}>{selectedVariant.price}</div>
                <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '4px' }}>Standard unit rate based on basic setup</div>
              </div>
              <div style={{ borderTop: '1px solid #F5F5F7', paddingTop: '20px' }}>
                {[
                  `Minimum order: ${selectedVariant.specs.moq}`,
                  'Corporate tax invoice included',
                  'Standard corporate color options',
                  'Easy replacement policy',
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
                onClick={() => openWhatsApp(`Hi! I want to order ${selectedVariant.name} at direct rates (${selectedVariant.price}).`)}
                style={{ width: '100%', backgroundColor: '#1D1D1F', color: '#fff', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1D1D1F'}
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </button>
            </div>

            {/* Corporate / Wholesale */}
            <div style={{
              backgroundColor: '#1D1D1F', borderRadius: '24px', padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column', gap: '20px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,36,170,0.25), transparent 70%)' }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Dealer / Wholesale</div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#F5F5F7', letterSpacing: '-0.03em' }}>{selectedVariant.bulkRate}</div>
                <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '4px' }}>Wholesale tier starting MOQ: {selectedVariant.bulkMoq}</div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                {[
                  `Minimum wholesale quantity: ${selectedVariant.bulkMoq}`,
                  'Volume contracts and custom logos included',
                  'Dedicated regional representative support',
                  'Flexible payment accounts',
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
                onClick={() => openWhatsApp(`Hi! I want to apply for corporate partnership program for bulk supply of ${selectedVariant.name}.`)}
                style={{ width: '100%', backgroundColor: 'transparent', color: '#F5F5F7', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              >
                <Phone size={18} /> Partner With Us
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ padding: '60px 40px', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #E5E5EA' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>SR Enterprises Procurement</p>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Setting up a new office location?
        </h2>
        <p style={{ fontSize: '16px', color: '#6E6E73', marginBottom: '28px' }}>
          We provide turn-key furniture, organizational setups, and supplies for corporate offices.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => openWhatsApp('Hi! We are setting up a new office and want a complete procurement quote.')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: '999px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            <MessageCircle size={18} /> Speak to a Procurement Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeMaterialsPage;

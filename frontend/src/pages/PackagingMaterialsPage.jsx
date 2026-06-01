import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, ShieldCheck, Box, Minimize2, Archive, Truck, Layers } from 'lucide-react';
import { contactInfo } from '../data/mock';

/* ── Configuration Data ──────────────────────────────────────────── */
const variants = [
  {
    id: 'bubble',
    name: 'Bubble Wrap Rolls',
    price: '₹450 / roll',
    priceVal: 450,
    unit: 'roll',
    moq: 5,
    image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=400&auto=format&fit=crop&q=80',
    tag: 'Cushioning',
    specs: {
      material: 'High-Density Polyethylene (HDPE)',
      sizes: '1m x 50m, 1.2m x 100m',
      thickness: '50 GSM / 10mm bubble diameter',
      moq: '5 rolls',
      pkgType: 'Roll format',
      useCase: 'Cushioned protection for chair seats, backrests, and metal structures against shocks.'
    },
    directBuyMsg: 'Hi! I want to order Bubble Wrap Rolls. Please share pricing and shipping terms.',
    bulkRate: '₹380 / roll',
    bulkMoq: '20 rolls',
  },
  {
    id: 'cartons',
    name: 'Corrugated Cartons',
    price: '₹120 / piece',
    priceVal: 120,
    unit: 'piece',
    moq: 50,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop&q=80',
    tag: 'Outer Box',
    specs: {
      material: 'Double-wall Kraft Cardboard',
      sizes: '24" x 24" x 36" (Custom chair sizing)',
      thickness: '5-ply / 150 GSM Kraft paper',
      moq: '50 pieces',
      pkgType: 'Flat bundle format (unassembled)',
      useCase: 'Heavy-duty outer box packaging to securely ship fully assembled office or institutional chairs.'
    },
    directBuyMsg: 'Hi! I want to order Corrugated Cartons for chairs. Please share pricing and sizes.',
    bulkRate: '₹95 / piece',
    bulkMoq: '200 pieces',
  },
  {
    id: 'foam',
    name: 'EPE Foam Sheets',
    price: '₹350 / roll',
    priceVal: 350,
    unit: 'roll',
    moq: 10,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&auto=format&fit=crop&q=80',
    tag: 'Scratch Guard',
    specs: {
      material: 'Expanded Polyethylene (EPE) Foam',
      sizes: '1m x 100m',
      thickness: '2mm thickness / 20 GSM density',
      moq: '10 rolls',
      pkgType: 'Roll format',
      useCase: 'Surface wrapping for polished wood, chrome bases, and armrests to prevent scratches and scuffs.'
    },
    directBuyMsg: 'Hi! I want to order EPE Foam Sheets. Please share pricing and shipping details.',
    bulkRate: '₹290 / roll',
    bulkMoq: '30 rolls',
  },
  {
    id: 'stretch',
    name: 'Stretch Film Wrap',
    price: '₹280 / roll',
    priceVal: 280,
    unit: 'roll',
    moq: 12,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&auto=format&fit=crop&q=80',
    tag: 'Binding & Dust',
    specs: {
      material: 'Linear Low-Density Polyethylene (LLDPE)',
      sizes: '500mm width x 250m length',
      thickness: '23 microns thickness',
      moq: '12 rolls (1 carton)',
      pkgType: 'Box packaging (6 rolls per box)',
      useCase: 'Dust-proofing, moisture protection, and outer binding to secure wrapping material on products.'
    },
    directBuyMsg: 'Hi! I want to order Stretch Film Wrap. Please share pricing details.',
    bulkRate: '₹220 / roll',
    bulkMoq: '48 rolls (8 boxes)',
  }
];

const features = [
  {
    icon: <ShieldCheck size={24} />,
    title: 'Heavy Duty Protection',
    desc: 'Engineered specifically for furniture transit. Resists punctures, tears, and high-impact shipping drops.',
  },
  {
    icon: <Minimize2 size={24} />,
    title: 'Custom Sizing Available',
    desc: 'Need custom dimension cartons or customized width rolls? We manufacture sizes to your exact specifications.',
  },
  {
    icon: <Box size={24} />,
    title: 'Eco-Friendly Options',
    desc: 'Our corrugated cartons are 100% recyclable, and our stretch film wraps feature low environmental footprints.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Bulk Supply Ready',
    desc: 'Consistently stocked in large volumes. Ready to scale with your factory production and warehousing needs.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Fast Dispatch',
    desc: 'Ready-to-ship inventory dispatched from Shikrapur within 24–48 hours for standard sizes.',
  },
  {
    icon: <Archive size={24} />,
    title: 'Compatible with All Chairs',
    desc: 'Designed perfectly to wrap and bundle office executive, mesh revolving, student school, and custom furniture.',
  },
];

/* ── Component ──────────────────────────────────────────────────── */
const PackagingMaterialsPage = ({ onBack }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const fontStyle = { fontFamily: "-apple-system, 'SF Pro Display', 'Geist', 'Outfit', sans-serif" };

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleScrollToSpecs = () => {
    document.getElementById('tech-specs')?.scrollIntoView({ behavior: 'smooth' });
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
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>Packaging Materials</span>
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
            src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=900&auto=format&fit=crop&q=85"
            alt="Industrial packaging rolls and boxes"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Right Details */}
        <div>
          <div style={{ display: 'inline-block', backgroundColor: '#ECFDF5', color: '#059669', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', marginBottom: '20px' }}>
            Packaging Materials
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Pack Smart.<br />Ship Safe.
          </h1>
          <p style={{ fontSize: '20px', color: '#6E6E73', fontWeight: 400, marginBottom: '8px' }}>
            Industrial-grade packaging built for furniture and bulk logistics.
          </p>
          <p style={{ fontSize: '16px', color: '#8E8E93', lineHeight: 1.7, marginBottom: '36px', maxWidth: '460px' }}>
            Direct manufacturer supply of high-cushion bubble rolls, heavy 5-ply cartons, protective EPE foam and premium stretch wrap. Safeguard your transport network.
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
              onClick={() => openWhatsApp("Hi! We are looking for custom commercial supply agreements for packaging materials. Let's discuss terms.")}
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
            Select material type
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
                  <div style={{ fontSize: '10px', fontWeight: 700, color: selectedVariant.id === v.id ? '#059669' : '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
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
              { label: 'Material Type', val: selectedVariant.specs.material },
              { label: 'Available Sizes', val: selectedVariant.specs.sizes },
              { label: 'Thickness / GSM', val: selectedVariant.specs.thickness },
              { label: 'Minimum Order Qty (MOQ)', val: selectedVariant.specs.moq },
              { label: 'Packaging Type', val: selectedVariant.specs.pkgType },
              { label: 'Primary Use Case', val: selectedVariant.specs.useCase }
            ].map((spec, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  padding: '24px 0',
                  borderBottom: '1px solid #F5F5F7',
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
            Premium logistics standards.
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
                <div style={{ color: '#059669', marginBottom: '16px' }}>{f.icon}</div>
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
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em' }}>{selectedVariant.price}</div>
                <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '4px' }}>Standard retail pricing format</div>
              </div>
              <div style={{ borderTop: '1px solid #F5F5F7', paddingTop: '20px' }}>
                {[
                  `Minimum order: ${selectedVariant.specs.moq}`,
                  'Tax invoices provided',
                  'Pan-India delivery options',
                  'Standard material sizing guarantee',
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
                onClick={() => openWhatsApp(`Hi! I want to order ${selectedVariant.name} at direct purchase rates (${selectedVariant.price}).`)}
                style={{ width: '100%', backgroundColor: '#1D1D1F', color: '#fff', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1D1D1F'}
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </button>
            </div>

            {/* Dealer / Wholesale */}
            <div style={{
              backgroundColor: '#1D1D1F', borderRadius: '24px', padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column', gap: '20px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.25), transparent 70%)' }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Dealer / Wholesale</div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#F5F5F7', letterSpacing: '-0.03em' }}>{selectedVariant.bulkRate}</div>
                <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '4px' }}>Wholesale tier starting MOQ: {selectedVariant.bulkMoq}</div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                {[
                  `Minimum wholesale quantity: ${selectedVariant.bulkMoq}`,
                  'Volume contracts and credits options',
                  'Priority warehouse dispatch',
                  'Free shipping within Maharashtra',
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
                onClick={() => openWhatsApp(`Hi! I want to apply for Supplier Partner wholesale program for ${selectedVariant.name}.`)}
                style={{ width: '100%', backgroundColor: 'transparent', color: '#F5F5F7', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              >
                <Phone size={18} /> Become a Supplier Partner
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ padding: '60px 40px', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #E5E5EA' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>SR Enterprises Logistics</p>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Need custom roll sizes or custom boxes?
        </h2>
        <p style={{ fontSize: '16px', color: '#6E6E73', marginBottom: '28px' }}>
          We manufacture corrugated cartons and foam rolls customized to your dimensions.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => openWhatsApp('Hi! I am looking for custom sizing options for packaging materials.')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: '999px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            <MessageCircle size={18} /> Direct WhatsApp Sales Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagingMaterialsPage;

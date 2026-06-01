import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageCircle, Phone, ChevronRight, Star, Check, Zap, Shield, Package, Users, Award, Truck, Plus, Minus, ChevronDown, RotateCcw } from 'lucide-react';
import { officeChairs, contactInfo } from '../data/mock';

const features = [
  { icon: <Zap size={24} />, title: 'Ergonomic Design', desc: 'Contoured back support, lumbar adjustment and 3D armrests engineered for long hours.' },
  { icon: <Shield size={24} />, title: 'Durable Frame', desc: 'Powder-coated 1.5mm cold-rolled steel resists rust for 10+ years in Indian climate.' },
  { icon: <Package size={24} />, title: 'Bulk Orders Available', desc: 'From 10 units to 10,000. Special pricing tiers and priority delivery for bulk buyers.' },
  { icon: <Users size={24} />, title: 'Factory Direct', desc: 'No middlemen. You buy straight from the manufacturer — maximum quality, minimum price.' },
  { icon: <Award size={24} />, title: '5-Year Warranty', desc: 'Full structural warranty backed by in-house repair team and genuine spare parts.' },
  { icon: <Truck size={24} />, title: 'Pan-India Delivery', desc: 'Shipped from our Shikrapur facility. 5–7 working days anywhere in India.' },
];

const filterPills = ['All', 'Executive', 'Ergonomic', 'Visitor', 'Conference', 'Mesh Back', 'Revolving', 'Fixed', 'High Back', 'Mid Back', 'Low Back'];
const materialPills = ['All', 'Mesh', 'Leather', 'Fabric', 'PU Leather', 'Velvet'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Selling'];

const getBadgeStyle = (badge) => {
  const baseStyle = {
    position: 'absolute',
    top: '16px',
    left: '16px',
    padding: '5px 12px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 10,
  };

  if (badge === 'Best Seller') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      color: '#1D1D1F',
      borderColor: 'rgba(0, 0, 0, 0.08)',
    };
  }
  if (badge === 'New') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(0, 113, 227, 0.09)',
      color: '#0071E3',
      borderColor: 'rgba(0, 113, 227, 0.15)',
    };
  }
  if (badge === 'Premium') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(142, 36, 170, 0.09)',
      color: '#8E24AA',
      borderColor: 'rgba(142, 36, 170, 0.15)',
    };
  }
  if (badge === 'Bulk Deal') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(37, 211, 102, 0.09)',
      color: '#128C7E',
      borderColor: 'rgba(37, 211, 102, 0.15)',
    };
  }
  return {
    ...baseStyle,
    backgroundColor: 'rgba(239, 108, 0, 0.09)',
    color: '#EF6C00',
    borderColor: 'rgba(239, 108, 0, 0.15)',
  };
};

const getDetailBadgeStyle = (badge) => {
  const baseStyle = {
    display: 'inline-block',
    marginLeft: '8px',
    padding: '5px 12px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    marginBottom: '20px',
    verticalAlign: 'middle',
  };

  if (badge === 'Best Seller') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(29, 29, 31, 0.06)',
      color: '#1D1D1F',
      borderColor: 'rgba(29, 29, 31, 0.1)',
    };
  }
  if (badge === 'New') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(0, 113, 227, 0.09)',
      color: '#0071E3',
      borderColor: 'rgba(0, 113, 227, 0.15)',
    };
  }
  if (badge === 'Premium') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(142, 36, 170, 0.09)',
      color: '#8E24AA',
      borderColor: 'rgba(142, 36, 170, 0.15)',
    };
  }
  if (badge === 'Bulk Deal') {
    return {
      ...baseStyle,
      backgroundColor: 'rgba(37, 211, 102, 0.09)',
      color: '#128C7E',
      borderColor: 'rgba(37, 211, 102, 0.15)',
    };
  }
  return {
    ...baseStyle,
    backgroundColor: 'rgba(239, 108, 0, 0.09)',
    color: '#EF6C00',
    borderColor: 'rgba(239, 108, 0, 0.15)',
  };
};

const OfficeChairsPage = ({ onBack, whatsappNumber }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeMaterial, setActiveMaterial] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [desktopSortOpen, setDesktopSortOpen] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState(null); // 'category', 'material', 'sort', or null
  const [selectedChair, setSelectedChair] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [deckIndex, setDeckIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIdx(0);
  }, [selectedChair]);

  const enriched = officeChairs.map((c) => ({
    ...c,
    savingsPercent: Math.round(((c.mrp - c.price) / c.mrp) * 100),
    categoryTag: (c.tags[0] || 'Office') + ' Chairs',
  }));

  const deckChairs = enriched.filter(c => c.badge);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeckIndex((prev) => (prev + 1) % deckChairs.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [deckChairs.length]);

  const getCardStyle = (index) => {
    const total = deckChairs.length;
    const relativePos = (index - deckIndex + total) % total;
    const baseTransition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

    if (relativePos === 0) {
      return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 30,
        transform: 'translate3d(0px, 0px, 0px) scale(1)',
        opacity: 1,
        visibility: 'visible',
        transition: baseTransition,
      };
    } else if (relativePos === 1) {
      return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 20,
        transform: 'translate3d(36px, -18px, 0px) scale(0.9)',
        opacity: 0.92,
        visibility: 'visible',
        transition: baseTransition,
      };
    } else if (relativePos === 2) {
      return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        transform: 'translate3d(72px, -36px, 0px) scale(0.8)',
        opacity: 0.82,
        visibility: 'visible',
        transition: baseTransition,
      };
    } else {
      return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
        transform: 'translate3d(-160px, 0px, 0px) scale(0.7)',
        opacity: 0,
        visibility: 'hidden',
        transition: baseTransition,
      };
    }
  };

  const matchesCategory = (chair, filter) => {
    if (filter === 'All') return true;
    if (chair.tags && chair.tags.some(tag => tag.toLowerCase() === filter.toLowerCase())) {
      return true;
    }
    const searchStr = `${chair.title} ${chair.specLine} ${chair.tags ? chair.tags.join(' ') : ''}`.toLowerCase();
    if (filter === 'High Back') return searchStr.includes('high-back') || searchStr.includes('high back');
    if (filter === 'Mid Back') return searchStr.includes('mid-back') || searchStr.includes('mid back');
    if (filter === 'Low Back') return searchStr.includes('low-back') || searchStr.includes('low back');
    return false;
  };

  const matchesMaterial = (chair, materialFilter) => {
    if (materialFilter === 'All') return true;
    const searchStr = `${chair.material} ${chair.specLine} ${chair.title}`.toLowerCase();
    const filter = materialFilter.toLowerCase();
    if (filter === 'pu leather') return searchStr.includes('pu leather') || searchStr.includes('pu-leather');
    if (filter === 'leather') return searchStr.includes('leather') || searchStr.includes('leatherette');
    if (filter === 'mesh') return searchStr.includes('mesh');
    if (filter === 'fabric') return searchStr.includes('fabric');
    if (filter === 'velvet') return searchStr.includes('velvet');
    return searchStr.includes(filter);
  };

  const filtered = enriched.filter((c) =>
    matchesCategory(c, activeFilter) && matchesMaterial(c, activeMaterial)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Newest') return (b.newest ? 1 : 0) - (a.newest ? 1 : 0);
    if (sortBy === 'Best Selling') return b.reviewsCount - a.reviewsCount;
    return a.id - b.id;
  });

  /* ── CHAIR DETAIL VIEW ─────────────────────────────────── */
  if (selectedChair) {
    const chair = selectedChair;
    const related = enriched.filter(c => c.id !== chair.id).slice(0, 4);

    const colorOptions = [
      { name: 'Black',  hex: '#1D1D1F' },
      { name: 'Grey',   hex: '#8D8D8D' },
      { name: 'Brown',  hex: '#7B4F2E' },
      { name: 'White',  hex: '#F5F5F7', border: true },
      { name: 'Navy',   hex: '#1B3A6B' },
    ];

    const quickSpecs = chair.specs ? [
      { icon: <Package size={16} />, label: 'Weight Capacity', value: chair.specs.find(s => s.label === 'Weight Capacity')?.value || '120 kg' },
      { icon: <Shield size={16} />,  label: 'Frame Material',  value: chair.specs.find(s => s.label === 'Base Material')?.value || 'Steel' },
      { icon: <Zap size={16} />,     label: 'Seat Height',     value: chair.specs.find(s => s.label === 'Seat Height')?.value || '43–53 cm' },
      { icon: <Check size={16} />,   label: 'Armrest Type',    value: chair.specs.find(s => s.label === 'Armrests')?.value || 'Adjustable' },
      { icon: <Award size={16} />,   label: 'Warranty',        value: chair.specs.find(s => s.label === 'Warranty')?.value || '5 Years' },
      { icon: <Truck size={16} />,   label: 'Assembly',        value: 'Easy Self-Assembly' },
    ] : [];

    const accordionItems = [
      {
        id: 'details',
        title: 'Product Details',
        content: `${chair.title} is built with ${chair.material}. It features ${chair.specLine}. Ideal for corporate offices, home workstations, and bulk institutional procurement. Manufactured at our ISO-certified Shikrapur facility.`,
      },
      {
        id: 'dimensions',
        title: 'Dimensions & Weight',
        content: `Overall Height: 110–122 cm · Seat Width: 50 cm · Seat Depth: 46 cm · Backrest Height: 62 cm · Armrest Height: 22–30 cm · Net Weight: ~14 kg · Carton Weight: ~16 kg.`,
      },
      {
        id: 'care',
        title: 'Care Instructions',
        content: `Wipe mesh or fabric with a dry or lightly damp cloth. Avoid direct sunlight for prolonged periods. Lubricate gas lift piston annually with silicone spray. Do not exceed rated weight capacity. Store in dry, ventilated space.`,
      },
    ];

    const HR = <div style={{ height: '1px', backgroundColor: '#E5E5EA', margin: '28px 0' }} />;

    const imagesToRender = chair.gallery && chair.gallery.length > 0
      ? chair.gallery
      : [{ url: chair.image, label: 'Front Profile' }];

    const handleGalleryScroll = (e) => {
      const container = e.currentTarget;
      const isMobile = window.innerWidth <= 860;
      const scrollPos = isMobile ? container.scrollLeft : container.scrollTop;
      const size = isMobile ? container.offsetWidth : container.offsetHeight;
      const newIdx = Math.round(scrollPos / (size || 1));
      if (newIdx !== activeImageIdx && newIdx >= 0 && newIdx < imagesToRender.length) {
        setActiveImageIdx(newIdx);
      }
    };

    const handleDotClick = (idx) => {
      const container = document.getElementById('pdp-gallery-stack');
      if (container) {
        const isMobile = window.innerWidth <= 860;
        const size = isMobile ? container.offsetWidth : container.offsetHeight;
        if (isMobile) {
          container.scrollTo({ left: idx * size, behavior: 'smooth' });
        } else {
          container.scrollTo({ top: idx * size, behavior: 'smooth' });
        }
        setActiveImageIdx(idx);
      }
    };

    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: "-apple-system, 'SF Pro Display', 'Geist', 'Outfit', sans-serif", color: '#1D1D1F' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes imgFade {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          .pdp-thumb { transition: all 0.2s ease; border: 1.5px solid transparent; border-radius: 12px; cursor: pointer; overflow: hidden; background: #F5F5F7; }
          .pdp-thumb:hover { border-color: #D2D2D7; }
          .pdp-thumb.active { border-color: #1D1D1F !important; }
          .pdp-color:hover { transform: scale(1.12); }
          .pdp-cta-primary { background: #1D1D1F; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; padding: 15px 24px; cursor: pointer; width: 100%; transition: background 0.15s, transform 0.1s; display: flex; align-items: center; justify-content: center; gap: 8px; }
          .pdp-cta-primary:hover { background: #3A3A3C; }
          .pdp-cta-primary:active { transform: scale(0.98); }
          .pdp-cta-secondary { background: transparent; color: #1D1D1F; border: 1.5px solid #D2D2D7; border-radius: 12px; font-size: 15px; font-weight: 600; padding: 15px 24px; cursor: pointer; width: 100%; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
          .pdp-cta-secondary:hover { border-color: #1D1D1F; background: #F5F5F7; }
          .pdp-spec-cell { display: flex; align-items: flex-start; gap: 10px; padding: 14px 0; }
          .pdp-accordion-btn { width: 100%; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; padding: 18px 0; font-size: 15px; font-weight: 600; color: #1D1D1F; font-family: inherit; }
          .pdp-qty-btn { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid #D2D2D7; background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #1D1D1F; transition: all 0.15s; flex-shrink: 0; }
          .pdp-qty-btn:hover { border-color: #1D1D1F; background: #F5F5F7; }
          .pdp-related-card { background: #F5F5F7; border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); border: 1px solid rgba(0,0,0,0.04); }
          .pdp-related-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
          .pdp-highlight-chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 18px; padding: 24px 20px; transition: all 0.3s; }
          .pdp-highlight-chip:hover { transform: translateY(-3px); }
          .pdp-feat-card { padding: 28px; border-radius: 18px; background: #fff; border: 1px solid rgba(0,0,0,0.06); transition: all 0.25s; cursor: default; }
          .pdp-feat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(0,0,0,0.07); }

          /* Scroll-snapping gallery container */
          .pdp-gallery-stack {
            position: sticky;
            top: 52px;
            height: calc(100vh - 52px);
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            scroll-behavior: smooth;
            scrollbar-width: none; /* Firefox */
            border-radius: 24px;
          }
          .pdp-gallery-stack::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }

          /* Individual slides */
          .pdp-gallery-slide {
            height: calc(100vh - 52px);
            scroll-snap-align: start;
            scroll-snap-stop: always;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #F5F5F7;
            position: relative;
            overflow: hidden;
          }
          .pdp-gallery-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 40px;
          }

          /* Floating dots vertical layout */
          .pdp-gallery-dots {
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 10;
          }

          /* Right-column sticky form container */
          .pdp-details-scrollable {
            position: sticky;
            top: 52px;
            height: calc(100vh - 52px);
            overflow-y: auto;
            scrollbar-width: none; /* Firefox */
            padding-bottom: 48px;
          }
          .pdp-details-scrollable::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }

          @media (max-width: 860px) {
            .pdp-hero { grid-template-columns: 1fr !important; gap: 32px !important; }
            .pdp-gallery-stack {
              height: 50vh !important;
              max-height: 480px;
              position: relative !important;
              top: 0 !important;
              display: flex !important;
              flex-direction: row !important;
              scroll-snap-type: x mandatory !important;
              overflow-x: scroll !important;
              overflow-y: hidden !important;
              border-radius: 16px !important;
            }
            .pdp-gallery-slide {
              height: 100% !important;
              width: 100% !important;
              flex-shrink: 0 !important;
              scroll-snap-align: start !important;
            }
            .pdp-gallery-img {
              padding: 24px !important;
            }
            .pdp-gallery-dots {
              left: 50% !important;
              top: auto !important;
              bottom: 20px !important;
              transform: translateX(-50%) !important;
              flex-direction: row !important;
            }
            .pdp-details-scrollable {
              position: relative !important;
              top: 0 !important;
              height: auto !important;
              overflow-y: visible !important;
              padding: 0 !important;
            }
            .pdp-specs-grid { grid-template-columns: 1fr !important; }
            .pdp-related-grid { grid-template-columns: repeat(2,1fr) !important; }
            .pdp-highlights-grid { grid-template-columns: repeat(2,1fr) !important; }
            .pdp-feat-grid { grid-template-columns: 1fr !important; }
            .pdp-delivery-pills { flex-wrap: wrap !important; }
          }
        `}} />

        {/* ── STICKY NAV ── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #E5E5EA', padding: '0 48px', height: '52px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSelectedChair(null)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', color: '#0071E3', fontSize: '14px', fontWeight: 500, padding: 0 }}>
            <ArrowLeft size={15} /> Office Chairs
          </button>
          <span style={{ color: '#D2D2D7', fontSize: '14px' }}>/</span>
          <span style={{ fontSize: '14px', color: '#6E6E73', fontWeight: 400 }}>{chair.title}</span>
        </nav>

        {/* ── HERO TWO-COLUMN ── */}
        <div className="pdp-hero" style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 48px 64px', display: 'grid', gridTemplateColumns: '42% 58%', gap: '72px', alignItems: 'flex-start' }}>

          {/* ── LEFT: SCROLL-SNAPPING GALLERY ── */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
            <div
              id="pdp-gallery-stack"
              className="pdp-gallery-stack"
              onScroll={handleGalleryScroll}
            >
              {imagesToRender.map((g, idx) => (
                <div key={idx} className="pdp-gallery-slide">
                  <img
                    src={g.url}
                    alt={`${chair.title} - ${g.label}`}
                    className="pdp-gallery-img"
                  />
                  {g.label && (
                    <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '6px 16px', borderRadius: '999px', letterSpacing: '0.04em', whiteSpace: 'nowrap', zIndex: 5 }}>
                      {g.label}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Floating dot indicators */}
            {imagesToRender.length > 1 && (
              <div className="pdp-gallery-dots">
                {imagesToRender.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: activeImageIdx === idx ? '#1D1D1F' : 'rgba(0,0,0,0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: activeImageIdx === idx ? 'scale(1.3)' : 'scale(1)',
                      outline: 'none'
                    }}
                    title={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: PRODUCT INFO — every inch used ── */}
          <div className="pdp-details-scrollable" style={{ display: 'flex', flexDirection: 'column' }}>

            {/* 1. Category + Badge pills */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6E6E73', backgroundColor: '#F5F5F7', padding: '5px 12px', borderRadius: '999px' }}>
                {chair.categoryTag || 'Office Chairs'}
              </span>
              {chair.badge && (
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1D1D1F', backgroundColor: '#E8E8ED', padding: '5px 12px', borderRadius: '999px' }}>
                  {chair.badge}
                </span>
              )}
            </div>

            {/* 2. Product Name */}
            <h1 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 700, color: '#000', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 14px' }}>
              {chair.title}
            </h1>

            {/* 3. Star Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} strokeWidth={0} style={{ fill: i < Math.floor(chair.rating) ? '#FFB900' : '#E5E5EA' }} />
                ))}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1D1D1F' }}>{chair.rating}</span>
              <span style={{ fontSize: '13px', color: '#0071E3', cursor: 'pointer', textDecoration: 'none', borderBottom: '1px solid #0071E3' }}>
                {chair.reviewsCount} reviews
              </span>
            </div>

            {/* 4. Short description */}
            <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.65, margin: '0 0 24px', maxWidth: '92%' }}>
              {chair.specLine} — {chair.material}.
            </p>

            {/* 5. Pricing */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#000', letterSpacing: '-0.02em' }}>
                ₹{chair.price.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '15px', color: '#8E8E93', textDecoration: 'line-through' }}>
                MRP ₹{chair.mrp.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 10px', borderRadius: '999px' }}>
                Save {chair.savingsPercent}%
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#6E6E73', marginBottom: '28px' }}>
              Dealer/Bulk price: <strong style={{ color: '#1D1D1F' }}>{chair.bulkPriceText}</strong>
            </div>

            {/* 6. Color Selector */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px' }}>
                Colour: <span style={{ fontWeight: 400, color: '#6E6E73' }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {colorOptions.map(c => (
                  <button key={c.name} title={c.name} onClick={() => setSelectedColor(c.name)} className="pdp-color"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: c.hex, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                      outline: selectedColor === c.name ? '2px solid #1D1D1F' : '2px solid transparent',
                      outlineOffset: '3px',
                      boxShadow: c.border ? 'inset 0 0 0 1px #D2D2D7' : 'none',
                    }} />
                ))}
              </div>
            </div>

            {/* 7. Quantity Selector */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F', marginBottom: '12px' }}>Quantity</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button className="pdp-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                <span style={{ fontSize: '17px', fontWeight: 600, color: '#1D1D1F', minWidth: '28px', textAlign: 'center' }}>{quantity}</span>
                <button className="pdp-qty-btn" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
                {quantity >= 10 && <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>Bulk pricing applies!</span>}
              </div>
            </div>

            {/* 8. CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              <button className="pdp-cta-primary"
                onClick={() => { const msg = encodeURIComponent(`Hi! I want to buy ${quantity} unit(s) of "${chair.title}" in ${selectedColor}. Please share order details.`); window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank'); }}>
                <MessageCircle size={17} /> Shop Now — Order on WhatsApp
              </button>
              <button className="pdp-cta-secondary"
                onClick={() => { const msg = encodeURIComponent(`Hi! I want a bulk quote for "${chair.title}". Interested in ${quantity >= 10 ? quantity : '10+'} units.`); window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank'); }}>
                <Phone size={17} /> Get Bulk Quote
              </button>
            </div>

            {HR}

            {/* 9. Quick Specs Grid 2×3 */}
            <div className="pdp-specs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', marginBottom: '4px' }}>
              {quickSpecs.map((s, i) => (
                <div key={i} className="pdp-spec-cell" style={{ borderBottom: i < quickSpecs.length - 2 ? '1px solid #F0F0F5' : 'none', paddingRight: i % 2 === 0 ? '20px' : '0', borderRight: i % 2 === 0 ? '1px solid #F0F0F5' : 'none', paddingLeft: i % 2 !== 0 ? '20px' : '0' }}>
                  <span style={{ color: '#8E8E93', marginTop: '2px', flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: '#8E8E93', fontWeight: 500, marginBottom: '2px' }}>{s.label}</div>
                    <div style={{ fontSize: '13px', color: '#1D1D1F', fontWeight: 600 }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {HR}

            {/* 10. Delivery Info Pills */}
            <div className="pdp-delivery-pills" style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
              {[
                { emoji: '🚚', text: 'Free Delivery above ₹5,000' },
                { emoji: '📦', text: 'Dispatches in 48 hrs' },
                { emoji: '↩️', text: '7-Day Returns' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#3A3A3C', backgroundColor: '#F5F5F7', padding: '7px 14px', borderRadius: '999px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  <span>{p.emoji}</span> {p.text}
                </div>
              ))}
            </div>

            {HR}

            {/* 11. Accordion */}
            <div>
              {accordionItems.map((item, i) => (
                <div key={item.id} style={{ borderBottom: i < accordionItems.length - 1 ? '1px solid #E5E5EA' : 'none' }}>
                  <button className="pdp-accordion-btn" onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}>
                    {item.title}
                    <ChevronDown size={18} style={{ color: '#8E8E93', transform: openAccordion === item.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease', flexShrink: 0 }} />
                  </button>
                  <div style={{ overflow: 'hidden', maxHeight: openAccordion === item.id ? '300px' : '0', transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)', marginBottom: openAccordion === item.id ? '18px' : '0' }}>
                    <p style={{ fontSize: '14px', color: '#6E6E73', lineHeight: 1.75, margin: 0 }}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── HIGHLIGHTS STRIP (full-width dark) ── */}
        {chair.highlights && (
          <div style={{ backgroundColor: '#000', padding: '80px 48px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.14em', textAlign: 'center', marginBottom: '10px' }}>Why This Chair</p>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '-0.022em', marginBottom: '48px', lineHeight: 1.15 }}>
                Engineered for those who sit for a living.
              </h2>
              <div className="pdp-highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
                {chair.highlights.map((h, i) => (
                  <div key={i} className="pdp-highlight-chip">
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(0,113,227,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: '#0071E3', fontSize: '15px', fontWeight: 800 }}>{i + 1}</div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, margin: 0, fontWeight: 500 }}>{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FULL SPECS TABLE ── */}
        {chair.specs && (
          <div style={{ backgroundColor: '#fff', padding: '80px 48px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '10px' }}>Specifications</p>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', fontWeight: 700, color: '#000', letterSpacing: '-0.022em', marginBottom: '36px' }}>Every detail, by the numbers.</h2>
              <div style={{ border: '1px solid #E5E5EA', borderRadius: '16px', overflow: 'hidden' }}>
                {chair.specs.map((spec, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA', borderBottom: i < chair.specs.length - 1 ? '1px solid #F0F0F5' : 'none' }}>
                    <span style={{ fontSize: '13px', color: '#6E6E73', fontWeight: 500 }}>{spec.label}</span>
                    <span style={{ fontSize: '14px', color: '#1D1D1F', fontWeight: 600 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── IN THE BOX ── */}
        {chair.inTheBox && (
          <div style={{ backgroundColor: '#F5F5F7', padding: '80px 48px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '10px' }}>In The Box</p>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', fontWeight: 700, color: '#000', letterSpacing: '-0.022em', marginBottom: '36px' }}>Everything you need, nothing you don't.</h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {chair.inTheBox.map((item, i) => (
                  <div key={i} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={13} color="#059669" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div style={{ backgroundColor: '#fff', padding: '80px 48px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '10px' }}>You May Also Like</p>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', fontWeight: 700, color: '#000', letterSpacing: '-0.022em', marginBottom: '36px' }}>More from our collection.</h2>
              <div className="pdp-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px' }}>
                {related.map(c => (
                  <div key={c.id} className="pdp-related-card" onClick={() => { setSelectedChair(c); setActiveImageIdx(0); setOpenAccordion(null); }}>
                    <div style={{ aspectRatio: '1', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="pdp-related-card-img" />
                    </div>
                    <div style={{ padding: '14px 16px 16px', backgroundColor: '#fff', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>{c.categoryTag}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D1D1F', marginBottom: '8px', lineHeight: 1.3 }}>{c.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#1D1D1F' }}>₹{c.price.toLocaleString('en-IN')}</span>
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Save {c.savingsPercent}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FEATURE GRID ── */}
        <div style={{ backgroundColor: '#F5F5F7', padding: '80px 48px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', fontWeight: 700, color: '#000', textAlign: 'center', letterSpacing: '-0.022em', marginBottom: '44px' }}>Built different. By design.</h2>
            <div className="pdp-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
              {features.map((f, i) => (
                <div key={i} className="pdp-feat-card">
                  <div style={{ color: '#0071E3', marginBottom: '14px' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1D1D1F', marginBottom: '7px' }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }


  /* ── GRID LIST VIEW ─────────────────────────────────────── */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: "-apple-system, 'SF Pro Display', 'Geist', 'Outfit', sans-serif" }}>

      <style dangerouslySetInnerHTML={{__html: `
        .premium-card {
          position: relative;
          background-color: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.01);
          border: 1px solid rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .premium-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.08), 0 10px 20px -8px rgba(0, 0, 0, 0.04);
          border-color: rgba(0,0,0,0.06);
        }
        .premium-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-card:hover .premium-card-img {
          transform: scale(1.05) !important;
        }
        .premium-card:hover .chair-whatsapp-btn {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .pdp-related-card-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .pdp-related-card:hover .pdp-related-card-img {
          transform: scale(1.05) !important;
        }
      `}} />
      {/* Sticky Nav Bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'rgba(250,250,250,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '0 40px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#0071E3', fontSize: '15px', fontWeight: 500 }}
        >
          <ArrowLeft size={16} /> Products
        </button>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>Office Chairs</span>
        <div style={{ width: '80px' }} />
      </div>

      {/* Hero Banner */}
      <div style={{
        backgroundColor: '#000', color: '#fff',
        padding: '80px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background light glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 113, 227, 0.12), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Background Image (Fills the entire background frame, no tiling or tilting) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.45,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 35%, rgba(0,0,0,0.1) 95%)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 35%, rgba(0,0,0,0.1) 95%)',
        }}>
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80"
            alt="Office Workspace Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(0.3) brightness(0.8) contrast(1.15)',
            }}
          />
        </div>

        {/* Progressive Blur Overlay (Strong blur on the right, none on the left) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 75%)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 75%)',
        }} />

        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }} className="hero-grid-container">
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 820px) {
              .hero-grid-container {
                grid-template-columns: 1fr !important;
                text-align: center !important;
                gap: 48px !important;
              }
              .hero-text-content {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
              }
              .hero-deck-wrapper {
                justify-content: center !important;
                padding-right: 40px !important;
              }
            }
          `}} />

          {/* Left Column: Text & CTAs */}
          <div className="hero-text-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0071E3', marginBottom: '16px' }}>
              SR Enterprises — Office Collection
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}>
              Where comfort<br /><span style={{ color: '#6E6E73' }}>meets craft.</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#8E8E93', maxWidth: '500px', marginBottom: '32px', lineHeight: 1.6 }}>
              Direct from factory. Premium office chairs engineered for India's modern workspaces.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                style={{ backgroundColor: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: '999px', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 14px rgba(37,211,102,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Get Bulk Quote
              </button>
              <button
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                style={{ backgroundColor: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: '999px', fontSize: '16px', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Contact a Dealer
              </button>
            </div>
          </div>

          {/* Right Column: Stacked Card Animation */}
          <div className="hero-deck-wrapper" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', height: '470px', position: 'relative' }}>
            <div style={{ width: '320px', height: '420px', position: 'relative', marginRight: '90px' }}>
              {deckChairs.map((chair, idx) => (
                <div key={chair.id} style={getCardStyle(idx)}>
                  <div 
                    onClick={() => setSelectedChair(chair)}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '28px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    title={`Click to view ${chair.title}`}
                  >
                    <img 
                      src={chair.image} 
                      alt={chair.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Filter Bar (Visible only on mobile) */}
      <div 
        className="flex md:hidden"
        style={{
          position: 'sticky', top: '56px', zIndex: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '10px 16px',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-none::-webkit-scrollbar { display: none; }
        `}} />

        {/* Row 1: Disclosing Trigger Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
        }}>
          {/* Category Trigger */}
          <button
            onClick={() => setActiveMobilePanel(activeMobilePanel === 'category' ? null : 'category')}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: activeMobilePanel === 'category' ? 'rgba(0, 113, 227, 0.08)' : 'rgba(120, 120, 128, 0.08)',
              border: 'none',
              padding: '8px 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 600,
              color: activeMobilePanel === 'category' ? '#0071E3' : '#1D1D1F',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: 0,
            }}
          >
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              Category: {activeFilter}
            </span>
            <ChevronRight 
              size={12} 
              style={{ 
                transform: activeMobilePanel === 'category' ? 'rotate(90deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: activeMobilePanel === 'category' ? '#0071E3' : '#8E8E93',
                marginLeft: '4px',
                flexShrink: 0,
              }} 
            />
          </button>

          {/* Material Trigger */}
          <button
            onClick={() => setActiveMobilePanel(activeMobilePanel === 'material' ? null : 'material')}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: activeMobilePanel === 'material' ? 'rgba(0, 113, 227, 0.08)' : 'rgba(120, 120, 128, 0.08)',
              border: 'none',
              padding: '8px 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 600,
              color: activeMobilePanel === 'material' ? '#0071E3' : '#1D1D1F',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: 0,
            }}
          >
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              Material: {activeMaterial}
            </span>
            <ChevronRight 
              size={12} 
              style={{ 
                transform: activeMobilePanel === 'material' ? 'rotate(90deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: activeMobilePanel === 'material' ? '#0071E3' : '#8E8E93',
                marginLeft: '4px',
                flexShrink: 0,
              }} 
            />
          </button>

          {/* Sort By Trigger */}
          <button
            onClick={() => setActiveMobilePanel(activeMobilePanel === 'sort' ? null : 'sort')}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: activeMobilePanel === 'sort' ? 'rgba(0, 113, 227, 0.08)' : 'rgba(120, 120, 128, 0.08)',
              border: 'none',
              padding: '8px 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 600,
              color: activeMobilePanel === 'sort' ? '#0071E3' : '#1D1D1F',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: 0,
            }}
          >
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              Sort: {sortBy}
            </span>
            <ChevronRight 
              size={12} 
              style={{ 
                transform: activeMobilePanel === 'sort' ? 'rotate(90deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: activeMobilePanel === 'sort' ? '#0071E3' : '#8E8E93',
                marginLeft: '4px',
                flexShrink: 0,
              }} 
            />
          </button>
        </div>

        {/* Row 2: Disclosed Options Panels */}
        <div style={{
          maxHeight: activeMobilePanel ? '60px' : '0px',
          opacity: activeMobilePanel ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%',
        }}>
          {activeMobilePanel === 'category' && (
            <div style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              overflow: 'hidden',
              WebkitMaskImage: 'linear-gradient(to right, #000 85%, transparent 100%)',
              maskImage: 'linear-gradient(to right, #000 85%, transparent 100%)',
              padding: '6px 0',
            }}>
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto', 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                width: '100%',
              }} className="scrollbar-none">
                <div style={{
                  display: 'inline-flex',
                  backgroundColor: 'rgba(120, 120, 128, 0.08)',
                  borderRadius: '12px',
                  padding: '3px',
                  gap: '2px',
                  alignItems: 'center',
                }}>
                  {filterPills.map((f) => {
                    const isActive = activeFilter === f;
                    return (
                      <button 
                        key={f} 
                        onClick={() => {
                          setActiveFilter(f);
                        }}
                        style={{
                          padding: '6px 12px', 
                          borderRadius: '9px', 
                          fontSize: '12px', 
                          fontWeight: isActive ? 600 : 500, 
                          border: 'none', 
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#1D1D1F' : '#6E6E73',
                          boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeMobilePanel === 'material' && (
            <div style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              overflow: 'hidden',
              WebkitMaskImage: 'linear-gradient(to right, #000 85%, transparent 100%)',
              maskImage: 'linear-gradient(to right, #000 85%, transparent 100%)',
              padding: '6px 0',
            }}>
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto', 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                width: '100%',
              }} className="scrollbar-none">
                <div style={{
                  display: 'inline-flex',
                  backgroundColor: 'rgba(120, 120, 128, 0.08)',
                  borderRadius: '12px',
                  padding: '3px',
                  gap: '2px',
                  alignItems: 'center',
                }}>
                  {materialPills.map((m) => {
                    const isActive = activeMaterial === m;
                    return (
                      <button 
                        key={m} 
                        onClick={() => {
                          setActiveMaterial(m);
                        }}
                        style={{
                          padding: '6px 12px', 
                          borderRadius: '9px', 
                          fontSize: '12px', 
                          fontWeight: isActive ? 600 : 500, 
                          border: 'none', 
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#1D1D1F' : '#6E6E73',
                          boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeMobilePanel === 'sort' && (
            <div style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              overflow: 'hidden',
              WebkitMaskImage: 'linear-gradient(to right, #000 85%, transparent 100%)',
              maskImage: 'linear-gradient(to right, #000 85%, transparent 100%)',
              padding: '6px 0',
            }}>
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto', 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                width: '100%',
              }} className="scrollbar-none">
                <div style={{
                  display: 'inline-flex',
                  backgroundColor: 'rgba(120, 120, 128, 0.08)',
                  borderRadius: '12px',
                  padding: '3px',
                  gap: '2px',
                  alignItems: 'center',
                }}>
                  {sortOptions.map((option) => {
                    const isActive = sortBy === option;
                    return (
                      <button 
                        key={option} 
                        onClick={() => {
                          setSortBy(option);
                        }}
                        style={{
                          padding: '6px 12px', 
                          borderRadius: '9px', 
                          fontSize: '12px', 
                          fontWeight: isActive ? 600 : 500, 
                          border: 'none', 
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#1D1D1F' : '#6E6E73',
                          boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>{option}</span>
                        {isActive && <Check size={10} style={{ color: '#0071E3' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Catalog Layout Section */}
      <div style={{ padding: '48px 40px 80px', width: '100%' }}>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Desktop Left Sidebar Filters (Visible only on md and up) */}
          <div 
            className="hidden md:flex" 
            style={{ 
              width: '240px', 
              flexShrink: 0, 
              position: 'sticky', 
              top: '80px', 
              alignSelf: 'start',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Category Section */}
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px' }}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Category
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1D1D1F', marginTop: '2px' }}>
                    {activeFilter}
                  </div>
                </div>
                <ChevronRight 
                  size={16} 
                  style={{ 
                    transform: categoryOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: '#8E8E93',
                    flexShrink: 0,
                  }} 
                />
              </button>
              
              <div style={{
                maxHeight: categoryOpen ? '500px' : '0px',
                opacity: categoryOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                marginTop: categoryOpen ? '8px' : '0px',
              }}>
                <div style={{
                  backgroundColor: 'rgba(120, 120, 128, 0.05)',
                  borderRadius: '16px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}>
                  {filterPills.map((f) => {
                    const isActive = activeFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: isActive ? 600 : 500,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#1D1D1F' : '#6E6E73',
                          boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) e.currentTarget.style.color = '#1D1D1F';
                        }}
                        onMouseLeave={e => {
                          if (!isActive) e.currentTarget.style.color = '#6E6E73';
                        }}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Material Section */}
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px' }}>
              <button
                onClick={() => setMaterialOpen(!materialOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Material
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1D1D1F', marginTop: '2px' }}>
                    {activeMaterial}
                  </div>
                </div>
                <ChevronRight 
                  size={16} 
                  style={{ 
                    transform: materialOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: '#8E8E93',
                    flexShrink: 0,
                  }} 
                />
              </button>
              
              <div style={{
                maxHeight: materialOpen ? '300px' : '0px',
                opacity: materialOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                marginTop: materialOpen ? '8px' : '0px',
              }}>
                <div style={{
                  backgroundColor: 'rgba(120, 120, 128, 0.05)',
                  borderRadius: '16px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}>
                  {materialPills.map((m) => {
                    const isActive = activeMaterial === m;
                    return (
                      <button
                        key={m}
                        onClick={() => setActiveMaterial(m)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: isActive ? 600 : 500,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#1D1D1F' : '#6E6E73',
                          boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) e.currentTarget.style.color = '#1D1D1F';
                        }}
                        onMouseLeave={e => {
                          if (!isActive) e.currentTarget.style.color = '#6E6E73';
                        }}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sort Options Section */}
            <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px' }}>
              <button
                onClick={() => setDesktopSortOpen(!desktopSortOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Sort By
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1D1D1F', marginTop: '2px' }}>
                    {sortBy}
                  </div>
                </div>
                <ChevronRight 
                  size={16} 
                  style={{ 
                    transform: desktopSortOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: '#8E8E93',
                    flexShrink: 0,
                  }} 
                />
              </button>
              
              <div style={{
                maxHeight: desktopSortOpen ? '300px' : '0px',
                opacity: desktopSortOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                marginTop: desktopSortOpen ? '8px' : '0px',
              }}>
                <div style={{
                  backgroundColor: 'rgba(120, 120, 128, 0.05)',
                  borderRadius: '16px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}>
                  {sortOptions.map((option) => {
                    const isActive = sortBy === option;
                    return (
                      <button
                        key={option}
                        onClick={() => setSortBy(option)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: isActive ? 600 : 500,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#1D1D1F' : '#6E6E73',
                          boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) e.currentTarget.style.color = '#1D1D1F';
                        }}
                        onMouseLeave={e => {
                          if (!isActive) e.currentTarget.style.color = '#6E6E73';
                        }}
                      >
                        <span>{option}</span>
                        {isActive && <Check size={14} style={{ color: '#0071E3' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total count details */}
            <div style={{ fontSize: '13px', color: '#8E8E93', fontWeight: 500, paddingLeft: '4px' }}>
              Showing {filtered.length} {filtered.length === 1 ? 'chair' : 'chairs'}
            </div>
          </div>

          {/* Right Product Grid Column Area */}
          <div className="flex-grow w-full">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {sorted.map((chair) => (
                <div
                  key={chair.id}
                  onClick={() => setSelectedChair(chair)}
                  className="premium-card"
                >
                  {/* Image Zone */}
                  <div style={{ position: 'relative', backgroundColor: '#F5F5F7', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', overflow: 'hidden' }}>
                    <img src={chair.image} alt={chair.title} className="premium-card-img" />
                    {/* Badge */}
                    {chair.badge && (
                      <div style={getBadgeStyle(chair.badge)}>{chair.badge}</div>
                    )}
                    {/* Quick WhatsApp Overlay Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const msg = encodeURIComponent(`Hi! I'm interested in "${chair.title}".`);
                        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                      }}
                      style={{
                        position: 'absolute', top: '16px', right: '16px',
                        width: '36px', height: '36px', borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        color: '#25D366',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: 0, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: 'translateY(4px)',
                      }}
                      className="chair-whatsapp-btn"
                      title="Quick Quote"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>

                  {/* Card Body Info */}
                  <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {chair.categoryTag}
                    </div>
                    <h3 style={{ fontSize: '21px', fontWeight: 700, color: '#1D1D1F', marginBottom: '6px', letterSpacing: '-0.015em' }}>
                      {chair.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6E6E73', marginBottom: '16px', lineHeight: 1.5 }}>
                      {chair.specLine}
                    </p>

                    {/* Ratings */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                      <span style={{ color: '#FFB900', fontSize: '12px' }}>{'★'.repeat(Math.floor(chair.rating))}{'☆'.repeat(5 - Math.floor(chair.rating))}</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#1D1D1F', marginLeft: '4px' }}>{chair.rating}</span>
                      <span style={{ fontSize: '12px', color: '#8E8E93' }}>({chair.reviewsCount})</span>
                    </div>

                    {/* Pricing details */}
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ fontSize: '11px', color: '#8E8E93', textDecoration: 'line-through', marginBottom: '2px' }}>
                        MRP ₹{chair.mrp.toLocaleString('en-IN')}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.020em' }}>
                          ₹{chair.price.toLocaleString('en-IN')}
                        </span>
                        <span style={{ backgroundColor: 'rgba(5, 150, 105, 0.08)', color: '#059669', borderRadius: '999px', padding: '3px 10px', fontSize: '11px', fontWeight: 600 }}>
                          Save {chair.savingsPercent}%
                        </span>
                      </div>
                      
                      <div style={{ backgroundColor: 'rgba(0,113,227,0.05)', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', color: '#0071E3', fontWeight: 500, marginBottom: '20px' }}>
                        {chair.bulkPriceText}
                      </div>

                      {/* Pill-shaped Action CTA Buttons */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedChair(chair); }}
                          style={{
                            flex: 1,
                            backgroundColor: '#1D1D1F',
                            color: '#fff',
                            padding: '12px 20px',
                            borderRadius: '999px',
                            fontSize: '14px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3E3E42'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1D1D1F'}
                        >
                          Shop Now →
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const msg = encodeURIComponent(`Hi! I want to buy "${chair.title}". Please share details.`);
                            window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                          }}
                          style={{
                            width: '44px',
                            height: '44px',
                            backgroundColor: '#25D366',
                            color: '#fff',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 10px rgba(37,211,102,0.15)',
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#20BA5A'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25D366'}
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div style={{ backgroundColor: '#1D1D1F', padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#F5F5F7', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Need a custom quote?
        </h2>
        <p style={{ fontSize: '16px', color: '#6E6E73', marginBottom: '32px' }}>We handle orders of all sizes. Minimum 10 units.</p>
        <button
          onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
          style={{ backgroundColor: '#25D366', color: '#fff', padding: '16px 36px', borderRadius: '999px', fontSize: '17px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
        >
          <MessageCircle size={18} /> Chat on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default OfficeChairsPage;
